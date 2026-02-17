# PrimeTradeAI - Task Management App

A modern task management dashboard built with Next.js, Express.js, and MongoDB. Features user authentication, task CRUD operations, and a sleek dark theme UI.

## What's Inside

- **Frontend**: Next.js + React + TailwindCSS (dark theme)
- **Backend**: Express.js + TypeScript
- **Database**: MongoDB Atlas
- **Auth**: JWT-based with bcrypt password hashing

## Quick Start

### Requirements
- Node.js 16+
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone & Setup**
```bash
git clone https://github.com/Nayan9854/PrimeTradeAI.git
cd primetradeai
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI to .env
npm run dev  # Runs on http://localhost:5000
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev  # Runs on http://localhost:3002
```

## Features

✨ User signup/login/logout  
✨ Task create, read, update, delete  
✨ Search and filter tasks  
✨ Task status tracking (Pending, In Progress, Completed)  
✨ Task priority levels (Low, Medium, High)  
✨ Dark theme UI with Namaste greeting  
✨ Fully responsive design  

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create account |
| POST | `/auth/login` | Login |
| GET | `/auth/profile` | Get profile (protected) |
| POST | `/tasks` | Create task (protected) |
| GET | `/tasks` | Get all tasks (protected) |
| PUT | `/tasks/:id` | Update task (protected) |
| DELETE | `/tasks/:id` | Delete task (protected) |

## Environment Setup

**Backend .env**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CORS_ORIGIN=http://localhost:3002
```

**Frontend .env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Testing

Use Postman collection: `PrimeTradeAI_API.postman_collection.json`

## GitHub Repository

🔗 https://github.com/Nayan9854/PrimeTradeAI

---

Built with ❤️ by Nayan Bhattarai
