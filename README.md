# 📝 Personal Notes App (Aplikasi Catatan Pribadi)

A modern, responsive, and feature-rich Single Page Application (SPA) for managing personal notes, built with **React**, **React Router v6**, and modern JavaScript standards.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-6.22.3-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.2.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)

---

## ✨ Key Features

- 📑 **Active & Archived Notes**: Organize your notes efficiently with separate views for active and archived items.
- 🔍 **Real-time URL Search**: Filter notes seamlessly with keyword matching that synchronizes dynamically with URL query parameters (`?keyword=...`).
- ✍️ **Rich Text Formatting**: Create and edit notes using HTML formatting powered by `contentEditable` and parsed safely via `html-react-parser`.
- ✏️ **Full CRUD Operations**: Create, read, update, archive/unarchive, and delete notes easily.
- 📱 **Clean Light UI**: Thoughtfully styled with CSS custom properties, responsive layout, glassmorphism headers, and interactive floating action buttons (FAB).
- 🧭 **SPA Routing & 404 Guard**: Instant navigation with zero full-page reloads and a custom 404 page for unknown routes.
- 🎨 **Iconography**: Clean UI powered by `react-icons` (HeroIcons & Remix Icons).

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool & Bundler**: Vite
- **Routing**: React Router DOM (v6)
- **Icons**: React Icons
- **Parser**: html-react-parser
- **Prop Validation**: PropTypes

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine (v16.0.0 or higher recommended).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/77ferdian/personal-notes-app.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd personal-notes-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173/` (or the port specified in terminal).

---

## 📁 Project Structure

```text
personal-notes-app/
├── public/                # Static public assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── NoteActionButton.jsx
│   │   ├── NoteItem.jsx
│   │   ├── NoteList.jsx
│   │   └── SearchBar.jsx
│   ├── pages/             # Route pages
│   │   ├── AddNotePage.jsx
│   │   ├── ArchivedPage.jsx
│   │   ├── DetailPage.jsx
│   │   ├── EditNotePage.jsx
│   │   ├── HomePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── styles/            # CSS styling system
│   │   └── style.css
│   ├── utils/             # Helper utilities & local data module
│   │   ├── index.js
│   │   └── local-data.js
│   ├── App.jsx            # Main app router setup
│   └── index.jsx          # Entry point
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
