# 🎯 Getting Started - Quick Reference

## 📂 Project Structure

```
primetradeai/
┣━━ frontend/                          # Next.js React Application
┃   ┣━━ pages/                        # Next.js pages & routes
┃   ┃   ┣━━ _app.tsx                 # App wrapper
┃   ┃   ┣━━ _document.tsx            # HTML document
┃   ┃   ┣━━ index.tsx                # Landing page
┃   ┃   ┣━━ login.tsx                # Login page
┃   ┃   ┣━━ signup.tsx               # Signup page
┃   ┃   └━━ dashboard.tsx            # Dashboard (protected)
┃   ┣━━ components/                  # React components
┃   ┃   ┣━━ TaskForm.tsx             # Create task form
┃   ┃   ┣━━ TaskList.tsx             # Task list display
┃   ┃   └━━ TaskCard.tsx             # Individual task card
┃   ┣━━ lib/                         # Utilities & helpers
┃   ┃   ┣━━ api-client.ts            # Axios API client
┃   ┃   └━━ store.ts                 # Zustand state management
┃   ┣━━ types/                       # TypeScript types
┃   ┃   └━━ index.ts                 # Type definitions
┃   ┣━━ styles/                      # Global styles
┃   ┃   └━━ globals.css              # TailwindCSS imports
┃   ┣━━ package.json
┃   ┣━━ tsconfig.json
┃   ┣━━ next.config.js
┃   ┣━━ tailwind.config.js
┃   ┣━━ postcss.config.js
┃   ┣━━ .gitignore
┃   └━━ README.md
┃
┣━━ backend/                           # Express.js REST API
┃   ┣━━ src/
┃   ┃   ┣━━ controllers/             # Request handlers
┃   ┃   ┃   ┣━━ authController.ts    # Auth logic
┃   ┃   ┃   └━━ taskController.ts    # Task CRUD logic
┃   ┃   ┣━━ middleware/              # Middleware functions
┃   ┃   ┃   └━━ auth.ts              # JWT authentication
┃   ┃   ┣━━ models/                  # MongoDB schemas
┃   ┃   ┃   ┣━━ User.ts              # User schema
┃   ┃   ┃   └━━ Task.ts              # Task schema
┃   ┃   ┣━━ routes/                  # API routes
┃   ┃   ┃   ┣━━ authRoutes.ts        # Auth endpoints
┃   ┃   ┃   └━━ taskRoutes.ts        # Task endpoints
┃   ┃   ┣━━ utils/                   # Utilities
┃   ┃   ┃   └━━ jwt.ts               # JWT token functions
┃   ┃   └━━ server.ts                # Main Express app
┃   ┣━━ package.json
┃   ┣━━ tsconfig.json
┃   ┣━━ .env.example
┃   ┣━━ .gitignore
┃   └━━ README.md
┃
┣━━ README.md                          # Main documentation
┣━━ SETUP.md                           # Installation guide
┣━━ PRODUCTION_SCALING.md              # Scaling strategies
┣━━ PrimeTradeAI_API.postman_collection.json  # API collection
└━━ .gitignore                         # Git ignore rules
```

## 🚀 Quick Start (5 minutes)

### Terminal 1: Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Output: `🚀 Server running on http://localhost:5000`

### Terminal 2: Frontend

```bash
cd frontend
npm install
npm run dev
```

Output: `ready - started server on 0.0.0.0:3000`

### Terminal 3: MongoDB (if local)

```bash
mongod
```

Output: `Listening on 127.0.0.1:27017`

### Browser

Open http://localhost:3000 → Sign up → Create tasks!

## 🔑 Key Features Implemented

### ✅ Authentication
- User signup with email validation
- Secure login with JWT tokens
- Protected routes (dashboard)
- Automatic logout on token expiration

### ✅ Task Management
- Create tasks with title, description, priority, due date
- Read all tasks with optional status filter
- Update task status and details
- Delete tasks with confirmation

### ✅ User Interface
- Responsive design (mobile-friendly)
- Task search and filter by status
- Clean, modern UI with TailwindCSS
- Form validation (client & server-side)

### ✅ Security
- Password hashing with bcryptjs (10 rounds)
- JWT authentication with 7-day expiration
- CORS protection
- Input validation on all endpoints
- Helmet security headers

## 📊 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Next.js | 14+ |
| **Styling** | TailwindCSS | 3+ |
| **State** | Zustand | 4+ |
| **HTTP Client** | Axios | 1+ |
| **Backend** | Express.js | 4+ |
| **Database** | MongoDB | 5+ |
| **Auth** | JWT | 9+ |
| **Password** | bcryptjs | 2+ |
| **Validation** | express-validator | 7+ |

## 🧪 Testing the Application

### Via Web UI

1. **Signup**: http://localhost:3000/signup
2. **Login**: http://localhost:3000/login
3. **Dashboard**: http://localhost:3000/dashboard
4. Create, edit, delete tasks

### Via Postman

1. Import `PrimeTradeAI_API.postman_collection.json`
2. Endpoint: http://localhost:5000/api
3. Signup → Login → CRUD operations

### Examples

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Create Task (replace TOKEN with actual token)
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","priority":"high"}'
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetradeai
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| MongoDB | mongodb://localhost:27017 |
| API Docs | `/api/health` |
| Postman Collection | `PrimeTradeAI_API.postman_collection.json` |

## ❓ Common Issues

### Port already in use?
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000 | grep LISTEN
kill -9 <PID>
```

### MongoDB connection error?
```bash
# Make sure MongoDB is running
mongod  # Windows
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

### CORS error?
```bash
# Check backend .env CORS_ORIGIN
CORS_ORIGIN=http://localhost:3000

# Check frontend .env.local API_URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📚 Documentation Files

- **README.md** - Complete project documentation
- **SETUP.md** - Detailed installation & troubleshooting
- **PRODUCTION_SCALING.md** - Scaling strategies and architecture
- **frontend/README.md** - Frontend-specific documentation
- **backend/README.md** - Backend-specific documentation

## ✅ Production Checklist

- [ ] Set JWT_SECRET to a strong random string
- [ ] Update MONGODB_URI to production database
- [ ] Configure CORS_ORIGIN for production domain
- [ ] Enable HTTPS in production
- [ ] Set up automated backups
- [ ] Implement rate limiting
- [ ] Add monitoring/logging
- [ ] Set NODE_ENV=production
- [ ] Use environment secrets manager
- [ ] Deploy to production hosting

## 🙋 Support

If you encounter issues, check:
1. [SETUP.md](SETUP.md) - Installation guide
2. [PRODUCTION_SCALING.md](PRODUCTION_SCALING.md) - Architecture
3. [backend/README.md](backend/README.md) - Backend docs
4. [frontend/README.md](frontend/README.md) - Frontend docs

---

**Ready to start? Run the Quick Start commands above!** ✨
