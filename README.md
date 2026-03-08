# Workout Workshop Frontend

A React-based workout management application built with Vite and Bootstrap.

## Team Project Setup

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd workoutworkshop-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:5173`

##  Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Cards, Forms, etc.)
├── pages/           # Page components organized by user type
│   ├── Shared/      # Pages accessible to all users (Home, About, login, etc.)
│   ├── Coach/       # Coach-specific pages (Workout Builder, Client Management, etc.)
│   └── Admin/       # Admin-only pages (Dashboard, User Management, etc.)
├── context/         # React Context for global state management
├── App.jsx          # Main app component with routing
└── main.jsx         # Entry point
```

## Team Workflow

### Working on Features

1. **Always pull latest changes before starting work:**
   ```bash
   git pull origin main
   ```

2. **Create a new branch for your feature:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and test them**

4. **Commit with clear messages:**
   ```bash
   git add .
   git commit -m "Add workout builder form component"
   ```

5. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** for team review

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

