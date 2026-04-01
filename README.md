# Finance Dashboard API

A robust backend service for managing financial records and dashboard analytics, built with a focus on type safety, validation, and role-based access control.

## Architecture & Tech Stack

* Framework: Node.js with Express
* Language: TypeScript (Strict mode)
* ORM: Prisma
* Database: SQLite
* Validation: Zod
* Authentication: JWT & Bcrypt
* Documentation: Swagger / OpenAPI

## Setup Instructions

1. Install Dependencies
```bash
npm install
```
2. Environment Variables
Create a .env file in the root directory:
```
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secure_jwt_secret"
```
3. Database Initialization
```bash
npx prisma db push
```
4. Start the server
```bash
npm run dev
```
## API Documentation
The API is fully documented using Swagger UI. Once the server is running, navigate to:
```
http://localhost:3000/api-docs
```

## Core Features
Strict Input Validation: All incoming requests are parsed and validated against Zod schemas.

Role-Based Access Control (RBAC): Middleware enforces permissions. Viewers cannot modify data; Analysts have read-only access; Admins have full control.

Aggregation Endpoints: Dashboard summaries are calculated efficiently at the database level using Prisma aggregations.

