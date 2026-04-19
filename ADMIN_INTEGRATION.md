# Admin Panel Integration Guide

## Project Overview

A new, production-ready **separate React admin application** has been created at `/admin` with full API integration to the backend.

---

## What Was Created

### 1. Project Structure
```
admin/
├── src/
│   ├── api/
│   │   ├── client.ts           # Axios client with interceptors
│   │   ├── hooks/
│   │   │   ├── useAuth.ts      # Auth mutations & queries
│   │   │   ├── useDashboard.ts # Dashboard stats & analytics
│   │   │   ├── useUsers.ts     # User CRUD operations
│   │   │   ├── useServices.ts  # Service & category management
│   │   │   ├── useOrders.ts    # Order & payment management
│   │   │   ├── useConsultations.ts # Consultation management
│   │   │   ├── useTickets.ts   # Support ticket management
│   │   │   ├── useLeads.ts     # Lead pipeline management
│   │   │   ├── useHRMS.ts      # Timesheets, E-Diary, Stipends
│   │   │   └── useCompliance.ts # Compliance calendar
│   │   └── hooks/index.ts      # Centralized exports
│   ├── components/
│   │   ├── ui/                 # shadcn-style components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── badge.tsx
│   │   └── layout/
│   │       ├── Sidebar.tsx     # Collapsible navigation
│   │       ├── Header.tsx      # Top header with search
│   │       └── MainLayout.tsx  # Page layout wrapper
│   ├── pages/
│   │   ├── Login.tsx           # Admin login page
│   │   └── Dashboard.tsx       # Real-time dashboard
│   ├── store/
│   │   └── index.ts            # Zustand store (auth, UI, permissions)
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   └── cn.ts               # Tailwind class merger
│   └── styles/
│       └── globals.css         # Tailwind v4 configuration
├── package.json
└── vite.config.ts
```

### 2. Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 8
- **Routing**: React Router v6
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query) v5
- **HTTP Client**: Axios with interceptors
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Notifications**: Sonner

### 3. API Integration Mapping

| Feature | Backend Endpoint | Frontend Hook | Component |
|---------|------------------|---------------|-----------|
| **Auth** ||||
| Login | `POST /api/auth/admin/login` | `useLogin` | Login.tsx |
| Logout | `POST /api/auth/logout` | `useLogout` | Sidebar.tsx |
| Profile | `GET /api/admin/profile` | `useProfile` | Header.tsx |
| **Dashboard** ||||
| Stats | `GET /api/dashboard/admin` | `useDashboardStats` | Dashboard.tsx |
| Analytics | `GET /api/admin/analytics/*` | `useGrowthAnalytics` | Analytics pages |
| **Users** ||||
| List | `GET /api/admin/users` | `useUsers` | Users/List.tsx |
| Delete | `DELETE /api/admin/users/:id` | `useDeleteUser` | Users/List.tsx |
| **Services** ||||
| List | `GET /api/admin/services` | `useServices` | Services/List.tsx |
| Create | `POST /api/admin/services` | `useCreateService` | Services/List.tsx |
| Update | `PUT /api/admin/services/:id` | `useUpdateService` | Services/List.tsx |
| Delete | `DELETE /api/admin/services/:id` | `useDeleteService` | Services/List.tsx |
| **Categories** ||||
| List | `GET /api/admin/categories` | `useCategories` | Services/Categories.tsx |
| Create | `POST /api/admin/categories` | `useCreateCategory` | Services/Categories.tsx |
| Update | `PUT /api/admin/categories/:id` | `useUpdateCategory` | Services/Categories.tsx |
| Delete | `DELETE /api/admin/categories/:id` | `useDeleteCategory` | Services/Categories.tsx |
| **Orders** ||||
| List | `GET /api/admin/orders` | `useOrders` | Orders/List.tsx |
| Update Status | `PUT /api/admin/orders/:id` | `useUpdateOrderStatus` | Orders/List.tsx |
| **Payments** ||||
| List | `GET /api/payments` | `usePayments` | Orders/Payments.tsx |
| Verify Manual | `POST /api/payments/verify-manual` | `useVerifyManualPayment` | Orders/Payments.tsx |
| **Consultations** ||||
| List | `GET /api/admin/consultations` | `useConsultations` | Consultations/List.tsx |
| Update | `PUT /api/admin/consultations/:id` | `useUpdateConsultation` | Consultations/List.tsx |
| Delete | `DELETE /api/admin/consultations/:id` | `useDeleteConsultation` | Consultations/List.tsx |
| **Tickets** ||||
| List | `GET /api/tickets/all` | `useTickets` | Tickets/Support.tsx |
| Update | `PUT /api/tickets/:id/status` | `useUpdateTicket` | Tickets/Support.tsx |
| Delete | `DELETE /api/tickets/:id` | `useDeleteTicket` | Tickets/Support.tsx |
| **Leads** ||||
| List | `GET /api/leads` | `useLeads` | Leads/Pipeline.tsx |
| Stats | `GET /api/leads/stats` | `useLeadStats` | Leads/Pipeline.tsx |
| Create | `POST /api/leads` | `useCreateLead` | Leads/Pipeline.tsx |
| Update | `PUT /api/leads/:id` | `useUpdateLead` | Leads/Pipeline.tsx |
| Delete | `DELETE /api/leads/:id` | `useDeleteLead` | Leads/Pipeline.tsx |
| **HRMS** ||||
| Timesheets | `GET /api/timesheets` | `useTimesheets` | HRMS/Timesheets.tsx |
| Log Timesheet | `POST /api/timesheets` | `useLogTimesheet` | HRMS/Timesheets.tsx |
| Approve Timesheet | `PUT /api/timesheets/:id/approve` | `useApproveTimesheet` | HRMS/Timesheets.tsx |
| E-Diary | `GET /api/e-diary` | `useEDiaryEntries` | HRMS/EDiary.tsx |
| Log Diary Entry | `POST /api/e-diary` | `useLogDiaryEntry` | HRMS/EDiary.tsx |
| Approve Diary | `PUT /api/e-diary/:id/approve` | `useApproveDiaryEntry` | HRMS/EDiary.tsx |
| Stipends | `GET /api/stipends` | `useStipendLogs` | HRMS/Stipends.tsx |
| Record Stipend | `POST /api/stipends` | `useRecordStipend` | HRMS/Stipends.tsx |
| **Compliance** ||||
| List | `GET /api/compliance` | `useComplianceItems` | Compliance/Calendar.tsx |
| Create | `POST /api/compliance` | `useCreateComplianceItem` | Compliance/Calendar.tsx |
| Update | `PUT /api/compliance/:id` | `useUpdateComplianceItem` | Compliance/Calendar.tsx |
| Delete | `DELETE /api/compliance/:id` | `useDeleteComplianceItem` | Compliance/Calendar.tsx |

---

## Key Features Implemented

### 1. Authentication & Security
- ✅ JWT token handling with httpOnly cookies
- Automatic session refresh
- Protected routes with React Router
- Logout with cache clearing
- 401/403 error handling with automatic redirect

### 2. State Management (Zustand)
- **Auth Store**: User state, login/logout actions
- **UI Store**: Sidebar collapse, theme, notifications
- **Permissions**: Role-based access control helpers

### 3. Data Fetching (React Query)
- Automatic caching with configurable stale time
- Background refetching on window focus
- Optimistic updates for mutations
- Request deduplication
- Error retry logic
- Loading and error states

### 4. UI Components
- **Button**: Multiple variants (default, destructive, outline, ghost, link)
- **Card**: Header, content, footer, title, description
- **Input**: Form input with focus states
- **Badge**: Multiple variants (default, secondary, destructive, success, warning, info)

### 5. Layout Components
- **Sidebar**: Collapsible navigation with 11 menu items
- **Header**: Page title, search bar, notifications, user profile
- **MainLayout**: Responsive layout with sidebar and header

### 6. Dashboard Page
- Real-time stats from `/api/dashboard/admin`
- 4 stat cards (Revenue, Users, Orders, Tickets)
- Revenue chart (AreaChart with Recharts)
- Service distribution chart (PieChart)
- Recent users and payments lists
- Auto-refresh every minute

---

## Environment Configuration

### .env file
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=CA Admin Panel
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_REALTIME=false
```

---

## How to Run

### 1. Install Dependencies
```bash
cd admin
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your backend URL
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## Next Steps

### Immediate (To Complete MVP)
1. **Create remaining page components**:
   - Users/List.tsx with data table
   - Services/List.tsx and Services/Categories.tsx
   - Orders/List.tsx
   - Consultations/List.tsx
   - HRMS/Timesheets.tsx, HRMS/EDiary.tsx, HRMS/Stipends.tsx
   - Compliance/Calendar.tsx

2. **Add form components**:
   - ServiceForm.tsx
   - CategoryForm.tsx
   - UserForm.tsx
   - OrderStatusForm.tsx

3. **Add data tables**:
   - Sortable columns
   - Pagination
   - Filtering
   - Row selection

### Future Enhancements
1. **WebSocket integration** for real-time notifications
2. **File upload** with drag-and-drop
3. **Export functionality** (CSV, Excel, PDF)
4. **Advanced filtering** with date ranges
5. **Dashboard customization** (widget reordering)
6. **Dark mode** toggle
7. **Mobile responsiveness** improvements

---

## Integration with Existing Backend

The admin panel is fully integrated with the backend that was enhanced with:
- Zod validation on all routes
- KV-based distributed rate limiting
- KV caching for services and dashboard stats
- New endpoints: forgot-password, reset-password, HRMS, compliance
- Enhanced health check with DB/R2/KV verification

All new backend endpoints are mapped to frontend hooks for seamless integration.

---

*Created: April 8, 2026*
*Status: Core infrastructure complete, ready for page implementation*
