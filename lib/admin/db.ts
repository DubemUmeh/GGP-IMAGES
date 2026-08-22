import "server-only";
import postgres from "postgres";

type QueryResult<T> = { rows: T[]; rowCount: number | null };
type SqlClient = {
  unsafe: (text: string, params?: unknown[]) => unknown;
  begin: <T>(fn: (tx: SqlClient) => Promise<T>) => Promise<T>;
};

let sqlClient: SqlClient | null = null;

function loadDb(): SqlClient {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (sqlClient) return sqlClient;

  sqlClient = postgres(process.env.DATABASE_URL, {
    max: 5,
    ssl: "require",
  }) as unknown as SqlClient;

  return sqlClient;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  const client = loadDb();
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
  const client = loadDb();
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
