# Deployment & Synchronization Guide

## 🔄 How GitHub, Vercel, and Supabase Work Together

### Current Setup
- **GitHub**: Stores your code (source control)
- **Vercel**: Deploys your app automatically (hosting)
- **Supabase**: Provides database and backend services

### The Flow

```
GitHub (Code) 
    ↓ (push code)
Vercel (Auto-deploys)
    ↓ (connects to)
Supabase (Database)
```

## 🚀 Automatic Deployment with Vercel + GitHub

### Connect Vercel to GitHub (Recommended!)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/mehdigrs-projects-89e94f9c/new_vision/settings
   - Or: https://vercel.com/dashboard → Your Project → Settings

2. **Connect GitHub Repository**
   - Go to **Settings** → **Git**
   - Click **Connect Git Repository**
   - Select your `Mehdys/new_vision` repository
   - Authorize Vercel to access your GitHub

3. **What This Does**
   - ✅ Every time you `git push` to GitHub, Vercel automatically deploys
   - ✅ No need to run `vercel` command manually
   - ✅ Automatic preview deployments for pull requests
   - ✅ Production deployments on main/master branch

## 🔐 Setting Up Supabase Environment Variables in Vercel

Since your code is on GitHub and Vercel auto-deploys, you need to add Supabase keys to Vercel:

### Step 1: Get Your Supabase Keys
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL**
   - **anon/public key**

### Step 2: Add to Vercel
1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add these variables:

   **For Production:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   **For Preview/Development:**
   - You can use the same values, or create separate Supabase projects
   - Click the dropdown to select which environments

3. Click **Save**

### Step 3: Redeploy
- After adding environment variables, Vercel will automatically redeploy
- Or manually trigger: **Deployments** → **Redeploy**

## 📝 Local Development Setup

For local development, create `.env.local`:

```bash
# Create the file
touch .env.local
```

Add your Supabase keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: `.env.local` is already in `.gitignore`, so it won't be committed to GitHub.

## 🔄 The Complete Workflow

### Daily Development Flow:

1. **Make changes locally**
   ```bash
   # Edit your code
   # Test locally with: npm run dev
   ```

2. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin master
   ```

3. **Vercel automatically deploys**
   - Vercel detects the push
   - Builds your app
   - Deploys to production
   - Uses environment variables from Vercel dashboard

4. **Your app connects to Supabase**
   - App uses `NEXT_PUBLIC_SUPABASE_URL` from Vercel
   - Connects to your Supabase database
   - Everything works! 🎉

## 🗄️ Database Migrations with Supabase CLI (Optional)

If you want to manage database schema via GitHub:

### Install Supabase CLI
```bash
npm install -g supabase
```

### Initialize Supabase in your project
```bash
supabase init
```

### Link to your Supabase project
```bash
supabase link --project-ref your-project-ref
```

### Create migrations
```bash
supabase migration new create_feedback_table
```

### Push migrations
```bash
supabase db push
```

**Note**: This is optional. You can also manage your database schema directly in the Supabase dashboard.

## ✅ Summary

**What syncs automatically:**
- ✅ Code: GitHub → Vercel (automatic on push)
- ✅ Environment Variables: Set in Vercel dashboard (not from GitHub)
- ✅ Database: Supabase (separate service, not synced with GitHub)

**What you need to do:**
1. Connect Vercel to GitHub (one-time setup)
2. Add Supabase keys to Vercel environment variables
3. Create `.env.local` for local development
4. Push code to GitHub → Vercel auto-deploys → App uses Supabase

## 🆘 Troubleshooting

**"Environment variables not working in Vercel"**
- Make sure you added them in Vercel dashboard (not just `.env.local`)
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

**"Can't connect to Supabase in production"**
- Verify environment variables are set in Vercel
- Check Supabase project is active
- Verify RLS policies allow the operations

**"Local dev works but production doesn't"**
- Environment variables might be missing in Vercel
- Check Vercel deployment logs for errors

