#!/usr/bin/env node

// Bridge ZCode to an existing official Codex installation. This package does
// not contain or download ModRetro binaries, compiled servers, or activation data.

import { spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const PLUGIN_NAME = "modretro-chromatic";
const MARKETS = ["openai-curated-remote", "openai-curated"];

function fail(message) {
  console.error(`[modretro-chromatic-zcode] ${message}`);
  process.exit(1);
}

function isFile(candidate) {
  try {
    return statSync(candidate).isFile();
  } catch {
    return false;
  }
}

function inspectRoot(candidate) {
  try {
    const root = realpathSync(candidate);
    const manifestPath = path.join(root, ".codex-plugin", "plugin.json");
    const launcher = path.join(root, "scripts", "start-mcp.mjs");
    const server = path.join(root, "dist", "server.js");
    if (!isFile(manifestPath) || !isFile(launcher) || !isFile(server)) return undefined;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (manifest.name !== PLUGIN_NAME || typeof manifest.version !== "string") return undefined;
    const match = /^(\d+)\.(\d+)\.(\d+)/.exec(manifest.version);
    if (!match) return undefined;
    return {
      root,
      launcher,
      version: manifest.version,
      numericVersion: match.slice(1).map(Number),
    };
  } catch {
    return undefined;
  }
}

function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) {
    const difference = left.numericVersion[index] - right.numericVersion[index];
    if (difference !== 0) return difference;
  }
  return left.version.localeCompare(right.version, "en");
}

function discoverOfficialPlugin() {
  const override = process.env.MODRETRO_CHROMATIC_CODEX_ROOT?.trim();
  if (override) {
    const selected = inspectRoot(path.resolve(override));
    if (!selected) {
      fail("MODRETRO_CHROMATIC_CODEX_ROOT does not point to a complete official ModRetro Chromatic Codex plugin.");
    }
    return selected;
  }

  const codexHome = process.env.CODEX_HOME?.trim()
    ? path.resolve(process.env.CODEX_HOME.trim())
    : path.join(os.homedir(), ".codex");
  const candidates = [];
  for (const market of MARKETS) {
    const parent = path.join(codexHome, "plugins", "cache", market, PLUGIN_NAME);
    if (!existsSync(parent)) continue;
    const canonicalParent = realpathSync(parent);
    for (const entry of readdirSync(canonicalParent, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const selected = inspectRoot(path.join(canonicalParent, entry.name));
      if (!selected) continue;
      const relative = path.relative(canonicalParent, selected.root);
      if (!relative || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) continue;
      candidates.push(selected);
    }
  }
  candidates.sort((left, right) => compareVersions(right, left));
  return candidates[0];
}

const selected = discoverOfficialPlugin();
if (!selected) {
  fail(
    "No official ModRetro Chromatic Codex plugin was found. Install it in Codex first, " +
    "or set MODRETRO_CHROMATIC_CODEX_ROOT to its existing plugin directory.",
  );
}

console.error(`[modretro-chromatic-zcode] Using official Codex plugin ${selected.version}: ${selected.root}`);
const child = spawn(process.execPath, [selected.launcher], {
  cwd: selected.root,
  env: {
    ...process.env,
    GB_STUDIO_LOG_LEVEL: process.env.GB_STUDIO_LOG_LEVEL || "info",
  },
  stdio: "inherit",
});

child.on("error", (error) => fail(`Could not start the official Codex plugin: ${error.message}`));
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (child.exitCode === null && child.signalCode === null) child.kill(signal);
  });
}
