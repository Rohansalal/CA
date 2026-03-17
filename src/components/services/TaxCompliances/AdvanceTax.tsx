import React, { useState } from 'react';
import {
    Calculator, AlertCircle, Shield, Percent, Calendar, TrendingUp, DollarSign
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function AdvanceTax() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/advance-tax-calculation`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error('Failed to fetch Advance Tax service details', err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: 'Advance Tax',
        subtitle: 'Advance Tax Calculation',
        description:
            'Avoid interest penalties u/s 234B & 234C. Expert calculation and timely payment assistance for individuals and businesses.',
        heroFeatures: [
            { icon: Calendar, text: 'Quarterly Deadlines' },
            { icon: Shield, text: '100% Compliant' },
            { icon: Calculator, text: 'Accurate Computation' },
        ],
        process: [
            { step: '1', title: 'Income Estimation', description: 'Projecting total income from all sources for the financial year.' },
            { step: '2', title: 'Deductions Check', description: 'Calculating applicable deductions (Chapter VI-A) to reduce tax.' },
            { step: '3', title: 'Tax Computation', description: 'Net tax after TDS and relief—generates the payable amount.' },
            { step: '4', title: 'Challan & Payment', description: 'Form 280 generated; payment via Netbanking/UPI and challan saved.' },
        ],
        typesTitle: 'Who Needs to Pay Advance Tax?',
        types: [
            {
                title: 'Salaried Employees',
                description: 'If you have income from rent, interest, capital gains not declared to employer.',
                icon: Calculator,
                features: ['Rent Income', 'Bank Interest', 'Stock Market Gains', 'Dividend Income'],
            },
            {
                title: 'Business & Profession',
                description: 'Freelancers, Professionals & Business owners with tax liability > ₹10,000.',
                icon: TrendingUp,
                features: ['Presumptive Tax', 'Regular Business', 'Consultants', 'Freelancers'],
            },
            {
                title: 'Capital Gains',
                description: 'Tax on capital gains from Shares, Property, Mutual Funds in the installment post accrual.',
                icon: Percent,
                features: ['Property Sale', 'Share Trading', 'Mutual Funds', 'Crypto Gains'],
            },
        ],
        // Default plans (fallback if API unavailable)
        plans: [
            {
                name: 'One Shot',
                price: 999,
                color: 'bg-blue-500',
                description: 'Per installment calculation',
                features: [
                    'Income Estimation (Single Source)',
                    'Tax Computation & Challan Generation',
                    'Payment Guidance',
                    'Query Support',
                ],
            },
            {
                name: 'Annual',
                price: 2499,
                color: 'bg-green-500',
                recommended: true,
                description: 'All 4 quarterly installments',
                features: [
                    'All 4 Quarterly Calculations',
                    'Automated Reminders Before Due Dates',
                    'Challan Generation (u/s 280)',
                    'Multi-Source Income Management',
                    'Priority Email/Call Support',
                ],
            },
            {
                name: 'Comprehensive',
                price: 4999,
                color: 'bg-purple-500',
                description: 'Advance Tax + ITR Filing + Planning',
                features: [
                    'All 4 Quarterly Advance Tax Calculations',
                    'ITR Filing (Basic) Included',
                    'Year-End Tax Planning Session',
                    '1:1 Call with Dedicated CA',
                    'Capital Gains Advisory',
                    'Priority Support throughout FY',
                ],
            },
        ],
        descriptionTitle: 'What is Advance Tax?',
        descriptionContent:
            'Advance Tax is the income tax paid before the end of the financial year, in installments, based on estimated income. If your estimated tax liability for the year exceeds ₹10,000 (after TDS), you are required to pay advance tax in four quarterly installments — 15th June, 15th September, 15th December, and 15th March. Non-payment or short-payment attracts interest under sections 234B (1% per month) and 234C (deferment interest). Senior citizens (60+) without business income are exempt.',
        faqs: [
            {
                q: 'Who is liable to pay Advance Tax?',
                a: 'Any assessee whose tax liability for the financial year (after reducing TDS) is ₹10,000 or more.',
            },
            {
                q: 'What are the due dates?',
                a: 'Usually 15th June (15%), 15th Sept (45%), 15th Dec (75%), and 15th March (100%). For Presumptive scheme (44AD), 100% by 15th March.',
            },
            {
                q: 'Are Senior Citizens exempt?',
                a: 'Yes, resident senior citizens (60+) not having income from business or profession are not required to pay advance tax.',
            },
            {
                q: 'Can I pay advance tax after the due date?',
                a: 'Yes, but you will be liable to pay interest u/s 234B and 234C for the period of delay.',
            },
            {
                q: 'How do I pay Advance Tax?',
                a: 'It can be paid online/offline using Challan 280. Select Code (100) for Advance Tax.',
            },
        ],
        checklist: [
            'Salary Slips / Form 16 (if employed)',
            'Form 16A – TDS Certificates',
            'Bank Statements (for interest income)',
            'Capital Gain Statements',
            'Investment Proofs (80C, 80D etc.)',
            'Previous Year ITR Copy',
            'Details of Other Income',
        ],
        termsAndConditions: [
            'Prices are per installment (BASIC) or per financial year (other plans).',
            'Government challan amounts are payable separately by the client.',
            'Advisory is based on estimated figures provided by the client.',
            'Any revision due to additional income disclosed later may attract additional charges.',
            'Advance tax is non-refundable if income estimate is revised downward mid-year.',
        ],
        benefits: [
            'Avoid Interest Penalty u/s 234B (1% per month)',
            'Avoid Interest Penalty u/s 234C (Deferment)',
            'Better Cash Flow Management',
            'Reduced Year-End Tax Burden',
            'Compliance with Income Tax Regulations',
            'Avoid Tax Notices',
        ],
        criticalConsiderations: [
            {
                title: 'Threshold Limit',
                description: 'Mandatory if total tax liability for the year is ₹10,000 or more.',
                icon: AlertCircle,
            },
            {
                title: 'Senior Citizens',
                description: 'Exempt if age > 60 years and no income from business/profession.',
                icon: Shield,
            },
            {
                title: 'Interest Implications',
                description: '1% regular interest + 1% deferment interest is charged on shortfall amounts.',
                icon: Percent,
            },
            {
                title: 'Due Dates',
                description: 'Strict adherence to quarterly due dates is required (15th June/Sep/Dec/Mar).',
                icon: Calendar,
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
            serviceSlug="advance-tax-calculation"
            serviceId={fetchedService?.id}
            content={content}
        />
    );
}





