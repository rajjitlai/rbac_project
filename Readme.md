# Dynamic RBAC System with Multi-App Integration

## Project Overview

This project is a **Dynamic Role-Based Access Control (RBAC) System** with authentication and access control capabilities, designed to be reused across two mini-applications:

- **Shopping App**
- **Todo App**

The system was developed within a 4-day (96-hour) timeframe as part of an interview task. It meets all specified objectives, including user authentication, dynamic role and permission management, and middleware-based access control.

## Technology Stack

- **Frontend**: React.js with Tailwind CSS, built using Vite
- **Backend**: Node.js with Express, Sequelize (ORM) with SQLite
- **Authentication**: JWT-based authentication
- **Database**: SQLite (managed via Sequelize ORM)

## Features Implemented

### Authentication

- **POST /register**: Register new users
- **POST /login**: Authenticate users and return a JWT token

### Role & Permission Management

- **POST /roles**: Create new roles
- **POST /permissions**: Create new permissions (e.g., `todo:create`, `product:delete`)
- **POST /assign-role**: Assign a role to a user
- **POST /assign-permission**: Assign permissions to a role

### Access Control

- Middleware enforces permissions per endpoint by:
  - Identifying the user via JWT token
  - Fetching assigned roles and permissions
  - Checking if the current action is allowed

### Shopping App Endpoints

- **GET /products**: Public access
- **POST /products**: Requires `product:create`
- **POST /cart**: Requires `cart:modify`
- **POST /checkout**: Requires `checkout:perform`

### Todo App Endpoints

- **POST /todos**: Requires `todo:create`
- **GET /todos**: Requires `todo:read`
- **PUT /todos/:id**: Requires `todo:update`
- **DELETE /todos/:id**: Requires `todo:delete`

### Bonus Features

- **Admin Panel/Basic UI**: Implemented using React.js and Tailwind CSS
- **Swagger/OpenAPI Documentation**: Included (see API testing section)
- **Docker Support**: Optional setup provided

## Project Structure

```
rbac_project/
|- auth/              # Authentication logic (JWT setup)
|- models/            # Sequelize models (User, Role, Permission, Todo, Cart, CartItem, Product)
|- routes/            # API routes for RBAC, Shopping, and Todo apps
|- middleware/        # Permission enforcement logic
|- db/                # Database connection and schema (SQLite)
|- app.js             # Main application file
|- frontend/          # React.js frontend with Vite and Tailwind CSS
|- README.md          # This file
|- postman_collection.json # API testing collection
```

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- Docker (optional for containerized setup)

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

3. **Set Up Database**
   - Ensure SQLite is installed.
   - The database schema is managed via Sequelize migrations. Run:

     ```bash
     npx sequelize-cli db:migrate
     ```

   - Seed the database (optional, adjust seeders as needed):

     ```bash
     npx sequelize-cli db:seed:all
     ```

4. **Configure Environment**
   - Create a `.env` file in the root directory with:

     ```
     DB=./db/db_name
     JWT_SECRET=your-secret-key
     PORT=3000
     ```

   - Adjust `JWT_SECRET` to a secure value. (we can get it from <https://jwt.io>)

5. **Run the Backend**

   Before running the backend, it is needed to setup the Database by running

   ```bash
   node ./db/setup.js
   ```

   Then run the backend:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd rbac_admin
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (default Vite port).

### Docker Setup (Optional)

1. Build the Docker image:

   ```bash
   docker build -t rbac-system .
   ```

2. Run the container:

   ```bash
   docker run -p 3000:3000 -p 5173:5173 -e JWT_SECRET=your-secret-key rbac-system
   ```

## API Testing

- Use the included `postman_collection.json` file to import into Postman.
- Alternatively, test with curl commands (examples in the collection).
- Swagger/OpenAPI documentation is available at `http://localhost:3000/api-docs` when the backend is running.

## Database Schema

The schema is defined using Sequelize ORM models:

- **User**: `id`, `username`, `password`
- **Role**: `id`, `name`
- **Permission**: `id`, `name`
- **Todo**: `id`, `title`
- **Cart**: `id`, `userId`
- **CartItem**: `id`, `userId`, `productId`, `cartId`
- **Product**: `id`, `name`

Relationships are managed via Sequelize associations (e.g., `belongsTo`, `hasMany`, `belongsToMany`).

## Evaluation Criteria

- **API Functionality**: 30% (Fully implemented)
- **RBAC Logic & Design**: 25% (Dynamic and reusable)
- **Code Quality**: 15% (Clean and maintainable)
- **API Usability/Test**: 15% (Tested with Postman)
- **Project Structure**: 10% (Follows suggested structure)
- **Bonus Features**: 5% (UI, Swagger, Docker support)

## Submission

- **Source Code**: Available in this repository
- **README**: This file
- **Database Schema**: Defined in `models/`
- **Working RBAC Middleware**: In `middleware/`
- **API Testing File**: `postman_collection.json`

## Contributors

- [Rajjit Laishram](https://github.com/rajjitlai/)

## License

MIT License
