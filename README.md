# Fan Meet & Greet Manager

A comprehensive web application for managing fan meet and greet events for musicians and artists. This platform helps organize, schedule, and track fan interactions for both in-person and virtual events.

## 🌟 Features

### For Artists & Managers
- Create customizable meet & greet events with different access tiers
- Manage time slots and schedules
- Send mass communications to registered fans
- Access attendee information for personalized interactions
- View analytics and reports on event performance

### For Fans
- Register for meet & greets with favorite artists
- Receive digital tickets and calendar reminders
- Select specific time slots based on availability
- Pre-order merchandise for signing
- Join virtual events from anywhere in the world
- Track past and upcoming meet & greet experiences

### For Event Staff
- Check in attendees using mobile scanning
- Manage virtual waiting rooms
- Track attendance and handle issues in real-time
- Add notes to fan profiles for improved personalization

## 🛠️ Technology Stack

### Frontend
- React.js with TypeScript
- Material-UI for consistent design
- Redux Toolkit for state management
- Socket.io for real-time updates
- FullCalendar for scheduling interface
- Mobile-responsive design for all devices

### Backend
- Node.js with Express
- RESTful API with OpenAPI specification
- JWT authentication with refresh token rotation
- Prisma ORM for database queries
- Email and SMS notification services

### Database & Infrastructure
- PostgreSQL for relational data
- Redis for caching and performance
- AWS cloud infrastructure
- Docker containerization
- CI/CD with GitHub Actions

## 📋 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL
- Redis

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/fan-meet-greet-manager-2025.git
cd fan-meet-greet-manager-2025
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Configure environment variables
```bash
# Copy sample env files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit the .env files with your configuration
```

4. Set up the database
```bash
cd server
npm run db:migrate
npm run db:seed # Optional: adds sample data
```

5. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend development server
cd ../client
npm start
```

6. Access the application at `http://localhost:3000`

## 🚀 Deployment

This application can be deployed using Docker and our provided configuration files.

```bash
# Build and start all services
docker-compose up -d
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📱 Mobile Responsiveness

The application is designed to work on all device sizes, from mobile phones to desktop computers, ensuring fans can access meet & greet events from any device.

## 🔒 Security Features

- JWT-based authentication with short expiration and rotation
- HTTPS enforcement
- CSRF protection
- Input validation and sanitization
- Rate limiting to prevent abuse
- Secure password hashing with bcrypt
- Role-based access control
- Regular security audits

## 🌐 Integration Options

The platform is designed to integrate with common music industry tools:
- Spotify (for artist verification)
- Bandcamp (for merchandise)
- Zoom & Twilio (for virtual events)
- Calendar services (Google, Apple, Outlook)
- Payment processors (Stripe)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.