# Library Management System

A library management system backend built with NestJS, Prisma ORM and PostgreSQL.

## Technology Stack

- NestJS
- TypeScript
- Prisma ORM 6
- PostgreSQL hosted on Neon

## Database Setup

Navigate to the API directory:

```bash
cd api
npm install
```

Create your `.env` file using `.env.example` as a template.

Configure:
- `DATABASE_URL` for the application database connection.
- `DIRECT_URL` for Prisma migrations.

Never commit real database credentials.

## Database Models

The database contains three main models:

- **User:** Stores user information, including name, email, password hash and role.
- **Genre:** Stores book categories and their descriptions.
- **Book:** Stores book information and references its genre.

The `Role` enum defines two user roles: `PATRON` and `LIBRARIAN`.

## Schema Decisions

The Book model references Genre through a `genreId` foreign key instead of embedding genre information directly inside each book.

This relational approach avoids duplicating genre information across multiple books. A genre can be associated with many books, while each book references one genre.

The `@relation` attribute in Prisma explicitly defines this relationship. The foreign key also maintains referential integrity, ensuring that a book references an existing genre.

User roles are implemented using a Prisma enum to restrict users to the supported roles.

## Migrations

Create and apply a development migration:

```bash
npm run db:migrate -- --name init
```

Check migration status:

```bash
npm run db:status
```

Deploy existing migrations:

```bash
npm run db:deploy
```

## Database Seeding

Insert sample genres and books:

```bash
npm run db:seed
```

The seed script creates four genres and sixteen sample books distributed across those genres. It uses upsert operations to avoid duplicating existing records when executed again.

## Prisma Studio

Open the database GUI:

```bash
npm run db:studio
```

## Prisma vs Document Databases

One difference I noticed is how relationships are modeled. In Prisma with PostgreSQL, relationships are explicitly defined using foreign keys and relation attributes. In a document database, related information can instead be embedded inside a document. Prisma's relational approach makes data consistency and relationships easier to manage through database constraints.
