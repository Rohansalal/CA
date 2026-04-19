# 🔐 Admin Panel - Complete API Documentation

**Base URL**: `http://localhost:5000/api`  
**Admin Base**: `http://localhost:5000/api/admin`
**Frontend Admin Panel**: `http://localhost:3001` | `https://admin.caavinash.in`

All admin routes require admin authentication token in the Authorization header.

---

## 🌐 CORS Configuration for Frontend Integration

### Backend CORS Setup (.dev.vars)
```env
# Allow multiple origins for local development and production
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:3001,http://localhost:3003,https://admin.caavinash.in
```

### CORS Headers (Auto-configured in worker.js)
```javascript
Access-Control-Allow-Origin: {request_origin}  // Dynamic based on CORS_ORIGIN
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Frontend API Client Configuration
```typescript
// src/api/client.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  withCredentials: true,  // Required for cookies/auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Environment Variables (.env for Admin Panel)
```env
# Admin Panel Frontend
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=CA Admin Portal
VITE_APP_VERSION=1.0.0
```

---

## 🚀 Quick Start - Admin Panel Integration

### 1. Start Backend (Port 3001)
```bash
cd backend
npm run dev
# Cloudflare Workers runs on http://localhost:3001
```

### 2. Start Admin Panel (Port 3001)
```bash
cd admin
npm run dev
# Vite dev server runs on http://localhost:3001
```

### 3. No CORS Errors Expected
With the CORS configuration above, the admin panel on port 3001 can communicate with the backend on port 3001 without any CORS errors.

---

## 🔑 Admin Authentication APIs

### Admin Login (Frontend Integration)
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@caavinash.in",
  "password": "admin123"
}

Response: {
  "message": "Admin login successful",
  "admin": {
    "id": 1,
    "name": "Admin",
    "email": "admin@caavinash.in",
    "role": "SUPER_ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Frontend Usage:**
```typescript
const { mutate: login } = useLogin();
login({ email, password }, {
  onSuccess: (data) => {
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.admin));
    navigate('/dashboard');
  },
});
```

### Get Admin Profile
```http
GET /api/admin/profile
Authorization: Bearer {admin_token}

Response: {
  "admin": {
    "id": 1,
    "name": "Admin",
    "email": "admin@caavinash.in",
    "role": "SUPER_ADMIN",
    "permissions": ["all"]
  }
}
```

### Update Admin Profile
```http
PUT /api/admin/profile
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Updated Admin Name",
  "email": "newemail@caavinash.in"
}

Response: {
  "message": "Profile updated successfully",
  "admin": { ... }
}
```

### Logout (Clear Token)
```http
POST /api/auth/logout
Authorization: Bearer {admin_token}

Response: {
  "message": "Logged out successfully"
}
```

---

## 📊 Dashboard & Analytics APIs

### Get Dashboard Statistics
```http
GET /api/dashboard/admin
Authorization: Bearer {admin_token}

Response: {
  "stats": {
    "users": { "total": 150, "verified": 120 },
    "payments": { 
      "total": 200, 
      "success": 180, 
      "pending": 15, 
      "failed": 5, 
      "totalRevenue": 2500000 
    },
    "services": 47,
    "tickets": { 
      "total": 50, 
      "open": 10, 
      "inProgress": 15, 
      "resolved": 20, 
      "closed": 5 
    },
    "documents": 300
  },
  "recentActivity": {
    "users": [...],
    "payments": [...],
    "tickets": [...]
  }
}
```

### Get Growth Analytics
```http
GET /api/analytics/growth?period=6months
Authorization: Bearer {admin_token}

Response: {
  "userGrowth": [
    { "month": "2026-01", "users": 100 },
    { "month": "2026-02", "users": 150 }
  ],
  "revenueGrowth": [
    { "month": "2026-01", "revenue": 500000 },
    { "month": "2026-02", "revenue": 750000 }
  ]
}
```

### Get Services Analytics
```http
GET /api/analytics/services
Authorization: Bearer {admin_token}

Response: {
  "services": [
    { "serviceId": 1, "serviceName": "Pvt Ltd", "orderCount": 50, "revenue": 750000 }
  ]
}
```

---

## 📁 Category Management APIs

### Get All Categories (Paginated)
```http
GET /api/admin/categories?page=1&limit=10&search=registration
Authorization: Bearer {admin_token}

Response: {
  "categories": [...],
  "count": 6,
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "total": 6
  }
}
```

### Create Category
```http
POST /api/admin/categories
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "New Category",
  "slug": "new-category",
  "description": "Category description",
  "icon": "IconName",
  "order": 7
}

Response: {
  "message": "Category created successfully",
  "category": { ... }
}
```

### Update Category
```http
PUT /api/admin/categories/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "isActive": true,
  "order": 2
}

Response: {
  "message": "Category updated successfully",
  "category": { ... }
}
```

### Delete Category
```http
DELETE /api/admin/categories/:id
Authorization: Bearer {admin_token}

Response: {
  "message": "Category deleted successfully"
}
```

---

## 🛍️ Service Management APIs

### Get All Services (Paginated & Filtered)
```http
GET /api/admin/services?page=1&limit=10&categoryId=1&search=private&isActive=true
Authorization: Bearer {admin_token}

Response: {
  "services": [...],
  "count": 47,
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "total": 47
  }
}
```

### Create Service
```http
POST /api/admin/services
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "categoryId": 1,
  "name": "New Service",
  "slug": "new-service",
  "description": "Service description",
  "price": 9999,
  "features": ["Feature 1", "Feature 2"],
  "order": 11
}

Response: {
  "message": "Service created successfully",
  "service": { ... }
}
```

### Update Service
```http
PUT /api/admin/services/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Updated Service",
  "price": 12999,
  "isActive": true,
  "features": ["Updated Feature"]
}

Response: {
  "message": "Service updated successfully",
  "service": { ... }
}
```

### Delete Service
```http
DELETE /api/admin/services/:id
Authorization: Bearer {admin_token}

Response: {
  "message": "Service deleted successfully"
}
```

---

## 👥 User Management APIs

### Get All Users (Paginated & Searchable)
```http
GET /api/admin/users?page=1&limit=10&search=john&isVerified=true&sortBy=createdAt&sortOrder=desc
Authorization: Bearer {admin_token}

Response: {
  "users": [...],
  "count": 150,
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 15,
    "total": 150
  }
}
```

### Get User by ID (with Relations)
```http
GET /api/admin/users/:id
Authorization: Bearer {admin_token}

Response: {
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "payments": [...],
    "documents": [...],
    "tickets": [...],
    "orders": [...]
  }
}
```

### Delete User
```http
DELETE /api/admin/users/:id
Authorization: Bearer {admin_token}

Response: {
  "message": "User deleted successfully"
}
```

---

## 🛒 Order Management APIs

### Get All Orders (Paginated & Filtered)
```http
GET /api/admin/orders?page=1&limit=10&status=PENDING&userId=1
Authorization: Bearer {admin_token}

Response: {
  "orders": [...],
  "count": 100,
  "pagination": { ... }
}
```

### Get Order by ID
```http
GET /api/admin/orders/:id
Authorization: Bearer {admin_token}

Response: {
  "order": {
    "id": 1,
    "userId": 1,
    "status": "PROCESSING",
    "totalAmount": 14999,
    "items": [...],
    "payments": [...],
    "user": { ... }
  }
}
```

### Update Order Status
```http
PUT /api/admin/orders/:id/status
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "COMPLETED"
}

Response: {
  "message": "Order status updated",
  "order": { ... }
}
```

---

## 💳 Payment Management APIs

### Get All Payments (Paginated & Filtered)
```http
GET /api/admin/payments?page=1&limit=10&status=SUCCESS&userId=1
Authorization: Bearer {admin_token}

Response: {
  "payments": [...],
  "count": 200,
  "pagination": { ... }
}
```

### Verify Manual Payment
```http
POST /api/admin/payments/:id/verify
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "SUCCESS",
  "notes": "Payment verified via bank transfer"
}

Response: {
  "message": "Payment verified successfully",
  "payment": { ... }
}
```

---

## 📅 Consultation Management APIs

### Get All Consultations (Paginated)
```http
GET /api/admin/consultations?page=1&limit=10&status=NEW
Authorization: Bearer {admin_token}

Response: {
  "consultations": [...],
  "count": 50,
  "pagination": { ... }
}
```

### Update Consultation Status
```http
PUT /api/admin/consultations/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "FOLLOW_UP",
  "notes": "Follow up scheduled for next week"
}

Response: {
  "message": "Consultation updated",
  "consultation": { ... }
}
```

### Delete Consultation
```http
DELETE /api/admin/consultations/:id
Authorization: Bearer {admin_token}

Response: {
  "message": "Consultation deleted"
}
```

---

## 🎫 Ticket Management APIs

### Get All Tickets (Paginated & Filtered)
```http
GET /api/tickets?page=1&limit=10&status=OPEN&priority=HIGH
Authorization: Bearer {admin_token}

Response: {
  "tickets": [...],
  "count": 50,
  "pagination": { ... }
}
```

### Get Ticket by ID
```http
GET /api/tickets/:id
Authorization: Bearer {admin_token}

Response: {
  "ticket": { ... }
}
```

### Update Ticket (Status, Priority, Reply)
```http
PUT /api/tickets/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "adminReply": "We are working on your request."
}

Response: {
  "message": "Ticket updated successfully",
  "ticket": { ... }
}
```

### Delete Ticket
```http
DELETE /api/tickets/:id
Authorization: Bearer {admin_token}

Response: {
  "message": "Ticket deleted successfully"
}
```

---

## 📄 Document Management APIs

### Get All Documents (Paginated)
```http
GET /api/documents?page=1&limit=10&userId=1
Authorization: Bearer {admin_token}

Response: {
  "documents": [...],
  "count": 300,
  "pagination": { ... }
}
```

### Download Document
```http
GET /api/documents/:id/download
Authorization: Bearer {admin_token}

Response: File download (PDF, image, etc.)
```

---

## 📋 HRMS APIs

### Timesheets

#### Get All Timesheets
```http
GET /api/timesheets?page=1&limit=10&adminId=1&startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer {admin_token}

Response: {
  "timesheets": [...],
  "count": 100,
  "pagination": { ... }
}
```

#### Log Timesheet Entry
```http
POST /api/timesheets
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "clientId": 1,
  "date": "2026-01-15",
  "hoursWorked": 8,
  "description": "GST Filing work",
  "billable": true,
  "category": "GST"
}

Response: {
  "message": "Timesheet logged",
  "timesheet": { ... }
}
```

#### Approve Timesheet
```http
PUT /api/timesheets/:id/approve
Authorization: Bearer {admin_token}

Response: {
  "message": "Timesheet approved",
  "timesheet": { ... }
}
```

### E-Diary (Article Clerk)

#### Get All Diary Entries
```http
GET /api/e-diary?page=1&limit=10&articleId=1
Authorization: Bearer {admin_token}

Response: {
  "entries": [...],
  "count": 50,
  "pagination": { ... }
}
```

#### Log Diary Entry
```http
POST /api/e-diary
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "date": "2026-01-15",
  "taskDescription": "Learned GST filing process",
  "area": "TAXATION",
  "hoursSpent": 6,
  "clientId": 1
}

Response: {
  "message": "Entry logged",
  "entry": { ... }
}
```

#### Approve Diary Entry (Principal)
```http
PUT /api/e-diary/:id/approve
Authorization: Bearer {admin_token}

Response: {
  "message": "Entry approved by principal",
  "entry": { ... }
}
```

### Stipend Management

#### Get Stipend Logs
```http
GET /api/stipends?page=1&limit=10&articleId=1
Authorization: Bearer {admin_token}

Response: {
  "logs": [...],
  "count": 24,
  "pagination": { ... }
}
```

#### Record Stipend Payment
```http
POST /api/stipends
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "articleId": 1,
  "month": "2026-01",
  "amount": 5000,
  "paymentMethod": "Bank Transfer"
}

Response: {
  "message": "Stipend recorded",
  "stipend": { ... }
}
```

---

## 📊 Compliance Calendar APIs

### Get Compliance Items
```http
GET /api/compliance?page=1&limit=10&status=PENDING&type=GST
Authorization: Bearer {admin_token}

Response: {
  "items": [...],
  "count": 30,
  "pagination": { ... }
}
```

### Create Compliance Item
```http
POST /api/compliance
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "GST Filing - Jan 2026",
  "complianceType": "GST",
  "dueDate": "2026-02-20",
  "description": "Monthly GST return filing",
  "isRecurring": true,
  "recurringPeriod": "MONTHLY"
}

Response: {
  "message": "Compliance item created",
  "item": { ... }
}
```

### Update Compliance Status
```http
PUT /api/compliance/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "COMPLETED",
  "completedAt": "2026-02-15"
}

Response: {
  "message": "Compliance updated",
  "item": { ... }
}
```

### Delete Compliance Item
```http
DELETE /api/compliance/:id
Authorization: Bearer {admin_token}

Response: {
  "message": "Compliance item deleted"
}
```

---

## 🎯 Lead Management APIs

### Get All Leads (Paginated & Filtered)
```http
GET /api/leads?page=1&limit=10&status=NEW&source=Website
Authorization: Bearer {admin_token}

Response: {
  "leads": [...],
  "count": 100,
  "pagination": { ... }
}
```

### Get Lead Stats (Pipeline)
```http
GET /api/leads/stats
Authorization: Bearer {admin_token}

Response: {
  "total": 100,
  "new": 30,
  "followUp": 40,
  "converted": 20,
  "lost": 10,
  "conversionRate": 20
}
```

### Create Lead
```http
POST /api/leads
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "companyName": "ABC Corp",
  "interestedService": "Private Limited Company",
  "notes": "Interested in business registration"
}

Response: {
  "message": "Lead created",
  "lead": { ... }
}
```

### Update Lead Status
```http
PUT /api/leads/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "FOLLOW_UP",
  "notes": "Called client, follow up next week"
}

Response: {
  "message": "Lead updated",
  "lead": { ... }
}
```

### Delete Lead
```http
DELETE /api/leads/:id
Authorization: Bearer {admin_token}

Response: {
  "message": "Lead deleted"
}
```

---

**Version**: 2.0.0  
**Last Updated**: 2026-02-06  
**Status**: ✅ Production Ready
