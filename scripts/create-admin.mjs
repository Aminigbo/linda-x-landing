import { readFileSync, existsSync } from "fs";
import { createClient } from "@supabase/supabase-js";

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

const args = process.argv.slice(2);
const recreate = args.includes("--recreate");
const positional = args.filter((arg) => arg !== "--recreate");
const [email, password] = positional;

if (!email || !password) {
  console.error(
    "Usage: node scripts/create-admin.mjs [--recreate] <email> <password>"
  );
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: listData, error: listError } =
  await supabase.auth.admin.listUsers({ perPage: 1000 });

if (listError) {
  console.error("Failed to list users:", listError.message);
  process.exit(1);
}

const existing = listData.users.find(
  (user) => user.email?.toLowerCase() === email.toLowerCase()
);

if (existing && recreate) {
  const { error } = await supabase.auth.admin.deleteUser(existing.id);
  if (error) {
    console.error("Failed to delete user:", error.message);
    process.exit(1);
  }
  console.log(`Deleted existing account for ${email} (${existing.id})`);
}

if (existing && !recreate) {
  const { data, error } = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });

  if (error) {
    console.error("Failed to update user:", error.message);
    process.exit(1);
  }

  console.log(`Updated admin account for ${data.user.email} (${data.user.id})`);
  process.exit(0);
}

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error("Failed to create user:", error.message);
  process.exit(1);
}

console.log(`Created admin account for ${data.user.email} (${data.user.id})`);
