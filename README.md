### 🚀 Synapse Frontend

Welcome to your frontend application's repository, built with **React**, **TypeScript**, and **Vite**. This project provides a modern development environment with Hot Module Replacement (HMR) and pre-configured ESLint rules.

---

### ⚙️ How to Run the Project

Follow these steps to set up and run the application in your local environment.

1.  **Install dependencies:**
    Navigate to the project's root directory and run the command to install all necessary libraries and tools.

    ```bash
    npm install
    ```

2.  **Run the application:**
    Start the development server. The application will be available at `http://localhost:5173/` (or another available port).

    ```bash
    npm run dev
    ```

3.  **Build for production:**
    To generate an optimized version of the project for deployment, run the following command:

    ```bash
    npm run build
    ```

---

### ✅ Code Verification (`Linting`)

The project uses **ESLint** and **Commitlint** to ensure code quality and consistency.

- **To lint the code:**
  Run this command to start the linter. It will automatically check for and fix syntax or style errors.

  ```bash
  npm run check:fix
  ```

- **Automatic commit validation:**
  **Husky** is configured to automatically run **ESLint** and **Commitlint** before each commit. If the validation fails, the commit will be aborted. This helps keep the project's history clean and organized.

---

### 📂 Directory Structure

The project's architecture is designed to be modular and scalable.

```
.
├── 📁 assets/                 # Media files (images, icons, etc.)
├── 📁 pages/                  # Page components (navigation routes)
├── 📁 routes/                 # Application route definitions
├── 📁 shared/                 # Reusable components and functionalities
│   ├── 📁 components/         # Generic components (buttons, badges, layouts)
│   │   ├── 📁 common/         # Shared components
│   │   ├── 📁 interfaces/     # Type and interface definitions
│   │   └── 📁 layout/         # Layout components (headers, footers)
│   ├── 📁 context/            # Global application contexts
│   ├── 📁 hooks/              # Custom hooks
│   ├── 📁 services/           # Business logic and API calls
│   └── 📁 themes/             # Application styling (themes, colors, variables)
│       └── 📁 styles/
│           ├── 🎨 App.css     # Component styles
│           └── 🎨 index.css   # Global styles
├── 📄 App.tsx                 # Main component
├── 📄 main.tsx                # Application entry point
└── 📄 vite-env.d.ts           # Type declaration file for Vite
```

---

### ✍️ Commit Standard (`Commitlint`)

To maintain a clean and coherent Git history, the project follows the **Conventional Commits** standard. Commit messages must follow the format `type: #TASK_ID description`.

**Message structure:**

- `type`: Classifies the nature of the change.
- `#TASK_ID`: The task's identifier.
- `description`: A brief description of the change.

**Accepted commit types:**

- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation changes.
- `style`: Code formatting changes (CSS, etc.) without logic changes.
- `refactor`: Code refactoring without a change in behavior.
- `perf`: Performance improvement.
- `test`: Adding or correcting tests.
- `build`: Changes to the build system.
- `ci`: Changes to the CI/CD configuration.
- `chore`: Maintenance tasks that do not alter the source code.

**Examples of valid commits:**

```
fix: #123 fixes the login screen layout
feat: #456 adds a badge component
chore: #789 updates libraries
```
