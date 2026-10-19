/**
 * Sync .env.local → Vercel project env (Production + Preview + Development)
 * then trigger a redeploy.
 *
 * Usage (after `npx vercel login` + `npx vercel link`):
 *   node scripts/sync-vercel-env.mjs
 */
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const ENV_FILE = resolve(ROOT, ".env.local");

const KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "DATABASE_URL",
  "DIRECT_URL",
  "NEXT_PUBLIC_ENABLE_REVIEW",
];

function parseEnv(raw) {
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return out;
}

function run(cmd, input) {
  return execSync(cmd, {
    cwd: ROOT,
    stdio: input ? ["pipe", "pipe", "pipe"] : "inherit",
    input,
    encoding: "utf8",
  });
}

if (!existsSync(ENV_FILE)) {
  console.error("Missing .env.local");
  process.exit(1);
}

const env = parseEnv(readFileSync(ENV_FILE, "utf8"));

for (const key of KEYS) {
  const value = env[key];
  if (!value) {
    console.warn(`Skip missing key: ${key}`);
    continue;
  }
  for (const target of ["production", "preview", "development"]) {
    try {
      // Remove existing value quietly, then add
      try {
        run(`npx vercel env rm ${key} ${target} -y`);
      } catch {
        /* not set yet */
      }
      run(`npx vercel env add ${key} ${target}`, `${value}\n`);
      console.log(`Set ${key} → ${target}`);
    } catch (err) {
      console.error(`Failed ${key} (${target}):`, err?.message || err);
    }
  }
}

console.log("\nTriggering production redeploy...");
run("npx vercel --prod --yes");
console.log("Done.");
