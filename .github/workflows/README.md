# 🚀 GitHub Actions Workflows

This directory contains the automated CI/CD workflows for the Synapse project.

## 📋 Available Workflows

### 1. **CI** (`ci.yml`)

**Trigger**: Pull Requests and Push to `main`

Main and simplest workflow that executes:

- ✅ Lint check (`npm run check`)
- ✅ Application build (`npm run build`)
- ✅ TypeScript verification (`npx tsc --noEmit`)

### 2. **PR Validation** (`pr-validation.yml`)

**Trigger**: Pull Requests to `main` and `develop`

More complete workflow that includes:

- ✅ Test matrix (Node.js 18.x and 20.x)
- ✅ Dependencies and build artifacts cache
- ✅ Unused dependencies check
- ✅ Vulnerability audit
- ✅ Detailed PR information

### 3. **Code Quality** (`code-quality.yml`)

**Trigger**: Pull Requests (opened, synchronize, reopened) and Push to `main`

Focus on code quality:

- 🔍 **Quality Gate**: Lint, Type check, Build
- 🛡️ **Security Check**: Security audit, outdated packages
- 📝 **Commit Validation**: Commit message validation

## 🎯 Required Status Checks

For a PR to be merged, the following checks must pass:

| Check                              | Description               | Required |
| ---------------------------------- | ------------------------- | -------- |
| **CI / Build and Lint**            | Lint + Build + TypeCheck  | ✅       |
| **PR Validation / lint-and-build** | Node 18.x and 20.x Matrix | ✅       |
| **Quality Gate**                   | Quality verifications     | ✅       |

## 📦 Workflow Dependencies

The workflows use the following actions:

- `actions/checkout@v4` - Code checkout
- `actions/setup-node@v4` - Node.js setup with npm cache
- `actions/cache@v3` - Build artifacts cache
- `actions/upload-artifact@v4` - Artifacts upload
- `actions/github-script@v7` - Custom scripts

## 🔧 Executed Commands

### Main Validation

```bash
npm ci                    # Clean installation of dependencies
npm run check            # ESLint check
npm run build            # TypeScript + Vite build
npx tsc --noEmit         # Type check without emitting files
```

### Extra Validations

```bash
npm audit --audit-level moderate   # Security audit
npx depcheck                       # Unused dependencies
npm outdated                       # Outdated packages
npx commitlint                     # Commit validation
```

## ⚙️ Branch Protection Configuration

To enable required validations:

1. Go to **Settings** → **Branches** on GitHub
2. Add rule for the `main` branch
3. Enable **Require status checks to pass before merging**
4. Select the required checks listed above
5. Enable **Require branches to be up to date before merging**

## 🐛 Troubleshooting

### Build fails with dependency error

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### ESLint fails

```bash
# Run locally to see errors
npm run check

# For auto-fix (when possible)
npm run check:fix
```

### TypeScript fails

```bash
# Check type errors
npx tsc --noEmit

# Check configuration
cat tsconfig.json
```

## 📈 Metrics

The workflows collect the following metrics:

- ⏱️ Job execution time
- 📦 Build artifacts size
- 🔍 Number of vulnerabilities found
- 📊 Code coverage (when configured)

## 🔄 Updates

To update actions:

1. Check new versions on [GitHub Marketplace](https://github.com/marketplace?type=actions)
2. Update versions in `.yml` files
3. Test on separate branch before merging
