# LifeEcho AI - Project Structure

Complete file structure of the MVP implementation.

---

## 📁 Root Directory

```
LifeEcho-AI/
├── backend/                    # FastAPI backend application
├── frontend/                   # Next.js frontend application
├── .gitignore                  # Git ignore rules
├── render.yaml                 # Render deployment configuration
├── setup.sh                    # Linux/Mac setup script
├── setup.bat                   # Windows setup script
├── README_MVP.md               # MVP documentation
├── DEPLOYMENT_GUIDE.md         # Deployment instructions
├── TESTING_GUIDE.md            # Testing procedures
├── PROJECT_STRUCTURE.md        # This file
├── ARCHITECTURE.md             # System architecture (from initial design)
├── TECHNICAL_SPECIFICATIONS.md # Technical specs (from initial design)
├── IMPLEMENTATION_ROADMAP.md   # Development roadmap (from initial design)
└── DOCUMENTATION_INDEX.md      # Documentation index (from initial design)
```

---

## 🔧 Backend Structure

```
backend/
├── main.py                     # FastAPI application entry point
├── config.py                   # Configuration management (Pydantic Settings)
├── database.py                 # Database connection and session management
├── models.py                   # SQLAlchemy database models
├── schemas.py                  # Pydantic request/response schemas
├── auth.py                     # Authentication utilities (JWT, password hashing)
├── ai_service.py               # AI scenario generation (OpenAI integration)
├── requirements.txt            # Python dependencies
├── .env.example                # Environment variables template
└── routers/
    ├── auth_router.py          # Authentication endpoints
    └── decisions_router.py     # Decision management endpoints
```

### Backend Files Description

#### `main.py`
- FastAPI application initialization
- CORS middleware configuration
- Router registration
- Database table creation
- Health check endpoint

#### `config.py`
- Pydantic Settings for environment variables
- Configuration validation
- CORS origins parsing

#### `database.py`
- SQLAlchemy engine setup
- Database session management
- Dependency injection for database sessions

#### `models.py`
- **User**: User account model
- **Decision**: Decision model with relationships
- **Scenario**: Scenario model with JSON fields

#### `schemas.py`
- Request/response Pydantic models
- Data validation schemas
- API contract definitions

#### `auth.py`
- Password hashing (bcrypt)
- JWT token creation and verification
- User authentication dependency

#### `ai_service.py`
- OpenAI GPT-4 integration
- Scenario generation logic
- Mock data fallback

#### `routers/auth_router.py`
- POST `/api/v1/auth/register` - User registration
- POST `/api/v1/auth/login` - User login
- GET `/api/v1/auth/me` - Get current user

#### `routers/decisions_router.py`
- POST `/api/v1/decisions` - Create decision
- GET `/api/v1/decisions` - List user's decisions
- GET `/api/v1/decisions/{id}` - Get decision with scenarios
- PUT `/api/v1/decisions/{id}` - Update decision
- DELETE `/api/v1/decisions/{id}` - Delete decision
- POST `/api/v1/decisions/{id}/simulate` - Generate scenarios

---

## 🎨 Frontend Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage (landing page)
│   │   ├── globals.css         # Global styles
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Login page
│   │   │   └── register/
│   │   │       └── page.tsx    # Registration page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard (decision list)
│   │   └── decisions/
│   │       ├── new/
│   │       │   └── page.tsx    # New decision form
│   │       └── [id]/
│   │           └── page.tsx    # Decision detail & scenarios
│   ├── lib/
│   │   └── api.ts              # API client (axios)
│   └── store/
│       └── authStore.ts        # Authentication state (Zustand)
├── package.json                # Node.js dependencies
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # TailwindCSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── .env.local.example          # Environment variables template
```

### Frontend Files Description

#### `src/app/layout.tsx`
- Root layout component
- HTML structure
- Metadata configuration
- Global styles import

#### `src/app/page.tsx`
- Landing page
- Hero section
- Features showcase
- Use cases
- Call-to-action buttons

#### `src/app/auth/login/page.tsx`
- Login form
- Email/password validation
- Error handling
- Redirect to dashboard on success

#### `src/app/auth/register/page.tsx`
- Registration form
- Full name, email, password fields
- Form validation
- Auto-login after registration

#### `src/app/dashboard/page.tsx`
- Protected route (requires authentication)
- Decision list display
- Empty state
- Create decision button
- Logout functionality

#### `src/app/decisions/new/page.tsx`
- Decision creation form
- Category selection
- Context fields (optional)
- Form validation
- Redirect to decision detail

#### `src/app/decisions/[id]/page.tsx`
- Decision detail display
- Scenario generation trigger
- Scenario tabs
- Financial charts (Recharts)
- Timeline visualization
- Risk assessment display
- Recommendations

#### `src/lib/api.ts`
- Axios instance configuration
- API base URL
- JWT token interceptor
- API functions:
  - `authAPI`: register, login, getCurrentUser
  - `decisionsAPI`: create, getAll, getById, update, delete, simulate

#### `src/store/authStore.ts`
- Zustand state management
- Authentication state
- Login/logout functions
- Token persistence (localStorage)
- User data management

---

## 📦 Dependencies

### Backend (Python)

```txt
fastapi==0.104.1              # Web framework
uvicorn[standard]==0.24.0     # ASGI server
sqlalchemy==2.0.23            # ORM
psycopg2-binary==2.9.9        # PostgreSQL driver
pydantic==2.5.0               # Data validation
pydantic-settings==2.1.0      # Settings management
python-jose[cryptography]==3.3.0  # JWT
passlib[bcrypt]==1.7.4        # Password hashing
python-multipart==0.0.6       # Form data
openai==1.3.5                 # OpenAI API
python-dotenv==1.0.0          # Environment variables
```

### Frontend (Node.js)

```json
{
  "next": "14.0.3",           // React framework
  "react": "18.2.0",          // UI library
  "react-dom": "18.2.0",      // React DOM
  "typescript": "5.3.2",      // TypeScript
  "tailwindcss": "3.3.5",     // CSS framework
  "axios": "1.6.2",           // HTTP client
  "zustand": "4.4.7",         // State management
  "recharts": "2.10.3",       // Charts
  "lucide-react": "0.294.0"   // Icons
}
```

---

## 🔐 Environment Variables

### Backend `.env`

```bash
# Application
APP_NAME=LifeEcho AI
APP_ENV=development
DEBUG=True

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/lifeecho

# Security
SECRET_KEY=your-secret-key-min-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI
OPENAI_API_KEY=sk-your-openai-api-key

# CORS
CORS_ORIGINS=http://localhost:3000
```

### Frontend `.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    full_name VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Decisions Table
```sql
CREATE TABLE decisions (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    context JSON,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Scenarios Table
```sql
CREATE TABLE scenarios (
    id VARCHAR PRIMARY KEY,
    decision_id VARCHAR REFERENCES decisions(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    probability FLOAT,
    timeline_data JSON,
    outcomes JSON,
    risks JSON,
    recommendations TEXT,
    rank INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Deployment Files

### `render.yaml`
- Blueprint for Render deployment
- Defines 3 services:
  1. Backend web service (Python)
  2. Frontend web service (Node)
  3. PostgreSQL database
- Environment variable configuration
- Build and start commands

### `.gitignore`
- Python artifacts
- Node modules
- Environment files
- Build outputs
- IDE files

---

## 📚 Documentation Files

### User-Facing
- `README_MVP.md` - Main MVP documentation
- `DEPLOYMENT_GUIDE.md` - How to deploy to Render
- `TESTING_GUIDE.md` - How to test the application

### Developer-Facing
- `PROJECT_STRUCTURE.md` - This file
- `ARCHITECTURE.md` - System architecture
- `TECHNICAL_SPECIFICATIONS.md` - API specs
- `IMPLEMENTATION_ROADMAP.md` - Development roadmap

### Setup Scripts
- `setup.sh` - Linux/Mac setup automation
- `setup.bat` - Windows setup automation

---

## 🔄 Data Flow

```
User → Frontend (Next.js)
  ↓
  API Request (axios)
  ↓
Backend (FastAPI)
  ↓
  Authentication (JWT)
  ↓
  Database (PostgreSQL)
  ↓
  AI Service (OpenAI GPT-4)
  ↓
  Response (JSON)
  ↓
Frontend (React Components)
  ↓
User (Visualization)
```

---

## 🎯 Key Features by File

### Authentication Flow
- `frontend/src/app/auth/register/page.tsx` - Registration UI
- `frontend/src/app/auth/login/page.tsx` - Login UI
- `frontend/src/store/authStore.ts` - Auth state management
- `backend/routers/auth_router.py` - Auth endpoints
- `backend/auth.py` - JWT & password utilities

### Decision Management
- `frontend/src/app/decisions/new/page.tsx` - Create decision UI
- `frontend/src/app/dashboard/page.tsx` - List decisions UI
- `backend/routers/decisions_router.py` - Decision CRUD endpoints
- `backend/models.py` - Decision & Scenario models

### AI Scenario Generation
- `frontend/src/app/decisions/[id]/page.tsx` - Trigger & display scenarios
- `backend/ai_service.py` - OpenAI integration & mock data
- `backend/routers/decisions_router.py` - Simulate endpoint

### Data Visualization
- `frontend/src/app/decisions/[id]/page.tsx` - Charts & timelines
- Uses Recharts library for financial projections

---

## 📊 File Statistics

- **Total Files**: ~30
- **Backend Files**: 10
- **Frontend Files**: 12
- **Documentation**: 8
- **Configuration**: 5

---

## 🔧 Build Commands

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # Development
npm run build      # Production build
npm start          # Production server
```

---

This structure provides a complete, production-ready MVP that can be deployed to Render and demonstrated to customers.

