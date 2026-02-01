# CodeQL Security Demo

A demonstration repository showcasing GitHub's CodeQL security scanning capabilities with intentional vulnerabilities for educational purposes.

## ⚠️ WARNING
**This application contains intentional security vulnerabilities for demonstration purposes only. DO NOT use this code in production environments!**

## 🎯 Purpose

This repository is designed to help teams learn about:
- GitHub CodeQL security scanning
- Common security vulnerabilities in Node.js applications
- How to identify and fix security issues
- Docker containerization with reverse proxy configurations

## 🔍 Intentional Vulnerabilities Included

This demo application contains the following security issues that CodeQL will detect:

1. **Clear-text Password Logging (CWE-532)**
   - Endpoint: `POST /debug-login`
   - Issue: Logs passwords in plain text

2. **CORS Misconfiguration (CWE-346)**
   - Issue: Allows credentials with wildcard origin

3. **TLS Certificate Validation Disabled (CWE-295)**
   - Issue: Disables TLS certificate verification globally

4. **Command Injection (CWE-78)**
   - Endpoint: `GET /ping?host=<host>`
   - Issue: Unsanitized user input in shell commands

5. **SQL Injection (CWE-89)**
   - Endpoint: `GET /users?id=<id>`
   - Issue: String concatenation in SQL queries

## 🚀 Quick Start

### Running Locally

```bash
# Install dependencies
npm install

# Run the application
npm start

# Run tests
npm test
```

The application will be available at `http://localhost:3000`

### Docker Deployment Options

#### Option 1: Standard Node.js Container

```bash
# Build the image
docker build -t codeql-demo .

# Run the container
docker run -p 3000:3000 codeql-demo
```

#### Option 2: With Nginx Reverse Proxy

```bash
# Build the Nginx variant
docker build -f Dockerfile.nginx -t codeql-demo-nginx .

# Run the container
docker run -p 3000:3000 codeql-demo-nginx
```

#### Option 3: With Apache Reverse Proxy

```bash
# Build the Apache variant
docker build -f Dockerfile.apache -t codeql-demo-apache .

# Run the container
docker run -p 3000:3000 codeql-demo-apache
```

## 📋 API Endpoints

- `GET /` - Health check and endpoint listing
- `POST /debug-login` - Demonstrates password logging vulnerability
- `GET /ping?host=<host>` - Demonstrates command injection vulnerability
- `GET /users?id=<id>` - Demonstrates SQL injection vulnerability

### Example Requests

```bash
# Health check
curl http://localhost:3000/

# Test password logging (vulnerable)
curl -X POST http://localhost:3000/debug-login \
  -H "Content-Type: application/json" \
  -d '{"user":"admin","password":"secret123"}'

# Test command injection (vulnerable)
curl http://localhost:3000/ping?host=127.0.0.1

# Test SQL injection (vulnerable - will fail without database)
curl http://localhost:3000/users?id=1
```

## 🔧 GitHub Actions Workflows

### 1. CodeQL Security Scan (`.github/workflows/codeql.yml`)

Automatically scans the code for security vulnerabilities:
- Runs on push to main branch
- Runs on pull requests
- Scheduled weekly scans
- Results appear in the Security tab

### 2. Docker Build and Push (`.github/workflows/docker.yml`)

Builds and publishes Docker images:
- Standard Node.js variant
- Nginx reverse proxy variant
- Pushes to GitHub Container Registry (ghcr.io)

### 3. CI Pipeline (`.github/workflows/ci.yml`)

Runs automated tests:
- Installs dependencies
- Executes test suite
- Validates code quality

## 📚 Using This for Training

### Presenting CodeQL Demo

1. **Show the vulnerabilities in code**
   - Walk through `src/index.js`
   - Explain each vulnerability type

2. **Run CodeQL scan**
   - Push code to trigger workflow
   - Show results in Security tab
   - Explain alerts and severity levels

3. **Demonstrate fixes**
   - Create a branch with fixes
   - Show how CodeQL validates the fixes
   - Compare before/after security posture

4. **Docker deployment**
   - Show different deployment options
   - Explain reverse proxy benefits
   - Demonstrate running containers

### CodeQL Learning Resources

- [CodeQL Documentation](https://codeql.github.com/docs/)
- [GitHub Code Scanning](https://docs.github.com/en/code-security/code-scanning)
- [Security Best Practices](https://docs.github.com/en/code-security)

## 🛠️ Development

### Project Structure

```
.
├── src/
│   └── index.js          # Main application with vulnerabilities
├── test/
│   └── app.test.js       # Test suite
├── .github/
│   └── workflows/
│       ├── codeql.yml    # CodeQL security scanning
│       ├── docker.yml    # Docker build and push
│       └── ci.yml        # Continuous integration
├── Dockerfile            # Standard Node.js container
├── Dockerfile.nginx      # Nginx reverse proxy variant
├── Dockerfile.apache     # Apache reverse proxy variant
├── package.json          # Node.js dependencies
└── README.md            # This file
```

### Technologies Used

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Testing**: Jest + Supertest
- **Database Client**: PostgreSQL (pg)
- **Containerization**: Docker
- **Reverse Proxies**: Nginx, Apache
- **Security Scanning**: GitHub CodeQL

## 🔒 Security Notes

### For Demonstration Only

- These vulnerabilities are intentional
- Do not deploy this application in production
- Use only in controlled environments
- Always follow security best practices in real applications

### How to Fix These Vulnerabilities

1. **Password Logging**: Never log sensitive data; use sanitized logging
2. **CORS**: Configure specific origins; avoid wildcard with credentials
3. **TLS Validation**: Never disable certificate validation
4. **Command Injection**: Use parameterized commands or input validation
5. **SQL Injection**: Use parameterized queries or ORM

## 📝 License

This is a demonstration project for educational purposes.

## 🤝 Contributing

This is a demo repository. Feel free to fork and modify for your own training sessions.

## ⚡ Troubleshooting

### Docker Build Issues

If you encounter issues building Docker images:

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t codeql-demo .
```

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
docker run -p 8080:3000 codeql-demo

# Or find and stop the process using port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
```

### Tests Failing

Ensure all dependencies are installed:

```bash
rm -rf node_modules package-lock.json
npm install
npm test
```

## 📞 Support

For questions about CodeQL or GitHub Security features:
- [GitHub Security Documentation](https://docs.github.com/en/code-security)
- [GitHub Community Forum](https://github.community/)
- [CodeQL Discussions](https://github.com/github/codeql/discussions)