# 🖥️ UI for Dynamic RBAC System with Multi-App Integration

## 📘 Overview

This project is the **frontend user interface** for a Dynamic Role-Based Access Control (RBAC) System supporting two mini-applications:

* 🛒 **Shopping App**: Browse products, manage cart, perform checkout
* ✅ **Todo App**: Create, view, update, and delete todo items

Built with **React.js**, styled using **Tailwind CSS**, and scaffolded with **Vite**, the UI integrates tightly with the backend API to provide **authentication** and **permission-based interface control**.

---

## 🧱 Technology Stack

| Category    | Tech Used                              |
| ----------- | -------------------------------------- |
| Framework   | React.js                               |
| Styling     | Tailwind CSS                           |
| Build Tool  | Vite                                   |
| API Backend | Node.js + Express (Sequelize + SQLite) |

---

## 🚀 Features

### 🛒 Shopping App UI

* Product selector for adding to cart
* Product creation interface
* Cart display with dynamic updates
* Checkout button with confirmation

### ✅ Todo App UI

* Form for creating todos
* List of existing todos
* Edit and delete functionality

### 🔐 General Features

* Fully responsive layout
* Real-time data via API
* Login and registration forms
* UI-level visibility control based on permissions (e.g., hide buttons for unauthorized users)

---

## 📁 Project Structure

```
rbac_admin/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level views
│   ├── assets/          # Static content
│   ├── App.jsx          # Root component
│   └── main.jsx         # Vite entry
├── public/              # Public assets
├── index.html           # Main HTML template
├── vite.config.js       # Vite build configuration
├── tailwind.config.js   # Tailwind theme setup
└── package.json         # Dependencies and scripts
```

---

## ⚙️ Setup Instructions

### 📦 Prerequisites

* Node.js (v14.x or newer)
* npm or yarn

### 💻 Local Development

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rajjitlai/rbac_project
   cd rbac_admin
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Backend URL**

   Ensure the backend server is running. Then, update `src/config.js` (if present):

   ```js
   export const API_BASE_URL = "http://localhost:3000";
   ```

4. **Run the Dev Server**

   ```bash
   npm run dev
   ```

   Open [`http://localhost:5173`](http://localhost:5173) in your browser.

---

## 🏗️ Build & Deploy

### 🛠 Build for Production

```bash
npm run build
```

### 🌐 Serve the Build

```bash
npm install -g serve
serve -s dist
```

### ☁️ Deployment Notes

* Host the `/dist` folder using platforms like **Netlify**, **Vercel**, or **GitHub Pages**
* Ensure CORS is enabled and the backend API is accessible at runtime

---

## 🔄 Backend Integration

* Interacts with RBAC backend endpoints (`/login`, `/products`, `/todos`, etc.)
* Uses JWT for authorization headers
* UI elements are conditionally rendered based on role/permission feedback from backend

---

## 🧪 Testing

* Manual testing through the browser UI
* Use browser dev tools to inspect API requests and test RBAC enforcement
* Ensure unauthorized elements (e.g., admin-only buttons) are hidden as expected

---

## 👥 Contributors

* [Rajjit Laishram](https://github.com/rajjitlai)

---

## 📄 License

This project is licensed under the **MIT License**.

