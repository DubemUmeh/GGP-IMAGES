import 'server-only';

type QueryResult<T> = { rows: T[]; rowCount: number | null };
type DrizzleDb = { execute: <T = Record<string, unknown>>(statement: unknown) => Promise<T[] | { rows: T[]; rowCount?: number }> };
type SqlClient = { unsafe: (text: string, params?: unknown[]) => unknown; begin: <T>(fn: (tx: SqlClient) => Promise<T>) => Promise<T> };

type DbRuntime = { db: DrizzleDb; sqlClient: SqlClient };
let runtime: DbRuntime | null = null;

async function loadDb(): Promise<DbRuntime> {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  if (runtime) return runtime;

  const importer = new Function('specifier', 'return import(specifier)') as <T>(specifier: string) => Promise<T>;
  const [{ drizzle }, postgresModule] = await Promise.all([
    importer<{ drizzle: (client: unknown) => DrizzleDb }>('drizzle-orm/postgres-js'),
    importer<{ default: (url: string, options?: Record<string, unknown>) => SqlClient }>('postgres'),
  ]);

  const sqlClient = postgresModule.default(process.env.DATABASE_URL, {
    max: 5,
    ssl: process.env.NODE_ENV === 'production' ? 'require' : undefined,
  });

  runtime = { db: drizzle(sqlClient), sqlClient };
  return runtime;
}

export async function query<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<QueryResult<T>> {
  const { db, sqlClient } = await loadDb();
  const result = await db.execute<T>(sqlClient.unsafe(text, params));
  if (Array.isArray(result)) return { rows: result, rowCount: result.length };
  return { rows: result.rows, rowCount: result.rowCount ?? result.rows.length };
}

export async function transaction<T>(fn: (client: { query: <Row = Record<string, unknown>>(text: string, params?: unknown[]) => Promise<QueryResult<Row>> }) => Promise<T>) {
  const { db, sqlClient } = await loadDb();
  return sqlClient.begin(async (tx) => fn({
    query: async <Row = Record<string, unknown>>(text: string, params: unknown[] = []) => {
      const result = await db.execute<Row>(tx.unsafe(text, params));
      if (Array.isArray(result)) return { rows: result, rowCount: result.length };
      return { rows: result.rows, rowCount: result.rowCount ?? result.rows.length };
    },
  }));
}
