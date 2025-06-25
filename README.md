# Fan Meet & Greet Manager

A comprehensive web application for managing fan meet and greet events in the music industry. This platform helps artists, managers, and event staff organize, schedule, and execute successful fan interactions.

## Features

- **Event Creation & Management**: Create, edit, and manage meet & greet events with customizable time slots
- **Fan Registration**: Allow fans to register and purchase tickets for meet & greet events
- **Check-in System**: Mobile-friendly check-in process with QR code scanning
- **Virtual Meetings**: Support for both in-person and virtual meet & greet sessions
- **Merchandise Management**: Pre-order and on-site merchandise sales tracking
- **Schedule Management**: Organize time slots and manage attendee flow
- **Notification System**: Automated reminders and updates for fans and staff
- **Analytics Dashboard**: Track event performance, attendance, and revenue

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with Prisma ORM
- JWT Authentication
- RESTful API design
- WebSocket for real-time features

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- React Query for data fetching
- Material-UI components
- Responsive design
- PWA capabilities

### DevOps
- Docker for containerization
- GitHub Actions for CI/CD
- AWS deployment

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/fan-meet-greet-manager-2025.git
cd fan-meet-greet-manager-2025
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure environment variables
```bash
# Server environment
cd server
cp .env.example .env
# Edit .env with your database credentials and other settings

# Client environment
cd ../client
cp .env.example .env
# Edit .env with your API URL and other settings
```

4. Set up the database
```bash
cd server
npx prisma migrate dev
```

5. Start development servers
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm start
```

6. Access the application
- Backend API: http://localhost:8000
- Frontend: http://localhost:3000

## Deployment

### Docker Deployment
1. Build the Docker images
```bash
docker compose build
```

2. Start the containers
```bash
docker compose up -d
```

### Manual Deployment
1. Build the client
```bash
cd client
npm run build
```

2. Set up production environment for the server
```bash
cd server
npm run build
```

3. Start the production server
```bash
npm start
```

## API Documentation

API documentation is available at `/api/docs` when the server is running. It includes detailed information about all endpoints, request/response formats, and authentication requirements.

## Mobile Responsiveness

The application is designed to work on all device sizes, from mobile phones to desktop computers, ensuring fans can access meet & greet events from any device.

## Security Features

- JWT-based authentication with short expiration and rotation
- HTTPS enforcement
- CSRF protection
- Input validation and sanitization
- Rate limiting to prevent abuse
- Secure password hashing with bcrypt
- Role-based access control
- Regular security audits

## Integration Options

The platform is designed to integrate with common music industry tools:
- Spotify (for artist verification)
- Bandcamp (for merchandise)
- Zoom & Twilio (for virtual events)
- Calendar services (Google, Apple, Outlook)
- Payment processors (Stripe)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Contact

For questions or support, please contact dxag.info@gmail.com