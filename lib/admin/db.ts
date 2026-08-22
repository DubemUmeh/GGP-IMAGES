import "server-only";

type QueryResult<T> = { rows: T[]; rowCount: number | null };
type SqlClient = {
  unsafe: (text: string, params?: unknown[]) => unknown;
  begin: <T>(fn: (tx: SqlClient) => Promise<T>) => Promise<T>;
};

let sqlClient: SqlClient | null = null;

async function loadDb(): Promise<SqlClient> {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (sqlClient) return sqlClient;

  const importer = new Function("specifier", "return import(specifier)") as <T>(
    specifier: string,
  ) => Promise<T>;
  const postgresModule = await importer<{
    default: (url: string, options?: Record<string, unknown>) => SqlClient;
  }>("postgres");

  sqlClient = postgresModule.default(process.env.DATABASE_URL, {
    max: 5,
    ssl: "require",
  });

  return sqlClient;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  const client = await loadDb();
  const rows = (await client.unsafe(text, params)) as T[];
  return { rows, rowCount: rows.length };
}

export async function transaction<T>(
  fn: (client: {
    query: <Row = Record<string, unknown>>(
      text: string,
      params?: unknown[],
    ) => Promise<QueryResult<Row>>;
  }) => Promise<T>,
) {
  const client = await loadDb();
  return client.begin(async (tx) =>
    fn({
      query: async <Row = Record<string, unknown>>(
        text: string,
        params: unknown[] = [],
      ) => {
        const rows = (await tx.unsafe(text, params)) as Row[];
        return { rows, rowCount: rows.length };
      },
    }),
  );
}
