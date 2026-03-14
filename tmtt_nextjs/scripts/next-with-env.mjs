import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function stripWrappingQuotes(value) {
  if (!value) {
    return value;
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseEnvFile(envFilePath) {
  const loaded = {};
  const content = readFileSync(envFilePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = stripWrappingQuotes(line.slice(separatorIndex + 1).trim());

    if (key === "NODE_ENV") {
      continue;
    }

    if (key) {
      loaded[key] = value;
    }
  }

  return loaded;
}

const [envFileArg, nextCommand, ...nextArgs] = process.argv.slice(2);

if (!envFileArg || !nextCommand) {
  console.error("Usage: node ./scripts/next-with-env.mjs <env-file> <next-command> [args...]");
  process.exit(1);
}

const envFilePath = resolve(process.cwd(), envFileArg);
if (!existsSync(envFilePath)) {
  console.error(`Environment file not found: ${envFilePath}`);
  process.exit(1);
}

const nextBin = require.resolve("next/dist/bin/next");
const envFromFile = parseEnvFile(envFilePath);

const child = spawn(process.execPath, [nextBin, nextCommand, ...nextArgs], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    ...envFromFile,
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});