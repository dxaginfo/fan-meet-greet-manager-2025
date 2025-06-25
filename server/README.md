# Fan Meet & Greet Manager - Backend

This is the Node.js/Express backend for the Fan Meet & Greet Manager application. It provides RESTful APIs and services for managing fan meet and greet events.

## Features

- User authentication and authorization
- Event management APIs
- Ticket generation and validation
- Notification services (email and SMS)
- Payment processing integration
- Real-time communication
- Analytics and reporting

## Technology Stack

- Node.js with Express
- PostgreSQL with Prisma ORM
- Redis for caching and pub/sub
- JWT authentication
- Joi for validation
- Nodemailer for email notifications
- Twilio for SMS notifications
- Socket.io for real-time features
- Jest for testing

## Development

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env file with your configuration
```

3. Run database migrations:
```bash
npm run db:migrate
```

4. Start the development server:
```bash
npm run dev
```

5. Run tests:
```bash
npm test
```

## API Documentation

When running the server, API documentation is available at:
- Swagger UI: http://localhost:8000/api-docs
- OpenAPI JSON: http://localhost:8000/api-docs.json

## Database

We use PostgreSQL with Prisma ORM. The database schema is defined in `prisma/schema.prisma`.

To update the database schema:
1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate-dev -- --name your_migration_name`