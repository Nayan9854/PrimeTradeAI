# PrimeTradeAI Backend

Express.js REST API for task management with JWT authentication and MongoDB.

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update the variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetradeai
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:3000
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `POST /api/tasks` - Create task (protected)
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation with express-validator
- ✅ MongoDB injection prevention

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & validation
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.ts        # Main app
├── .env.example         # Environment template
└── package.json
```
