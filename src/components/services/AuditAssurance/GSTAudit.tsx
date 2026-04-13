import React, { useState } from 'react';
import { Filter, CheckCircle, FileText, Clock, ArrowRight, Shield, Calculator, FileSearch, Building2, AlertTriangle, Award, Zap } from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function GSTAudit() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    // Fetch dynamic content
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/gst-audit`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error("Failed to fetch GST Audit service details", err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: "GST Audit",
        subtitle: "GST Annual Return & Reconciliation",
        description: "Expert assistance for GSTR-9/9C filing and Department Audits. Ensure 100% compliance and avoid litigation.",
        heroFeatures: [
            { icon: Clock, text: "Due: 31st Dec" },
            { icon: Shield, text: "Risk Mitigation" },
            { icon: Award, text: "GSTR-9/9C" }
        ],
        process: [
            { step: "1", title: "Data Consolidation", description: "Aggregating financial data and GST portal data for the financial year." },
            { step: "2", title: "Detailed Verification", description: "Transaction level checking of invoices, e-way bills, and stock records." },
            { step: "3", title: "Draft Reconciliation", description: "Preparation of GSTR-9C draft and identifying gaps." },
            { step: "4", title: "Filing", description: "Uploading the final GSTR-9 and 9C on the portal." }
        ],
        typesTitle: "GST Audit Types",
        types: [
            {
                title: 'Annual Reconciliation (9C)',
                description: 'Reconciling Audited Financials with GST Returns (GSTR-9). Mandatory for turnover > â‚¹5 Cr.',
                icon: Calculator,
                features: ['Book vs Return matching', 'Turnover verification', 'ITC Reconciliation', 'Tax Liability check'],
            },
            {
                title: 'Department Audit (Sec 65)',
                description: 'Detailed scrutiny of records by GST authorities at your business premises.',
                icon: FileSearch,
                features: ['Notice Reply', 'Document Compilation', 'Representation', 'Legal Defense'],
            },
            {
                title: 'Special Audit (Sec 66)',
                description: 'Audit directed by the department to be conducted by a CA/CMA nominated by them.',
                icon: Shield,
                features: ['Complex Case Analysis', 'Valuation Disputes', 'ITC Fraud Investigation', 'Detailed Report'],
            },
        ],
        plans: [
            {
                id: 1,
                name: 'Review',
                price: 10000,
                color: 'bg-blue-500',
                description: "For Small Biz",
                features: [
                    'GSTR-9 Review',
                    'Basic Reconciliation',
                    'Filing Support'
                ]
            },
            {
                id: 2,
                name: 'Standard',
                price: 20000,
                color: 'bg-green-500',
                recommended: true,
                description: "Most Popular",
                features: [
                    'GSTR-9 + 9C',
                    'Detailed ITC Check',
                    'Drafting Reconciliation',
                    'Review Meeting'
                ]
            },
            {
                id: 3,
                name: 'Department',
                price: 0,
                color: 'bg-purple-500',
                description: "Custom Pricing",
                features: [
                    'Notice Reply',
                    'Department Representation',
                    'Hearing Attendance',
                    'Appeal Filing'
                ]
            }
        ],
        descriptionTitle: "What is GST Audit?",
        descriptionContent: "GST Audit involves examination of records, returns and other documents maintained by a GST registered person. It verifies the correctness of turnover declared, taxes paid, refund claimed and input tax credit availed. GSTR-9 is the annual return and GSTR-9C is the reconciliation statement required for taxpayers with turnover exceeding â‚¹5 Crore. Our experts ensure accurate reconciliation and compliance to avoid notices and penalties.",
        faqs: [
            {
                q: 'Is GST Audit by CA mandatory?',
                a: 'No, the mandatory requirement for CA certification on GSTR-9C was removed in Budget 2021. It is now self-certified. However, professional help is recommended for accuracy.',
            },
            {
                q: 'What is the due date for GSTR-9/9C?',
                a: 'The due date is typically 31st December following the end of the financial year. For example, for FY 22-23, due date is 31st Dec 2023.',
            },
            {
                q: 'What happens if I miss the due date?',
                a: 'Late fee is levied at â‚¹200 per day (subject to caps based on turnover). Delay can also attract scrutiny and interest on unpaid tax.',
            },
            {
                q: 'Can I claim missed ITC in Annual Return?',
                a: 'No, usually the time limit to claim ITC for a FY ends on 30th November of the next year. Annual return is primarily for reconciliation, not for claiming new credits.',
            },
            {
                q: 'Is GSTR-9C required if turnover is below â‚¹5 Cr?',
                a: 'No, filing of GSTR-9C is optional for taxpayers having aggregate turnover up to â‚¹5 Crores.',
            },
        ],
        checklist: [
            "Audited Financial Statements",
            "GSTR-1, GSTR-3B & GSTR-9 copies",
            "Sales and Purchase Registers",
            "Input Tax Credit Register",
            "E-Way Bill Reports",
            "Tax Payment Challans"
        ],
        termsAndConditions: [
            "GST audit fees vary based on turnover and transaction volume.",
            "All GST returns and financial statements must be provided.",
            "Due date for filing is 31st December unless extended.",
            "Management representation letter is required.",
            "Late filing attracts penalty of â‚¹200 per day."
        ],
        benefits: [
            'Identification of Revenue Leakages',
            'Verification of Input Tax Credit (ITC) eligibility',
            'Avoidance of future litigation and interest',
            'Correct classification of Goods/Services',
            'Validation of Place of Supply rules',
            'Assurance on tax positions taken',
            'Refund of excess tax paid (if any)',
            'Peace of Mind during Department visits'
        ],
        criticalConsiderations: [
            {
                title: 'Self Certification',
                description: 'GSTR-9C is now self-certified. The responsibility of accuracy lies entirely on the taxpayer.',
                icon: CheckCircle,
            },
            {
                title: 'Turnover Limits',
                description: 'GSTR-9 is mandatory if turnover > â‚¹2 Cr. GSTR-9C is mandatory if turnover > â‚¹5 Cr.',
                icon: Building2,
            },
            {
                title: 'ITC Reversal',
                description: 'Specific focus on Rule 42/43 reversals and blocked credits under Section 17(5).',
                icon: AlertTriangle,
            },
            {
                title: 'Limitation Period',
                description: 'Notices can be issued up to 5 years from due date. Records must be preserved for 72 months.',
                icon: Clock,
            }
        ],
        documentsRequired: [
            'Audited Financial Statements (Balance Sheet/P&L)',
            'Copies of filed GSTR-1, GSTR-3B & GSTR-9',
            'Sales and Purchase Registers (Excel)',
            'Input Tax Credit Register',
            'E-Way Bill Reports',
            'Tax Payment Challans',
            'Refund Orders (if any)',
            'Previous Audit/Scrutiny Orders'
        ],
        dataRequired: [
            'Turnover Reconciliation',
            'Rate-wise Liability Calculation',
            'ITC Claimed vs Availment in Books',
            'Un-reconciled differences',
            'Non-GST / Exempt supply details',
            'Details of Demands/Refunds',
            'HSN Summary'
        ],
        serviceDetails: [
            {
                title: 'GSTR-9 Filing',
                description: 'Annual return filing with consolidated summary of all monthly/quarterly returns.',
                icon: FileText,
            },
            {
                title: 'GSTR-9C Reconciliation',
                description: 'Reconciliation between audited financials and GST returns with certification.',
                icon: Calculator,
            },
            {
                title: 'Department Audit Support',
                description: 'Handling scrutiny, notices, and representation before GST authorities.',
                icon: Shield,
            },
            {
                title: 'ITC Review',
                description: 'Verification of input tax credit eligibility and blocked credit compliance.',
                icon: CheckCircle,
            },
        ],
        timeline: [
            { stage: 'Data Consolidation', duration: '2-3 Days' },
            { stage: 'Detailed Verification', duration: '3-5 Days' },
            { stage: 'Draft Reconciliation', duration: '2 Days' },
            { stage: 'Filing', duration: 'Final' },
        ]
    };

    const content = { ...defaultContent };
    if (fetchedService && fetchedService.plans && fetchedService.plans.length > 0) {
        content.plans = fetchedService.plans.map((p: any, index: number) => {
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
            const color = colors[index % colors.length];
            return {
                id: p.id,
                name: p.planType,
                price: p.discountedPrice || p.price,
                description: p.planType === 'Standard' ? 'Most Popular Choice' : '',
                recommended: p.planType === 'Standard' || p.isPopular,
                color: color,
                features: p.scopes ? p.scopes.map((s: any) => s.title || s.description) : (p.features || [])
            };
        });
    }

    return <ServiceTemplate serviceSlug="gst-audit" serviceId={fetchedService?.id} content={content} />;
}
