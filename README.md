# PrimeTradeAI - Task Management Dashboard

A full-stack web application with authentication, user dashboard, and CRUD operations for task management. Built with Next.js, Express.js, and MongoDB.

## 📋 Project Overview

This project demonstrates a production-ready full-stack web application with:

- **Frontend**: Modern React-based UI with Next.js
- **Backend**: Lightweight REST API with Express.js
- **Database**: MongoDB for data persistence
- **Authentication**: JWT-based secure authentication
- **Security**: Password hashing, token validation, CORS protection

## ✨ Features

### Frontend
- ✅ User authentication (Signup/Login/Logout)
- ✅ Protected routes (dashboard accessible only to logged-in users)
- ✅ Responsive design with TailwindCSS
- ✅ Task CRUD operations (Create, Read, Update, Delete)
- ✅ Task search and filtering
- ✅ Task status tracking (Pending, In-Progress, Completed)
- ✅ Task priority levels (Low, Medium, High)
- ✅ User profile display

### Backend
- ✅ User registration with email validation
- ✅ Secure login with password hashing (bcryptjs)
- ✅ JWT token-based authentication
- ✅ RESTful API design
- ✅ Input validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ CORS support for frontend integration
- ✅ Security headers with Helmet

### Database
- ✅ User collection with email uniqueness
- ✅ Task collection with user associations
- ✅ Timestamps for all records
- ✅ Indexed queries for performance

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd primetradeai
```

#### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

#### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongodb://localhost:27017/primetradeai
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/primetradeai`
4. Update `MONGODB_URI` in backend `.env`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | No | Register new user |
| POST | `/auth/login` | No | Login user |
| GET | `/auth/profile` | Yes | Get user profile |

### Task Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/tasks` | Yes | Create task |
| GET | `/tasks` | Yes | Get all tasks |
| GET | `/tasks/:id` | Yes | Get single task |
| PUT | `/tasks/:id` | Yes | Update task |
| DELETE | `/tasks/:id` | Yes | Delete task |

### Example Requests

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task management app",
    "priority": "high",
    "dueDate": "2026-03-01"
  }'
```

## 📁 Project Structure

```
primetradeai/
├── frontend/                 # Next.js React app
│   ├── pages/               # App pages and routes
│   ├── components/          # React components
│   ├── lib/                 # Utilities and API client
│   ├── types/               # TypeScript types
│   ├── styles/              # Global styles
│   ├── package.json
│   └── tsconfig.json
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth & validation
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── server.ts        # Main application
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── PrimeTradeAI_API.postman_collection.json
├── PRODUCTION_SCALING.md    # Scaling guide
└── README.md
```

## 🔐 Security Features

### Password Security
- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ Never stored or logged in plaintext
- ✅ Secure password comparison

### Authentication
- ✅ JWT tokens with 7-day expiration
- ✅ Bearer token validation on protected routes
- ✅ Automatic logout on token expiration

### API Security
- ✅ CORS protection (configurable origins)
- ✅ Helmet security headers
- ✅ HTTPS support (production)
- ✅ Input validation on all endpoints

### Database Security
- ✅ MongoDB connection via secure URI
- ✅ User data isolation (tasks tied to userId)
- ✅ Unique email constraint

## 🧪 Testing with Postman

1. Import `PrimeTradeAI_API.postman_collection.json` into Postman
2. Set environment variable `base_url = http://localhost:5000/api`
3. Signup/Login to get auth token (automatically saved)
4. Test all CRUD operations

## 📊 Performance Considerations

- **Database Indexing**: Indexed user email and userId on tasks
- **Pagination**: Can be added to task endpoints
- **Caching**: Redis can be integrated for session management
- **Rate Limiting**: Needed for production deployment

See [PRODUCTION_SCALING.md](PRODUCTION_SCALING.md) for detailed scaling strategies.

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev        # Start dev server with ts-node
npm run build      # Compile TypeScript
npm start          # Run compiled version
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetradeai
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Push to GitHub and connect to Vercel
```

### Backend (Heroku/Railway)
```bash
cd backend
npm run build
# Deploy with environment variables
```

See [PRODUCTION_SCALING.md](PRODUCTION_SCALING.md) for detailed deployment guide.

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check Atlas connection string
- Verify `MONGODB_URI` in `.env`

### CORS Error
- Check `CORS_ORIGIN` matches frontend URL
- Ensure credentials: true in axios client

### Authentication Failed
- Clear browser cookies/storage
- Check JWT_SECRET is consistent
- Verify token hasn't expired

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Frontend Developer Intern - PrimeTradeAI

## 📞 Support

For issues or questions, please check the documentation or create an issue in the repository.

---

**Built with ❤️ using Next.js, Express.js, and MongoDB**
