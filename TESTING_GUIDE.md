# LifeEcho AI - Testing Guide

This guide helps you test the MVP before deploying to production.

---

## 🧪 Local Testing

### 1. Backend Testing

#### Start the Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

#### Test API Endpoints

**Using Browser** (for GET requests):
- Visit: `http://localhost:8000/docs`
- Interactive API documentation (Swagger UI)
- Test all endpoints directly from the browser

**Using curl**:

```bash
# Health check
curl http://localhost:8000/

# Register a user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456",
    "full_name": "Test User"
  }'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "test123456"
  }'

# Save the token from the response
TOKEN="your-token-here"

# Create a decision
curl -X POST http://localhost:8000/api/v1/decisions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Career Change to Software Engineering",
    "description": "Considering switching from finance to tech",
    "category": "career",
    "context": {
      "current_situation": "Financial analyst with 5 years experience",
      "goals": "Higher job satisfaction and better work-life balance"
    }
  }'

# Get all decisions
curl http://localhost:8000/api/v1/decisions \
  -H "Authorization: Bearer $TOKEN"

# Simulate scenarios (replace {decision_id})
curl -X POST http://localhost:8000/api/v1/decisions/{decision_id}/simulate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "decision_id": "{decision_id}",
    "num_scenarios": 3,
    "time_horizon_years": 5
  }'
```

#### Expected Results

✅ **Registration**: Returns user object with id and email
✅ **Login**: Returns access token
✅ **Create Decision**: Returns decision object with id
✅ **Get Decisions**: Returns array of decisions
✅ **Simulate**: Returns decision with 3 scenarios

---

### 2. Frontend Testing

#### Start the Frontend
```bash
cd frontend
npm run dev
```

Visit: `http://localhost:3000`

#### Manual Testing Checklist

**Homepage** (`/`):
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] "Get Started" button works
- [ ] "Sign In" button works
- [ ] Features section displays
- [ ] Use cases section displays
- [ ] Responsive on mobile

**Registration** (`/auth/register`):
- [ ] Form displays correctly
- [ ] Email validation works
- [ ] Password validation works (min 6 characters)
- [ ] Full name field works
- [ ] Submit creates account
- [ ] Redirects to dashboard after registration
- [ ] Error messages display for invalid input
- [ ] "Sign in" link works

**Login** (`/auth/login`):
- [ ] Form displays correctly
- [ ] Email and password fields work
- [ ] Submit logs in user
- [ ] Redirects to dashboard after login
- [ ] Error messages display for invalid credentials
- [ ] "Create account" link works

**Dashboard** (`/dashboard`):
- [ ] Requires authentication (redirects if not logged in)
- [ ] Displays user name
- [ ] "New Decision" button works
- [ ] Empty state displays when no decisions
- [ ] Decision cards display correctly
- [ ] Category badges show correct colors
- [ ] Click on decision card navigates to detail page
- [ ] Logout button works

**New Decision** (`/decisions/new`):
- [ ] Form displays correctly
- [ ] All fields work (title, category, description, context)
- [ ] Category dropdown has all options
- [ ] Submit creates decision
- [ ] Redirects to decision detail page
- [ ] Cancel button works
- [ ] Back button works

**Decision Detail** (`/decisions/[id]`):
- [ ] Decision details display correctly
- [ ] "Generate Scenarios" button works
- [ ] Loading state shows during generation
- [ ] Scenarios display after generation
- [ ] Scenario tabs work
- [ ] Probability displays correctly
- [ ] Financial chart renders
- [ ] Timeline displays
- [ ] Risk factors display
- [ ] Recommendations display
- [ ] Back button works

---

### 3. Integration Testing

#### Complete User Flow

1. **Register New User**:
   - Go to homepage
   - Click "Get Started"
   - Fill in registration form
   - Submit
   - Verify redirect to dashboard

2. **Create First Decision**:
   - Click "New Decision"
   - Fill in form:
     - Title: "Switch to Remote Work"
     - Category: "career"
     - Description: "Considering full-time remote work"
   - Submit
   - Verify redirect to decision detail

3. **Generate Scenarios**:
   - Click "Generate Scenarios"
   - Wait for completion (10-30 seconds)
   - Verify 3 scenarios appear

4. **Explore Scenarios**:
   - Click each scenario tab
   - Verify all data displays:
     - Probability
     - Financial chart
     - Timeline
     - Risks
     - Recommendations

5. **Navigate Back**:
   - Click "Back to Dashboard"
   - Verify decision appears in list
   - Verify status updated

6. **Logout and Login**:
   - Click "Logout"
   - Verify redirect to homepage
   - Click "Sign In"
   - Login with same credentials
   - Verify dashboard shows previous decision

---

## 🔍 Browser Console Testing

Open browser console (F12) and check for:

❌ **No Errors**: Should be no red errors
⚠️ **Warnings**: Some warnings are OK
✅ **Network Requests**: All API calls should return 200 or 201

### Common Issues

**CORS Error**:
```
Access to fetch at 'http://localhost:8000/api/v1/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Fix**: Check `CORS_ORIGINS` in backend `.env`

**401 Unauthorized**:
```
Request failed with status code 401
```
**Fix**: Token expired or invalid. Logout and login again.

**Network Error**:
```
Network Error
```
**Fix**: Backend not running. Start backend server.

---

## 🚀 Pre-Deployment Testing

Before deploying to Render:

### 1. Environment Variables Check

**Backend**:
- [ ] `DATABASE_URL` is set
- [ ] `SECRET_KEY` is set (32+ characters)
- [ ] `OPENAI_API_KEY` is set (or mock data is acceptable)
- [ ] `CORS_ORIGINS` includes frontend URL

**Frontend**:
- [ ] `NEXT_PUBLIC_API_URL` points to backend

### 2. Build Testing

**Backend**:
```bash
cd backend
pip install -r requirements.txt
# Should complete without errors
```

**Frontend**:
```bash
cd frontend
npm install
npm run build
# Should complete without errors
```

### 3. Production Mode Testing

**Backend**:
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
# Test with production settings
```

**Frontend**:
```bash
cd frontend
npm run build
npm start
# Test production build
```

---

## 📊 Performance Testing

### Load Time Expectations

- **Homepage**: < 2 seconds
- **Dashboard**: < 3 seconds
- **Decision Detail**: < 2 seconds
- **Scenario Generation**: 10-30 seconds (depends on OpenAI API)

### Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🐛 Known Issues & Workarounds

### Issue 1: Slow First Request (Render Free Tier)
**Symptom**: First request takes 30-60 seconds
**Cause**: Service spins down after 15 minutes of inactivity
**Workaround**: Upgrade to paid plan or use UptimeRobot

### Issue 2: OpenAI API Timeout
**Symptom**: Scenario generation fails after 30 seconds
**Cause**: OpenAI API slow response
**Workaround**: Retry or use mock data

### Issue 3: Database Connection Pool Exhausted
**Symptom**: "Too many connections" error
**Cause**: Connection pool limit reached
**Workaround**: Restart backend service

---

## ✅ Deployment Readiness Checklist

Before showing to customers:

**Functionality**:
- [ ] All user flows work end-to-end
- [ ] No console errors
- [ ] All API endpoints respond correctly
- [ ] Scenarios generate successfully
- [ ] Charts render correctly

**Performance**:
- [ ] Page load times acceptable
- [ ] No memory leaks
- [ ] API response times < 5 seconds

**Security**:
- [ ] HTTPS enabled (automatic on Render)
- [ ] Passwords hashed
- [ ] JWT tokens secure
- [ ] CORS configured correctly

**UX**:
- [ ] Responsive on all devices
- [ ] Loading states display
- [ ] Error messages clear
- [ ] Navigation intuitive

**Data**:
- [ ] Database connected
- [ ] Data persists correctly
- [ ] No data loss on refresh

---

## 📝 Test Data

### Sample Users
```json
{
  "email": "demo@lifeecho.ai",
  "password": "demo123456",
  "full_name": "Demo User"
}
```

### Sample Decisions

**Career Decision**:
```json
{
  "title": "Switch from Finance to Software Engineering",
  "category": "career",
  "description": "Considering a career change to tech industry",
  "context": {
    "current_situation": "Financial analyst, 5 years experience, $80K salary",
    "goals": "Higher job satisfaction, $100K+ salary in 3 years",
    "constraints": "Family obligations, need stable income",
    "timeline": "6-12 months"
  }
}
```

**Business Decision**:
```json
{
  "title": "Launch SaaS Product",
  "category": "business",
  "description": "Launching a new B2B SaaS product",
  "context": {
    "current_situation": "Validated idea, 100 beta users",
    "goals": "1000 paying customers in year 1",
    "constraints": "$50K budget",
    "timeline": "12 months"
  }
}
```

**Finance Decision**:
```json
{
  "title": "Invest in Real Estate",
  "category": "finance",
  "description": "Purchasing first investment property",
  "context": {
    "current_situation": "$100K saved, stable income",
    "goals": "Passive income, long-term wealth",
    "constraints": "Limited real estate knowledge",
    "timeline": "3-6 months"
  }
}
```

---

## 🎯 Success Criteria

The MVP is ready for customer demo when:

✅ All test cases pass
✅ No critical bugs
✅ Performance acceptable
✅ Deployed and accessible via URL
✅ SSL certificate active
✅ At least 3 sample decisions created
✅ Scenarios generate successfully
✅ Mobile responsive

---

## 📞 Troubleshooting

If tests fail:

1. **Check Logs**:
   - Backend: Terminal output
   - Frontend: Browser console
   - Render: Service logs

2. **Verify Configuration**:
   - Environment variables
   - Database connection
   - API keys

3. **Clear Cache**:
   - Browser cache
   - Build cache
   - Node modules

4. **Restart Services**:
   - Backend server
   - Frontend dev server
   - Database

---

**Happy Testing!** 🧪

Once all tests pass, you're ready to deploy and demo to customers! 🚀

