import express from 'express';
import { exec, execFile } from 'child_process';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
app.use(express.json());

// ---- Test Case A: Clear-text logging of sensitive info (CodeQL alert) ----
app.post('/debug-login', (req, res) => {
  const user = req.body.user || 'unknown';
  const password = req.body.password || 'N/A';
  console.log(`Login attempt: user=${user}, password=${password}`);  // VULN
  res.json({ ok: true });
});

// ---- Test Case B: CORS misconfiguration (CodeQL alert) ----
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');           // VULN
  res.setHeader('Access-Control-Allow-Credentials', 'true');   // VULN
  next();
});

// ---- Test Case C: Disabling TLS cert validation (CodeQL alert) ----
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // VULN

// ---- Demo Vulnerability: Command Injection ----
app.get('/ping', (req, res) => {
  const host = req.query.host || '127.0.0.1';
  exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {
    if (err) return res.status(400).send(stderr);
    res.type('text/plain').send(stdout);
  });
});

// ---- Demo Vulnerability: SQL Injection ----
app.get('/users', async (req, res) => {
  const id = req.query.id || '1';
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db'
  });
  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM users WHERE id = ${id};`); // VULN
    res.json(result.rows || []);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.end().catch(() => {});
  }
});

app.get('/', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on :${PORT}`));

// STEP‑6 — Create minimal test file
// Create:
// test/app.test.js

describe("placeholder", () => {
  test("always true", () => {
    expect(true).toBe(true);
  });
});

// STEP‑7 — Update package.json to use Jest
// Open package.json → replace "test" script:
//
// "scripts": {
//   "start": "node src/index.js",
//   "test": "jest --runInBand"
// }
