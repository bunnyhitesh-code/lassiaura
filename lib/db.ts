export function getDB(env: CloudflareEnv): D1Database {
  if (!env.DB) throw new Error("D1 binding DB not found in environment");
  return env.DB;
}
