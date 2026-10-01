# CI Failure Diagnosis

## 1. Assertion failure: currency formatter

- **Step:** `Run tests` (`src/utils/formatCurrency.test.js:5`)
- **Exact error:** `expect(received).toBe(expected) // Object.is equality`
- **Cause:** `formatCurrency` returns a new object. `toBe` checks object identity, so an independently created object can never match it. The function is correct; the test must use `toEqual` for structural equality.

## 2. Assertion failure: discount calculation

- **Step:** `Run tests` (`src/payments/calculateDiscount.test.js:8`)
- **Exact error:** `Expected: 100` and `Received: 90`
- **Cause:** `calculateDiscount(100, 10)` correctly subtracts 10 percent and returns 90. The test expected the undiscounted price, so the assertion was wrong and was changed to expect 90.

## 3. Dependency installation failure

- **Step:** `Install dependencies`
- **Exact error:** `npm ci can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync.` followed by `Missing: lodash@4.18.1 from lock file`
- **Cause:** `package.json` declares `lodash`, but the lockfile root metadata did not include that dependency or its package entry. `npm install` regenerated the lockfile, and the workflow now uses `npm ci` so installs are reproducible.

## 4. Workflow sequencing/configuration failure

- **Step:** `Run tests`
- **Exact error:** `'jest' is not recognized as an internal or external command, operable program or batch file.`
- **Cause:** The `test` job had no `needs: install`, checkout, setup-node, or dependency-install step. GitHub-hosted jobs run on separate fresh machines; dependencies installed by `install` are not automatically available to `test`. The workflow now declares the dependency and prepares the test runner explicitly.

## Fix classification

- The two test failures are **Type 1: assertion failures**.
- The lockfile mismatch is **Type 2: dependency configuration**.
- The missing job dependency and runner setup are **Type 3: workflow configuration**.
