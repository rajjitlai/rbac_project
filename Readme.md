# Dynamic RBAC System with Multi-App Integration

## 📘 Introduction

This project implements a **Dynamic Role-Based Access Control (RBAC) System** that provides authentication and fine-grained access control. It supports integration with multiple applications—in this case, a **Shopping App** and a **Todo App**—and was developed over a 4-day period as part of a technical assessment.

---

## 📑 Table of Contents

* [Introduction](#-introduction)
* [Technology Stack](#-technology-stack)
* [Features](#-features)

  * [Authentication](#authentication)
  * [Role & Permission Management](#role--permission-management)
  * [Access Control](#access-control)
  * [Shopping App Endpoints](#shopping-app-endpoints)
  * [Todo App Endpoints](#todo-app-endpoints)
  * [Bonus Features](#bonus-features)
* [Project Structure](#-project-structure)
* [Setup Instructions](#-setup-instructions)

  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
  * [Docker Setup (Optional)](#docker-setup-optional)
* [API Testing](#-api-testing)
* [Database Schema](#-database-schema)
* [Evaluation Criteria](#-evaluation-criteria)
* [Contributors](#-contributors)
* [License](#-license)

---

## 🛠️ Technology Stack

* **Frontend**: React.js + Tailwind CSS (Vite)
* **Backend**: Node.js + Express.js
* **Database**: SQLite (managed via Sequelize ORM)
* **Authentication**: JSON Web Tokens (JWT)

---

## 🚀 Features

### Authentication

* `POST /register`: Register new users.
* `POST /login`: Authenticate and issue JWT tokens.

### Role & Permission Management

* `POST /roles`: Create new roles.
* `POST /permissions`: Create permissions (e.g., `todo:create`, `product:delete`).
* `POST /assign-role`: Assign a role to a user.
* `POST /assign-permission`: Assign permissions to a role.

### Access Control

Implemented via Express middleware:

* Decodes JWT to identify user.
* Fetches assigned roles and permissions.
* Verifies permission for each route.

### Shopping App Endpoints

* `GET /products`: Public access.
* `POST /products`: Requires `product:create`.
* `POST /cart`: Requires `cart:modify`.
* `POST /checkout`: Requires `checkout:perform`.

### Todo App Endpoints

* `POST /todos`: Requires `todo:create`.
* `GET /todos`: Requires `todo:read`.
* `PUT /todos/:id`: Requires `todo:update`.
* `DELETE /todos/:id`: Requires `todo:delete`.

### Bonus Features

* Admin Panel (React + Tailwind CSS)
* Swagger/OpenAPI documentation
* Docker support

---

## 🧱 Project Structure

```
rbac_project/
├── auth/              # JWT auth logic
├── models/            # Sequelize models
├── routes/            # API routes
├── middleware/        # RBAC enforcement
├── db/                # SQLite config and setup
├── app.js             # Main app entry
├── frontend/          # React frontend (Vite)
├── postman_collection.json
└── README.md
```

---

## 🧰 Setup Instructions

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rajjitlai/rbac_project
   cd rbac_project
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Migrations and Seeders**

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

4. **Environment Setup**

   Create a `.env` file:

   ```env
   DB=./db/db_name
   JWT_SECRET=your-secret-key
   PORT=3000
   ```

5. **Initialize and Run Backend**

   ```bash
   node ./db/setup.js
   npm start
   ```

   Backend will run at: `http://localhost:3000`

---

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend**

   ```bash
   npm run dev
   ```

   Access at: `http://localhost:5173`

---

### Docker Setup (Optional)

1. **Build Docker Image**

   ```bash
   docker build -t rbac-system .
   ```

2. **Run Container**

   ```bash
   docker run -p 3000:3000 -p 5173:5173 -e JWT_SECRET=your-secret-key rbac-system
   ```

---

## 🧪 API Testing

* Import `postman_collection.json` into Postman.
* Access Swagger docs at: `http://localhost:3000/api-docs`

---

## 🗃️ Database Schema

Sequelize Models:

| Model      | Attributes                            |
| ---------- | ------------------------------------- |
| User       | `id`, `username`, `password`          |
| Role       | `id`, `name`                          |
| Permission | `id`, `name`                          |
| Todo       | `id`, `title`                         |
| Cart       | `id`, `userId`                        |
| CartItem   | `id`, `userId`, `productId`, `cartId` |
| Product    | `id`, `name`                          |

Sequelize associations manage relationships like `belongsTo`, `hasMany`, and `belongsToMany`.

---

## 📊 Evaluation Criteria

| Criteria            | Weight | Status                 |
| ------------------- | ------ | ---------------------- |
| API Functionality   | 30%    | ✅ Fully implemented    |
| RBAC Logic & Design | 25%    | ✅ Dynamic & reusable   |
| Code Quality        | 15%    | ✅ Clean & maintainable |
| API Usability       | 15%    | ✅ Postman tested       |
| Project Structure   | 10%    | ✅ Organized            |
| Bonus Features      | 5%     | ✅ Included             |

---

## 👥 Contributors

* [Rajjit Laishram](https://github.com/rajjitlai/)

---

## 📄 License

This project is licensed under the **MIT License**.

---
