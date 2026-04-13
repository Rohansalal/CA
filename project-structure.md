# Project Structure

This document describes the main folders and files in the project.

## Structure demonstration

The following section explains the code organization line by line, so you can see how each part works together.

1. `main.tsx` is the app entry point. It mounts the React tree and wraps the app with `HelmetProvider` and global SEO.
2. `App.tsx` contains the main route configuration, shared layouts, and context providers.
3. `src/components/` contains public site pages and reusable UI components.
4. `src/user-panel/` contains authenticated user pages, auth logic, and cart state.
5. `src/admin-panel/` contains internal admin pages and admin-specific context.
6. `src/super-admin/` contains super-admin pages and context.
7. `src/contexts/`, `src/data/`, `src/styles/`, `src/types/`, and `src/utils/` hold shared logic, static data, styles, types, and helpers.

A line-by-line view of how the app works at runtime:

- The browser loads `src/main.tsx`.
- `main.tsx` renders `App` inside React strict mode.
- `App.tsx` wraps the app with `AuthProvider`, `AdminProvider`, `SuperAdminProvider`, and `CartProvider`.
- `App.tsx` defines public and protected routes via React Router.
- Public UI pages render from `src/components/`.
- User-panel pages render from `src/user-panel/pages/` and use `AuthContext`.
- Admin-panel pages render from `src/admin-panel/pages/` and use `AdminContext`.
- Super-admin pages render from `src/super-admin/pages/` and use `SuperAdminContext`.

## Top-level files

- `README.md` - Basic project introduction and setup instructions.
- `package.json` - Node dependencies, scripts, and package metadata.
- `tsconfig.json` - TypeScript configuration.
- `vite.config.ts` - Vite configuration for development and build.
- `public/` - Static assets served by Vite.
- `src/` - Application source code.
- `project.md` - High-level project summary.
- `project-structure.md` - This file.

## `src/` directory

The main application code lives under `src/`.

### Root files

- `App.tsx` - Central route and layout orchestration.
- `main.tsx` - App entry point that mounts React.
- `index.css` - Global styles.

### `src/components/`

General UI and page components used by the public-facing site.

- `AboutUs.tsx`
- `ContactUs.tsx`
- `FAQ.tsx`
- `Home.tsx`
- `Industries.tsx`
- `Services.tsx`
- `Resources.tsx`
- `Testimonials.tsx`
- `WhyChooseUs.tsx`
- `Navigation.tsx`
- `Footer.tsx`
- `ScrollToTop.tsx`
- `SEO.tsx`
- `mode-toggle.tsx`
- `theme-provider.tsx`
- `ConsultingForm.tsx`, `ConsultingFormNew.tsx`
- `ProfessionalSearchBarNew.tsx`

#### `src/components/common/`

Reusable small UI components:

- `BackButton.tsx`
- `CookieConsent.tsx`
- `CrispChat.tsx`
- `CTASection.tsx`
- `HeroSection.tsx`
- `ProfessionalSearchBarNew.tsx`
- `ServiceCard.tsx`
- `WhatsAppButton.tsx`

#### `src/components/pages/`

Contains page components for section-specific content such as privacy and terms.

#### `src/components/services/`

Contains service-related UI components.

#### `src/components/ui/`

Contains shared UI building blocks and presentation components.

### `src/admin-panel/`

Admin interface for internal users.

- `components/`
  - `AdminLayout.tsx`
  - `AdminLayout-new.tsx`
  - `AdminProtectedRoute.tsx`
  - `tasks/` - admin task-specific components
- `contexts/`
  - `AdminContext.tsx`
- `pages/`
  - `AdminAnalytics.tsx`
  - `AdminAssets.tsx`
  - `AdminCRM.tsx`
  - `AdminDashboard.tsx`
  - `AdminDashboard-new.tsx`
  - `AdminHRMS.tsx`
  - `AdminITR.tsx`
  - `AdminLeads.tsx`
  - `AdminLogin.tsx`
  - `AdminNotifications.tsx`
  - `AdminOrders.tsx`
  - `AdminPayments.tsx`
  - `AdminProfile.tsx`
  - `AdminServices.tsx`
  - `AdminTasks.tsx`
  - `AdminTickets.tsx`
  - `AdminUsers.tsx`
  - `AdminUsersServices.tsx`

### `src/user-panel/`

User-facing authenticated area and auth flows.

- `components/`
  - `ProtectedRoute.tsx`
  - `auth/` - auth related UI components
- `contexts/`
  - `AuthContext.tsx`
  - `CartContext.tsx`
- `pages/`
  - `Cart.tsx`
  - `Dashboard.tsx`
  - `Login.tsx`
  - `Register.tsx`
  - `OTPVerification.tsx`
  - `ForgotPassword.tsx`
  - `UserProfile.tsx`
  - `OrderDocuments.tsx`
  - `OrderRequirements.tsx`
  - `OrderSubmitDetails.tsx`
  - `MyTasks.tsx`
  - `MyNotifications.tsx`
  - `ItrBasicFormPage.tsx`
  - `ItrStandardFormPage.tsx`
  - `ItrPremiumFormPage.tsx`
  - `DirectorshipsSection.tsx`
  - `ForeignIncomeSection.tsx`

#### How to improve `src/user-panel/`

- Split the user-panel into feature subfolders, for example:
  - `auth/` for login, register, forgot password, OTP, and auth UI.
  - `orders/` for order pages such as documents, requirements, and submit details.
  - `profile/` for profile and account management pages.
  - `itr/` for tax form flows and related sections.
  - `tasks/` or `notifications/` for user-specific workflow pages.
- Add a dedicated `hooks/` folder for user-panel hooks like `useAuth`, `useCart`, and `useOrders`.
- Add `services/` or `api/` under `src/user-panel/` for API calls and request logic instead of placing it in generic shared utilities.
- Introduce `types/` inside `src/user-panel/` for user-panel-specific types and API interfaces.
- Use a shared user layout component such as `UserPanelLayout.tsx` to wrap dashboard pages and preserve consistent navigation.
- Lazy-load user-panel routes in `App.tsx` to reduce initial bundle size and improve performance.
- Consolidate auth state and cart state only where it makes sense, then keep page state local to each feature.
- Standardize file naming so pages and sections are grouped by feature rather than by page type.

### `src/contexts/`

Shared application contexts for cross-cutting state.

### `src/data/`

Holds service definitions and static data.

### `src/styles/`

Global style utilities and theme-related CSS.

### `src/types/`

Type definitions for shared data models.

### `src/utils/`

Utility functions and API helpers.

## Notes

- The project uses a modular source layout with separate directories for public pages, user/admin flows, and reusable UI components.
- `App.tsx` is the main routing file and should be simplified in the future by moving route configuration into dedicated route modules.

This structure file should help you understand the code organization and where to add new features.