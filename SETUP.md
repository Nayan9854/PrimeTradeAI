# Installation & Setup Guide

Complete step-by-step guide to get the PrimeTradeAI application running locally.

## ✅ Prerequisites

- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **npm**: v8 or higher (comes with Node.js)
- **MongoDB**: v5 or higher ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

## 🔧 Installation Steps

### Step 1: Verify Prerequisites

```bash
# Check Node.js version
node --version  # Should be v16+

# Check npm version
npm --version   # Should be v8+

# Check Git
git --version
```

### Step 2: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd primetradeai
```

### Step 3: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Update `.env` file** with your MongoDB connection:

```env
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/primetradeai

# Option 2: MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primetradeai

PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
CORS_ORIGIN=http://localhost:3000
```

**MongoDB Local Setup** (if using local database):

```bash
# On Windows (in new terminal)
mongod

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

**Verify MongoDB Connection**:

```bash
# In another terminal
mongo  # or mongosh for newer versions
> db.version()
# Should return MongoDB version
```

**Start Backend Server**:

```bash
# In backend directory
npm run dev

# Output should show:
# ✅ Connected to MongoDB
# 🚀 Server running on http://localhost:5000
```

### Step 4: Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF
```

**Start Frontend Development Server**:

```bash
# In frontend directory
npm run dev

# Output should show:
# > ready - started server on 0.0.0.0:3000
# Open http://localhost:3000 in your browser
```

### Step 5: Verify Setup

#### Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"Server is running"}
```

#### Test Frontend

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. You should see the PrimeTradeAI landing page

### Step 6: First Run Through

1. **Sign Up**:
   - Click "Sign Up" button
   - Enter Name: `Test User`
   - Enter Email: `test@example.com`
   - Enter Password: `password123`
   - Click "Sign Up"

2. **Dashboard Access**:
   - You should be redirected to `/dashboard`
   - Your profile should display
   - You should see an empty task list

3. **Create Task**:
   - Click "New Task" button
   - Fill in task details
   - Click "Create Task"
   - Task should appear in the list

4. **Test Task Operations**:
   - Edit task (click "Edit")
   - Change status or priority
   - Delete task (click "Delete")

## 📝 API Testing with Postman

1. **Download Postman**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

2. **Import Collection**:
   - Open Postman
   - Click "Import"
   - Select `PrimeTradeAI_API.postman_collection.json`

3. **Set Environment**:
   - Set `base_url` = `http://localhost:5000/api`
   - Any auth tokens will auto-save from signup/login

4. **Test API Endpoints**:
   - Start with "Signup" to create a test account
   - Then use "Login" to get authentication token
   - Test CRUD operations on tasks

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MongoError: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:
```bash
# Check if MongoDB is running
# Windows: Check Services, restart mongod
# macOS: brew services restart mongodb-community
# Linux: sudo systemctl restart mongod

# Or verify connection string in .env
MONGODB_URI=mongodb://localhost:27017/primetradeai
```

### Port Already in Use

**Error**: `Error: listen EADDRINUSE :::5000`

**Solutions**:
```bash
# Find process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### CORS Error in Frontend

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
```bash
# Check CORS_ORIGIN in backend .env
CORS_ORIGIN=http://localhost:3000

# Verify frontend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Restart both servers
```

### Module Not Found Error

**Error**: `Cannot find module '@/...'`

**Solutions**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Check tsconfig.json paths configuration
# Reset VS Code: Ctrl+Shift+P > "Developer: Reload Window"
```

### Authentication Issues

**Error**: `401 Unauthorized` or `Invalid token`

**Solutions**:
```bash
# Clear browser storage
- Open DevTools (F12)
- Go to Application -> Cookies
- Delete all `localhost` cookies
- Try login again

# Check JWT_SECRET consistency
# Ensure same JWT_SECRET in .env
```

## 📦 Dependency Issues

### Update All Dependencies

```bash
# In backend or frontend directory
npm update

# Or install latest compatible versions
npm install npm@latest -g
```

### Clean Install

```bash
# If experiencing installation issues
rm package-lock.json
rm -rf node_modules
npm cache clean --force
npm install
```

## 🚀 Production Build

### Frontend Build

```bash
cd frontend
npm run build
npm start  # Runs production server
```

### Backend Build

```bash
cd backend
npm run build
npm start  # Runs compiled JavaScript
```

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## ✅ Verification Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned
- [ ] Backend dependencies installed
- [ ] Backend `.env` configured
- [ ] MongoDB running and connected
- [ ] Backend server running on `:5000`
- [ ] Frontend dependencies installed
- [ ] Frontend `.env.local` configured
- [ ] Frontend server running on `:3000`
- [ ] Can access http://localhost:3000
- [ ] Can signup/login successfully
- [ ] Can create/edit/delete tasks
- [ ] Postman collection imported and tested

---

**If you encounter any issues not covered here, check the main [README.md](README.md) or create an issue in the repository.**
