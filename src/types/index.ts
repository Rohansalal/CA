// ============================================
// AUTH TYPES
// ============================================

export interface AdminUser {
  id: number;
  adminId?: number;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'ARTICLE';
  isAdmin: boolean;
  name: string;
  email: string;
  avatar?: string;
  permissions?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
  role?: string;
  kycStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  payments?: Payment[];
  documents?: Document[];
  tickets?: Ticket[];
}

export interface UsersListResponse {
  users: User[];
  count: number;
}

export interface UserFilters {
  search?: string;
  isVerified?: boolean;
  page?: number;
  limit?: number;
}

// ============================================
// CLIENT / CRM TYPES (UAE Business Context)
// ============================================

export interface Client {
  id: number;
  name: string;                   // Business / individual name
  licenseNumber?: string;         // e.g. AD543AX
  licenseType?: string;           // Trade License type
  licenseExpiry?: string;         // ISO date
  emiratesId?: string;
  emiratesIdExpiry?: string;
  passportNumber?: string;
  passportExpiry?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  emirate?: string;               // Abu Dhabi | Dubai | Sharjah ...
  country?: string;
  clientType?: 'INDIVIDUAL' | 'COMPANY' | 'LLC' | 'SOLE_PROPRIETORSHIP' | 'PARTNERSHIP';
  industry?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PROSPECT';
  kycStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
  assignedTo?: number;            // Admin ID
  notes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  parties?: Party[];
  entities?: Entity[];
}

export interface ClientsListResponse {
  clients: Client[];
  count: number;
}

export interface ClientFilters {
  search?: string;
  status?: string;
  kycStatus?: string;
  page?: number;
  limit?: number;
}

// ============================================
// PARTY TYPES
// ============================================

export interface Party {
  id: number;
  clientId?: number;
  name: string;
  role?: string;                  // Director | Shareholder | Manager | Authorized Signatory
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: string;
  emiratesId?: string;
  emiratesIdExpiry?: string;
  email?: string;
  phone?: string;
  ownershipPercentage?: number;
  isPrimary?: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  client?: Pick<Client, 'id' | 'name'>;
}

export interface PartiesListResponse {
  parties: Party[];
  count: number;
}

// ============================================
// ENTITY TYPES
// ============================================

export interface Entity {
  id: number;
  clientId?: number;
  name: string;
  entityType?: string;            // LLC | Sole Prop | Branch | Freezone | Offshore
  registrationNumber?: string;
  licenseNumber?: string;
  licenseAuthority?: string;      // DED | ADBC | DIFC | RAKICC ...
  licenseExpiry?: string;
  incorporationDate?: string;
  address?: string;
  emirate?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'CANCELLED';
  createdAt: string;
  client?: Pick<Client, 'id' | 'name'>;
}

export interface EntitiesListResponse {
  entities: Entity[];
  count: number;
}

// ============================================
// EXPIRY TRACKING TYPES
// ============================================

export type ExpiryStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'RENEWAL_IN_PROGRESS';

export interface TradeLicense {
  id: number;
  clientId: number;
  name: string;                   // License holder / business name
  referenceNumber: string;        // e.g. AD543AX
  issuingAuthority?: string;      // DED | ADDED | ADBC
  licenseType?: string;           // Commercial | Industrial | Professional
  issueDate?: string;
  expiryDate: string;
  status: ExpiryStatus;
  renewalFee?: number;
  notes?: string;
  createdAt: string;
  client?: Pick<Client, 'id' | 'name'>;
  daysUntilExpiry?: number;
}

export interface EmiratesID {
  id: number;
  clientId?: number;
  partyId?: number;
  name: string;
  idNumber: string;               // e.g. 784-XXXX-XXXXXXX-X
  nationality?: string;
  expiryDate: string;
  status: ExpiryStatus;
  createdAt: string;
  client?: Pick<Client, 'id' | 'name'>;
  party?: Pick<Party, 'id' | 'name'>;
  daysUntilExpiry?: number;
}

export interface PassportRecord {
  id: number;
  clientId?: number;
  partyId?: number;
  name: string;
  passportNumber: string;
  nationality?: string;
  dateOfBirth?: string;
  issueDate?: string;
  expiryDate: string;
  status: ExpiryStatus;
  createdAt: string;
  client?: Pick<Client, 'id' | 'name'>;
  party?: Pick<Party, 'id' | 'name'>;
  daysUntilExpiry?: number;
}

export interface TaxReturn {
  id: number;
  clientId: number;
  taxType: string;                // VAT | Corporate Tax | Excise
  period: string;                 // e.g. Q1 2025 | FY 2024-25
  dueDate: string;
  filingDate?: string;
  status: 'PENDING' | 'FILED' | 'OVERDUE' | 'EXTENDED';
  amount?: number;
  penaltyAmount?: number;
  notes?: string;
  createdAt: string;
  client?: Pick<Client, 'id' | 'name'>;
  daysUntilDue?: number;
}

export interface ExpirySummary {
  tradeLicenses: { total: number; expiringSoon: number; expired: number };
  emiratesIds: { total: number; expiringSoon: number; expired: number };
  passports: { total: number; expiringSoon: number; expired: number };
  taxReturns: { total: number; overdue: number; dueSoon: number };
  totalItems: number;
  attentionRequired: number;
}

// ============================================
// LEAD TYPES (Extended for CRM)
// ============================================

export interface Lead {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  source?: string;
  channelId?: number;
  interestedService?: string;
  status: 'NEW' | 'FOLLOW_UP' | 'FEE_FINALIZATION' | 'CONVERTED' | 'CLOSED_WON' | 'LOST';
  notes?: string;
  assignedTo?: number;
  expectedValue?: number;
  createdAt: string;
  updatedAt?: string;
  channel?: Pick<LeadChannel, 'id' | 'name'>;
}

export interface LeadPipelineStats {
  total: number;
  new: number;
  followUp: number;
  feeFinalization: number;
  converted: number;
  closedWon: number;
  lost: number;
  conversionRate: number;
  totalValue?: number;
}

// ============================================
// FEE FINALIZATION TYPES
// ============================================

export interface FeeFinalization {
  id: number;
  leadId?: number;
  clientId?: number;
  serviceName: string;
  proposedFee: number;
  finalFee?: number;
  currency?: string;              // AED | USD | INR
  status: 'DRAFT' | 'SENT' | 'NEGOTIATING' | 'ACCEPTED' | 'REJECTED' | 'INVOICED';
  sentAt?: string;
  acceptedAt?: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  lead?: Pick<Lead, 'id' | 'name'>;
  client?: Pick<Client, 'id' | 'name'>;
}

export interface FeeFinalizationsListResponse {
  feeFinalizaions: FeeFinalization[];
  count: number;
}

// ============================================
// LEAD CHANNEL TYPES
// ============================================

export interface LeadChannel {
  id: number;
  name: string;                   // WhatsApp | Website | Referral | Social Media | Walk-in
  description?: string;
  isActive: boolean;
  leadsCount?: number;
  conversionRate?: number;
  createdAt: string;
}

export interface LeadChannelsListResponse {
  channels: LeadChannel[];
  count: number;
}

// ============================================
// PARTNER TYPES
// ============================================

export interface Partner {
  id: number;
  name: string;
  type?: string;                  // Referral | Technology | Accounting | Legal
  contactName?: string;
  email?: string;
  phone?: string;
  website?: string;
  commissionRate?: number;        // percentage
  totalReferrals?: number;
  totalRevenue?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PartnersListResponse {
  partners: Partner[];
  count: number;
}

// ============================================
// EMPLOYEE TYPES (HRMS)
// ============================================

export interface Employee {
  id: number;
  adminId?: number;
  name: string;
  email: string;
  phone?: string;
  role: string;                   // ARTICLE | ACCOUNTANT | MANAGER | ADMIN
  designation?: string;
  department?: string;
  joinDate?: string;
  salary?: number;
  stipendAmount?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
  createdAt: string;
}

// ============================================
// SERVICE TYPES
// ============================================

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  services?: Service[];
}

export type Category = ServiceCategory;

export interface Service {
  id: number;
  categoryId: number;
  parentServiceId?: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  category?: ServiceCategory;
  plans?: ServicePlan[];
}

export interface ServicesListResponse {
  services: Service[];
  count: number;
}

export interface ServicePlan {
  id: number;
  serviceId: number;
  planType: 'BASIC' | 'STANDARD' | 'PREMIUM' | 'ELITE' | 'CUSTOM';
  price: number;
  discountedPrice?: number;
  shortTitle?: string;
  scopeSummary?: string;
  isActive: boolean;
  displayOrder: number;
  scopes?: PlanScope[];
}

export interface PlanScope {
  id: number;
  planId: number;
  title?: string;
  description?: string;
  isIncluded: boolean;
}

// ============================================
// ORDER TYPES
// ============================================

export interface Order {
  id: number;
  userId: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'PAID';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  payments?: Payment[];
  user?: { id: number; name: string; email: string };
}

export interface OrdersListResponse {
  orders: Order[];
  count: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  serviceId: number;
  planId: number;
  quantity: number;
  price: number;
  planType?: string;
  service?: Service;
  plan?: ServicePlan;
}

export interface Payment {
  id: number;
  userId: number;
  orderRefId?: number;
  amount: number | string;
  status: 'CREATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  method?: string;
  createdAt: string;
}

// ============================================
// CONSULTATION TYPES
// ============================================

export interface Consultation {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  preferredContact: string;
  clientType: string;
  businessName?: string;
  industry: string;
  annualTurnover: string;
  services: string | string[];
  description: string;
  status: 'NEW' | 'FOLLOW_UP' | 'CONVERTED' | 'LOST';
  createdAt: string;
  updatedAt?: string;
}

export interface ConsultationsListResponse {
  consultations: Consultation[];
  count: number;
}

// ============================================
// TICKET TYPES
// ============================================

export interface Ticket {
  id: number;
  userId: number;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string;
  updatedAt?: string;
  user?: User;
}

export interface TicketsListResponse {
  tickets?: Ticket[];
  count?: number;
}

// ============================================
// DOCUMENT TYPES
// ============================================

export interface Document {
  id: number;
  userId: number;
  orderId?: number;
  fileName: string;
  fileType: string;
  fileSize?: number;
  documentType?: string;
  filePath?: string;
  category?: string;
  createdAt?: string;
  uploadedAt?: string;
}

export interface DocumentsListResponse {
  documents: Document[];
  count: number;
}

// ============================================
// HRMS TYPES
// ============================================

export interface Timesheet {
  id: number;
  adminId: number;
  userId?: number;
  clientId?: number;
  taskId?: number;
  orderId?: number;
  date: string;
  hours?: number;
  hoursWorked?: number;
  description?: string;
  billable: boolean;
  billableRate?: number;
  category?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: number;
  approvedAt?: string;
  user?: { name: string; email: string };
}

export interface EDiaryEntry {
  id: number;
  articleId: number;
  date: string;
  taskDescription: string;
  area?: string;
  hoursSpent?: number;
  clientId?: number;
  remarks?: string;
  principalId?: number;
  principalApproved?: boolean;
  principalApprovedAt?: string;
}

export interface StipendLog {
  id: number;
  articleId: number;
  month: string;
  amount: number;
  paymentMethod?: string;
  paidAt?: string;
  status: 'PENDING' | 'PAID';
}

// ============================================
// COMPLIANCE TYPES
// ============================================

export interface ComplianceItem {
  id: number;
  userId?: number;
  title: string;
  description?: string;
  complianceType?: string;
  dueDate?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  isRecurring?: boolean;
  recurringPeriod?: string;
  createdAt: string;
  updatedAt?: string;
}

// ============================================
// TASK TYPES
// ============================================

export interface Task {
  id: number;
  title: string;
  description?: string;
  assignedTo?: number;
  clientId?: number;
  orderId?: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  assignee?: { id: number; name: string };
  client?: Pick<Client, 'id' | 'name'>;
}

export interface TasksListResponse {
  tasks: Task[];
  count: number;
}

// ============================================
// WORKFLOW TEMPLATE TYPES
// ============================================

export interface WorkflowTemplate {
  id: number;
  name: string;
  description?: string;
  serviceId?: number;
  steps: WorkflowStep[];
  isActive: boolean;
  usageCount?: number;
  createdAt: string;
  service?: Pick<Service, 'id' | 'name'>;
}

export interface WorkflowStep {
  id: number;
  templateId: number;
  order: number;
  title: string;
  description?: string;
  type: 'DOCUMENT_UPLOAD' | 'FORM_FILL' | 'APPROVAL' | 'PAYMENT' | 'REVIEW' | 'CUSTOM';
  isRequired: boolean;
  config?: Record<string, unknown>;
}

export interface WorkflowTemplatesListResponse {
  templates: WorkflowTemplate[];
  count: number;
}

// ============================================
// ANALYTICS / DASHBOARD TYPES
// ============================================

export interface DashboardStats {
  users: { total: number; verified: number };
  payments: { total: number; success: number; pending: number; failed: number; totalRevenue: number };
  services: number;
  tickets: { total: number; open: number; inProgress: number; resolved: number; closed: number };
  documents: number;
  // Extended CRM stats
  clients?: { total: number; active: number };
  leads?: { total: number; new: number; feeFinalization: number };
  tasks?: { total: number; active: number; overdue: number };
  employees?: { total: number; active: number };
}

export interface RecentActivity {
  users: Array<{ id: number; name: string; email: string; createdAt: string }>;
  payments: Payment[];
  tickets: Ticket[];
  leads?: Lead[];
  clients?: Array<{ id: number; name: string; licenseNumber?: string; status: string; createdAt: string }>;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivity;
  timestamp: string;
}

export interface GrowthDataPoint {
  name: string;
  users: number;
  revenue: number;
  clients?: number;
  renewals?: number;
}

export interface GrowthAnalyticsResponse {
  growth: GrowthDataPoint[];
}

export interface ServiceAnalyticPoint {
  id: number;
  name: string;
  totalPurchases: number;
  totalRevenue: number;
  planBreakdown: Record<string, number>;
}

export interface ServiceAnalyticsResponse {
  analytics: ServiceAnalyticPoint[];
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  issues?: { field: string; message: string }[];
}

export interface PaginatedResponse<T> {
  items: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}
