# CRM Frontend UI Design Specification
> **Project:** `Frontend2/CA` — Vite + React + TypeScript + TailwindCSS  
> **Backend:** `http://localhost:5000/api` (dev) → `https://api.caavinash.in/api` (prod)  
> **Stack:** React Router, Axios/Fetch, Context API, Recharts, Sonner toasts

---

## 1. API Integration Setup (Do First)

### `src/utils/api.ts` — Central Axios Instance
```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Sends cookies (JWT) automatically
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attach Bearer token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

### `.env` File (Frontend2/CA)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=CA Avinash CRM
```

### CORS — No Errors Setup
The backend `app.js` already allows `http://localhost:5173`. The Vite dev port is `5173` by default — no extra setup needed. For production, add the deployed frontend URL to `CORS_ORIGIN` in backend `.env`.

---

## 2. New Routes to Add in `App.tsx`

These are the NEW CRM-specific routes to add inside `<Routes>`:

```tsx
// CRM — Tasks (admin)
<Route path="/admin/tasks" element={<AdminProtectedRoute><AdminTasks /></AdminProtectedRoute>} />

// CRM — Leads (admin)
<Route path="/admin/leads" element={<AdminProtectedRoute><AdminLeads /></AdminProtectedRoute>} />

// CRM — Orders (admin)
<Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />

// CRM — Notifications (admin)
<Route path="/admin/notifications" element={<AdminProtectedRoute><AdminNotifications /></AdminProtectedRoute>} />

// Client Portal — My Tasks
<Route path="/dashboard/tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />

// Client Portal — Notifications Bell
<Route path="/dashboard/notifications" element={<ProtectedRoute><MyNotifications /></ProtectedRoute>} />
```

---

## 3. Pages to Build

### A. Admin Panel — New Pages

#### `/admin/tasks` — `AdminTasks.tsx`
**API calls:**
- `GET /api/tasks/admin` — load all tasks (with filters: status, type, clientId)
- `POST /api/tasks/admin` — create task (modal form)
- `PUT /api/tasks/admin/:id` — update task status/priority
- `DELETE /api/tasks/admin/:id` — delete task
- `GET /api/tasks/admin/upcoming` — sidebar upcoming deadlines widget

**UI Layout:**
- Left: Filter bar (Status | Type | Priority | Client dropdown)
- Center: Kanban board OR table view toggle
  - Columns: `PENDING` | `IN_PROGRESS` | `COMPLETED`
  - Cards show: Client name, Task type badge (GST/ITR/ROC), Priority chip, Due date countdown
- FAB "+" button → slide-in drawer form:
  - Fields: Title, Description, Client (searchable dropdown), Assigned Staff, Type, Priority, Due Date

**Design:** Dark card background `#1a1a2e`, color-coded priority badges (red=URGENT, orange=HIGH, blue=MEDIUM, gray=LOW)

---

#### `/admin/leads` — `AdminLeads.tsx`
**API calls:**
- `GET /api/leads` — load all leads
- `POST /api/leads` — create lead
- `PUT /api/leads/:id` — update status
- `DELETE /api/leads/:id` — delete
- `GET /api/leads/stats` — pipeline funnel stats

**UI Layout:**
- Top: 3 stat cards — **New** (blue) | **Follow Up** (amber) | **Converted** (green)
- Center: Kanban pipeline board with 3 columns (NEW → FOLLOW_UP → CONVERTED)
  - Cards show: Name, Phone, Email, Interested Service, Source badge
  - Drag-to-advance (or status button) to move between columns
- Right sidebar: Pie chart (source breakdown using Recharts)

---

#### `/admin/orders` — `AdminOrders.tsx`
**API calls:**
- `GET /api/admin/orders` — list all orders
- `PUT /api/admin/orders/:id` — update order status + add admin note

**UI Layout:**
- Table view: Order #, Client name, Service name, Amount, Status badge, Created date, Action column
- Status badge colors: PENDING=gray, PROCESSING=blue, COMPLETED=green, CANCELLED=red
- Action: Dropdown select (PENDING → PROCESSING → COMPLETED) + text note input
- Clicking a row expands inline audit trail (notes field with ISO timestamps)

---

#### `/admin/notifications` — `AdminNotifications.tsx`
**API calls:**
- `POST /api/notifications/admin/create` — send targeted notification
- `POST /api/notifications/admin/broadcast` — send to all users
- `POST /api/notifications/admin/trigger-alerts` — auto-fire deadline alerts

**UI Layout:**
- Left: Form to compose notification (User picker, Message, Type: DEADLINE/PAYMENT/GENERAL)
- Right: Activity log of past broadcasts
- Bottom: Big "🔔 Trigger Deadline Alerts" button — scans tasks due in 24h

---

### B. Admin Dashboard Enhancements — `AdminDashboard.tsx`

**Add to existing dashboard:**
- `GET /api/admin/dashboard/stats` — already integrated
- **New widgets to add:**
  - Upcoming tasks card → `GET /api/tasks/admin/upcoming` (shows next 5 tasks due)
  - Lead pipeline mini funnel → `GET /api/leads/stats`

---

### C. Client Portal — New Pages

#### `/dashboard/tasks` — `MyTasks.tsx`
**API calls:**
- `GET /api/tasks/my-tasks`

**UI Layout:**
- Clean card list grouped by status
- Each card: Task title, Type badge (GST/ITR/ROC), Priority, Due date, Assigned CA name
- Empty state: "No tasks assigned yet"

---

#### `/dashboard/notifications` — `MyNotifications.tsx`
**API calls:**
- `GET /api/notifications/my`
- `PUT /api/notifications/my/:id/read`
- `PUT /api/notifications/my/read-all`
- `DELETE /api/notifications/my/:id`

**UI Layout:**
- Bell icon in the existing Dashboard navbar with unread count badge
- Dropdown list of notifications with:
  - DEADLINE → red left border
  - PAYMENT → green left border
  - GENERAL → blue left border
- "Mark all read" button at top

---

## 4. Enhancements to Existing Pages

### `AdminDashboard.tsx` — Add 2 new stat cards
```
[Total Clients] [Pending Tasks] [Upcoming Deadlines] [Revenue]
```

### `AdminUsers.tsx` — Enrich client profile view
- When clicking on a user, call `GET /api/admin/users/:id`
- Show full `UserProfile` data: PAN, GST, CIN, Industry, Turnover, ITR Type, TDS flag

### `Dashboard.tsx` (Client portal)
- Add sidebar "Tasks" link → `/dashboard/tasks`
- Add notification bell icon in top nav → `/dashboard/notifications`

---

## 5. Design System

| Token | Value |
|---|---|
| Primary | `#1e40af` (deep blue) |
| Accent | `#7c3aed` (purple) |
| Success | `#059669` |
| Warning | `#d97706` |
| Danger | `#dc2626` |
| Background | `#f8fafc` |
| Card | `#ffffff` |
| Dark card | `#1e293b` |
| Font | Inter (Google Fonts — already in project) |

**Style rules:**
- All admin cards: `rounded-xl shadow-sm border border-gray-100`
- Status badges: small pill, colored bg with matching text
- Buttons: `rounded-lg font-semibold px-4 py-2`
- Forms: card wrapper with labeled inputs, error states in red below each field
- Loading states: skeleton loaders (not spinners) for table rows

---

## 6. Error Handling Pattern (all pages)

```tsx
// Standard fetch pattern to use in all new pages
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  api.get('/tasks/admin')
    .then(res => setData(res.data.tasks))
    .catch(err => setError(err.response?.data?.error || 'Something went wrong'))
    .finally(() => setLoading(false));
}, []);
```

**Toast notifications (Sonner — already installed):**
```tsx
import { toast } from 'sonner';
toast.success('Task created!');
toast.error('Failed to update order');
```

---

## 7. Build Order (Recommended)

1. Create `src/utils/api.ts` and `.env` → 10 min
2. `AdminOrders.tsx` + wire to existing Admin sidebar → 30 min
3. `AdminTasks.tsx` (Kanban) → 45 min
4. `AdminLeads.tsx` (Pipeline) → 45 min
5. `MyTasks.tsx` + `MyNotifications.tsx` → 30 min
6. `AdminNotifications.tsx` → 20 min
7. Enhance `AdminDashboard.tsx` with upcoming tasks + lead stats → 20 min
8. Enhance `AdminUsers.tsx` client profile drawer → 20 min
