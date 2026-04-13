# CA Services Platform - Complete Dynamic Form Implementation

## Overview
This document provides the complete implementation guide for a dynamic form system that handles **48 different CA services** with unique form fields, document requirements, and validation rules per service and plan type (BASIC, STANDARD, PREMIUM, ELITE).

---

## Table of Contents
1. [Database Schema (Cloudflare D1)](#1-database-schema-cloudflare-d1)
2. [Backend API Implementation](#2-backend-api-implementation)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Dynamic Form Components](#4-dynamic-form-components)
5. [Service-Specific Form Examples](#5-service-specific-form-examples)
6. [Implementation Steps](#6-implementation-steps)
7. [Migration from Hardcoded Forms](#7-migration-from-hardcoded-forms)

---

## 1. Database Schema (Cloudflare D1)

### 1.1 Core Tables

```sql
-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,              -- 'gst-registration', 'itr-filing'
    name TEXT NOT NULL,                     -- 'GST Registration'
    category TEXT NOT NULL,                 -- 'tax-registrations', 'business-registrations'
    description TEXT,
    short_description TEXT,                 -- For cards/listings
    icon TEXT,                              -- Lucide icon name
    color TEXT DEFAULT 'blue',              -- Brand color
    processing_time TEXT,                   -- '2-3 days', '1 week'
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SERVICE PLANS TABLE
-- ============================================
CREATE TABLE service_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    plan_type TEXT NOT NULL CHECK(plan_type IN ('BASIC', 'STANDARD', 'PREMIUM', 'ELITE')),
    price DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2),
    short_title TEXT,                       -- 'Essential', 'Popular', 'Complete'
    scope_summary TEXT,                     -- Brief description
    delivery_days INTEGER,                  -- Estimated delivery time
    is_active BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- ============================================
-- PLAN SCOPES (Features included in each plan)
-- ============================================
CREATE TABLE plan_scopes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    title TEXT NOT NULL,                    -- 'GST Registration', '1 Year Filing'
    is_included BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (plan_id) REFERENCES service_plans(id)
);

-- ============================================
-- FORM FIELDS TABLE (THE CORE DYNAMIC SYSTEM)
-- ============================================
CREATE TABLE service_form_fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    
    -- Field Identification
    field_key TEXT NOT NULL,                -- 'pan_number', 'company_name'
    field_label TEXT NOT NULL,              -- 'PAN Number'
    field_type TEXT NOT NULL CHECK(field_type IN (
        'text', 'email', 'tel', 'textarea', 'number', 'date',
        'select', 'radio', 'checkbox', 'multiselect',
        'file', 'repeater', 'address', 'bank_account',
        'pan', 'aadhaar', 'gstin', 'tan', 'iec', 'din',
        'percentage', 'pincode', 'state', 'country'
    )),
    
    -- Field Configuration
    field_options TEXT,                     -- JSON: ["Option1", "Option2"]
    placeholder TEXT,
    default_value TEXT,
    help_text TEXT,                         -- Tooltip/help message
    
    -- Validation
    is_required BOOLEAN DEFAULT 0,
    validation_regex TEXT,                  -- '^[A-Z]{5}[0-9]{4}[A-Z]$'
    validation_message TEXT,                -- 'Invalid PAN format'
    min_length INTEGER,
    max_length INTEGER,
    min_value DECIMAL(15,2),               -- For numbers
    max_value DECIMAL(15,2),
    
    -- Conditional Logic
    depends_on_field TEXT,                  -- Show only if field X has value
    depends_on_value TEXT,                  -- Expected value
    depends_on_operator TEXT DEFAULT 'equals', -- 'equals', 'not_equals', 'contains', 'greater_than'
    
    -- Plan & Grouping
    min_plan TEXT CHECK(min_plan IN ('BASIC', 'STANDARD', 'PREMIUM', 'ELITE')),
    field_group TEXT,                       -- 'personal', 'business', 'directors', 'documents', 'banking'
    display_order INTEGER DEFAULT 0,
    
    -- Repeater Configuration (for array fields like directors)
    repeater_config TEXT,                   -- JSON with sub-fields
    min_items INTEGER DEFAULT 1,
    max_items INTEGER DEFAULT 10,
    
    -- File Upload Configuration
    accepted_types TEXT,                    -- 'pdf,jpg,png'
    max_file_size_mb INTEGER DEFAULT 5,
    
    -- Status
    is_active BOOLEAN DEFAULT 1,
    
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- ============================================
-- DOCUMENT REQUIREMENTS TABLE
-- ============================================
CREATE TABLE service_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    
    doc_key TEXT NOT NULL,                  -- 'pan_card', 'identity_proof'
    doc_label TEXT NOT NULL,                -- 'PAN Card (Self-attested)'
    description TEXT,                       -- Additional instructions
    
    is_mandatory BOOLEAN DEFAULT 0,
    min_plan TEXT CHECK(min_plan IN ('BASIC', 'STANDARD', 'PREMIUM', 'ELITE')),
    
    accepted_types TEXT DEFAULT 'pdf,jpg,jpeg,png',  -- Comma-separated
    max_size_mb INTEGER DEFAULT 5,
    
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- ============================================
-- FORM SUBMISSIONS TABLE
-- ============================================
CREATE TABLE form_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_item_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    plan_type TEXT NOT NULL,
    
    form_data TEXT NOT NULL,                -- JSON: { "pan_number": "ABCDE1234F", ... }
    document_refs TEXT,                     -- JSON array of uploaded doc IDs
    
    status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'submitted', 'under_review', 'needs_info', 'completed', 'rejected')),
    submitted_at DATETIME,
    
    reviewed_by INTEGER,
    reviewed_at DATETIME,
    review_notes TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- ============================================
-- UPLOADED DOCUMENTS TABLE (Cloudflare R2)
-- ============================================
CREATE TABLE uploaded_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submission_id INTEGER NOT NULL,
    doc_key TEXT NOT NULL,                  -- Matches service_documents.doc_key
    
    file_name TEXT NOT NULL,
    file_original_name TEXT,
    file_size INTEGER,                      -- Bytes
    file_type TEXT,                         -- MIME type
    
    r2_bucket TEXT,
    r2_key TEXT,                            -- R2 object key
    r2_url TEXT,                            -- Public URL
    
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (submission_id) REFERENCES form_submissions(id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_form_fields_service ON service_form_fields(service_id);
CREATE INDEX idx_form_fields_group ON service_form_fields(field_group);
CREATE INDEX idx_form_fields_order ON service_form_fields(display_order);
CREATE INDEX idx_documents_service ON service_documents(service_id);
CREATE INDEX idx_submissions_user ON form_submissions(user_id);
CREATE INDEX idx_submissions_order ON form_submissions(order_item_id);
```

### 1.2 Helper Functions

```sql
-- Get plan hierarchy order for comparison
CREATE TABLE plan_hierarchy (
    plan_type TEXT PRIMARY KEY,
    plan_order INTEGER
);
INSERT INTO plan_hierarchy VALUES ('BASIC', 1), ('STANDARD', 2), ('PREMIUM', 3), ('ELITE', 4);

-- View for getting complete service config
CREATE VIEW service_form_config AS
SELECT 
    s.id as service_id,
    s.slug,
    s.name,
    s.category,
    f.id as field_id,
    f.field_key,
    f.field_label,
    f.field_type,
    f.field_options,
    f.placeholder,
    f.is_required,
    f.min_plan,
    f.field_group,
    f.display_order as field_order,
    f.depends_on_field,
    f.depends_on_value,
    f.repeater_config,
    f.help_text,
    f.validation_regex,
    f.validation_message
FROM services s
JOIN service_form_fields f ON s.id = f.service_id
WHERE s.is_active = 1 AND f.is_active = 1
ORDER BY s.id, f.field_group, f.display_order;
```

---

## 2. Backend API Implementation

### 2.1 Cloudflare Worker API Structure

```typescript
// worker.ts - Main entry point
import { Router } from './router';
import { ServiceRoutes } from './routes/services';
import { FormRoutes } from './routes/forms';
import { UploadRoutes } from './routes/uploads';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const ctx = getRequestContext();
    ctx.env = env;
    
    const router = new Router();
    
    // Service configuration routes
    router.get('/api/services', ServiceRoutes.getAll);
    router.get('/api/services/:slug', ServiceRoutes.getBySlug);
    router.get('/api/services/:id/form-config', ServiceRoutes.getFormConfig);
    
    // Form submission routes
    router.post('/api/forms/submit', FormRoutes.submit);
    router.get('/api/forms/submission/:id', FormRoutes.getSubmission);
    router.put('/api/forms/submission/:id', FormRoutes.updateDraft);
    
    // File upload routes
    router.post('/api/upload/presigned', UploadRoutes.getPresignedUrl);
    router.post('/api/upload/confirm', UploadRoutes.confirmUpload);
    
    return router.handle(request);
  }
};
```

### 2.2 Service Routes

```typescript
// routes/services.ts
export class ServiceRoutes {
  
  // GET /api/services/:id/form-config?planType=STANDARD
  static async getFormConfig(request: Request): Promise<Response> {
    const { id } = request.params;
    const { planType = 'BASIC' } = request.query;
    const db = getRequestContext().env.DB;
    
    try {
      // Get service details
      const service = await db
        .prepare('SELECT * FROM services WHERE id = ? AND is_active = 1')
        .bind(id)
        .first();
      
      if (!service) {
        return Response.json({ error: 'Service not found' }, { status: 404 });
      }
      
      // Get plans for this service
      const plans = await db
        .prepare(`
          SELECT 
            sp.*,
            json_group_array(
              json_object('id', ps.id, 'title', ps.title, 'isIncluded', ps.is_included)
            ) as scopes
          FROM service_plans sp
          LEFT JOIN plan_scopes ps ON sp.id = ps.plan_id
          WHERE sp.service_id = ? AND sp.is_active = 1
          GROUP BY sp.id
          ORDER BY ph.plan_order
        `)
        .bind(id)
        .all();
      
      // Get form fields filtered by plan
      const fields = await db
        .prepare(`
          SELECT 
            f.field_key,
            f.field_label,
            f.field_type,
            f.field_options,
            f.placeholder,
            f.default_value,
            f.is_required,
            f.field_group,
            f.display_order,
            f.depends_on_field,
            f.depends_on_value,
            f.depends_on_operator,
            f.repeater_config,
            f.help_text,
            f.validation_regex,
            f.validation_message,
            f.min_length,
            f.max_length,
            f.min_value,
            f.max_value,
            f.accepted_types,
            f.max_file_size_mb
          FROM service_form_fields f
          JOIN plan_hierarchy ph ON ph.plan_type = ?
          WHERE f.service_id = ? 
            AND f.is_active = 1
            AND (
              f.min_plan IS NULL 
              OR (SELECT plan_order FROM plan_hierarchy WHERE plan_type = f.min_plan) <= ph.plan_order
            )
          ORDER BY f.field_group, f.display_order
        `)
        .bind(planType, id)
        .all();
      
      // Group fields by section
      const groupedFields = groupFieldsBySection(fields.results);
      
      // Get document requirements
      const documents = await db
        .prepare(`
          SELECT 
            d.doc_key,
            d.doc_label,
            d.description,
            d.is_mandatory,
            d.accepted_types,
            d.max_size_mb
          FROM service_documents d
          JOIN plan_hierarchy ph ON ph.plan_type = ?
          WHERE d.service_id = ? 
            AND d.is_active = 1
            AND (
              d.min_plan IS NULL 
              OR (SELECT plan_order FROM plan_hierarchy WHERE plan_type = d.min_plan) <= ph.plan_order
            )
          ORDER BY d.display_order
        `)
        .bind(planType, id)
        .all();
      
      return Response.json({
        service,
        planType,
        plans: parsePlans(plans.results),
        formGroups: groupedFields,
        documents: documents.results,
        metadata: {
          totalFields: fields.results.length,
          requiredFields: fields.results.filter(f => f.is_required).length,
          documentCount: documents.results.length
        }
      });
      
    } catch (error) {
      console.error('Error fetching form config:', error);
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
}

// Helper functions
function groupFieldsBySection(fields: any[]): any[] {
  const groups: Record<string, any[]> = {};
  
  for (const field of fields) {
    const group = field.field_group || 'general';
    if (!groups[group]) {
      groups[group] = [];
    }
    
    // Parse JSON options
    if (field.field_options) {
      try {
        field.field_options = JSON.parse(field.field_options);
      } catch {
        field.field_options = field.field_options.split(',').map((o: string) => o.trim());
      }
    }
    
    // Parse repeater config
    if (field.repeater_config) {
      try {
        field.repeater_config = JSON.parse(field.repeater_config);
      } catch {
        field.repeater_config = null;
      }
    }
    
    groups[group].push(field);
  }
  
  return Object.entries(groups).map(([title, fields]) => ({
    title: title.charAt(0).toUpperCase() + title.slice(1),
    key: title,
    fields
  }));
}

function parsePlans(plans: any[]): any[] {
  return plans.map(p => ({
    ...p,
    scopes: JSON.parse(p.scopes || '[]')
  }));
}
```

### 2.3 Form Submission Routes

```typescript
// routes/forms.ts
export class FormRoutes {
  
  // POST /api/forms/submit
  static async submit(request: Request): Promise<Response> {
    const body = await request.json();
    const { orderItemId, serviceId, planType, formData, documents } = body;
    const userId = request.user?.id; // From auth middleware
    
    const db = getRequestContext().env.DB;
    const R2 = getRequestContext().env.R2_BUCKET;
    
    try {
      // 1. Validate form data
      const validationErrors = await validateFormData(db, serviceId, planType, formData);
      if (validationErrors.length > 0) {
        return Response.json({ 
          error: 'Validation failed', 
          errors: validationErrors 
        }, { status: 400 });
      }
      
      // 2. Check for existing submission
      const existing = await db
        .prepare('SELECT id FROM form_submissions WHERE order_item_id = ?')
        .bind(orderItemId)
        .first();
      
      let submissionId: number;
      
      if (existing) {
        // Update existing
        await db
          .prepare(`
            UPDATE form_submissions 
            SET form_data = ?, status = 'submitted', submitted_at = datetime('now')
            WHERE id = ?
          `)
          .bind(JSON.stringify(formData), existing.id)
          .run();
        submissionId = existing.id;
      } else {
        // Create new
        const result = await db
          .prepare(`
            INSERT INTO form_submissions 
            (order_item_id, user_id, service_id, plan_type, form_data, status, submitted_at)
            VALUES (?, ?, ?, ?, ?, 'submitted', datetime('now'))
          `)
          .bind(orderItemId, userId, serviceId, planType, JSON.stringify(formData))
          .run();
        submissionId = result.meta.last_row_id;
      }
      
      // 3. Save document references
      for (const doc of documents || []) {
        await db
          .prepare(`
            INSERT INTO uploaded_documents 
            (submission_id, doc_key, file_name, file_original_name, file_size, file_type, r2_bucket, r2_key, r2_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `)
          .bind(
            submissionId,
            doc.key,
            doc.fileName,
            doc.originalName,
            doc.size,
            doc.type,
            doc.r2Bucket,
            doc.r2Key,
            doc.url
          )
          .run();
      }
      
      // 4. Update order status
      await db
        .prepare("UPDATE order_items SET status = 'details_submitted' WHERE id = ?")
        .bind(orderItemId)
        .run();
      
      // 5. Trigger notification (optional)
      await sendNotification(userId, 'form_submitted', { serviceId, submissionId });
      
      return Response.json({
        success: true,
        submissionId,
        message: 'Form submitted successfully'
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      return Response.json({ error: 'Submission failed' }, { status: 500 });
    }
  }
  
  // GET /api/forms/submission/:id
  static async getSubmission(request: Request): Promise<Response> {
    const { id } = request.params;
    const userId = request.user?.id;
    const db = getRequestContext().env.DB;
    
    const submission = await db
      .prepare(`
        SELECT 
          fs.*,
          s.name as service_name,
          s.slug as service_slug,
          json_group_array(
            json_object(
              'docKey', ud.doc_key,
              'fileName', ud.file_name,
              'fileSize', ud.file_size,
              'fileUrl', ud.r2_url
            )
          ) as documents
        FROM form_submissions fs
        JOIN services s ON fs.service_id = s.id
        LEFT JOIN uploaded_documents ud ON fs.id = ud.submission_id
        WHERE fs.id = ? AND fs.user_id = ?
        GROUP BY fs.id
      `)
      .bind(id, userId)
      .first();
    
    if (!submission) {
      return Response.json({ error: 'Submission not found' }, { status: 404 });
    }
    
    return Response.json({
      ...submission,
      formData: JSON.parse(submission.form_data),
      documents: JSON.parse(submission.documents || '[]')
    });
  }
}

// Validation helper
async function validateFormData(
  db: D1Database, 
  serviceId: string, 
  planType: string, 
  formData: Record<string, any>
): Promise<string[]> {
  const errors: string[] = [];
  
  // Get expected fields
  const fields = await db
    .prepare(`
      SELECT field_key, field_label, is_required, validation_regex, validation_message
      FROM service_form_fields f
      JOIN plan_hierarchy ph ON ph.plan_type = ?
      WHERE f.service_id = ? 
        AND f.is_active = 1
        AND (
          f.min_plan IS NULL 
          OR (SELECT plan_order FROM plan_hierarchy WHERE plan_type = f.min_plan) <= ph.plan_order
        )
    `)
    .bind(planType, serviceId)
    .all();
  
  for (const field of fields.results) {
    const value = formData[field.field_key];
    
    // Check required
    if (field.is_required && (value === undefined || value === null || value === '')) {
      errors.push(`${field.field_label} is required`);
      continue;
    }
    
    // Skip validation if empty and not required
    if (!value && !field.is_required) continue;
    
    // Regex validation
    if (field.validation_regex && value) {
      const regex = new RegExp(field.validation_regex);
      if (!regex.test(value)) {
        errors.push(field.validation_message || `${field.field_label} is invalid`);
      }
    }
  }
  
  return errors;
}
```

### 2.4 File Upload Routes (Cloudflare R2)

```typescript
// routes/uploads.ts
export class UploadRoutes {
  
  // POST /api/upload/presigned
  static async getPresignedUrl(request: Request): Promise<Response> {
    const body = await request.json();
    const { filename, contentType, size } = body;
    
    const R2 = getRequestContext().env.R2_BUCKET;
    const key = `uploads/${Date.now()}-${filename}`;
    
    // Generate presigned URL for direct browser upload
    const presignedUrl = await R2.createPresignedUrl(key, {
      method: 'PUT',
      expirySeconds: 300,
      headers: {
        'Content-Type': contentType,
        'Content-Length': size
      }
    });
    
    return Response.json({
      presignedUrl,
      key,
      publicUrl: `https://cdn.yoursite.com/${key}`
    });
  }
  
  // POST /api/upload/confirm
  static async confirmUpload(request: Request): Promise<Response> {
    const body = await request.json();
    const { key, filename, size, type } = body;
    
    // Verify file exists in R2
    const R2 = getRequestContext().env.R2_BUCKET;
    const object = await R2.head(key);
    
    if (!object) {
      return Response.json({ error: 'File not found' }, { status: 404 });
    }
    
    return Response.json({
      success: true,
      key,
      url: `https://cdn.yoursite.com/${key}`,
      size: object.size,
      type: object.httpMetadata?.contentType
    });
  }
}
```

---

## 3. Frontend Architecture

### 3.1 Directory Structure

```
src/
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   └── ...
│   │
│   └── forms/                   # NEW: Dynamic form system
│       ├── DynamicForm.tsx      # Main form container
│       ├── FormField.tsx        # Field renderer dispatcher
│       ├── FormProgress.tsx     # Step progress indicator
│       ├── FormNavigation.tsx   # Next/Back/Submit buttons
│       │
│       └── fields/              # Individual field components
│           ├── TextField.tsx
│           ├── SelectField.tsx
│           ├── RadioField.tsx
│           ├── CheckboxField.tsx
│           ├── FileUploadField.tsx
│           ├── RepeaterField.tsx
│           ├── AddressField.tsx
│           ├── PANField.tsx
│           ├── AadhaarField.tsx
│           ├── GSTINField.tsx
│           └── BankAccountField.tsx
│
├── user-panel/
│   ├── pages/
│   │   ├── orders/
│   │   │   └── DynamicServiceForm.tsx    # SINGLE PAGE for all 48 services
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useFormConfig.ts    # Fetch form configuration
│   │   ├── useFormSubmit.ts    # Submit form data
│   │   ├── useFileUpload.ts    # Handle file uploads
│   │   └── useMobileDetect.ts  # Mobile responsive helpers
│   │
│   └── services/
│       ├── formApi.ts          # API calls for forms
│       └── uploadApi.ts        # File upload API
│
├── lib/
│   ├── utils.ts
│   ├── validation.ts           # Field validators
│   └── constants.ts
│
└── types/
    ├── form.ts                 # Form-related types
    └── service.ts
```

### 3.2 Types Definition

```typescript
// types/form.ts

export type FieldType = 
  | 'text' | 'email' | 'tel' | 'textarea' | 'number' | 'date'
  | 'select' | 'radio' | 'checkbox' | 'multiselect'
  | 'file' | 'repeater' | 'address' | 'bank_account'
  | 'pan' | 'aadhaar' | 'gstin' | 'tan' | 'iec' | 'din'
  | 'percentage' | 'pincode' | 'state' | 'country';

export interface FormField {
  field_key: string;
  field_label: string;
  field_type: FieldType;
  field_options?: string[];
  placeholder?: string;
  default_value?: string;
  help_text?: string;
  is_required: boolean;
  validation_regex?: string;
  validation_message?: string;
  min_length?: number;
  max_length?: number;
  min_value?: number;
  max_value?: number;
  depends_on_field?: string;
  depends_on_value?: string;
  depends_on_operator?: 'equals' | 'not_equals' | 'contains' | 'greater_than';
  repeater_config?: RepeaterConfig;
  min_items?: number;
  max_items?: number;
  accepted_types?: string;
  max_file_size_mb?: number;
}

export interface RepeaterConfig {
  fields: Array<{
    key: string;
    label: string;
    type: FieldType;
    required?: boolean;
    options?: string[];
  }>;
  add_button_text?: string;
}

export interface FormGroup {
  title: string;
  key: string;
  fields: FormField[];
}

export interface DocumentRequirement {
  doc_key: string;
  doc_label: string;
  description?: string;
  is_mandatory: boolean;
  accepted_types: string;
  max_size_mb: number;
}

export interface FormConfig {
  service: {
    id: number;
    slug: string;
    name: string;
    category: string;
    description: string;
  };
  planType: string;
  formGroups: FormGroup[];
  documents: DocumentRequirement[];
  metadata: {
    totalFields: number;
    requiredFields: number;
    documentCount: number;
  };
}

export interface FormSubmission {
  orderItemId: string;
  serviceId: string;
  planType: string;
  formData: Record<string, any>;
  documents: UploadedDocument[];
}

export interface UploadedDocument {
  key: string;
  fileName: string;
  originalName: string;
  size: number;
  type: string;
  url: string;
}
```

### 3.3 Main Form Page (Replaces 6+ hardcoded pages)

```tsx
// user-panel/pages/orders/DynamicServiceForm.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useFormConfig } from '@/user-panel/hooks/useFormConfig';
import { useFormSubmit } from '@/user-panel/hooks/useFormSubmit';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { MobileFormLayout } from '@/user-panel/components/layout/MobileFormLayout';
import { DesktopFormLayout } from '@/user-panel/components/layout/DesktopFormLayout';
import { useMobileDetect } from '@/hooks/useMobileDetect';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export const DynamicServiceForm = () => {
  const { orderItemId } = useParams<{ orderItemId: string }>();
  const navigate = useNavigate();
  const isMobile = useMobileDetect();
  
  const { config, loading, error } = useFormConfig(orderItemId);
  const { submit, submitting } = useFormSubmit();
  
  if (loading) return <FormSkeleton />;
  if (error) return <FormError error={error} />;
  if (!config) return <FormNotFound />;
  
  const { service, planType, formGroups, documents } = config;
  
  const handleSubmit = async (formData: Record<string, any>, uploadedDocs: any[]) => {
    try {
      await submit({
        orderItemId: orderItemId!,
        serviceId: service.id.toString(),
        planType,
        formData,
        documents: uploadedDocs
      });
      
      toast.success('Form submitted successfully!');
      navigate('/dashboard?tab=orders');
    } catch (err) {
      toast.error('Failed to submit form. Please try again.');
    }
  };
  
  const Layout = isMobile ? MobileFormLayout : DesktopFormLayout;
  
  return (
    <Layout
      serviceName={service.name}
      planType={planType}
      totalSteps={formGroups.length + (documents.length > 0 ? 1 : 0)}
    >
      <DynamicForm
        formGroups={formGroups}
        documents={documents}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
        isMobile={isMobile}
      />
    </Layout>
  );
};

const FormSkeleton = () => (
  <div className="max-w-4xl mx-auto p-6 space-y-6">
    <Skeleton className="h-12 w-1/3" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
);
```

### 3.4 Form Configuration Hook

```typescript
// user-panel/hooks/useFormConfig.ts
import { useState, useEffect } from 'react';
import { FormConfig } from '@/types/form';
import { formApi } from '@/user-panel/services/formApi';

export const useFormConfig = (orderItemId: string | undefined) => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!orderItemId) {
      setLoading(false);
      return;
    }
    
    const fetchConfig = async () => {
      try {
        setLoading(true);
        
        // First, get order details to know service and plan
        const order = await formApi.getOrderDetails(orderItemId);
        
        // Then fetch form configuration
        const formConfig = await formApi.getFormConfig(
          order.serviceId,
          order.planType
        );
        
        setConfig(formConfig);
      } catch (err: any) {
        setError(err.message || 'Failed to load form');
      } finally {
        setLoading(false);
      }
    };
    
    fetchConfig();
  }, [orderItemId]);
  
  return { config, loading, error };
};
```

### 3.5 API Service Layer

```typescript
// user-panel/services/formApi.ts
import api from '@/utils/api';
import { FormConfig, FormSubmission } from '@/types/form';

export const formApi = {
  // Get order details (to extract serviceId and planType)
  getOrderDetails: async (orderItemId: string) => {
    const response = await api.get(`/orders/items/${orderItemId}`);
    return response.data.orderItem;
  },
  
  // Get form configuration
  getFormConfig: async (serviceId: string, planType: string): Promise<FormConfig> => {
    const response = await api.get(`/services/${serviceId}/form-config?planType=${planType}`);
    return response.data;
  },
  
  // Submit form
  submitForm: async (submission: FormSubmission) => {
    const response = await api.post('/forms/submit', submission);
    return response.data;
  },
  
  // Save draft (autosave)
  saveDraft: async (orderItemId: string, formData: Record<string, any>) => {
    const response = await api.put(`/forms/draft/${orderItemId}`, { formData });
    return response.data;
  },
  
  // Get existing submission (for edit mode)
  getSubmission: async (submissionId: string) => {
    const response = await api.get(`/forms/submission/${submissionId}`);
    return response.data;
  }
};
```

---

## 4. Dynamic Form Components

### 4.1 Main Dynamic Form Container

```tsx
// components/forms/DynamicForm.tsx
import { useState, useCallback, useEffect } from 'react';
import { FormGroup, DocumentRequirement, FormField } from '@/types/form';
import { FormProgress } from './FormProgress';
import { FormNavigation } from './FormNavigation';
import { FormFieldRenderer } from './FormFieldRenderer';
import { DocumentUploadSection } from './DocumentUploadSection';
import { cn } from '@/lib/utils';

interface DynamicFormProps {
  formGroups: FormGroup[];
  documents: DocumentRequirement[];
  onSubmit: (formData: Record<string, any>, documents: any[]) => Promise<void>;
  isSubmitting: boolean;
  isMobile: boolean;
  initialData?: Record<string, any>;
}

export const DynamicForm = ({
  formGroups,
  documents,
  onSubmit,
  isSubmitting,
  isMobile,
  initialData = {}
}: DynamicFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  
  const totalSteps = formGroups.length + (documents.length > 0 ? 1 : 0);
  const isLastStep = currentStep === totalSteps - 1;
  const isDocumentStep = currentStep === formGroups.length;
  
  // Get visible fields for current step (handle conditional logic)
  const getVisibleFields = useCallback((fields: FormField[]) => {
    return fields.filter(field => {
      if (!field.depends_on_field) return true;
      
      const dependentValue = formData[field.depends_on_field];
      const expectedValue = field.depends_on_value;
      
      switch (field.depends_on_operator) {
        case 'not_equals':
          return dependentValue !== expectedValue;
        case 'contains':
          return dependentValue?.includes(expectedValue);
        case 'greater_than':
          return Number(dependentValue) > Number(expectedValue);
        case 'equals':
        default:
          return dependentValue === expectedValue;
      }
    });
  }, [formData]);
  
  // Field change handler
  const handleFieldChange = useCallback((key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setTouched(prev => new Set(prev).add(key));
    
    // Clear error when field is modified
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  }, [errors]);
  
  // Document upload handler
  const handleDocumentUpload = useCallback((key: string, file: any) => {
    setUploadedDocs(prev => ({ ...prev, [key]: file }));
  }, []);
  
  // Validation for current step
  const validateStep = (): boolean => {
    if (isDocumentStep) {
      // Validate required documents
      const newErrors: Record<string, string> = {};
      documents.forEach(doc => {
        if (doc.is_mandatory && !uploadedDocs[doc.doc_key]) {
          newErrors[doc.doc_key] = `${doc.doc_label} is required`;
        }
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    
    // Validate form fields
    const currentGroup = formGroups[currentStep];
    const visibleFields = getVisibleFields(currentGroup.fields);
    const newErrors: Record<string, string> = {};
    
    visibleFields.forEach(field => {
      const value = formData[field.field_key];
      
      if (field.is_required && (!value || value === '')) {
        newErrors[field.field_key] = `${field.field_label} is required`;
      }
      
      if (value && field.validation_regex) {
        const regex = new RegExp(field.validation_regex);
        if (!regex.test(value)) {
          newErrors[field.field_key] = field.validation_message || `${field.field_label} is invalid`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Navigation handlers
  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };
  
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    const docsArray = Object.entries(uploadedDocs).map(([key, file]) => ({
      key,
      ...file
    }));
    
    await onSubmit(formData, docsArray);
  };
  
  // Current group content
  const renderCurrentStep = () => {
    if (isDocumentStep) {
      return (
        <DocumentUploadSection
          documents={documents}
          uploadedDocs={uploadedDocs}
          onUpload={handleDocumentUpload}
          errors={errors}
          isMobile={isMobile}
        />
      );
    }
    
    const group = formGroups[currentStep];
    const visibleFields = getVisibleFields(group.fields);
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {group.title}
        </h2>
        
        <div className={cn(
          "grid gap-6",
          isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}>
          {visibleFields.map(field => (
            <FormFieldRenderer
              key={field.field_key}
              field={field}
              value={formData[field.field_key]}
              onChange={(value) => handleFieldChange(field.field_key, value)}
              error={errors[field.field_key]}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="dynamic-form">
      {/* Progress Indicator */}
      <FormProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        groups={formGroups}
        isDocumentStep={isDocumentStep}
        isMobile={isMobile}
      />
      
      {/* Form Content */}
      <div className={cn(
        "bg-white rounded-lg",
        isMobile ? "p-4" : "p-6 shadow-sm border"
      )}>
        {renderCurrentStep()}
      </div>
      
      {/* Navigation */}
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isMobile={isMobile}
      />
    </div>
  );
};
```

### 4.2 Field Renderer Dispatcher

```tsx
// components/forms/FormFieldRenderer.tsx
import { FormField } from '@/types/form';
import { TextField } from './fields/TextField';
import { SelectField } from './fields/SelectField';
import { RadioField } from './fields/RadioField';
import { CheckboxField } from './fields/CheckboxField';
import { RepeaterField } from './fields/RepeaterField';
import { AddressField } from './fields/AddressField';
import { PANField } from './fields/PANField';
import { AadhaarField } from './fields/AadhaarField';
import { GSTINField } from './fields/GSTINField';
import { FileUploadField } from './fields/FileUploadField';
import { BankAccountField } from './fields/BankAccountField';

interface FormFieldRendererProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  isMobile: boolean;
}

const FIELD_COMPONENTS: Record<string, React.ComponentType<any>> = {
  text: TextField,
  email: TextField,
  tel: TextField,
  textarea: TextField,
  number: TextField,
  date: TextField,
  percentage: TextField,
  select: SelectField,
  radio: RadioField,
  checkbox: CheckboxField,
  multiselect: CheckboxField,
  repeater: RepeaterField,
  address: AddressField,
  bank_account: BankAccountField,
  file: FileUploadField,
  pan: PANField,
  aadhaar: AadhaarField,
  gstin: GSTINField,
  tan: TextField,
  iec: TextField,
  din: TextField,
  pincode: TextField,
  state: SelectField,
  country: SelectField,
};

export const FormFieldRenderer = ({
  field,
  value,
  onChange,
  error,
  isMobile
}: FormFieldRendererProps) => {
  const Component = FIELD_COMPONENTS[field.field_type];
  
  if (!Component) {
    console.warn(`Unknown field type: ${field.field_type}`);
    return null;
  }
  
  return (
    <Component
      field={field}
      value={value}
      onChange={onChange}
      error={error}
      isMobile={isMobile}
    />
  );
};
```

### 4.3 Individual Field Components

```tsx
// components/forms/fields/TextField.tsx
import { FormField } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextFieldProps {
  field: FormField;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  isMobile: boolean;
}

export const TextField = ({ field, value, onChange, error, isMobile }: TextFieldProps) => {
  const inputType = 
    field.field_type === 'email' ? 'email' :
    field.field_type === 'tel' ? 'tel' :
    field.field_type === 'number' ? 'number' :
    field.field_type === 'date' ? 'date' :
    field.field_type === 'percentage' ? 'number' :
    'text';
  
  const isTextarea = field.field_type === 'textarea';
  
  return (
    <div className={cn("form-field", isMobile && "w-full")}>
      <Label 
        htmlFor={field.field_key}
        className="text-sm font-medium text-gray-700"
      >
        {field.field_label}
        {field.is_required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {field.help_text && (
        <p className="text-xs text-gray-500 mt-1">{field.help_text}</p>
      )}
      
      {isTextarea ? (
        <textarea
          id={field.field_key}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={isMobile ? 3 : 4}
          className={cn(
            "w-full mt-2 px-3 py-2 border rounded-md resize-none",
            "focus:ring-2 focus:ring-primary focus:border-primary",
            error && "border-red-500 focus:ring-red-500",
            isMobile && "text-base" // Prevent zoom on iOS
          )}
        />
      ) : (
        <Input
          id={field.field_key}
          type={inputType}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          min={field.min_value}
          max={field.max_value}
          maxLength={field.max_length}
          className={cn(
            "mt-2",
            error && "border-red-500",
            isMobile && "text-base h-12"
          )}
        />
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
```

```tsx
// components/forms/fields/SelectField.tsx
import { FormField } from '@/types/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isMobile: boolean;
}

export const SelectField = ({ field, value, onChange, error, isMobile }: SelectFieldProps) => {
  const options = field.field_options || [];
  
  return (
    <div className="form-field">
      <Label className="text-sm font-medium text-gray-700">
        {field.field_label}
        {field.is_required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          className={cn(
            "mt-2",
            error && "border-red-500",
            isMobile && "h-12"
          )}
        >
          <SelectValue placeholder={field.placeholder || `Select ${field.field_label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
```

```tsx
// components/forms/fields/PANField.tsx (Pre-validated field)
import { useState, useCallback } from 'react';
import { FormField } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

interface PANFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isMobile: boolean;
}

export const PANField = ({ field, value, onChange, error, isMobile }: PANFieldProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().slice(0, 10);
    onChange(val);
    
    if (val.length === 10) {
      setIsValid(PAN_REGEX.test(val));
    } else {
      setIsValid(null);
    }
  }, [onChange]);
  
  return (
    <div className="form-field">
      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {field.field_label}
        {field.is_required && <span className="text-red-500">*</span>}
        <span className="text-xs text-gray-400 font-normal">(e.g., ABCDE1234F)</span>
      </Label>
      
      <div className="relative">
        <Input
          type="text"
          value={value || ''}
          onChange={handleChange}
          placeholder="ABCDE1234F"
          maxLength={10}
          className={cn(
            "mt-2 uppercase",
            isMobile && "text-base h-12",
            error && "border-red-500",
            isValid === true && "border-green-500 pr-10",
            isValid === false && "border-red-500 pr-10"
          )}
        />
        
        {isValid === true && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
        )}
        {isValid === false && (
          <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
        )}
      </div>
      
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
```

```tsx
// components/forms/fields/RepeaterField.tsx (For multiple directors/partners)
import { useState, useCallback } from 'react';
import { FormField, RepeaterConfig } from '@/types/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { FormFieldRenderer } from '../FormFieldRenderer';
import { cn } from '@/lib/utils';

interface RepeaterFieldProps {
  field: FormField;
  value: any[];
  onChange: (value: any[]) => void;
  error?: string;
  isMobile: boolean;
}

export const RepeaterField = ({ field, value = [], onChange, error, isMobile }: RepeaterFieldProps) => {
  const config: RepeaterConfig = field.repeater_config || { fields: [] };
  const [items, setItems] = useState<any[]>(value.length > 0 ? value : [{}]);
  
  const addItem = useCallback(() => {
    if (field.max_items && items.length >= field.max_items) return;
    const newItems = [...items, {}];
    setItems(newItems);
    onChange(newItems);
  }, [items, field.max_items, onChange]);
  
  const removeItem = useCallback((index: number) => {
    if (items.length <= (field.min_items || 1)) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  }, [items, field.min_items, onChange]);
  
  const updateItem = useCallback((index: number, key: string, val: any) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [key]: val } : item
    );
    setItems(newItems);
    onChange(newItems);
  }, [items, onChange]);
  
  return (
    <div className="form-field col-span-full">
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm font-medium text-gray-700">
          {field.field_label}
          {field.is_required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <span className="text-xs text-gray-500">
          {items.length} of {field.max_items || '∞'} {items.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="relative">
            <CardContent className={cn("p-4", isMobile && "p-3")}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">
                  {config.add_button_text || 'Entry'} {index + 1}
                </span>
                {items.length > (field.min_items || 1) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className={cn(
                "grid gap-4",
                isMobile ? "grid-cols-1" : "grid-cols-2"
              )}>
                {config.fields.map((subField) => (
                  <FormFieldRenderer
                    key={`${index}-${subField.key}`}
                    field={{
                      field_key: subField.key,
                      field_label: subField.label,
                      field_type: subField.type as any,
                      is_required: subField.required || false,
                      field_options: subField.options,
                    }}
                    value={item[subField.key]}
                    onChange={(val) => updateItem(index, subField.key, val)}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {(!field.max_items || items.length < field.max_items) && (
        <Button
          type="button"
          variant="outline"
          onClick={addItem}
          className="mt-4 w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add {config.add_button_text || 'Another'}
        </Button>
      )}
      
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};
```

---

## 5. Service-Specific Form Examples

### 5.1 GST Registration

```sql
-- Insert GST Registration service
INSERT INTO services (slug, name, category, description) VALUES 
('gst-registration', 'GST Registration', 'tax-registrations', 
 'Register your business for Goods and Services Tax');

-- Insert plans
INSERT INTO service_plans (service_id, plan_type, price, short_title, delivery_days) VALUES
((SELECT id FROM services WHERE slug = 'gst-registration'), 'BASIC', 999, 'Essential', 3),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'STANDARD', 1999, 'Popular', 5),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'PREMIUM', 3999, 'Complete', 7);

-- Insert form fields for GST Registration
INSERT INTO service_form_fields 
(service_id, field_key, field_label, field_type, field_options, is_required, min_plan, field_group, display_order, help_text) 
VALUES
-- Personal Details Group
((SELECT id FROM services WHERE slug = 'gst-registration'), 'applicant_name', 'Applicant Full Name', 'text', NULL, 1, 'BASIC', 'personal', 1, 'As per PAN card'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'applicant_email', 'Email Address', 'email', NULL, 1, 'BASIC', 'personal', 2, 'For all communications'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'applicant_mobile', 'Mobile Number', 'tel', NULL, 1, 'BASIC', 'personal', 3, 'OTP will be sent'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'pan_number', 'PAN Number', 'pan', NULL, 1, 'BASIC', 'personal', 4, NULL),

-- Business Details Group
((SELECT id FROM services WHERE slug = 'gst-registration'), 'business_type', 'Business Type', 'select', '["Proprietorship", "Partnership", "LLP", "Private Limited", "Public Limited", "Trust", "Society"]', 1, 'BASIC', 'business', 1, 'Select your business constitution'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'business_name', 'Legal Business Name', 'text', NULL, 1, 'BASIC', 'business', 2, 'As per registration documents'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'trade_name', 'Trade Name (if different)', 'text', NULL, 0, 'BASIC', 'business', 3, 'Name under which you operate'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'business_pan', 'Business PAN', 'pan', NULL, 1, 'STANDARD', 'business', 4, 'Required for companies/LLP'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'business_nature', 'Nature of Business', 'textarea', NULL, 1, 'BASIC', 'business', 5, 'Describe your business activity'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'annual_turnover', 'Annual Turnover (Lakhs)', 'select', '["< 20", "20-40", "40-100", "> 100"]', 1, 'STANDARD', 'business', 6, 'For GST slab determination'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'hsn_codes', 'HSN/SAC Codes', 'textarea', NULL, 0, 'PREMIUM', 'business', 7, 'List of goods/services you deal with'),

-- Address Group
((SELECT id FROM services WHERE slug = 'gst-registration'), 'registered_address', 'Registered Office Address', 'address', NULL, 1, 'BASIC', 'address', 1, 'Complete address with PIN code'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'same_as_registered', 'Same as registered', 'checkbox', '["Delivery address is same as registered address"]', 0, 'BASIC', 'address', 2, NULL),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'delivery_address', 'Delivery Address', 'address', NULL, 0, 'STANDARD', 'address', 3, 'Where GST certificate should be delivered'),

-- State & Jurisdiction
((SELECT id FROM services WHERE slug = 'gst-registration'), 'state', 'State', 'state', NULL, 1, 'BASIC', 'jurisdiction', 1, NULL),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'district', 'District', 'text', NULL, 1, 'BASIC', 'jurisdiction', 2, NULL),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'pincode', 'PIN Code', 'pincode', NULL, 1, 'BASIC', 'jurisdiction', 3, NULL);

-- Insert document requirements
INSERT INTO service_documents (service_id, doc_key, doc_label, is_mandatory, min_plan) VALUES
((SELECT id FROM services WHERE slug = 'gst-registration'), 'pan_card', 'PAN Card (Self-attested)', 1, 'BASIC'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'aadhaar_card', 'Aadhaar Card', 1, 'BASIC'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'business_proof', 'Business Registration Proof', 1, 'BASIC'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'address_proof', 'Address Proof (Office)', 1, 'BASIC'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'bank_statement', 'Bank Statement/Cancelled Cheque', 1, 'STANDARD'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'photo', 'Passport Size Photo', 1, 'STANDARD'),
((SELECT id FROM services WHERE slug = 'gst-registration'), 'authorization_letter', 'Authorization Letter', 0, 'PREMIUM');
```

### 5.2 ITR Filing

```sql
-- ITR Filing service with income-specific fields
INSERT INTO services (slug, name, category, description) VALUES 
('itr-filing', 'Income Tax Return Filing', 'tax-compliances', 
 'File your income tax return with expert assistance');

INSERT INTO service_plans (service_id, plan_type, price, short_title) VALUES
((SELECT id FROM services WHERE slug = 'itr-filing'), 'BASIC', 499, 'Salaried'),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'STANDARD', 999, 'Multiple Incomes'),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'PREMIUM', 2499, 'Business/Professional'),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'ELITE', 4999, 'Complex Cases');

INSERT INTO service_form_fields (service_id, field_key, field_label, field_type, field_options, is_required, min_plan, field_group, display_order) VALUES
-- Personal Information
((SELECT id FROM services WHERE slug = 'itr-filing'), 'pan_number', 'PAN Number', 'pan', NULL, 1, 'BASIC', 'personal', 1),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'aadhaar_number', 'Aadhaar Number', 'aadhaar', NULL, 1, 'BASIC', 'personal', 2),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'assessment_year', 'Assessment Year', 'select', '["2023-24", "2024-25"]', 1, 'BASIC', 'personal', 3),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'itr_form_type', 'ITR Form Type', 'select', '["ITR-1 (Salaried)", "ITR-2 (Multiple Properties)", "ITR-3 (Business/Professional)", "ITR-4 (Presumptive)"]', 1, 'BASIC', 'personal', 4),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'filing_type', 'Filing Type', 'radio', '["Original", "Revised", "Belated"]', 1, 'BASIC', 'personal', 5),

-- Employment & Income
((SELECT id FROM services WHERE slug = 'itr-filing'), 'employment_type', 'Employment Type', 'select', '["Salaried", "Self-employed", "Business Owner", "Professional", "Pensioner", "Unemployed"]', 1, 'BASIC', 'income', 1),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'salary_income', 'Salary Income (₹)', 'number', NULL, 0, 'BASIC', 'income', 2),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'house_property_income', 'Rental Income (₹)', 'number', NULL, 0, 'STANDARD', 'income', 3),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'other_sources_income', 'Other Sources Income (₹)', 'number', NULL, 0, 'STANDARD', 'income', 4),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'business_income', 'Business/Professional Income (₹)', 'number', NULL, 0, 'PREMIUM', 'income', 5),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'capital_gains', 'Capital Gains (₹)', 'number', NULL, 0, 'PREMIUM', 'income', 6),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'foreign_income', 'Foreign Income (₹)', 'number', NULL, 0, 'ELITE', 'income', 7),

-- Deductions (80C, 80D, etc.)
((SELECT id FROM services WHERE slug = 'itr-filing'), 'deduction_80c', 'Section 80C - PPF, ELSS, LIC (₹)', 'number', NULL, 0, 'STANDARD', 'deductions', 1),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'deduction_80d', 'Section 80D - Health Insurance (₹)', 'number', NULL, 0, 'STANDARD', 'deductions', 2),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'deduction_80e', 'Section 80E - Education Loan (₹)', 'number', NULL, 0, 'STANDARD', 'deductions', 3),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'deduction_80g', 'Section 80G - Donations (₹)', 'number', NULL, 0, 'STANDARD', 'deductions', 4),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'deduction_80gg', 'Section 80GG - Rent Paid (₹)', 'number', NULL, 0, 'STANDARD', 'deductions', 5),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'deduction_80tta', 'Section 80TTA - Savings Interest (₹)', 'number', NULL, 0, 'STANDARD', 'deductions', 6),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'home_loan_interest', 'Home Loan Interest (₹)', 'number', NULL, 0, 'STANDARD', 'deductions', 7),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'nps_contribution', 'NPS Contribution (₹)', 'number', NULL, 0, 'PREMIUM', 'deductions', 8),

-- Advanced (ELITE only)
((SELECT id FROM services WHERE slug = 'itr-filing'), 'agricultural_income', 'Agricultural Income (₹)', 'number', NULL, 0, 'ELITE', 'advanced', 1),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'clubbed_income', 'Clubbed Income (₹)', 'number', NULL, 0, 'ELITE', 'advanced', 2),
((SELECT id FROM services WHERE slug = 'itr-filing'), 'set_off_losses', 'Set-off Losses Brought Forward', 'textarea', NULL, 0, 'ELITE', 'advanced', 3);
```

### 5.3 Company Incorporation (Complex Repeater Fields)

```sql
-- Company Incorporation with multiple directors
INSERT INTO services (slug, name, category, description) VALUES 
('company-incorporation', 'Company Incorporation', 'business-registrations', 
 'Register a new Private Limited, OPC, or Section 8 Company');

INSERT INTO service_plans (service_id, plan_type, price, short_title) VALUES
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'BASIC', 4999, 'Incorporation Only'),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'STANDARD', 7999, 'With DSC & DIN'),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'PREMIUM', 11999, 'Complete Package'),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'ELITE', 19999, 'Premium Support');

INSERT INTO service_form_fields (service_id, field_key, field_label, field_type, field_options, is_required, min_plan, field_group, display_order, repeater_config) VALUES
-- Company Details
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'company_type', 'Company Type', 'select', '["Private Limited", "One Person Company (OPC)", "Public Limited", "Section 8 Company"]', 1, 'BASIC', 'company', 1, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'proposed_name_1', 'Proposed Name (Choice 1)', 'text', NULL, 1, 'BASIC', 'company', 2, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'proposed_name_2', 'Proposed Name (Choice 2)', 'text', NULL, 0, 'BASIC', 'company', 3, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'business_activity', 'Main Business Activity', 'textarea', NULL, 1, 'BASIC', 'company', 4, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'nic_code', 'NIC Code (if known)', 'text', NULL, 0, 'STANDARD', 'company', 5, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'registered_address', 'Registered Office Address', 'address', NULL, 1, 'BASIC', 'company', 6, NULL),

-- Capital Structure
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'authorized_capital', 'Authorized Capital (₹)', 'number', NULL, 1, 'BASIC', 'capital', 1, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'paid_up_capital', 'Paid-up Capital (₹)', 'number', NULL, 1, 'BASIC', 'capital', 2, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'share_nominal_value', 'Nominal Value per Share (₹)', 'number', NULL, 1, 'STANDARD', 'capital', 3, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'shareholding_pattern', 'Shareholding Pattern', 'textarea', NULL, 0, 'PREMIUM', 'capital', 4, NULL),

-- Directors (Repeater Field with sub-fields)
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'directors', 'Directors/Shareholders Details', 'repeater', NULL, 1, 'BASIC', 'directors', 1, 
'{
  "fields": [
    {"key": "director_name", "label": "Full Name (as per PAN)", "type": "text", "required": true},
    {"key": "director_pan", "label": "PAN Number", "type": "pan", "required": true},
    {"key": "director_din", "label": "DIN (if existing)", "type": "din", "required": false},
    {"key": "director_email", "label": "Email Address", "type": "email", "required": true},
    {"key": "director_mobile", "label": "Mobile Number", "type": "tel", "required": true},
    {"key": "director_address", "label": "Residential Address", "type": "address", "required": true},
    {"key": "is_promoter", "label": "Is Promoter?", "type": "checkbox", "required": false, "options": ["Yes"]}
  ],
  "add_button_text": "Director/Shareholder"
}'),

-- DSC & Additional Services
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'dsc_required', 'Digital Signature Required For', 'multiselect', '["All Directors", "Authorized Signatory Only", "Not Required"]', 1, 'STANDARD', 'additional', 1, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'pan_tan_required', 'PAN & TAN Application', 'checkbox', '["Apply for Company PAN & TAN"]', 0, 'STANDARD', 'additional', 2, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'bank_account_opening', 'Bank Account Opening Assistance', 'checkbox', '["Yes, help me open current account"]', 0, 'PREMIUM', 'additional', 3, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'gst_registration', 'GST Registration', 'checkbox', '["Include GST Registration"]', 0, 'PREMIUM', 'additional', 4, NULL),
((SELECT id FROM services WHERE slug = 'company-incorporation'), 'accounting_services', 'Accounting Services (Annual)', 'select', '["Not Required", "Basic Bookkeeping", "Complete Accounting & Compliance"]', 0, 'ELITE', 'additional', 5, NULL);
```

---

## 6. Implementation Steps

### Phase 1: Database Setup (Day 1-2)

```bash
# 1. Create D1 database
wrangler d1 create ca-services-db

# 2. Create tables
wrangler d1 execute ca-services-db --file=./schema.sql

# 3. Seed with services
wrangler d1 execute ca-services-db --file=./seed-services.sql
```

### Phase 2: Backend API (Day 3-4)

```typescript
// Deploy Cloudflare Worker
// - GET /api/services/:id/form-config
// - POST /api/forms/submit
// - POST /api/upload/presigned
```

### Phase 3: Frontend Components (Day 5-7)

```bash
# 1. Create form components
mkdir -p src/components/forms/fields

# 2. Install dependencies
npm install @radix-ui/react-select @radix-ui/react-checkbox

# 3. Create main form page
# src/user-panel/pages/orders/DynamicServiceForm.tsx
```

### Phase 4: Migration (Day 8)

```typescript
// Update App.tsx - Replace hardcoded routes
// BEFORE:
<Route path="/dashboard/itr/basic/:orderItemId" element={<ItrBasicFormPage />} />
<Route path="/dashboard/itr/standard/:orderItemId" element={<ItrStandardFormPage />} />
<Route path="/dashboard/itr/premium/:orderItemId" element={<ItrPremiumFormPage />} />
<Route path="/dashboard/order/:id/submit-details" element={<OrderSubmitDetails />} />

// AFTER:
<Route path="/dashboard/order/:orderItemId/form" element={<DynamicServiceForm />} />
```

### Phase 5: Delete Old Files (Day 8)

```bash
# Delete hardcoded form pages
rm src/user-panel/pages/ItrBasicFormPage.tsx
rm src/user-panel/pages/ItrStandardFormPage.tsx
rm src/user-panel/pages/ItrPremiumFormPage.tsx
rm src/user-panel/pages/ItrEliteFormPage.tsx
rm src/user-panel/pages/OrderSubmitDetails.tsx
rm src/user-panel/pages/OrderRequirements.tsx
rm src/user-panel/pages/DirectorshipsSection.tsx
rm src/user-panel/pages/ForeignIncomeSection.tsx
```

---

## 7. Migration from Hardcoded Forms

### 7.1 Before vs After

| Aspect | Before (Hardcoded) | After (Dynamic) |
|--------|-------------------|-----------------|
| **Files** | 8+ large files (~600KB) | 1 file + reusable components (~50KB) |
| **New Service** | Create new page, add route, deploy | Add DB rows, instant availability |
| **Field Changes** | Edit code, rebuild, redeploy | Update DB row, immediate effect |
| **Plan Levels** | Hardcoded if/else logic | DB-driven field visibility |
| **Mobile Support** | Inconsistent | Built-in responsive design |
| **Validation** | Duplicated in every file | Centralized validators |

### 7.2 Code Reduction

```
BEFORE:                    AFTER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ItrBasicFormPage.tsx  │   DynamicServiceForm.tsx
ItrStandardFormPage.tsx │   DynamicForm.tsx
ItrPremiumFormPage.tsx  │   FormFieldRenderer.tsx
ItrEliteFormPage.tsx    │   TextField.tsx
OrderSubmitDetails.tsx  │   SelectField.tsx
OrderRequirements.tsx   │   RepeaterField.tsx
DirectorshipsSection.ts │   + 10 field components
ForeignIncomeSection.ts │
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
~600KB of code          │   ~80KB of code
                        │   
48 services = 48 files  │   48 services = DB rows
```

### 7.3 Testing Checklist

- [ ] GST Registration form loads with correct fields
- [ ] Plan-based field visibility (BASIC vs PREMIUM)
- [ ] Conditional fields (show/hide based on other field values)
- [ ] Repeater fields (multiple directors/partners)
- [ ] File upload with R2
- [ ] Form validation (PAN, Aadhaar, GSTIN formats)
- [ ] Mobile responsive layout
- [ ] Form autosave (draft)
- [ ] Submission success flow
- [ ] All 48 services render correctly

---

## Summary

This dynamic form system allows you to:

1. **Manage 48 services from database** - No code changes needed for new services
2. **Different forms per service** - Each service has unique fields stored in DB
3. **Plan-based features** - BASIC, STANDARD, PREMIUM, ELITE show different fields
4. **Mobile-first design** - Responsive UI that works on all devices
5. **Cloudflare R2 integration** - Secure file uploads
6. **Production-ready** - Scalable, maintainable architecture

**Key Files Created:**
- Database schema with 8 tables
- Backend API with 5 endpoints
- Frontend with 15+ reusable components
- Single route for all 48 services

**Key Files Deleted:**
- 8 hardcoded form pages (~600KB)
- Duplicated validation logic
- Inconsistent mobile handling

---

## 8. CRM Integration & Client Analytics

### 8.1 Database Schema for CRM Tracking

```sql
-- ============================================
-- CRM TRACKING TABLES
-- ============================================

-- Client Journey Tracking
CREATE TABLE client_journeys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_item_id INTEGER,
    service_id INTEGER,
    plan_type TEXT,
    
    -- Unique tracking URL
    tracking_token TEXT UNIQUE NOT NULL,  -- UUID for CRM link
    crm_link TEXT,                        -- Full URL: /crm/track/:token
    
    -- Journey stages
    current_stage TEXT DEFAULT 'form_filling' CHECK(current_stage IN (
        'form_filling', 'form_submitted', 'payment_pending', 
        'payment_received', 'under_review', 'processing', 'completed'
    )),
    
    -- Timestamps for each stage
    form_started_at DATETIME,
    form_submitted_at DATETIME,
    payment_initiated_at DATETIME,
    payment_completed_at DATETIME,
    processing_started_at DATETIME,
    completed_at DATETIME,
    
    -- CRM metadata
    assigned_to INTEGER,                  -- Admin/CA assigned
    lead_source TEXT,                     -- 'website', 'referral', 'ads', 'organic'
    referral_code TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    
    -- Client priority
    priority TEXT DEFAULT 'normal' CHECK(priority IN ('low', 'normal', 'high', 'urgent')),
    
    -- Notes
    internal_notes TEXT,
    client_notes TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Payment Tracking
CREATE TABLE payment_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    journey_id INTEGER NOT NULL,
    order_item_id INTEGER,
    
    -- Payment details
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    payment_method TEXT CHECK(payment_method IN ('upi', 'card', 'netbanking', 'qr', 'cash', 'link')),
    payment_status TEXT DEFAULT 'pending' CHECK(payment_status IN ('pending', 'initiated', 'completed', 'failed', 'refunded')),
    
    -- Transaction details
    transaction_id TEXT,
    gateway_reference TEXT,
    receipt_url TEXT,                     -- R2 URL for receipt PDF
    
    -- Timeline
    initiated_at DATETIME,
    completed_at DATETIME,
    failed_at DATETIME,
    failure_reason TEXT,
    
    -- CRM tracking
    reminder_sent_at DATETIME,
    reminder_count INTEGER DEFAULT 0,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (journey_id) REFERENCES client_journeys(id)
);

-- Form Submission Analytics
CREATE TABLE form_analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    journey_id INTEGER NOT NULL,
    
    -- Page/Field analytics
    field_key TEXT,
    event_type TEXT CHECK(event_type IN ('viewed', 'focused', 'changed', 'blurred', 'error')),
    time_spent_seconds INTEGER,           -- Time spent on field
    
    -- Session tracking
    session_duration INTEGER,             -- Total form time
    abandonment_point TEXT,               -- Which field they left at
    
    -- Device info
    device_type TEXT,                     -- 'mobile', 'desktop', 'tablet'
    browser TEXT,
    ip_address TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (journey_id) REFERENCES client_journeys(id)
);

-- Client Communications Log
CREATE TABLE communication_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    journey_id INTEGER NOT NULL,
    
    communication_type TEXT CHECK(communication_type IN ('email', 'sms', 'whatsapp', 'call', 'in_app')),
    direction TEXT CHECK(direction IN ('outbound', 'inbound')),
    
    -- Content
    subject TEXT,
    content TEXT,
    template_used TEXT,                   -- Template ID if automated
    
    -- Status
    status TEXT DEFAULT 'sent' CHECK(status IN ('draft', 'sent', 'delivered', 'opened', 'failed')),
    
    -- Timestamps
    sent_at DATETIME,
    delivered_at DATETIME,
    opened_at DATETIME,
    
    -- Metadata
    attachments TEXT,                     -- JSON array of file URLs
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (journey_id) REFERENCES client_journeys(id)
);

-- CRM Dashboard Views
CREATE VIEW crm_pipeline AS
SELECT 
    cj.id as journey_id,
    cj.tracking_token,
    cj.current_stage,
    cj.priority,
    cj.lead_source,
    cj.assigned_to,
    u.name as client_name,
    u.email as client_email,
    u.mobile as client_mobile,
    s.name as service_name,
    s.slug as service_slug,
    cj.plan_type,
    sp.price as plan_price,
    pt.payment_status,
    pt.amount as paid_amount,
    cj.form_submitted_at,
    cj.created_at,
    CASE 
        WHEN cj.current_stage = 'form_filling' THEN 10
        WHEN cj.current_stage = 'form_submitted' THEN 25
        WHEN cj.current_stage = 'payment_pending' THEN 40
        WHEN cj.current_stage = 'payment_received' THEN 60
        WHEN cj.current_stage = 'under_review' THEN 75
        WHEN cj.current_stage = 'processing' THEN 90
        WHEN cj.current_stage = 'completed' THEN 100
    END as progress_percent
FROM client_journeys cj
JOIN users u ON cj.user_id = u.id
JOIN services s ON cj.service_id = s.id
LEFT JOIN service_plans sp ON s.id = sp.service_id AND sp.plan_type = cj.plan_type
LEFT JOIN payment_tracking pt ON cj.id = pt.journey_id AND pt.payment_status = 'completed';

-- Indexes for CRM queries
CREATE INDEX idx_journeys_user ON client_journeys(user_id);
CREATE INDEX idx_journeys_token ON client_journeys(tracking_token);
CREATE INDEX idx_journeys_stage ON client_journeys(current_stage);
CREATE INDEX idx_journeys_assigned ON client_journeys(assigned_to);
CREATE INDEX idx_payments_journey ON payment_tracking(journey_id);
CREATE INDEX idx_payments_status ON payment_tracking(payment_status);
CREATE INDEX idx_analytics_journey ON form_analytics(journey_id);
```

### 8.2 Backend API for CRM Integration

```typescript
// routes/crm.ts
export class CRMRoutes {
  
  // POST /api/crm/journey/initiate
  // Called when user starts filling a form
  static async initiateJourney(request: Request): Promise<Response> {
    const body = await request.json();
    const { userId, orderItemId, serviceId, planType, leadSource, utmData } = body;
    
    const db = getRequestContext().env.DB;
    
    // Generate unique tracking token
    const trackingToken = crypto.randomUUID();
    const crmLink = `${request.headers.get('origin')}/crm/track/${trackingToken}`;
    
    try {
      const result = await db
        .prepare(`
          INSERT INTO client_journeys 
          (user_id, order_item_id, service_id, plan_type, tracking_token, crm_link, 
           lead_source, utm_source, utm_medium, utm_campaign, form_started_at, current_stage)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), 'form_filling')
        `)
        .bind(
          userId, orderItemId, serviceId, planType, trackingToken, crmLink,
          leadSource || 'website',
          utmData?.source || null,
          utmData?.medium || null,
          utmData?.campaign || null
        )
        .run();
      
      return Response.json({
        success: true,
        journeyId: result.meta.last_row_id,
        trackingToken,
        crmLink,
        message: 'Journey tracking initiated'
      });
      
    } catch (error) {
      console.error('Error initiating journey:', error);
      return Response.json({ error: 'Failed to initiate journey' }, { status: 500 });
    }
  }
  
  // POST /api/crm/journey/:token/event
  // Track form events (field views, time spent, etc.)
  static async trackEvent(request: Request): Promise<Response> {
    const { token } = request.params;
    const body = await request.json();
    const { eventType, fieldKey, timeSpent, deviceInfo } = body;
    
    const db = getRequestContext().env.DB;
    
    // Get journey ID from token
    const journey = await db
      .prepare('SELECT id FROM client_journeys WHERE tracking_token = ?')
      .bind(token)
      .first();
    
    if (!journey) {
      return Response.json({ error: 'Invalid tracking token' }, { status: 404 });
    }
    
    await db
      .prepare(`
        INSERT INTO form_analytics 
        (journey_id, field_key, event_type, time_spent_seconds, device_type, browser, created_at)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      `)
      .bind(journey.id, fieldKey, eventType, timeSpent, deviceInfo?.type, deviceInfo?.browser)
      .run();
    
    return Response.json({ success: true });
  }
  
  // POST /api/crm/journey/:token/submit
  // Mark form as submitted
  static async submitForm(request: Request): Promise<Response> {
    const { token } = request.params;
    const db = getRequestContext().env.DB;
    
    await db
      .prepare(`
        UPDATE client_journeys 
        SET current_stage = 'form_submitted', 
            form_submitted_at = datetime('now'),
            updated_at = datetime('now')
        WHERE tracking_token = ?
      `)
      .bind(token)
      .run();
    
    return Response.json({ success: true, stage: 'form_submitted' });
  }
  
  // POST /api/crm/payment/initiate
  // Track payment initiation
  static async initiatePayment(request: Request): Promise<Response> {
    const body = await request.json();
    const { journeyId, orderItemId, amount, paymentMethod } = body;
    
    const db = getRequestContext().env.DB;
    
    const result = await db
      .prepare(`
        INSERT INTO payment_tracking 
        (journey_id, order_item_id, amount, payment_method, payment_status, initiated_at)
        VALUES (?, ?, ?, ?, 'initiated', datetime('now'))
      `)
      .bind(journeyId, orderItemId, amount, paymentMethod)
      .run();
    
    // Update journey stage
    await db
      .prepare(`
        UPDATE client_journeys 
        SET current_stage = 'payment_pending',
            payment_initiated_at = datetime('now'),
            updated_at = datetime('now')
        WHERE id = ?
      `)
      .bind(journeyId)
      .run();
    
    return Response.json({
      success: true,
      paymentId: result.meta.last_row_id,
      status: 'initiated'
    });
  }
  
  // POST /api/crm/payment/confirm
  // Mark payment as completed
  static async confirmPayment(request: Request): Promise<Response> {
    const body = await request.json();
    const { paymentId, transactionId, gatewayReference } = body;
    
    const db = getRequestContext().env.DB;
    
    // Get journey ID
    const payment = await db
      .prepare('SELECT journey_id FROM payment_tracking WHERE id = ?')
      .bind(paymentId)
      .first();
    
    if (!payment) {
      return Response.json({ error: 'Payment not found' }, { status: 404 });
    }
    
    // Update payment status
    await db
      .prepare(`
        UPDATE payment_tracking 
        SET payment_status = 'completed',
            transaction_id = ?,
            gateway_reference = ?,
            completed_at = datetime('now')
        WHERE id = ?
      `)
      .bind(transactionId, gatewayReference, paymentId)
      .run();
    
    // Update journey stage
    await db
      .prepare(`
        UPDATE client_journeys 
        SET current_stage = 'payment_received',
            payment_completed_at = datetime('now'),
            updated_at = datetime('now')
        WHERE id = ?
      `)
      .bind(payment.journey_id)
      .run();
    
    return Response.json({ success: true, stage: 'payment_received' });
  }
  
  // GET /api/crm/dashboard/pipeline
  // Admin dashboard - view all clients and their stages
  static async getPipeline(request: Request): Promise<Response> {
    const { status, assignedTo, leadSource, page = '1', limit = '20' } = request.query;
    const db = getRequestContext().env.DB;
    
    let sql = 'SELECT * FROM crm_pipeline WHERE 1=1';
    const params: any[] = [];
    
    if (status) {
      sql += ' AND current_stage = ?';
      params.push(status);
    }
    
    if (assignedTo) {
      sql += ' AND assigned_to = ?';
      params.push(assignedTo);
    }
    
    if (leadSource) {
      sql += ' AND lead_source = ?';
      params.push(leadSource);
    }
    
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));
    
    const results = await db.prepare(sql).bind(...params).all();
    
    // Get counts by stage
    const counts = await db
      .prepare(`
        SELECT current_stage, COUNT(*) as count 
        FROM client_journeys 
        GROUP BY current_stage
      `)
      .all();
    
    return Response.json({
      pipeline: results.results,
      stageCounts: counts.results,
      pagination: { page: parseInt(page), limit: parseInt(limit) }
    });
  }
  
  // GET /api/crm/client/:token
  // Get detailed client journey for admin view
  static async getClientJourney(request: Request): Promise<Response> {
    const { token } = request.params;
    const db = getRequestContext().env.DB;
    
    // Get journey details
    const journey = await db
      .prepare(`
        SELECT cj.*, u.name, u.email, u.mobile, u.created_at as user_since,
               s.name as service_name, s.category as service_category
        FROM client_journeys cj
        JOIN users u ON cj.user_id = u.id
        JOIN services s ON cj.service_id = s.id
        WHERE cj.tracking_token = ?
      `)
      .bind(token)
      .first();
    
    if (!journey) {
      return Response.json({ error: 'Journey not found' }, { status: 404 });
    }
    
    // Get payment history
    const payments = await db
      .prepare(`
        SELECT * FROM payment_tracking 
        WHERE journey_id = ? 
        ORDER BY created_at DESC
      `)
      .bind(journey.id)
      .all();
    
    // Get form analytics
    const analytics = await db
      .prepare(`
        SELECT * FROM form_analytics 
        WHERE journey_id = ? 
        ORDER BY created_at DESC
      `)
      .bind(journey.id)
      .all();
    
    // Get communications
    const communications = await db
      .prepare(`
        SELECT * FROM communication_log 
        WHERE journey_id = ? 
        ORDER BY created_at DESC
      `)
      .bind(journey.id)
      .all();
    
    return Response.json({
      journey,
      payments: payments.results,
      analytics: analytics.results,
      communications: communications.results
    });
  }
  
  // POST /api/crm/client/:token/assign
  // Assign client to CA/admin
  static async assignClient(request: Request): Promise<Response> {
    const { token } = request.params;
    const body = await request.json();
    const { assignedTo } = body;
    
    const db = getRequestContext().env.DB;
    
    await db
      .prepare(`
        UPDATE client_journeys 
        SET assigned_to = ?, updated_at = datetime('now')
        WHERE tracking_token = ?
      `)
      .bind(assignedTo, token)
      .run();
    
    return Response.json({ success: true, message: 'Client assigned' });
  }
  
  // POST /api/crm/client/:token/stage
  // Update client stage manually
  static async updateStage(request: Request): Promise<Response> {
    const { token } = request.params;
    const body = await request.json();
    const { stage, notes } = body;
    
    const db = getRequestContext().env.DB;
    
    await db
      .prepare(`
        UPDATE client_journeys 
        SET current_stage = ?, 
            internal_notes = COALESCE(?, internal_notes),
            updated_at = datetime('now')
        WHERE tracking_token = ?
      `)
      .bind(stage, notes, token)
      .run();
    
    return Response.json({ success: true, stage });
  }
  
  // GET /api/crm/analytics/summary
  // Dashboard analytics
  static async getAnalyticsSummary(request: Request): Promise<Response> {
    const { startDate, endDate } = request.query;
    const db = getRequestContext().env.DB;
    
    // Overall stats
    const stats = await db
      .prepare(`
        SELECT 
          COUNT(*) as total_journeys,
          COUNT(CASE WHEN current_stage = 'completed' THEN 1 END) as completed,
          COUNT(CASE WHEN current_stage = 'form_filling' THEN 1 END) as in_progress,
          COUNT(CASE WHEN current_stage = 'payment_pending' THEN 1 END) as awaiting_payment,
          COUNT(CASE WHEN DATE(created_at) = DATE('now') THEN 1 END) as today,
          AVG(CASE 
            WHEN form_submitted_at IS NOT NULL AND form_started_at IS NOT NULL 
            THEN (julianday(form_submitted_at) - julianday(form_started_at)) * 24 * 60
          END) as avg_form_completion_minutes
        FROM client_journeys
        WHERE created_at BETWEEN ? AND ?
      `)
      .bind(startDate || '2024-01-01', endDate || '2030-12-31')
      .first();
    
    // Revenue stats
    const revenue = await db
      .prepare(`
        SELECT 
          SUM(CASE WHEN payment_status = 'completed' THEN amount ELSE 0 END) as total_revenue,
          SUM(CASE WHEN payment_status = 'pending' THEN amount ELSE 0 END) as pending_revenue,
          COUNT(CASE WHEN payment_status = 'completed' THEN 1 END) as successful_payments,
          COUNT(CASE WHEN payment_status = 'failed' THEN 1 END) as failed_payments
        FROM payment_tracking pt
        JOIN client_journeys cj ON pt.journey_id = cj.id
        WHERE cj.created_at BETWEEN ? AND ?
      `)
      .bind(startDate || '2024-01-01', endDate || '2030-12-31')
      .first();
    
    // Lead source breakdown
    const leadSources = await db
      .prepare(`
        SELECT lead_source, COUNT(*) as count, 
               SUM(CASE WHEN current_stage = 'completed' THEN 1 ELSE 0 END) as converted
        FROM client_journeys
        WHERE created_at BETWEEN ? AND ?
        GROUP BY lead_source
      `)
      .bind(startDate || '2024-01-01', endDate || '2030-12-31')
      .all();
    
    return Response.json({
      stats,
      revenue,
      leadSources: leadSources.results
    });
  }
}
```

### 8.3 Frontend CRM Integration

```typescript
// user-panel/hooks/useCRMTracking.ts
import { useEffect, useRef, useCallback } from 'react';
import { crmApi } from '@/user-panel/services/crmApi';

export const useCRMTracking = (journeyToken: string | null) => {
  const fieldTimers = useRef<Record<string, number>>({});
  const startTime = useRef<number>(Date.now());
  
  // Track field event
  const trackEvent = useCallback(async (
    fieldKey: string, 
    eventType: 'viewed' | 'focused' | 'changed' | 'blurred' | 'error',
    timeSpent?: number
  ) => {
    if (!journeyToken) return;
    
    await crmApi.trackEvent(journeyToken, {
      fieldKey,
      eventType,
      timeSpent,
      deviceInfo: {
        type: getDeviceType(),
        browser: getBrowserInfo()
      }
    });
  }, [journeyToken]);
  
  // Field focus handler
  const onFieldFocus = useCallback((fieldKey: string) => {
    fieldTimers.current[fieldKey] = Date.now();
    trackEvent(fieldKey, 'focused');
  }, [trackEvent]);
  
  // Field blur handler
  const onFieldBlur = useCallback((fieldKey: string) => {
    const start = fieldTimers.current[fieldKey];
    const timeSpent = start ? Math.round((Date.now() - start) / 1000) : 0;
    trackEvent(fieldKey, 'blurred', timeSpent);
  }, [trackEvent]);
  
  // Track form submission
  const trackSubmission = useCallback(async () => {
    if (!journeyToken) return;
    const totalTime = Math.round((Date.now() - startTime.current) / 1000);
    
    await crmApi.trackSubmission(journeyToken, {
      totalTimeSpent: totalTime,
      completedAt: new Date().toISOString()
    });
  }, [journeyToken]);
  
  // Track payment initiation
  const trackPaymentInitiation = useCallback(async (amount: number, method: string) => {
    if (!journeyToken) return;
    await crmApi.initiatePayment(journeyToken, { amount, method });
  }, [journeyToken]);
  
  return {
    onFieldFocus,
    onFieldBlur,
    trackSubmission,
    trackPaymentInitiation,
    trackEvent
  };
};

// Helper functions
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'chrome';
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Safari')) return 'safari';
  return 'other';
};
```

```typescript
// user-panel/services/crmApi.ts
export const crmApi = {
  // Initiate journey when form starts
  initiateJourney: async (data: {
    userId: string;
    orderItemId: string;
    serviceId: string;
    planType: string;
    leadSource?: string;
    utmData?: { source?: string; medium?: string; campaign?: string };
  }) => {
    const response = await api.post('/crm/journey/initiate', data);
    return response.data;
  },
  
  // Track form events
  trackEvent: async (token: string, eventData: {
    fieldKey: string;
    eventType: string;
    timeSpent?: number;
    deviceInfo?: any;
  }) => {
    const response = await api.post(`/crm/journey/${token}/event`, eventData);
    return response.data;
  },
  
  // Track form submission
  trackSubmission: async (token: string, data: { totalTimeSpent: number; completedAt: string }) => {
    const response = await api.post(`/crm/journey/${token}/submit`, data);
    return response.data;
  },
  
  // Track payment
  initiatePayment: async (token: string, data: { amount: number; method: string }) => {
    const response = await api.post('/crm/payment/initiate', { ...data, journeyToken: token });
    return response.data;
  },
  
  confirmPayment: async (paymentId: string, data: { transactionId: string; gatewayReference: string }) => {
    const response = await api.post('/crm/payment/confirm', { paymentId, ...data });
    return response.data;
  }
};
```

### 8.4 Admin CRM Dashboard Component

```tsx
// admin-panel/pages/AdminCRM.tsx
import { useState, useEffect } from 'react';
import { useAdmin } from '@/admin-panel/contexts/AdminContext';
import { crmAdminApi } from '@/admin-panel/services/crmAdminApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, DollarSign, TrendingUp, Clock, 
  Filter, Download, Search, ChevronRight 
} from 'lucide-react';

export const AdminCRM = () => {
  const [pipeline, setPipeline] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [filters, setFilters] = useState({
    status: '',
    leadSource: '',
    assignedTo: ''
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadData();
  }, [filters]);
  
  const loadData = async () => {
    setLoading(true);
    const [pipelineData, analyticsData] = await Promise.all([
      crmAdminApi.getPipeline(filters),
      crmAdminApi.getAnalyticsSummary()
    ]);
    setPipeline(pipelineData.pipeline);
    setAnalytics(analyticsData);
    setLoading(false);
  };
  
  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'form_filling': 'bg-yellow-500',
      'form_submitted': 'bg-blue-500',
      'payment_pending': 'bg-orange-500',
      'payment_received': 'bg-green-500',
      'under_review': 'bg-purple-500',
      'processing': 'bg-indigo-500',
      'completed': 'bg-emerald-500'
    };
    return colors[stage] || 'bg-gray-500';
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">CRM Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Clients</p>
                  <p className="text-2xl font-bold">{analytics.stats.total_journeys}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold">₹{analytics.revenue.total_revenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                  <p className="text-2xl font-bold">
                    {((analytics.stats.completed / analytics.stats.total_journeys) * 100).toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Form Time</p>
                  <p className="text-2xl font-bold">
                    {Math.round(analytics.stats.avg_form_completion_minutes || 0)}m
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Pipeline View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Client Pipeline</span>
            <div className="flex gap-2">
              <select 
                className="border rounded px-3 py-1 text-sm"
                value={filters.status}
                onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
              >
                <option value="">All Status</option>
                <option value="form_filling">Form Filling</option>
                <option value="form_submitted">Form Submitted</option>
                <option value="payment_pending">Payment Pending</option>
                <option value="payment_received">Payment Received</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Service</th>
                  <th className="text-left py-3 px-4">Stage</th>
                  <th className="text-left py-3 px-4">Payment</th>
                  <th className="text-left py-3 px-4">Progress</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pipeline.map((client) => (
                  <tr key={client.journey_id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{client.client_name}</p>
                        <p className="text-sm text-gray-500">{client.client_email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{client.service_name}</p>
                        <Badge variant="outline">{client.plan_type}</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStageColor(client.current_stage)}>
                        {client.current_stage.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {client.payment_status === 'completed' ? (
                        <span className="text-green-600">₹{client.paid_amount} ✓</span>
                      ) : (
                        <span className="text-orange-500">Pending (₹{client.plan_price})</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${client.progress_percent}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{client.progress_percent}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => viewClientDetail(client.tracking_token)}
                      >
                        View <ChevronRight className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
```

### 8.5 Unique CRM Link Generator

```typescript
// utils/crmLinkGenerator.ts

export interface CRMLinkData {
  userId: string;
  orderItemId: string;
  serviceId: string;
  serviceName: string;
  planType: string;
  trackingToken: string;
  crmLink: string;
}

export const generateCRMTracking = async (
  userId: string,
  orderItemId: string,
  serviceId: string,
  planType: string,
  options?: {
    leadSource?: string;
    referralCode?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }
): Promise<CRMLinkData> => {
  
  // Call API to create journey
  const response = await fetch('/api/crm/journey/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      orderItemId,
      serviceId,
      planType,
      leadSource: options?.leadSource || 'website',
      utmData: {
        source: options?.utmSource,
        medium: options?.utmMedium,
        campaign: options?.utmCampaign
      }
    })
  });
  
  const data = await response.json();
  
  return {
    userId,
    orderItemId,
    serviceId,
    serviceName: data.serviceName,
    planType,
    trackingToken: data.trackingToken,
    crmLink: data.crmLink
  };
};

// Generate shareable link for agents/referrers
export const generateReferralLink = (
  baseUrl: string,
  serviceSlug: string,
  referralCode: string,
  planType?: string
): string => {
  const params = new URLSearchParams({
    ref: referralCode,
    ...(planType && { plan: planType })
  });
  
  return `${baseUrl}/services/${serviceSlug}?${params.toString()}`;
};
```

### 8.6 Integration Flow Summary

```
CLIENT JOURNEY FLOW WITH CRM TRACKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. USER LANDS ON SERVICE PAGE
   ↓
   • UTM params captured (source, medium, campaign)
   • Referral code captured
   • Lead source recorded

2. USER SELECTS PLAN & CREATES ORDER
   ↓
   • CRM journey initiated: POST /api/crm/journey/initiate
   • Tracking token generated
   • Unique CRM link created: /crm/track/:token
   • Stage: 'form_filling'

3. USER FILLS DYNAMIC FORM
   ↓
   • Field-level tracking: POST /api/crm/journey/:token/event
   • Time spent per field recorded
   • Device/browser info logged
   • Abandonment tracking enabled

4. FORM SUBMITTED
   ↓
   • Stage updated: 'form_submitted'
   • Total completion time calculated
   • Notification sent to assigned CA

5. PAYMENT INITIATED
   ↓
   • POST /api/crm/payment/initiate
   • Stage: 'payment_pending'
   • Payment reminder scheduled

6. PAYMENT COMPLETED
   ↓
   • POST /api/crm/payment/confirm
   • Stage: 'payment_received'
   • Receipt generated & stored

7. CA ASSIGNED & PROCESSING
   ↓
   • POST /api/crm/client/:token/assign
   • Stage: 'under_review' → 'processing'
   • Internal notes added

8. SERVICE COMPLETED
   ↓
   • Stage: 'completed'
   • Delivery documents uploaded
   • Feedback request sent

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRM DASHBOARD CAPABILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• View all clients in pipeline
• Filter by stage, source, assigned CA
• Track revenue by service/plan
• Monitor form abandonment rates
• Analyze lead source performance
• Export data for external CRM
• Automated follow-up reminders
• Client communication history

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 8.7 Routes to Add in App.tsx

```tsx
// App.tsx - Add these admin CRM routes
<Route path="/admin/crm" element={<AdminProtectedRoute><AdminCRM /></AdminProtectedRoute>} />
<Route path="/admin/crm/client/:token" element={<AdminProtectedRoute><AdminCRMClientDetail /></AdminProtectedRoute>} />
<Route path="/admin/crm/analytics" element={<AdminProtectedRoute><AdminCRMAnalytics /></AdminProtectedRoute>} />

// Public tracking route (for sharing with clients if needed)
<Route path="/crm/track/:token" element={<CRMTrackingPage />} />
```

---

## Summary of CRM Integration

**New Tables Added:**
- `client_journeys` - Track each client's service journey
- `payment_tracking` - Monitor all payments
- `form_analytics` - Field-level form analytics
- `communication_log` - All client communications

**New APIs:**
- `POST /api/crm/journey/initiate` - Start tracking
- `POST /api/crm/journey/:token/event` - Track form events
- `POST /api/crm/journey/:token/submit` - Form submitted
- `POST /api/crm/payment/initiate` & `/confirm` - Payment tracking
- `GET /api/crm/dashboard/pipeline` - View all clients
- `GET /api/crm/client/:token` - Detailed client view
- `GET /api/crm/analytics/summary` - Dashboard stats

**Frontend Features:**
- `useCRMTracking` hook for automatic event tracking
- Unique CRM link per client/service combination
- Admin dashboard with pipeline view
- Revenue and conversion analytics
- Lead source performance tracking
- Export capabilities for external CRM integration
