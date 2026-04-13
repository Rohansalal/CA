import React, { useState } from 'react';
import {
    Search, CheckCircle, FileText, Clock, ArrowRight, Shield, AlertTriangle, Calculator, DollarSign, TrendingUp,
    Award, Zap
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function TaxAudit() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    // Fetch dynamic content
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/tax-audit`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error("Failed to fetch Tax Audit service details", err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: "Tax Audit",
        subtitle: "Section 44AB Tax Audit Compliance",
        description: "Mandatory tax audit for businesses with turnover > â‚¹1 Crore and professionals with receipts > â‚¹50 Lakhs. Comprehensive Form 3CD reporting.",
        heroFeatures: [
            { icon: Award, text: "Section 44AB" },
            { icon: Shield, text: "Form 3CD" },
            { icon: Clock, text: "Sept 30 Deadline" }
        ],
        process: [
            { step: "1", title: "Applicability Check", description: "Verify if turnover limits exceed Section 44AB thresholds." },
            { step: "2", title: "Vouching", description: "Detailed verification of vouchers, bills, and ledgers." },
            { step: "3", title: "Compliance Check", description: "Checking TDS, TCS, GST, and statutory payments." },
            { step: "4", title: "Form 3CD Filing", description: "Preparing and filing detailed audit report with UDIN." }
        ],
        typesTitle: "Tax Audit Scope",
        types: [
            {
                title: '44AB Compliance',
                description: 'Mandatory audit for businesses exceeding turnover thresholds.',
                icon: Search,
                features: ['Turnover Verification', 'Limit Applicability', 'Presumptive Check'],
            },
            {
                title: 'Comprehensive Reporting',
                description: 'Detailed Form 3CA/3CB and 3CD preparation and filing.',
                icon: FileText,
                features: ['Form 3CD', 'Form 3CA/3CB', 'TDS Compliance', 'Accounting Method'],
            },
            {
                title: 'Disallowance Check',
                description: 'Identifying expenses inadmissible under Income Tax Act.',
                icon: AlertTriangle,
                features: ['Cash Payments > 10k', 'TDS Non-deduction', 'Unpaid Statutory Dues'],
            },
        ],
        // Default plans
        plans: [
            {
                id: 1,
                name: 'Professional',
                price: 12000,
                color: 'bg-blue-500',
                description: "For Small Professionals",
                features: [
                    'Gross Receipts < â‚¹50 Lakhs',
                    'Presumptive Tax Audit',
                    'Form 3CD Filing',
                    'UDIN Generation',
                    'Email Support'
                ]
            },
            {
                id: 2,
                name: 'Business',
                price: 25000,
                color: 'bg-green-500',
                recommended: true,
                description: "For SMEs",
                features: [
                    'Turnover < â‚¹5 Crore',
                    'Comprehensive Audit',
                    'Form 3CD Filing',
                    'TDS Review Included',
                    'GST Reconciliation',
                    'Priority Support'
                ]
            },
            {
                id: 3,
                name: 'Enterprise',
                price: 50000,
                color: 'bg-purple-500',
                description: "For Large Businesses",
                features: [
                    'Turnover > â‚¹5 Crore',
                    'Detailed 3CD Clauses',
                    'Internal Controls Review',
                    'Transfer Pricing Check',
                    'Dedicated CA',
                    'Board Presentation'
                ]
            }
        ],
        descriptionTitle: "What is Tax Audit?",
        descriptionContent: "Tax Audit under Section 44AB of the Income Tax Act requires certain businesses and professionals to get their accounts audited by a Chartered Accountant. It applies to businesses with turnover exceeding â‚¹1 Crore (â‚¹10 Crore if 95% digital) and professionals with gross receipts over â‚¹50 Lakhs. The audit ensures proper maintenance of books, verification of deductions, and compliance with tax laws through Form 3CA/3CB and detailed Form 3CD reporting.",
        faqs: [
            {
                q: 'Is Tax Audit mandatory for all businesses?',
                a: 'Tax Audit is mandatory if your business turnover exceeds â‚¹1 Crore (â‚¹10 Crore if 95% transactions are digital). For professionals, the limit is â‚¹50 Lakhs in gross receipts.',
            },
            {
                q: 'What is the due date for Tax Audit?',
                a: 'The Tax Audit Report must be filed by 30th September of the Assessment Year. Late filing attracts a penalty of 0.5% of turnover or â‚¹1,50,000, whichever is lower.',
            },
            {
                q: 'What forms are filed in Tax Audit?',
                a: 'Form 3CA/3CB is the Chartered Accountant\'s audit report, and Form 3CD contains 44 detailed clauses about business operations, compliance, and financial particulars.',
            },
            {
                q: 'What expenses are disallowed in Tax Audit?',
                a: 'Common disallowances include cash payments exceeding â‚¹10,000, expenses where TDS was not deducted, unpaid statutory dues beyond prescribed time limits, and personal expenses.',
            },
            {
                q: 'Is Tax Audit different from Statutory Audit?',
                a: 'Yes, Statutory Audit is under Companies Act for all companies, while Tax Audit under Section 44AB applies to specific turnover thresholds for tax compliance purposes.',
            },
        ],
        checklist: [
            "Final Books of Accounts",
            "Sales & Purchase Registers",
            "Bank Statements (All accounts)",
            "TDS Returns & Challans",
            "GST Returns (GSTR-1, 3B)",
            "Loan Statements",
            "Fixed Asset Register",
            "Previous Year Audit Report"
        ],
        termsAndConditions: [
            "Tax Audit fees vary based on turnover and complexity.",
            "All books of accounts must be provided for verification.",
            "Due date for audit is 30th September unless extended.",
            "Management representation letter is mandatory.",
            "Late filing penalty is 0.5% of turnover or â‚¹1.5L."
        ],
        benefits: [
            'Avoids 0.5% turnover penalty',
            'Ensures ITR accuracy',
            'Verification of deductions',
            'Correct depreciation reporting',
            'GST-IT reconciliation',
            'Lower scrutiny risk',
        ],
        criticalConsiderations: [
            {
                title: 'â‚¹1.5L Penalty',
                description: 'Failure to get tax audit attracts penalty of 0.5% of turnover or â‚¹1,50,000, whichever is lower.',
                icon: DollarSign,
            },
            {
                title: 'Sept 30 Deadline',
                description: 'Tax Audit Report must be filed by 30th September of Assessment Year unless extended by CBDT.',
                icon: Clock,
            },
            {
                title: 'Digital Limit',
                description: 'Turnover limit increases to â‚¹10 Crore if cash receipts and payments are less than 5%.',
                icon: TrendingUp,
            },
            {
                title: 'Presumptive Rules',
                description: 'Audit mandatory if profit declared is less than 8%/6% (Business) or 50% (Profession).',
                icon: Calculator,
            }
        ],
        // New detailed content fields
        documentsRequired: [
            'Final Books of Accounts (Balance Sheet, P&L)',
            'Sales & Purchase Registers',
            'Bank Statements (All accounts)',
            'TDS Returns & Challans',
            'GST Returns filed (GSTR-1, 3B)',
            'Loan Statements',
            'Fixed Asset Register',
            'Closing Stock Valuation',
        ],
        dataRequired: [
            'List of Related Party Transactions',
            'Expenses > â‚¹10,000 in Cash',
            'Prior Period Items Details',
            'Foreign Currency Transactions',
            'Investments in Immovable Property',
            'Excise/Customs Details',
            'Previous Year Audit Report',
            'Statutory Dues Status',
        ],
        serviceDetails: [
            {
                title: '44AB Compliance Check',
                description: 'Verification of turnover limits and applicability of tax audit requirements.',
                icon: Search,
            },
            {
                title: 'Form 3CD Preparation',
                description: 'Detailed 44-point reporting on business operations and tax compliance.',
                icon: FileText,
            },
            {
                title: 'Expense Verification',
                description: 'Thorough check of disallowed expenses under Sections 40, 40A, 43B.',
                icon: Calculator,
            },
            {
                title: 'Tax Savings Advisory',
                description: 'Recommendations on legitimate tax savings and compliance optimization.',
                icon: TrendingUp,
            },
        ],
        timeline: [
            { stage: 'Applicability Check', duration: '1 Day' },
            { stage: 'Vouching & Verification', duration: '1-2 Weeks' },
            { stage: 'Compliance Review', duration: '1 Week' },
            { stage: 'Form 3CD Filing', duration: 'Final' },
        ]
    };

    // Merge fetched plans if available
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

    return <ServiceTemplate serviceSlug="tax-audit" serviceId={fetchedService?.id} content={content} />;
}
