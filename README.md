# 📝 Personal Notes App v2 (Aplikasi Catatan Pribadi)

A modern, responsive, and secure Single Page Application (SPA) for managing personal notes with **React**, **React Router v7**, **React Context**, **Custom Hooks**, and the **Dicoding RESTful Notes API**.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-7.18.4-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.2.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Context API](https://img.shields.io/badge/React_Context-Theme_%26_Locale-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features & Rubric Highlights

### 🌟 Kriteria Utama (Core Criteria)
- **RESTful API Integration**: Powered directly by the Dicoding Notes API (`https://notes-api.dicoding.dev/v1`) for authentication, note listings, note creation, archiving/unarchiving, and deletion.
- **User Authentication**:
  - **Registration Page** with input validation for full name, email, password, and password confirmation.
  - **Login Page** with email and password inputs, show/hide password visibility toggle, and token storage in `localStorage`.
  - **User State Management**: Authenticated user profile (`name`, `email`, initial avatar) displayed on the app header with a one-click logout button.
- **Protected Routes & Auth Guard**:
  - Unauthenticated users can only access `/login` and `/register`. Attempting to access protected routes automatically redirects to `/login`.
  - Authenticated users cannot re-visit `/login` or `/register` (redirected to `/`).
  - Isolated resource access: only notes belonging to the authenticated account are displayed.
- **Theme Switcher (Dark / Light Mode)**:
  - Built with **React Context** (`ThemeContext`).
  - Persists preference in `localStorage` across page reloads.
  - Dynamically updates `data-theme` attribute on the root HTML element with a refined, high-contrast dark palette.
- **Custom React Hooks**:
  - Reusable custom hook `useInput` (`src/hooks/useInput.js`) for controlled form inputs across authentication pages.
  - Idiomatic functional components using modern React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`, `useSearchParams`, `useNavigate`, `useParams`).
- **All Previous Criteria Met**:
  - SPA navigation with React Router.
  - Multiple distinct pages: Active Notes (`/`), Archived Notes (`/archived`), Add Note (`/notes/new`), Note Detail (`/notes/:id`), and 404 Not Found (`*`).
  - Synchronized search bar that reflects keywords in URL query parameters (`?keyword=...`).
  - Add notes with character limit indicator.
  - Archive / unarchive and delete notes with confirmation prompts.

### 🎯 Kriteria Opsional (Optional Criteria)
- **Loading Indicators**:
  - Fullscreen branded loading screen while verifying stored credentials during app startup (`initializing`).
  - In-page loading spinners while fetching active notes, archived notes, and note details.
  - Button submission micro-spinners to prevent double-clicks during login, registration, and save actions.
- **Bilingual Language Switcher (Indonesian & English)**:
  - Seamless toggle button between **ID** (Bahasa Indonesia) and **EN** (English).
  - Built with **React Context** (`LocaleContext`) and stored in `localStorage` for persistence.
  - Complete dictionary covering all UI labels, placeholders, validation alerts, empty states, and dynamic date formatting (`showFormattedDate`).

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 18
- **Build Tool & Bundler**: Vite 4
- **Routing**: React Router DOM (v7)
- **State & Context Management**: React Context (`ThemeContext`, `LocaleContext`) + Custom Hooks (`useInput`)
- **Type Safety & Prop Validation**: `prop-types`
- **Iconography**: `react-icons` (HeroIcons, RemixIcons, MaterialDesignIcons, TablerIcons)
- **HTML Content Parser**: `html-react-parser`
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)

---

## 📂 Project Structure

```
personal-notes-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Top navigation with theme/locale/logout controls
│   │   ├── LoadingIndicator.jsx   # In-page loading spinner
│   │   ├── LoadingScreen.jsx      # Initial startup credential check screen
│   │   ├── NoteActionButton.jsx   # Standardized action buttons / FAB
│   │   ├── NoteItem.jsx           # Individual note card with date & badge
│   │   ├── NoteList.jsx           # Grid listing & empty state container
│   │   └── SearchBar.jsx          # Synchronized search input with clear button
│   ├── contexts/
│   │   ├── LocaleContext.jsx      # Context for ID / EN language localization
│   │   └── ThemeContext.jsx       # Context for Light / Dark theme switching
│   ├── hooks/
│   │   └── useInput.js            # Custom hook for controlled inputs
│   ├── pages/
│   │   ├── AddNotePage.jsx        # Create note with remaining char counter
│   │   ├── ArchivedPage.jsx       # List of archived notes with search
│   │   ├── DetailPage.jsx         # Full note view with archive & delete actions
│   │   ├── HomePage.jsx           # Active notes list with search & FAB
│   │   ├── LoginPage.jsx          # User login form with show/hide password
│   │   ├── NotFoundPage.jsx       # 404 error page
│   │   └── RegisterPage.jsx       # User registration form with confirmation
│   ├── styles/
│   │   └── style.css              # Custom design system with light/dark tokens
│   ├── utils/
│   │   ├── index.js               # Date formatting helper with locale support
│   │   ├── locale-data.js         # Complete translation dictionary (ID & EN)
│   │   └── network-data.js        # Dicoding REST API communication helper
│   ├── App.jsx                    # Root app routing and authentication logic
│   └── index.jsx                  # Application entry point with providers
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine (v16.0.0 or higher recommended).

### Installation & Development

1. **Navigate to the project directory**
   ```bash
   cd personal-notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` (or the port specified in terminal).

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📝 License

Distributed under the MIT License.
