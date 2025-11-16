# Project Summary: NewVision

## Project Overview
**NewVision** is a Next.js 16 full-stack application built as a learning sandbox for developing full-stack and AI products. The project demonstrates a complete full-stack flow: React frontend → Next.js API routes → Supabase PostgreSQL database. 

**Key Differentiator**: NewVision includes an **embeddable feedback widget** (`public/embed.js`) that can be added to any website with a single script tag, making it a production-ready feedback collection platform. The widget automatically creates a floating feedback button and form, submits to the API, and saves to the database.

It's currently deployed on Vercel and hosted on GitHub.

## Tech Stack
- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **React**: 19.2.0
- **Database**: Supabase (PostgreSQL)
- **Database Client**: @supabase/supabase-js v2.81.1
- **Deployment**: Vercel
- **Version Control**: Git + GitHub

## Project Structure
```
new_vision/
├── app/                          # Next.js App Router directory
│   ├── api/
│   │   └── feedback/
│   │       └── route.ts         # POST endpoint for feedback submissions
│   ├── dashboard/
│   │   └── page.tsx             # Dashboard page (basic structure)
│   ├── profile/
│   │   └── page.tsx             # Profile page (basic structure)
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page with Counter component
│   ├── globals.css              # Global Tailwind CSS styles
│   └── favicon.ico              # Site favicon
│
├── components/                   # React components
│   ├── Counter.tsx               # Client-side counter with useState
│   └── FeedbackForm.tsx         # Feedback form with validation
│
├── lib/                          # Utility libraries
│   ├── supabase.ts              # Supabase client configuration
│   ├── utils.ts                 # Utility functions (formatting, validation)
│   ├── api.ts                   # API helper functions (GET, POST, etc.)
│   └── README.md                # Documentation for lib folder
│
├── public/                       # Static assets
│   ├── embed.js                 # Embeddable feedback widget script
│   └── *.svg                    # SVG icons
│
├── Documentation Files/
│   ├── PROJECT_SUMMARY.md       # This file - comprehensive project overview
│   ├── LEARNING_ROADMAP.md      # Step-by-step learning path for full-stack dev
│   ├── SUPABASE_BEGINNER_GUIDE.md  # Beginner-friendly Supabase setup guide
│   ├── DEPLOYMENT_GUIDE.md      # Guide for deploying to Vercel + GitHub
│   └── README.md                # Project README
│
├── SQL Files/
│   └── check-policies.sql       # SQL to check RLS policies in Supabase
│
├── Configuration Files/
│   ├── package.json             # Dependencies and scripts
│   ├── tsconfig.json            # TypeScript configuration
│   ├── next.config.ts           # Next.js configuration
│   ├── eslint.config.mjs        # ESLint configuration
│   ├── postcss.config.mjs       # PostCSS configuration
│   ├── .gitignore              # Git ignore rules
│   └── .env.local              # Environment variables (not in git)
│
└── node_modules/                # Dependencies (auto-generated)
```

## Detailed File Descriptions

### Frontend Components

#### `components/Counter.tsx`
- **Type**: Client Component ('use client')
- **Purpose**: Demonstrates React state management with useState
- **Features**: 
  - Increment, Decrement, and Reset buttons
  - Displays current count
  - Used on home page as a learning example

#### `components/FeedbackForm.tsx`
- **Type**: Client Component ('use client')
- **Purpose**: Collects user feedback and submits to API
- **Features**:
  - Form fields: Name, Email, Message
  - Client-side validation (required fields)
  - Loading states during submission
  - Success/error message display
  - Connects to `/api/feedback` endpoint
  - Uses React hooks (useState) for form state management

### Pages

#### `app/page.tsx` (Home Page)
- **Route**: `/`
- **Content**: 
  - "NewVision 🚀" heading
  - Tagline about full-stack and AI products
  - Renders Counter component
- **Purpose**: Landing page and learning demonstration

#### `app/dashboard/page.tsx`
- **Route**: `/dashboard`
- **Status**: Basic structure, ready for development
- **Purpose**: Future dashboard functionality

#### `app/profile/page.tsx`
- **Route**: `/profile`
- **Status**: Basic structure, ready for development
- **Purpose**: Future user profile page

#### `app/layout.tsx` (Root Layout)
- **Purpose**: Wraps all pages with common layout
- **Features**:
  - Sticky navigation bar with backdrop blur effect
  - Navigation links: Home, Dashboard, Profile
  - Responsive design with max-width container
  - Metadata configuration (title, description)
  - Global styles import

### Backend API Routes

#### `app/api/feedback/route.ts`
- **Endpoint**: `POST /api/feedback`
- **Purpose**: Handles feedback form submissions and saves to Supabase
- **Features**:
  - Server-side validation:
    - Required fields (name, email, message)
    - Email format validation (using `isValidEmail` from `lib/utils.ts`)
    - Message minimum length (10 characters)
  - Supabase integration:
    - Saves feedback to `feedback` table
    - Supports `projectId` field (defaults to "default_project" if not provided)
    - Uses service role key if available (bypasses RLS), falls back to anon key
    - Returns saved data including ID and timestamp
  - Error handling:
    - Detailed error logging
    - Helpful error messages for debugging
    - Proper HTTP status codes
  - Data processing:
    - Trims whitespace from inputs
    - Converts email to lowercase
    - Handles optional `projectId` parameter

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your feedback message here",
  "projectId": "optional_project_id"  // Optional, defaults to "default_project"
}
```

**Success Response:**
```json
{
  "success": true,
  "reply": "Thank you John! Your feedback has been received and saved! ✅",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your feedback message here",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### Utility Libraries

#### `lib/supabase.ts`
- **Purpose**: Supabase client configuration
- **Exports**:
  - `supabase`: Client-side Supabase client (uses anon key)
  - `createServerClient()`: Server-side client (uses service role key)
- **Features**:
  - Environment variable validation
  - Warning messages if keys are missing
  - Separate clients for client-side and server-side use

#### `lib/utils.ts`
- **Purpose**: Reusable utility functions
- **Functions**:
  - `formatDate()`: Format dates to readable strings
  - `formatRelativeTime()`: "2 hours ago" style formatting
  - `isValidEmail()`: Email format validation
  - `capitalize()`: Capitalize first letter
  - `truncate()`: Truncate long text
  - `formatCurrency()`: Format numbers as currency
  - `generateId()`: Generate random IDs
  - `debounce()`: Delay function execution
  - `sleep()`: Promise-based delay
  - `isEmpty()`: Check if value is empty

#### `lib/api.ts`
- **Purpose**: API helper functions for HTTP requests
- **Functions**:
  - `apiRequest<T>()`: Generic fetch wrapper with error handling
  - `post<T>()`: POST request helper
  - `get<T>()`: GET request helper
  - `put<T>()`: PUT request helper
  - `del<T>()`: DELETE request helper
- **Features**: Consistent error handling, TypeScript generics

## Database Schema (Supabase)

### `feedback` Table
- **Purpose**: Stores user feedback submissions
- **Columns**:
  - `id` (UUID, Primary Key): Auto-generated unique identifier
  - `name` (TEXT, NOT NULL): User's name
  - `email` (TEXT, NOT NULL): User's email address
  - `message` (TEXT, NOT NULL): Feedback message content
  - `project_id` (TEXT): Optional project identifier (defaults to "default_project")
  - `created_at` (TIMESTAMP WITH TIME ZONE): Auto-generated timestamp
- **Indexes**: `idx_feedback_created_at` on `created_at DESC`
- **Security**: Row Level Security (RLS) enabled
- **Policies**: 
  - "Allow public inserts" - Allows anyone to insert feedback
  - "Allow anon inserts" - Allows anonymous users to insert

## Environment Variables

### Required (`.env.local` file)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Optional (for server-side operations)
```env
# Service Role Key (bypasses RLS - use for API routes)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note**: `.env.local` is in `.gitignore` and should never be committed to GitHub.

## What Has Been Completed

### ✅ Phase 1: Project Setup
- Next.js 16 project initialized with TypeScript
- Tailwind CSS v4 configured
- TypeScript configuration set up
- ESLint configured
- Git repository initialized
- GitHub repository created and connected

### ✅ Phase 2: Frontend Development
- **Components**: Counter, FeedbackForm
- **Pages**: Home, Dashboard, Profile (basic structures)
- **Layout**: Root layout with navigation
- **Styling**: Tailwind CSS with responsive design
- **State Management**: React hooks (useState)

### ✅ Phase 3: Backend Development
- **API Routes**: Feedback submission endpoint
- **Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and logging
- **Utility Functions**: Reusable functions for validation and formatting

### ✅ Phase 4: Database Integration
- **Supabase Setup**: Project created and configured
- **Database Table**: `feedback` table created with proper schema
- **Row Level Security**: RLS enabled with appropriate policies
- **Integration**: API route connected to Supabase
- **Data Persistence**: Feedback submissions saved to database

### ✅ Phase 5: Deployment
- **Vercel**: Project deployed to Vercel
- **GitHub**: Code pushed to GitHub repository
- **Environment Variables**: Configured for local and production

## Current State

### ✅ Fully Functional Features
1. **Feedback System**: Complete full-stack flow
   - Frontend form → API validation → Database storage
   - Form validation (client + server)
   - Error handling and user feedback
   - Data persistence in Supabase
   - **Embeddable Widget**: `public/embed.js` can be embedded on any website
     - One-line script tag integration
     - Floating feedback button
     - Beautiful modal form
     - Automatic API submission
     - Project ID support for multi-project tracking

2. **Component Library**: Reusable components
   - Counter component (learning example)
   - FeedbackForm component (production-ready)

3. **Utility Functions**: Code reusability
   - Validation functions
   - Formatting functions
   - API helpers

4. **Database**: Supabase PostgreSQL
   - Table created and configured
   - RLS policies set up
   - Data successfully being saved

### 🔄 In Progress / Next Steps
- Dashboard functionality (basic structure exists)
- Profile page functionality (basic structure exists)
- Authentication system (NextAuth.js integration)
- Additional API endpoints
- Display feedback submissions on a page

## Architecture Overview

```
┌─────────────────┐
│   React Frontend │
│  (Components)    │
└────────┬─────────┘
         │ HTTP POST
         ▼
┌─────────────────┐
│  Next.js API     │
│  /api/feedback   │
│  (Validation)    │
└────────┬─────────┘
         │ Supabase Client
         ▼
┌─────────────────┐
│  Supabase DB     │
│  PostgreSQL      │
│  feedback table  │
└─────────────────┘
```

## Key Features

1. **Full-Stack Flow**: Complete request/response cycle from frontend to database
2. **Type Safety**: TypeScript throughout the application
3. **Validation**: Both client-side and server-side validation
4. **Error Handling**: Comprehensive error handling at all levels
5. **Code Organization**: Well-structured with reusable utilities
6. **Database Integration**: Real database persistence with Supabase
7. **Deployment Ready**: Configured for Vercel deployment

## Important URLs

- **GitHub Repository**: https://github.com/Mehdys/new_vision
- **Vercel Production**: https://newvision-k04ileu2w-mehdigrs-projects-89e94f9c.vercel.app
- **Vercel Dashboard**: https://vercel.com/mehdigrs-projects-89e94f9c/new_vision
- **Supabase Dashboard**: https://app.supabase.com (project-specific)

## Configuration Details

- **Path Alias**: `@/*` maps to `./*` (configured in `tsconfig.json`)
- **Build Command**: `next build`
- **Development Command**: `next dev`
- **Node Version**: Compatible with Node.js 20+
- **Package Manager**: npm

## Dependencies

### Production Dependencies
- `next`: 16.0.3 - Next.js framework
- `react`: 19.2.0 - React library
- `react-dom`: 19.2.0 - React DOM renderer
- `@supabase/supabase-js`: 2.81.1 - Supabase client library

### Development Dependencies
- `typescript`: ^5 - TypeScript compiler
- `@types/node`: ^20 - Node.js type definitions
- `@types/react`: ^19 - React type definitions
- `@types/react-dom`: ^19 - React DOM type definitions
- `tailwindcss`: ^4 - Tailwind CSS framework
- `@tailwindcss/postcss`: ^4 - PostCSS plugin for Tailwind
- `eslint`: ^9 - ESLint linter
- `eslint-config-next`: 16.0.3 - Next.js ESLint config

## Learning Progress

- ✅ **Phase 1**: Frontend Fundamentals (Components, State Management, Forms)
- ✅ **Phase 2**: Backend Basics (API Routes, Server-side Validation)
- ✅ **Phase 3**: Database Integration (Supabase PostgreSQL, RLS, Data Persistence)
- 🔄 **Phase 4**: Advanced Features (Authentication, More Endpoints, Dashboard)
- 📋 **Phase 5+**: See `LEARNING_ROADMAP.md` for detailed learning path

## Documentation Files

1. **PROJECT_SUMMARY.md** (this file): Comprehensive project overview
2. **LEARNING_ROADMAP.md**: Step-by-step learning path for full-stack development
3. **SUPABASE_BEGINNER_GUIDE.md**: Beginner-friendly Supabase setup instructions
4. **DEPLOYMENT_GUIDE.md**: Guide for deploying to Vercel and connecting to GitHub
5. **README.md**: Project README with quick start instructions

## Notes for ChatGPT/Developers

### Project Purpose
This is a **learning project** designed to teach full-stack development. It demonstrates:
- Modern React patterns with Next.js App Router
- Server-side API development
- Database integration with Supabase
- TypeScript best practices
- Deployment workflows

### Code Style
- All components use TypeScript
- Client components marked with 'use client'
- Server components are default (no directive needed)
- Utility functions promote DRY principles
- Error handling is comprehensive

### Database Notes
- Supabase PostgreSQL database
- Row Level Security (RLS) enabled
- Can use service role key for API routes (bypasses RLS)
- Table schema includes `project_id` for future multi-project support

### Development Workflow
1. Local development: `npm run dev`
2. Environment variables in `.env.local`
3. Database changes: Update Supabase dashboard or use SQL
4. Deployment: Push to GitHub → Vercel auto-deploys (if connected)

### Common Tasks
- **Add new component**: Create in `components/` folder
- **Add new page**: Create in `app/` folder (follows Next.js routing)
- **Add new API endpoint**: Create in `app/api/` folder
- **Add utility function**: Add to `lib/utils.ts` or create new file in `lib/`
- **Database changes**: Use Supabase dashboard or SQL Editor

## Embeddable Widget (`public/embed.js`)

### Overview
The embed script allows any website to collect feedback by adding a single script tag. The widget creates a floating feedback button that opens a modal form.

### Usage
```html
<script 
  src="https://your-domain.com/embed.js" 
  data-project-id="your-project-id">
</script>
```

### Features
- **Zero Dependencies**: Works on any website without frameworks
- **Auto-Initialization**: Automatically creates UI when script loads
- **Project Support**: `data-project-id` attribute for multi-project tracking
- **Beautiful UI**: Modern, dark-themed modal with smooth animations
- **API Integration**: Automatically submits to `/api/feedback` endpoint
- **Error Handling**: User-friendly error messages
- **Responsive**: Works on desktop and mobile

### Technical Details
- Self-executing function to avoid global scope pollution
- Reads `data-project-id` from script tag attribute
- Creates fixed-position container with z-index 99999
- Fetches from relative `/api/feedback` endpoint (works with same-origin)
- Handles form validation and submission
- Shows success/error states

## Future Enhancements (Ideas)

1. **Authentication**: Add NextAuth.js for user login/signup
2. **Feedback Display**: Create page to view all feedback submissions
3. **Dashboard**: Add charts, stats, and analytics
4. **Project Management**: Expand `project_id` into full project system with UI
5. **Email Notifications**: Send emails when feedback is submitted
6. **Admin Panel**: Interface to manage feedback across projects
7. **AI Integration**: Add AI features (summarization, sentiment analysis)
8. **Real-time Updates**: WebSocket integration for live updates
9. **Widget Customization**: Allow custom styling via data attributes
10. **Analytics**: Track widget usage and feedback trends

---

**Last Updated**: Current as of latest Supabase integration with `project_id` support
**Status**: ✅ Fully functional full-stack application with database persistence
