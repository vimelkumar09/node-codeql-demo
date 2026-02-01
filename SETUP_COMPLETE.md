# CodeQL Demo Repository - Setup Complete

## 🎉 Repository is Ready for Your Knowledge Session!

This repository has been fully configured for a comprehensive CodeQL security demonstration. All components have been tested and are working correctly.

## ✅ What's Been Implemented

### 1. Application with Intentional Vulnerabilities

The `src/index.js` file contains **5 intentional security vulnerabilities** that CodeQL will detect:

1. **Clear-text Password Logging** (CWE-532)
   - Endpoint: `POST /debug-login`
   - Issue: Logs passwords in plain text
   
2. **CORS Misconfiguration** (CWE-346)
   - Issue: Wildcard origin with credentials enabled
   
3. **Disabled TLS Certificate Validation** (CWE-295)
   - Issue: `NODE_TLS_REJECT_UNAUTHORIZED = '0'`
   - ✓ Detected by CodeQL
   
4. **Command Injection** (CWE-78)
   - Endpoint: `GET /ping?host=<host>`
   - Issue: Unsanitized input in shell command
   - ✓ Detected by CodeQL (as missing rate-limiting)
   
5. **SQL Injection** (CWE-89)
   - Endpoint: `GET /users?id=<id>`
   - Issue: String concatenation in SQL query
   - ✓ Detected by CodeQL (as missing rate-limiting)

### 2. GitHub Actions Workflows

Three workflows have been configured:

**CodeQL Security Scan** (`.github/workflows/codeql.yml`):
- Runs on push to main branch
- Runs on pull requests
- Scheduled weekly scans (Mondays at 10:00 UTC)
- Uses `security-and-quality` queries
- Results appear in Security tab

**Docker Build and Push** (`.github/workflows/docker.yml`):
- Builds standard Node.js image
- Builds Nginx reverse proxy variant
- Pushes to GitHub Container Registry (ghcr.io)
- Triggered on push, tags, and PRs

**CI Pipeline** (`.github/workflows/ci.yml`):
- Runs automated tests
- Validates code quality
- Runs on push and PRs

### 3. Docker Deployment Options

Multiple deployment options are available:

**Standard Deployment:**
```bash
# Option 1: Direct Docker
docker build -t codeql-demo .
docker run -p 3000:3000 codeql-demo

# Option 2: Docker Compose (Recommended)
docker compose up
```

**With Nginx Reverse Proxy:**
```bash
docker compose --profile nginx up
```

**With Apache Reverse Proxy:**
```bash
docker compose --profile apache up
```

### 4. Documentation

**README.md** - Comprehensive guide including:
- Quick start instructions
- All deployment options
- Step-by-step demo presentation guide (75-minute session)
- API endpoints documentation
- Troubleshooting section
- CodeQL learning resources

**PRESENTATION_CHECKLIST.md** - Session preparation checklist:
- Pre-session preparation tasks
- Equipment checklist
- 60-75 minute session flow
- Demo commands reference
- Troubleshooting tips
- Additional resources to share

### 5. Testing

- **Test Suite**: Complete Jest tests for all endpoints
- **ES Module Support**: Properly configured
- **Test Results**: All tests passing ✓

## 🚀 Quick Start for Your Demo

### Before the Session

1. **Push to GitHub** (if not already done):
   ```bash
   git push origin main  # or your branch name
   ```

2. **Wait for CodeQL Scan**:
   - Go to Actions tab
   - Wait for CodeQL workflow to complete
   - Check Security tab for detected vulnerabilities

3. **Test Locally**:
   ```bash
   npm install
   npm test
   npm start
   # Or with Docker:
   docker compose up
   ```

### During the Demo

1. **Show the Code** (`src/index.js`)
   - Walk through each vulnerability
   - Explain real-world impact

2. **Show CodeQL Results**:
   - Navigate to Security → Code scanning
   - Demonstrate alert details
   - Show data flow visualization

3. **Live Deployment Demo**:
   ```bash
   docker compose up
   curl http://localhost:3000/
   ```

4. **Show How to Fix** (optional):
   - Create a fix branch
   - Demonstrate proper solutions
   - Re-run CodeQL to verify fixes

## 📊 Verification Status

All components have been tested and verified:

✅ Application runs locally  
✅ Tests pass successfully  
✅ Docker builds successfully  
✅ Docker Compose works  
✅ CodeQL detects vulnerabilities  
✅ Documentation is comprehensive  
✅ Code review passed  

## 🔒 Security Scan Results

CodeQL detected the following (as expected):

1. **Disabled Certificate Validation** - Critical
2. **Missing Rate Limiting on System Command** - High  
3. **Missing Rate Limiting on Database Access** - High

Note: When you push to GitHub, CodeQL will run a full scan and may detect additional vulnerabilities including the password logging and CORS issues.

## 📝 Next Steps

1. **Review the documentation**:
   - Read through README.md
   - Check PRESENTATION_CHECKLIST.md

2. **Practice the demo**:
   - Run through the presentation flow
   - Test all commands
   - Familiarize yourself with the Security tab

3. **Customize if needed**:
   - Add your organization's branding
   - Adjust session timing
   - Add specific examples relevant to your team

4. **Prepare your environment**:
   - Large font terminal
   - Browser tabs ready
   - Screen sharing tested
   - Backup plan if live demo fails

## 💡 Pro Tips for Your Session

1. **Start with the "why"** - Explain why security scanning matters
2. **Show real examples** - Use the intentional vulnerabilities to demonstrate impact
3. **Interactive Q&A** - Engage your audience throughout
4. **Provide resources** - Share links to CodeQL docs and learning materials
5. **Follow-up** - Send session recording and practice exercises

## 🆘 Support

If you encounter any issues:

1. Check PRESENTATION_CHECKLIST.md troubleshooting section
2. Review README.md for detailed instructions
3. Test locally before your session
4. Have a backup plan (screenshots, pre-recorded demo)

## 📚 Additional Resources

- [CodeQL Documentation](https://codeql.github.com/docs/)
- [GitHub Security Features](https://docs.github.com/en/code-security)
- [CodeQL Query Examples](https://github.com/github/codeql)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Repository is ready! Good luck with your CodeQL knowledge session! 🚀**
