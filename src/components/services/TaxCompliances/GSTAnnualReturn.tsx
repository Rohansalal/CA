import React, { useState } from 'react';
import {
    FileText, CheckCircle, PieChart, Clock, AlertCircle, TrendingUp, Shield, BookOpen, DollarSign
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function GSTAnnualReturn() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/gst-annual-return`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error('Failed to fetch GST Annual Return service details', err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: 'GST Annual Return',
        subtitle: 'GST Annual Return',
        description:
            'Expert filing of GSTR-9 and GSTR-9C. Reconcile your books with portal data and close your financial year with zero risk.',
        heroFeatures: [
            { icon: Shield, text: 'Audit Ready' },
            { icon: CheckCircle, text: '100% Accuracy' },
            { icon: BookOpen, text: 'Books Reconciliation' },
        ],
        process: [
            { step: '1', title: 'Data Consolidation', description: 'Merging 12 months data of GSTR-1, 3B, and Books of Accounts.' },
            { step: '2', title: 'Gap Analysis', description: 'Identifying mismatches between GST Portal and Books of Accounts.' },
            { step: '3', title: 'Draft Preparation', description: 'Preparing draft GSTR-9 / GSTR-9C and computing final liability.' },
            { step: '4', title: 'Payment & Filing', description: 'Paying differential tax via DRC-03 and filing the return.' },
        ],
        typesTitle: 'Types of GST Annual Returns',
        types: [
            {
                title: 'GSTR-9',
                description: 'Annual Return for regular taxpayers. Consolidates monthly flows.',
                icon: FileText,
                features: ['Sales Consolidation', 'ITC Re-validation', 'Tax Paid vs Payable', 'DRC-03 Payment'],
            },
            {
                title: 'GSTR-9C',
                description: 'Reconciliation Statement — mandatorily self-certified for turnover > ₹5 Cr.',
                icon: Shield,
                features: ['Books vs GST Portal', 'Turnover Reconciliation', 'ITC Reconciliation', 'Rate-wise Liability'],
            },
            {
                title: 'GSTR-4 (Annual)',
                description: 'Annual Return for Composition Scheme taxpayers.',
                icon: PieChart,
                features: ['Fixed Rate Tax', 'Purchase Details', 'Financial Summary', 'No Input Credit'],
            },
        ],
        // Default plans (fallback)
        plans: [
            {
                name: 'Essential',
                price: 4999,
                color: 'bg-blue-500',
                description: 'GSTR-9 only with basic reconciliation',
                features: [
                    'GSTR-9 Preparation & Filing',
                    'GSTR-2A vs Purchase Register Match',
                    'Tax Liability Verification',
                    'Filing Support & Acknowledgement',
                ],
            },
            {
                name: 'Comprehensive',
                price: 8999,
                color: 'bg-green-500',
                recommended: true,
                description: 'GSTR-9 + GSTR-9C with deep ITC review',
                features: [
                    'GSTR-9 + GSTR-9C Preparation & Filing',
                    'Books vs GST Portal Reconciliation',
                    'Detailed ITC Review & Reversal Computation',
                    'DRC-03 Assistance for Differential Tax',
                    'Turnover Reconciliation Statement',
                    'Priority CA Support',
                ],
            },
            {
                name: 'Corporate',
                price: 19999,
                color: 'bg-purple-500',
                description: 'Multi-state complex filing with legal opinion',
                features: [
                    'Multi-State Annual Return Filing',
                    'Complex Reconciliation (High Volume)',
                    'Department Verification Support',
                    'Legal Opinion & Assessment Readiness',
                    'Rate-Wise Liability Analysis',
                    'Dedicated CA + CA Firm Resources',
                ],
            },
        ],
        descriptionTitle: 'What is GST Annual Return?',
        descriptionContent:
            'GSTR-9 is an annual return filed by every registered GST taxpayer consolidating all monthly/quarterly returns (GSTR-1 and GSTR-3B) filed during the financial year. It is mandatory for businesses with aggregate turnover above ₹2 Crores. For businesses above ₹5 Crores, GSTR-9C (a reconciliation statement between audited financials and GSTR-9) is also mandatory. The annual return is irrevocable — unlike monthly returns there is no revision. It allows taxpayers to correct prior errors, reclaim missed ITC (where permissible), or reverse ineligible credits, making due diligence critical.',
        faqs: [
            {
                q: 'Is GSTR-9 mandatory for everyone?',
                a: 'It is mandatory if your aggregate turnover is above ₹2 Crores. For turnover up to ₹2 Crores, it is optional but recommended.',
            },
            {
                q: 'What is GSTR-9C?',
                a: 'GSTR-9C is a reconciliation statement between your audited financial statements and GSTR-9. It is mandatory for turnover > ₹5 Crores.',
            },
            {
                q: 'Can I claim missed ITC in Annual Return?',
                a: 'The time limit to claim new ITC is 30th Nov of the next FY. The annual return is the last opportunity to report it (subject to litigation).',
            },
            {
                q: 'What happens if I make a mistake in Annual Return?',
                a: 'Unlike monthly returns, there is no provision to revise an Annual Return once filed. Hence, due diligence before filing is critical.',
            },
            {
                q: 'What is DRC-03?',
                a: 'If additional tax liability is found during annual return preparation, it must be paid through Form DRC-03 (voluntary payment challan).',
            },
        ],
        checklist: [
            'Audited Financial Statements (P&L + Balance Sheet)',
            'GSTR-1 & GSTR-3B Filed Copies (all 12 months)',
            'Sales & Purchase Registers',
            'Bank Statements',
            'E-Way Bill Reports',
            'ITC Ledger Dump from GST Portal',
            'Expense Head-wise Summary',
        ],
        termsAndConditions: [
            'Annual Return is irrevocable once filed — due diligence is the joint responsibility.',
            'DRC-03 tax payments are made by the client separately.',
            'Government late fees (if applicable) are payable by the client.',
            'Scope covers filing for a single GSTIN unless otherwise agreed.',
            'GSTR-9C requires audited financial statements uploaded within 7 days of engagement.',
        ],
        benefits: [
            'Correct past errors of the financial year',
            'Avoid Department Audit Notices',
            'Finalize Books of Accounts with GST Closure',
            'Reclaim missed ITC (where permissible)',
            'Reverse excess/ineligible ITC before assessment',
            'Assessment Readiness & Legal Protection',
        ],
        criticalConsiderations: [
            {
                title: 'Late Fee',
                description: '₹200/day (varies by turnover) for delay in filing the Annual Return.',
                icon: Clock,
            },
            {
                title: 'Audit Requirement',
                description: 'GSTR-9 mandatory for turnover > ₹2 Cr. GSTR-9C for turnover > ₹5 Cr.',
                icon: TrendingUp,
            },
            {
                title: 'No Revision',
                description: 'Annual Return is final once filed — errors cannot be corrected after submission.',
                icon: AlertCircle,
            },
            {
                title: 'DRC-03 Payment',
                description: 'Differential tax liability identified must be paid via DRC-03 before filing.',
                icon: DollarSign,
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
            serviceSlug="gst-annual-return"
            serviceId={fetchedService?.id}
            content={content}
        />
    );
}
