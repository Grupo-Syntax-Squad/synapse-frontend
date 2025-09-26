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
src/
├── 📁 assets/                 # Static assets (images, icons, logos)
├── 📁 config/                 # Configuration files (WebSocket, API settings)
├── 📁 constants/              # Application constants (routes, permissions, formats)
├── 📁 dev/                    # Development utilities and debug components
├── 📁 interfaces/             # TypeScript type definitions and interfaces
│   ├── 📁 components/         # Component interface definitions
│   ├── 📁 constants/          # Constants type definitions
│   ├── 📁 contexts/           # Context interface definitions
│   ├── 📁 pages/              # Page component interfaces
│   ├── 📁 services/           # API service interfaces
│   └── 📁 utils/              # Utility function interfaces
├── 📁 pages/                  # Application pages and route components
│   ├── 📁 Home/               # Home dashboard with tabs and data tables
│   ├── 📁 Login/              # Authentication pages (login, register, reset)
│   └── 📄 NotFound.tsx        # 404 error page
├── 📁 routes/                 # Route definitions and navigation setup
├── 📁 shared/                 # Reusable components and shared functionality
│   ├── 📁 components/         # UI components (buttons, modals, forms, tables)
│   ├── 📁 context/            # Global state management (Auth, Notifications)
│   ├── 📁 services/           # API services and business logic
│   └── 📁 themes/             # SCSS styling and component themes
├── 📁 utils/                  # Utility functions and helpers
│   ├── 📁 Format/             # Data formatting utilities
│   ├── 📁 Style/              # Styling utilities
│   └── 📁 lib/                # Third-party library configurations
├── 📄 App.tsx                 # Root application component
├── 📄 main.tsx                # Application entry point
└── 📄 vite-env.d.ts           # Vite environment type declarations
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
