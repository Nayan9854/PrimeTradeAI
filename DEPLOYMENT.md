# PrimeTradeAI - Deployment Guide

## Deployment Architecture

- **Frontend**: Vercel (Next.js hosting)
- **Backend**: Render (Express.js hosting)
- **Database**: MongoDB Atlas (already configured)

## Step 1: Deploy Backend to Render

### Prerequisites
- Render account (https://render.com)
- GitHub repository already pushed

### Instructions

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository (`Nayan9854/PrimeTradeAI`)
4. Configure the service:
   - **Name**: `primetradeai-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free tier

5. Add Environment Variables (in Render dashboard):
   ```
   MONGODB_URI=<your-mongo-atlas-uri>
   JWT_SECRET=primetradeai-super-secret-jwt-key-2026-change-in-prod
   NODE_ENV=production
   PORT=10000
   CORS_ORIGIN=https://<your-vercel-frontend-url>
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. Copy the deployed backend URL (e.g., `https://primetradeai-backend.onrender.com`)

## Step 2: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (https://vercel.com)

### Instructions

1. Go to https://vercel.com and sign up/login with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository (`Nayan9854/PrimeTradeAI`)
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: `Next.js`
   - **Build & Output Settings**: Default (Next.js auto-detected)

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://primetradeai-backend.onrender.com/api
   ```

6. Click **"Deploy"**
7. Wait for deployment (2-3 minutes)
8. Get your Vercel frontend URL (e.g., `https://primetradeai.vercel.app`)

## Step 3: Update Backend CORS

1. Go back to Render dashboard
2. Update environment variable:
   ```
   CORS_ORIGIN=https://<your-vercel-url>.vercel.app
   ```
3. Render will auto-redeploy

## Step 4: Test Deployment

1. Visit your Vercel frontend URL
2. Try signing up with test credentials:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Password123!`
3. Create a test task
4. Verify data persists

## Important Notes

- **Free Tier Limitations**:
  - Render free tier services spin down after 15 minutes of inactivity
  - Use Vercel for production-grade hosting (has no spin-down)
  
- **MongoDB Atlas**: Make sure your IP whitelist includes Render's IPs
  - Go to MongoDB Atlas → Network Access → IP Whitelist
  - Add `0.0.0.0/0` (allows all IPs) for development

- **To upgrade later**:
  - Render Pro: $7/month per service (no spin-down, better uptime)
  - Vercel Pro: $20/month (advanced features)

## Troubleshooting

**"CORS error after deployment"**
- Verify `CORS_ORIGIN` in Render environment is set to your Vercel URL
- Check backend logs in Render dashboard

**"Cannot connect to MongoDB"**
- Verify `MONGODB_URI` is correct in Render
- Check MongoDB Atlas network access allows Render's IPs

**"Next.js build fails"**
- Ensure `NEXT_PUBLIC_API_URL` is set in Vercel
- Check build logs in Vercel dashboard
