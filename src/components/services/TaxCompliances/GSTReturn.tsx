import React, { useState } from 'react';
import {
    FileText, CheckCircle, PieChart, Clock, TrendingUp, AlertCircle, DollarSign, Shield
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function GSTReturn() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/gst-return-filing`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error('Failed to fetch GST Return service details', err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: 'GST Return Filing',
        subtitle: 'GST Return Filing',
        description:
            'Simplifying GST compliance for your business. Accurate GSTR-1, GSTR-3B, and Annual Returns filing with maximum ITC claim.',
        heroFeatures: [
            { icon: CheckCircle, text: '100% ITC Match' },
            { icon: Clock, text: 'On-Time Filing' },
            { icon: Shield, text: 'No Penalties' },
        ],
        process: [
            { step: '1', title: 'Data Collection', description: 'Upload sales and purchase registers in Excel/Tally format.' },
            { step: '2', title: 'Reconciliation', description: 'Matching purchase data with GSTR-2B to maximize ITC claim.' },
            { step: '3', title: 'Compute Liability', description: 'Draft calculation of tax payable after adjusting ITC.' },
            { step: '4', title: 'Approval & Filing', description: 'Client approval, challan generation, and final filing of returns.' },
        ],
        typesTitle: 'GST Filing Schemes',
        types: [
            {
                title: 'Regular Scheme',
                description: 'For most businesses — monthly/quarterly filing of GSTR-1 and GSTR-3B.',
                icon: TrendingUp,
                features: ['Sales Return (GSTR-1)', 'Summary Return (GSTR-3B)', 'Input Tax Credit', 'B2B & B2C Invoices'],
            },
            {
                title: 'Composition Scheme',
                description: 'For small businesses with turnover up to ₹1.5 Cr paying a fixed rate.',
                icon: PieChart,
                features: ['Quarterly Challan (CMP-08)', 'Annual Return (GSTR-4)', 'Lower Compliance', 'No Input Credit'],
            },
            {
                title: 'QRMP Scheme',
                description: 'Quarterly Return Monthly Payment for turnover up to ₹5 Cr.',
                icon: Clock,
                features: ['IFF Facility', 'Quarterly GSTR-1 & 3B', 'Monthly Tax Payment', 'Flexible Cash Flow'],
            },
        ],
        // Default plans (fallback)
        plans: [
            {
                name: 'Review Only',
                price: 499,
                color: 'bg-blue-500',
                description: 'Per return review & filing assistance',
                features: [
                    'Review of Client-Prepared Data',
                    'GSTR-2B Matching Check',
                    'Tax Computation Error Review',
                    'Filing Assistance',
                ],
            },
            {
                name: 'Monthly Filing',
                price: 1299,
                color: 'bg-green-500',
                recommended: true,
                description: 'GSTR-1 + GSTR-3B with up to 50 invoices',
                features: [
                    'GSTR-1 Filing (Outward Supplies)',
                    'GSTR-3B Filing (Summary Return)',
                    'Invoice Entry (Up to 50 invoices)',
                    'GSTR-2B Reconciliation',
                    'Nil Return Filing Included',
                    'Email Support',
                ],
            },
            {
                name: 'Quarterly/QRMP',
                price: 3999,
                color: 'bg-purple-500',
                description: 'Quarterly returns with IFF and challan',
                features: [
                    'Quarterly GSTR-1 & GSTR-3B Filing',
                    'IFF (Invoice Furnishing Facility) Filing',
                    'Monthly Tax Challan Generation',
                    'GSTR-2B Full Reconciliation',
                    'HSN Wise Summary Reporting',
                    'Dedicated CA Support',
                ],
            },
        ],
        descriptionTitle: 'What is GST Return Filing?',
        descriptionContent:
            'GST (Goods and Services Tax) return filing is the mandatory process through which every registered taxpayer declares their income, purchases, output tax liabilities, and input tax credits to the government. Key returns include GSTR-1 (outward supply details), GSTR-3B (monthly summary of tax liability and ITC), and GSTR-2B (auto-generated ITC statement). Timely and accurate filing prevents late fees (up to ₹50/day), 18% p.a. interest on delayed tax payments, and risks of GST registration cancellation for non-compliance extending 6 consecutive months.',
        faqs: [
            {
                q: 'What is the due date for GSTR-3B?',
                a: 'For monthly filers, it is the 20th of the next month. For quarterly filers (QRMP), it is the 22nd or 24th depending on the state.',
            },
            {
                q: 'Can I claim ITC if it is not in GSTR-2B?',
                a: 'No, as per current GST rules, you can only claim Input Tax Credit if it appears in your GSTR-2B statement generated from supplier filings.',
            },
            {
                q: 'What is a Nil Return?',
                a: 'If you have no sales and no purchases in a month, you must file a Nil Return to avoid late fees.',
            },
            {
                q: 'Is HSN code mandatory?',
                a: 'Yes, HSN/SAC codes are mandatory: 4 digits for turnover up to 5 Cr, 6 digits for turnover above 5 Cr.',
            },
            {
                q: 'How do I pay the GST?',
                a: 'Tax must be paid via an online challan (Netbanking/UPI/NEFT) created on the GST portal before filing GSTR-3B.',
            },
        ],
        checklist: [
            'Sales Invoices (B2B & B2C)',
            'Purchase Invoices (for ITC)',
            'Bank Statement',
            'Expense Details',
            'Credit/Debit Notes',
            'E-Way Bill Reports',
            'Previous Return Copies',
        ],
        termsAndConditions: [
            'Prices mentioned are per return / per month.',
            'Invoice entries beyond the plan limit may attract additional charges.',
            'Government portal challan amounts are payable by the client separately.',
            "Data accuracy is the client's responsibility; CA's role is compilation and filing.",
            'ITC reversal arising from non-compliant vendors is not within scope.',
        ],
    benefits: [
        'Avoid Penalties & Late Fees',
        'Seamless Input Tax Credit (ITC) Maximization',
        'Better Vendor Reputation (GSTIN Compliance)',
        'Easy Loan Approvals with Compliant Returns',
        'Higher GST Compliance Rating',
        'Avoid E-Way Bill Blocking',
    ],
        criticalConsiderations: [
            {
                title: 'Late Fees',
                description: 'Up to ₹50/day (₹20 for Nil) for delay in filing GSTR-3B or GSTR-1.',
                icon: DollarSign,
            },
            {
                title: 'Interest 18%',
                description: '18% p.a. interest is charged on the net tax liability paid after due date.',
                icon: TrendingUp,
            },
            {
                title: 'ITC Restriction',
                description: 'Input Tax Credit is restricted if your vendors have not filed their GSTR-1 on time.',
                icon: AlertCircle,
            },
            {
                title: 'Registration Cancellation',
                description: 'Non-filing for 6 consecutive months can lead to GST registration cancellation.',
                icon: Shield,
            },
        ],
    };

// Merge fetched plans if available
const content = { ...defaultContent };
if (fetchedService && fetchedService.plans && fetchedService.plans.length > 0) {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
    content.plans = fetchedService.plans.map((p: any, index: number) => ({
        id: p.id,
        name: p.shortTitle || p.planType,
        price: parseFloat(p.discountedPrice || p.price),
        description: p.scopeSummary || '',
        recommended: p.planType === 'STANDARD',
        color: colors[index % colors.length],
        features: p.scopes ? p.scopes.map((s: any) => s.title) : [],
    }));
}

return (
    <ServiceTemplate
        serviceSlug="gst-return-filing"
        serviceId={fetchedService?.id}
        content={content}
    />
);
}





