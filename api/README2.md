# Library Management System – Backend

## Week 2 Assignment

### Project Overview

The Library Management System is a backend application built with NestJS, PostgreSQL and Prisma ORM. It provides REST API endpoints for managing books, genres and user authentication.

The backend includes data validation, JWT authentication, password hashing and role-based access control.

### Technologies Used

- **NestJS** – Backend framework
- **TypeScript** – Programming language
- **PostgreSQL (Neon)** – Database
- **Prisma ORM** – Database management
- **JWT** – Authentication
- **bcrypt** – Password hashing
- **class-validator** – Request validation
- **Postman** – API testing

### Implemented Features

#### 1. Genre Management
- Create a genre.
- Retrieve all genres.
- Retrieve a genre by ID.
- Update a genre.
- Delete a genre.

#### 2. Book Management
- Create, retrieve, update and delete books.
- Filter books by genre.
- Search books by title or author.
- Paginate book results.
- Associate books with genres.
- Validate book data before processing requests.

#### 3. Authentication and Authorization
- User registration.
- User login.
- Password hashing using bcrypt.
- JWT token generation and verification.
- Role-based access control.
- Librarian-only access to create, update and delete books.

Newly registered users receive the `PATRON` role by default.

#### 4. Validation and Security
- Global validation using NestJS ValidationPipe.
- DTO validation using class-validator.
- JWT authentication guards.
- RolesGuard for librarian permissions.
- CORS configuration.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Log in |
| POST | `/genres` | Create a genre |
| GET | `/genres` | Retrieve all genres |
| GET | `/genres/:id` | Retrieve one genre |
| PATCH | `/genres/:id` | Update a genre |
| DELETE | `/genres/:id` | Delete a genre |
| POST | `/books` | Create a book (LIBRARIAN) |
| GET | `/books` | Retrieve books |
| GET | `/books/:id` | Retrieve one book |
| PATCH | `/books/:id` | Update a book (LIBRARIAN) |
| DELETE | `/books/:id` | Delete a book (LIBRARIAN) |

The books endpoint supports query parameters including `genreId`, `search`, `page` and `limit`.

### Getting Started

#### Prerequisites

- Node.js and npm
- PostgreSQL database
- Git

#### Installation

Navigate to the API directory:

```bash
cd api
```

Install dependencies:

```bash
npm install
```

Configure the environment variables in a `.env` file:

```env
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_secure_secret"
```

Do not commit your actual `.env` file or database credentials to GitHub.

#### Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

#### Start the Development Server

```bash
npm run start:dev
```

The API runs at:

```text
http://localhost:3000
```

### API Testing

A Postman collection is included in:

```text
docs/postman_collection.json
```

Import this file into Postman to access the saved API requests for authentication, genres and books.

### Project Structure

```text
api/
├── src/
│   ├── auth/
│   ├── books/
│   ├── genres/
│   ├── prisma/
│   ├── app.module.ts
│   └── main.ts
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── docs/
│   └── postman_collection.json
│
├── .env
├── package.json
└── README.md
```

### Assignment Status

**Week 2 – Backend Implementation**

The core backend requirements have been implemented, and the NestJS build and Postman collection JSON validation checks have passed.
