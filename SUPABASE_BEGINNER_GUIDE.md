# 🎓 Supabase Setup - Beginner's Step-by-Step Guide

Let's add Supabase to your app, one step at a time! Don't worry, we'll go slow and explain everything.

---

## 📚 What is Supabase?

Supabase is like a database in the cloud. Think of it like Google Sheets, but for apps:
- You can **store data** (like feedback submissions)
- You can **retrieve data** (like showing all feedback)
- It's **free** to start
- It works with your Next.js app

---

## Step 1: Create a Supabase Account (2 minutes)

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub (easiest) or email
4. Verify your email if needed

✅ **Done!** You now have a Supabase account.

---

## Step 2: Create Your First Project (3 minutes)

1. After logging in, click **"New Project"** (big green button)
2. Fill in the form:
   - **Name**: `new_vision` (or any name you like)
   - **Database Password**: 
     - Create a strong password (you'll need this later!)
     - **IMPORTANT**: Save this password somewhere safe!
     - Example: `MySecurePass123!`
   - **Region**: Choose the one closest to you
     - US East, US West, Europe, etc.
3. Click **"Create new project"**
4. ⏳ Wait 2-3 minutes for it to set up (grab a coffee ☕)

✅ **Done!** Your Supabase project is being created.

---

## Step 3: Get Your API Keys (1 minute)

Once your project is ready:

1. In your Supabase dashboard, look at the left sidebar
2. Click **"Settings"** (gear icon ⚙️)
3. Click **"API"** (under Project Settings)
4. You'll see a page with your project info

**What you need:**
- **Project URL**: Looks like `https://xxxxx.supabase.co`
  - Copy this whole URL
- **anon public key**: A long string starting with `eyJ...`
  - Click the "eye" icon 👁️ to reveal it
  - Copy the entire key

📝 **Write these down** or keep this tab open - you'll need them in a minute!

---

## Step 4: Add Keys to Your App (2 minutes)

### For Local Development:

1. In your project folder, create a file called `.env.local`
   - It should be in the root (same folder as `package.json`)

2. Open `.env.local` and add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Replace `your-project-url-here` with your actual Project URL
4. Replace `your-anon-key-here` with your actual anon key

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://kjphjydtmxnzlmarliai.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. **Save the file**

✅ **Done!** Your app can now connect to Supabase.

---

## Step 5: Create Your First Table (3 minutes)

A "table" is like a spreadsheet where we store data. Let's create one for feedback:

### Option A: Using SQL Editor (Faster & Easier! ⚡)

1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"** button
3. Open the file `create-feedback-table.sql` from your project
4. Copy the entire SQL code
5. Paste it into the SQL Editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned" ✅

**That's it!** The table is created with all columns and permissions!

### Option B: Using Table Editor (Visual way)

1. In Supabase dashboard, click **"Table Editor"** (left sidebar)
2. Click **"New Table"** button
3. Fill in:
   - **Name**: `feedback`
   - **Description**: `Stores user feedback submissions` (optional)
4. Click **"Save"**

5. Now add columns (like spreadsheet columns):
   - Click **"Add Column"** for each:

   **Column 1:**
   - Name: `id`
   - Type: `uuid`
   - Default value: `gen_random_uuid()`
   - Check ✅ **Primary key**
   - Click **"Save"**

   **Column 2:**
   - Name: `name`
   - Type: `text`
   - Check ✅ **Is Nullable** = OFF (required)
   - Click **"Save"**

   **Column 3:**
   - Name: `email`
   - Type: `text`
   - Check ✅ **Is Nullable** = OFF (required)
   - Click **"Save"**

   **Column 4:**
   - Name: `message`
   - Type: `text`
   - Check ✅ **Is Nullable** = OFF (required)
   - Click **"Save"**

   **Column 5:**
   - Name: `created_at`
   - Type: `timestamptz`
   - Default value: `now()`
   - Click **"Save"**

6. Click **"Close"** when done

✅ **Done!** Your table is created!

---

## Step 6: Allow Public Inserts (2 minutes)

By default, Supabase blocks everyone from adding data (for security). We need to allow it for our feedback form:

1. In Supabase dashboard, click **"Authentication"** (left sidebar)
2. Click **"Policies"** (under Authentication)
3. Find your `feedback` table in the list
4. Click on it
5. Click **"New Policy"**
6. Choose **"For full customization"**
7. Fill in:
   - **Policy name**: `Allow public inserts`
   - **Allowed operation**: Select **INSERT**
   - **Policy definition**: Type `true`
8. Click **"Review"** → **"Save Policy"**

✅ **Done!** Now anyone can submit feedback!

---

## Step 7: Test It! (1 minute)

1. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C) and restart:
   npm run dev
   ```

2. Go to your app and submit the feedback form

3. **Check if it worked:**
   - Go to Supabase → **Table Editor** → **feedback**
   - You should see your submission! 🎉

---

## 🎉 Congratulations!

You've successfully:
- ✅ Created a Supabase account
- ✅ Created a project
- ✅ Created a database table
- ✅ Connected your app to Supabase
- ✅ Saved data to the database!

---

## 🆘 Troubleshooting

**"Can't connect to Supabase"**
- Check your `.env.local` file has the correct keys
- Make sure there are no extra spaces
- Restart your dev server after adding `.env.local`

**"Permission denied"**
- Make sure you created the policy in Step 6
- Check the policy allows INSERT operations

**"Table doesn't exist"**
- Make sure you created the `feedback` table
- Check the table name is exactly `feedback` (lowercase)

---

## 📝 Next Steps

Once this works, we can:
- Display all feedback on a page
- Add more tables
- Add user authentication
- And much more!

**Ready? Let's continue!** 🚀

