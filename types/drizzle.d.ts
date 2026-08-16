/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'drizzle-kit' { export type Config = Record<string, unknown>; }
declare module 'drizzle-orm/pg-core' {
  type Col = any;
  type Builder = any;
  export const pgTable: any;
  export const uuid: (name: string) => Builder;
  export const text: (name: string) => Builder;
  export const boolean: (name: string) => Builder;
  export const timestamp: (name: string, opts?: unknown) => Builder;
  export const integer: (name: string) => Builder;
  export const numeric: (name: string) => Builder;
  export const jsonb: (name: string) => Builder;
  export const primaryKey: (config: { columns: Col[] }) => unknown;
  export const index: (name: string) => { on: (...cols: Col[]) => unknown };
  export const uniqueIndex: (name: string) => { on: (...cols: Col[]) => unknown };
}
