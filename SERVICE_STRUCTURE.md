# CA Website - Service Structure Documentation

## Overview
The navigation has been restructured with **5 main service categories**, each containing multiple sub-services. This creates a clear hierarchy and better organization.

---

## 🎯 5 Main Service Categories

### 1️⃣ **Business Registrations**
**Route:** `/services/business-registrations`
**Component:** `BusinessRegistrations.tsx`

**Sub-Services:**
- Company Incorporation → `/services/business-registrations/company-incorporation`
- LLP Formation → `/services/business-registrations/llp-formation`
- Partnership Firm → `/services/business-registrations/partnership-firm`
- Sole Proprietorship → `/services/business-registrations/sole-proprietorship`
- One Person Company (OPC) → `/services/business-registrations/one-person-company`
- Section 8 Company (NGO) → `/services/business-registrations/section-8-company`

---

### 2️⃣ **Tax Registrations**
**Route:** `/services/tax-registrations`
**Component:** `TaxRegistrationsService.tsx`

**Sub-Services:**
- PAN Registration → `/services/tax-registrations/pan-registration`
- TAN Registration → `/services/tax-registrations/tan-registration`
- GST Registration → `/services/tax-registrations/gst-registration`
- Professional Tax Registration → `/services/tax-registrations/professional-tax`
- Import Export Code (IEC) → `/services/tax-registrations/import-export-code`

---

### 3️⃣ **Business Entity Law & Operational Compliances**
**Route:** `/services/business-entity-law-compliances`
**Component:** `BusinessEntityLawCompliances.tsx`

**Sub-Services:**
- ROC Annual Filings (AOC-4, MGT-7) → `/services/business-entity-law-compliances/roc-annual-filings`
- LLP Annual Filings (Form 8 & 11) → `/services/business-entity-law-compliances/llp-annual-filings`
- Director KYC (DIR-3 KYC) → `/services/business-entity-law-compliances/director-kyc`
- Board Meetings & AGM → `/services/business-entity-law-compliances/board-meetings`
- Share Transfer & Transmission → `/services/business-entity-law-compliances/share-transfer`
- Change in Directors/Partners → `/services/business-entity-law-compliances/change-in-directors`
- Registered Office Change → `/services/business-entity-law-compliances/registered-office-change`

---

### 4️⃣ **Tax & Financial Compliances (Direct + Indirect Taxes)**
**Route:** `/services/tax-financial-compliances`
**Component:** `TaxFinancialCompliances.tsx`

**Sub-Services:**
- Income Tax Return Filing (ITR) → `/services/tax-financial-compliances/income-tax-return`
- GST Return Filing → `/services/tax-financial-compliances/gst-return-filing`
- TDS Return Filing (24Q, 26Q, 27Q) → `/services/tax-financial-compliances/tds-return-filing`
- Tax Audit (Form 3CA/3CB, 3CD) → `/services/tax-financial-compliances/tax-audit`
- Transfer Pricing Documentation → `/services/tax-financial-compliances/transfer-pricing`
- Advance Tax Payment → `/services/tax-financial-compliances/advance-tax-payment`
- E-Invoicing & E-Way Bill → `/services/tax-financial-compliances/e-invoicing`
- Labour Law Compliance (PF, ESI) → `/services/tax-financial-compliances/labour-law-compliance`

---

### 5️⃣ **Government Registrations & Special Regulatory Compliances**
**Route:** `/services/government-registrations-compliances`
**Component:** `GovernmentRegistrationsCompliances.tsx`

**Sub-Services:**
- MSME/Udyam Registration → `/services/government-registrations-compliances/msme-udyam`
- Trademark Registration → `/services/government-registrations-compliances/trademark-registration`
- FSSAI License → `/services/government-registrations-compliances/fssai-license`
- Trade License → `/services/government-registrations-compliances/trade-license`
- Shops & Establishment License → `/services/government-registrations-compliances/shops-establishment`
- EPFO/ESIC Returns → `/services/government-registrations-compliances/epfo-esic-returns`
- FCRA Registration (NGO) → `/services/government-registrations-compliances/fcra-registration`
- DARPAN ID Registration → `/services/government-registrations-compliances/darpan-registration`
- CSR-1 Filing → `/services/government-registrations-compliances/csr-filing`
- ISO Certification Support → `/services/government-registrations-compliances/iso-certification`

---

## 📁 File Structure

```
src/
├── components/
│   ├── Navigation.tsx (Updated with new structure)
│   ├── services/
│   │   ├── BusinessRegistrations.tsx (NEW - Main Category)
│   │   ├── TaxRegistrationsService.tsx (NEW - Main Category)
│   │   ├── BusinessEntityLawCompliances.tsx (NEW - Main Category)
│   │   ├── TaxFinancialCompliances.tsx (NEW - Main Category)
│   │   ├── GovernmentRegistrationsCompliances.tsx (NEW - Main Category)
│   │   ├── CompanyIncorporation.tsx (Existing - Sub-service)
│   │   ├── LLPFormation.tsx (Existing - Sub-service)
│   │   ├── PartnershipFirm.tsx (Existing - Sub-service)
│   │   ├── TaxRegistrations.tsx (Existing - Sub-service)
│   │   ├── TaxCompliances.tsx (Existing - Sub-service)
│   │   └── GovernmentRegistrations.tsx (Existing - Sub-service)
├── App.tsx (Updated with all routes)
```

---

## 🔄 Navigation Behavior

### Desktop:
1. Hover over "SERVICES" → Shows 5 main categories
2. Hover over any category → Shows sub-services in a flyout menu to the right
3. Click on category → Goes to main category page
4. Click on sub-service → Goes to specific sub-service page

### Mobile:
1. Tap "SERVICES" → Expands accordion
2. Shows all 5 categories with their sub-services
3. Tap category title → Goes to main category page
4. Tap sub-service → Goes to specific sub-service page

---

## ✅ What's Been Done

1. ✅ Created new Navigation.tsx with 5 main service categories
2. ✅ Created 5 main category pages with overview content
3. ✅ Updated App.tsx with complete routing structure
4. ✅ Mapped all 30+ sub-services to routes
5. ✅ Maintained backward compatibility with existing routes
6. ✅ Implemented cascading dropdown menu (desktop)
7. ✅ Implemented accordion menu (mobile)

---

## 🎨 Design Features

- Clean, professional navigation
- Cascading dropdown menus (like reference screenshot)
- Color-coded category pages:
  - Business Registrations: Blue
  - Tax Registrations: Green
  - Business Entity Law: Purple
  - Tax & Financial: Orange
  - Government Registrations: Teal
- Responsive design for all screen sizes
- Smooth transitions and hover effects

---

## 📝 Next Steps (Optional)

To complete the implementation, you may want to:

1. Create individual sub-service pages for each service (currently using placeholder pages)
2. Add detailed content for each sub-service
3. Add service-specific forms and CTAs
4. Implement breadcrumb navigation
5. Add service comparison features
6. Create service package bundles

---

## 🔗 Route Examples

**Main Category:**
- https://yoursite.com/services/business-registrations

**Sub-Service:**
- https://yoursite.com/services/business-registrations/company-incorporation

**Backward Compatible:**
- https://yoursite.com/services/company-incorporation (still works!)

---

**Total Services:** 5 Main Categories + 36 Sub-Services = 41 Service Pages
