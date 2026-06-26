import { readFileSync, existsSync } from "fs";
import pg from "pg";

function loadEnv() {
  for (const path of [".env.local", ".env"]) {
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnv();

const projectRef = "tcijrogmncatfkddtyzm";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.argv[2];

if (!serviceRoleKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sql = readFileSync("supabase/readers_club.sql", "utf8")
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n");

const connectionStrings = [
  process.env.DATABASE_URL,
  process.env.SUPABASE_DB_URL,
  `postgresql://postgres:${encodeURIComponent(process.env.SUPABASE_DB_PASSWORD || "")}@db.${projectRef}.supabase.co:5432/postgres`,
  `postgresql://postgres.${projectRef}:${encodeURIComponent(serviceRoleKey)}@aws-0-us-central1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres:${encodeURIComponent(serviceRoleKey)}@db.${projectRef}.supabase.co:5432/postgres`,
].filter((url) => url && !url.includes(":@") && !url.endsWith(":/postgres"));

async function run() {
  const client = new pg.Client();
  let connected = false;
  let lastError;

  for (const connectionString of connectionStrings) {
    const testClient = new pg.Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

    try {
      await testClient.connect();
      await testClient.query(sql);
      await testClient.end();
      console.log("readers_club table created successfully.");
      connected = true;
      break;
    } catch (error) {
      lastError = error;
      try {
        await testClient.end();
      } catch {
        // ignore
      }
    }
  }

  if (!connected) {
    console.error("Could not connect to Supabase Postgres to run migration.");
    console.error(lastError?.message || lastError);
    process.exit(1);
  }
}

run();
