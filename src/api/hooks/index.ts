// Auth hooks
export { useLogin, useLogout, useProfile, useUpdateProfile, useVerifySession, authKeys } from './useAuth';

// Dashboard hooks
export { useDashboardStats, useGrowthAnalytics, useServicesAnalytics, useRevenueAnalytics, dashboardKeys } from './useDashboard';

// Users hooks
export { useUsers, useUser, useDeleteUser, userKeys } from './useUsers';

// Services hooks
export {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useServicePlans,
  useUpdateSinglePlan,
  useAddServicePlan,
  useDeleteServicePlan,
  useToggleServicePlan,
  useUpdateServicePlansBulk,
  serviceKeys
} from './useServices';

// Orders hooks
export { useOrders, useOrder, useUpdateOrderStatus, usePayments, useVerifyManualPayment, orderKeys } from './useOrders';

// Consultations hooks
export { useConsultations, useUpdateConsultation, useDeleteConsultation, consultationKeys } from './useConsultations';

// Tickets hooks
export { useTickets, useTicket, useUpdateTicket, useDeleteTicket, ticketKeys } from './useTickets';

// Leads hooks
export { useLeads, useLeadStats, useLead, useCreateLead, useUpdateLead, useDeleteLead, leadKeys } from './useLeads';

// HRMS hooks
export { 
  useTimesheets, 
  useMyTimesheets, 
  useLogTimesheet, 
  useApproveTimesheet,
  useEDiaryEntries,
  useMyEDiaryEntries,
  useLogDiaryEntry,
  useApproveDiaryEntry,
  useStipendLogs,
  useRecordStipend,
  hrmsKeys 
} from './useHRMS';

// Compliance hooks
export { 
  useComplianceItems, 
  useMyComplianceItems, 
  useCreateComplianceItem, 
  useUpdateComplianceItem, 
  useDeleteComplianceItem,
  complianceKeys 
} from './useCompliance';
