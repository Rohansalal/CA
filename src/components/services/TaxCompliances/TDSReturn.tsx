import React, { useState } from 'react';
import {
    FileText, AlertCircle, Clock, Percent, Shield, Users, Layers, Globe, Calendar
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function TDSReturn() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/tds-return-filing`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error('Failed to fetch TDS Return service details', err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: 'TDS Return Filing',
        subtitle: 'TDS Return Filing',
        description:
            'Expert assistance for accurate and timely filing of quarterly TDS returns (Form 24Q, 26Q, 27Q). Avoid notices and late fees.',
        heroFeatures: [
            { icon: Calendar, text: 'Quarterly Deadlines' },
            { icon: Shield, text: 'Zero Errors' },
            { icon: FileText, text: 'Form 16/16A Included' },
        ],
        process: [
            { step: '1', title: 'Data Collection', description: 'Collecting TDS challans, deductee PANs, and deduction details.' },
            { step: '2', title: 'Verification', description: 'Verifying PAN validity and challan status on TIN-NSDL/OLTAS.' },
            { step: '3', title: 'FVU Generation', description: 'Preparing the return file and validating with the official FVU utility.' },
            { step: '4', title: 'Upload & Acknowledgement', description: 'Uploading the encrypted file to the IT portal and obtaining token number.' },
        ],
        typesTitle: 'Types of TDS Returns',
        types: [
            {
                title: 'Form 24Q (Salary)',
                description: 'Quarterly statement for TDS deducted from salaries.',
                icon: Users,
                features: ['Employee Details', 'Tax Calculation', 'Challan Mapping', 'Salary Annexure (Q4)'],
            },
            {
                title: 'Form 26Q (Other)',
                description: 'TDS on payments other than salary — professional fees, rent, etc.',
                icon: Layers,
                features: ['Vendor/Contractor Details', 'Section-wise Reporting', 'Nil/Lower Deduction', 'Domestic Payments'],
            },
            {
                title: 'Form 27Q (NRI)',
                description: 'TDS on payments made to Non-Residents or Foreign Companies.',
                icon: Globe,
                features: ['NRI Payments', 'DTAA Benefits', 'Remittance Details', 'Foreign Currency'],
            },
        ],
        // Default plans (fallback)
        plans: [
            {
                name: 'Small Biz',
                price: 1499,
                color: 'bg-blue-500',
                description: '< 50 entries per return',
                features: [
                    'TDS Data Validation',
                    'Challan Verification on OLTAS',
                    'Return Preparation (< 50 entries)',
                    'FVU File Generation & Upload',
                    'Acknowledgement Token Sharing',
                ],
            },
            {
                name: 'Corporate',
                price: 2499,
                color: 'bg-green-500',
                recommended: true,
                description: '< 500 entries with Form 16A',
                features: [
                    'Bulk PAN Verification',
                    'FVU Error Resolution',
                    'Return Filing (< 500 entries)',
                    'Form 16A Generation & Issuance',
                    'Lower Deduction Certificate Handling',
                    'Priority Support',
                ],
            },
            {
                name: 'Enterprise',
                price: 4999,
                color: 'bg-purple-500',
                description: 'Unlimited entries with notices',
                features: [
                    'Unlimited Entries Per Quarter',
                    'Correction Statements Filing',
                    'TDS Notice Management',
                    'NIL Return Filing Included',
                    'Dedicated Account Manager',
                    '27Q / NRI Payment Returns',
                ],
            },
        ],
        descriptionTitle: 'What is TDS Return Filing?',
        descriptionContent:
            'TDS (Tax Deducted at Source) returns are quarterly statements filed by deductors (employers, companies, or individuals) to the Income Tax Department. These returns report the TDS deducted on various payments such as salary, professional fees, rent, interest, and payments to contractors. Timely and accurate filing ensures that the TDS credit reflects in the deductees\' Form 26AS, enables smooth issuance of Form 16/16A, and prevents late fees u/s 234E (Rs. 200/day) and penalties u/s 271H.',
        faqs: [
            {
                q: 'What is the due date for TDS payments?',
                a: 'TDS deducted in a month must be deposited by the 7th of the next month. For March, the due date is 30th April.',
            },
            {
                q: 'How much is the penalty for late filing?',
                a: 'Under Section 234E, there is a late fee of ₹200 per day until the return is filed. The total fee cannot exceed the TDS amount.',
            },
            {
                q: 'Can I revise my TDS return?',
                a: 'Yes, you can file a correction/revision statement to update deductee details or challan details if you made a mistake in the original return.',
            },
            {
                q: 'Is TAN mandatory for TDS filing?',
                a: 'Yes, TAN is mandatory for all deductors except for TDS on property sale (Form 26QB).',
            },
            {
                q: 'What happens if PAN of deductee is not available?',
                a: 'TDS must be deducted at a higher rate (usually 20%) under Section 206AA if PAN is not provided by the deductee.',
            },
        ],
        checklist: [
            'TAN (Tax Deduction and Collection Account Number)',
            'Payment Challans (CIN, BSR Code, Date, Amount)',
            'PAN and Names of all Deductees',
            'Nature of Payment & TDS Section Code',
            'Date of Deduction & Date of Payment',
            'Lower Deduction Certificate, if any',
        ],
        termsAndConditions: [
            'Prices are per quarter / per return period.',
            'Correction statements, if required, may attract additional charges.',
            'Government portal charges (if any) are payable separately.',
            'All input data is assumed to be accurate as provided by the client.',
            'Form 16/16A issuance timeline depends on portal availability.',
        ],
        benefits: [
            'Compliance with Income Tax Act, 1961',
            'Avoidance of Late Filing Fees (Section 234E)',
            'Prevention of Penalty for Non-Filing (Section 271H)',
            'Expenses allowed as business deduction',
            "Proper tax credit reflection in Deductee's 26AS",
            'Avoidance of Interest on late payment',
            'Smooth processing of Form 16/16A',
        ],
        criticalConsiderations: [
            {
                title: 'Late Fee',
                description: '₹200 per day for every day of delay in filing, up to the TDS amount.',
                icon: Clock,
            },
            {
                title: 'Time Barring',
                description: 'TDS Returns cannot be filed after 1 year from the due date without penalty.',
                icon: AlertCircle,
            },
            {
                title: 'Interest',
                description: '1% to 1.5% per month interest on late deduction or payment of TDS.',
                icon: Percent,
            },
            {
                title: 'Certificate Deadline',
                description: 'Deadlines for issuing Form 16/16A are linked to return filing dates.',
                icon: FileText,
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
            serviceSlug="tds-return-filing"
            serviceId={fetchedService?.id}
            content={content}
        />
    );
}
