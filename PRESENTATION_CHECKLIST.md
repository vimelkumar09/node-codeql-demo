# CodeQL Knowledge Session - Presentation Checklist

## Pre-Session Preparation

- [ ] Ensure repository is pushed to GitHub
- [ ] Verify CodeQL workflow has run at least once
- [ ] Test Docker setup locally
- [ ] Prepare slides/talking points on CodeQL basics
- [ ] Have terminal windows ready
- [ ] Test screen sharing setup

## Equipment Check

- [ ] Projector/screen sharing working
- [ ] Terminal with large, readable font
- [ ] Browser tabs prepared:
  - [ ] GitHub repository
  - [ ] Actions tab
  - [ ] Security tab (Code scanning)
  - [ ] CodeQL documentation
- [ ] Code editor with `src/index.js` open
- [ ] Docker Desktop running (if doing live demo)

## Session Flow (60-75 minutes)

### Part 1: Introduction (10 minutes)

- [ ] Welcome and session objectives
- [ ] What is CodeQL? (5 min)
  - Semantic code analysis
  - Query language for code
  - Part of GitHub Advanced Security
- [ ] Why automated security scanning matters (5 min)
  - Shift-left security
  - Find vulnerabilities early
  - Reduce security debt

### Part 2: Vulnerability Overview (15 minutes)

- [ ] Open `src/index.js` in editor
- [ ] Walk through each vulnerability:
  - [ ] Clear-text password logging (CWE-532)
  - [ ] CORS misconfiguration (CWE-346)
  - [ ] Disabled TLS validation (CWE-295)
  - [ ] Command injection (CWE-78)
  - [ ] SQL injection (CWE-89)
- [ ] Explain real-world impact of each
- [ ] Show how common these patterns are

### Part 3: CodeQL Workflow (10 minutes)

- [ ] Open `.github/workflows/codeql.yml`
- [ ] Explain workflow configuration:
  - [ ] Triggers (push, PR, schedule)
  - [ ] Language matrix
  - [ ] Security queries
- [ ] Show GitHub Actions tab
- [ ] Walk through a workflow run

### Part 4: Security Alerts (15 minutes)

- [ ] Navigate to Security > Code scanning
- [ ] Show list of alerts
- [ ] Select one alert and demonstrate:
  - [ ] Severity level
  - [ ] Vulnerability description
  - [ ] Data flow visualization
  - [ ] Affected code snippet
  - [ ] Recommended fix
  - [ ] CWE/CVE references
- [ ] Explain how to triage alerts
- [ ] Show how to dismiss false positives

### Part 5: Docker Deployment (10 minutes)

- [ ] Explain deployment options
- [ ] Live demo:
  ```bash
  # Standard deployment
  docker-compose up
  
  # Test the app
  curl http://localhost:3000/
  
  # With Nginx
  docker-compose --profile nginx up
  ```
- [ ] Show reverse proxy benefits
- [ ] Demonstrate vulnerable endpoints (optional)

### Part 6: Fixing Vulnerabilities (10 minutes)

- [ ] Create a new branch for fixes
- [ ] Pick 2-3 vulnerabilities to fix live:
  - [ ] Remove password from logs
  - [ ] Fix SQL injection with parameterized query
  - [ ] Fix command injection with execFile
- [ ] Commit and push changes
- [ ] Show CodeQL running on the new branch
- [ ] Compare results

### Part 7: Q&A and Best Practices (10 minutes)

- [ ] Answer questions
- [ ] Discuss best practices:
  - [ ] Enable CodeQL on all repositories
  - [ ] Review alerts regularly
  - [ ] Fix critical/high severity first
  - [ ] Don't disable security checks
  - [ ] Use dependency scanning too
- [ ] Share additional resources

## Post-Session

- [ ] Share repository link with attendees
- [ ] Share CodeQL documentation links
- [ ] Provide example fix branch
- [ ] Send follow-up email with:
  - [ ] Session recording (if available)
  - [ ] Additional resources
  - [ ] Practice exercises
  - [ ] Contact for questions

## Demo Commands Reference

### Application Testing
```bash
# Install and run locally
npm install
npm test
npm start

# Test endpoints
curl http://localhost:3000/
curl -X POST http://localhost:3000/debug-login \
  -H "Content-Type: application/json" \
  -d '{"user":"admin","password":"secret123"}'
curl "http://localhost:3000/ping?host=127.0.0.1"
```

### Docker Commands
```bash
# Standard deployment
docker-compose up

# With Nginx
docker-compose --profile nginx up

# With Apache
docker-compose --profile apache up

# Manual Docker build
docker build -t codeql-demo .
docker run -p 3000:3000 codeql-demo

# Clean up
docker-compose down
docker system prune -f
```

### Git Commands
```bash
# Create fix branch
git checkout -b fix/security-vulnerabilities

# Push changes
git add .
git commit -m "Fix security vulnerabilities"
git push origin fix/security-vulnerabilities

# View logs
git log --oneline
git diff HEAD~1
```

## Troubleshooting

### If CodeQL workflow fails:
- Check Actions tab for error details
- Ensure workflow file syntax is correct
- Verify repository has Actions enabled

### If Docker build fails:
- Check Docker Desktop is running
- Clear Docker cache: `docker system prune -a`
- Rebuild without cache: `docker-compose build --no-cache`

### If app doesn't start:
- Check port 3000 is available: `lsof -i :3000`
- Verify Node.js version: `node --version` (should be 20+)
- Check logs: `docker-compose logs`

## Additional Resources to Share

1. **CodeQL Documentation**
   - https://codeql.github.com/docs/

2. **GitHub Security Features**
   - https://docs.github.com/en/code-security

3. **CodeQL Query Examples**
   - https://github.com/github/codeql

4. **OWASP Top 10**
   - https://owasp.org/www-project-top-ten/

5. **CWE Database**
   - https://cwe.mitre.org/

## Notes Section

Use this space for session-specific notes:

---

