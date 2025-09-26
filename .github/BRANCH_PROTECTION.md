# Branch Protection Rules

This repository should have the following protection rules configured on GitHub:

## Required Rules for `main` branch:

### ✅ Require status checks to pass before merging

- **CI / Build and Lint** ✓
- **PR Validation / lint-and-build (18.x)** ✓
- **PR Validation / lint-and-build (20.x)** ✓
- **Quality Gate** ✓

### ✅ Require branches to be up to date before merging

- Enabled ✓

### ✅ Require pull request reviews before merging

- Minimum number of reviewers: 1
- Dismiss stale PR approvals when new commits are pushed ✓
- Require review from code owners (if CODEOWNERS exists) ✓

### ✅ Require conversation resolution before merging

- Enabled ✓

### ✅ Restrict pushes that create files

- Do not allow files larger than 100MB ✓

## How to configure:

1. Go to **Settings** → **Branches** on GitHub
2. Click **Add rule** or edit existing rule for `main`
3. Configure the options above
4. Save changes

## Commands that will be executed on PRs:

- `npm ci` - Clean installation of dependencies
- `npm run check` - Lint verification (ESLint)
- `npm run build` - TypeScript + Vite build
- `npx tsc --noEmit` - TypeScript type checking
- `npm audit` - Security audit of dependencies

## Status Checks:

The following checks must pass to allow merge:

- ✅ **Lint Check**: Code must pass ESLint
- ✅ **Build Check**: Application must build without errors
- ✅ **Type Check**: TypeScript must compile without errors
- ✅ **Security Audit**: Dependencies must not have critical vulnerabilities
