import express from 'express';
import { exec } from 'child_process';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
app.use(express.json());

// ========================================================================
// INTENTIONAL VULNERABILITIES FOR CODEQL DEMO
// These are security issues that CodeQL should detect
// ========================================================================

// ---- Vulnerability 1: Clear-text logging of sensitive info ----
// CWE-532: Information Exposure Through Log Files
app.post('/debug-login', (req, res) => {
  const user = req.body.user || 'unknown';
  const password = req.body.password || 'N/A';
  console.log(`Login attempt: user=${user}, password=${password}`);  // VULN: Logs password in clear text
  res.json({ ok: true, message: 'Login attempt logged' });
});

// ---- Vulnerability 2: CORS misconfiguration ----
// CWE-346: Origin Validation Error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');           // VULN: Allows any origin
  res.setHeader('Access-Control-Allow-Credentials', 'true');   // VULN: Credentials with wildcard origin
  next();
});

// ---- Vulnerability 3: Disabling TLS certificate validation ----
// CWE-295: Improper Certificate Validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  // VULN: Disables TLS verification

// ---- Vulnerability 4: Command Injection ----
// CWE-78: OS Command Injection
app.get('/ping', (req, res) => {
  const host = req.query.host || '127.0.0.1';
  exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {  // VULN: Unsanitized user input in command
    if (err) return res.status(400).send(stderr);
    res.type('text/plain').send(stdout);
  });
});

// ---- Vulnerability 5: SQL Injection ----
// CWE-89: SQL Injection
app.get('/users', async (req, res) => {
  const id = req.query.id || '1';
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db'
  });
  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM users WHERE id = ${id};`); // VULN: String concatenation in SQL
    res.json(result.rows || []);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.end().catch(() => {});
  }
});

// ---- Safe endpoint for health check ----
app.get('/', (_req, res) => {
  res.json({ 
    ok: true, 
    message: 'CodeQL Demo Application',
    endpoints: {
      '/': 'Health check',
      '/debug-login': 'POST - Demonstrates clear-text password logging',
      '/ping?host=<host>': 'GET - Demonstrates command injection',
      '/users?id=<id>': 'GET - Demonstrates SQL injection'
    }
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`CodeQL Demo App listening on port ${PORT}`);
  console.log(`WARNING: This application contains intentional security vulnerabilities for demonstration purposes only!`);
});

// Export for testing
export { app, server };
