import React, { useState } from 'react';
import {
    FileText, CheckCircle, PieChart, Clock, ArrowRight, TrendingUp, AlertCircle, DollarSign, Shield, Briefcase, Globe, Award, Calculator, UploadCloud
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function ITRFiling() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    // Fetch dynamic content
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                // Backend route: /slug/:slug
                const res = await fetch(`${API_URL}/services/slug/itr-filing`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error("Failed to fetch ITR service details", err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: "Income Tax Filing",
        subtitle: "Expert-Assisted ITR Filing",
        description: "Maximize your refunds and ensure 100% compliance with India's leading tax experts. Secure, accurate, and completely hassle-free filing experience.",
        heroFeatures: [
            { icon: Award, text: "Authorized E-Return Intermediary" },
            { icon: Shield, text: "256-bit Secure Encryption" },
            { icon: Clock, text: "Fastest Refund Processing" }
        ],
        process: [
            { step: "1", title: "Upload Documents", description: "Easily upload Form-16 and other documents on our secure dashboard." },
            { step: "2", title: "Expert Review", description: "Our CAs review your details, identify tax savings, and prepare your return." },
            { step: "3", title: "Review & File", description: "You approve the summary, and we file your return with the IT Department." },
            { step: "4", title: "Ack & Refund", description: "Get your ITR-V acknowledgment and track your refund status." }
        ],
        typesTitle: "Who Should File ITR?",
        types: [
            {
                title: 'Salaried & Individuals',
                description: 'Ideal for employees, pensioners, and individuals with house property income.',
                icon: FileText,
                features: ['Multiple Form 16 Support', 'HRA & Rental Income', 'Chapter VI-A Deductions', 'Maximum Tax Refund'],
            },
            {
                title: 'Business & Freelancers',
                description: 'Tailored for small business owners, professionals, and freelancers.',
                icon: Briefcase,
                features: ['Presumptive Taxation (44AD)', 'Expense Management', 'Financial Statements', 'Profit & Loss Analysis'],
            },
            {
                title: 'Capital Gains & Traders',
                description: 'For investors in Stocks, Mutual Funds, Crypto, and Real Estate.',
                icon: TrendingUp,
                features: ['Capital Gains Statement', 'Intraday & F&O Trading', 'Crypto Tax Filing', 'Asset Sale Reporting'],
            },
        ],
        // Default plans (fallback)
        plans: [
            {
                name: 'Basic',
                price: 999,
                color: 'bg-blue-500',
                description: "For single Form-16 & Interest Income",
                features: [
                    'Salary Income (Single Form 16)',
                    'Interest Income Reporting',
                    'House Rent Allowance (HRA)',
                    'Standard Deductions',
                    'Tax Due/Refund Calculation',
                    'ITR-1 Filing'
                ]
            },
            {
                name: 'Standard',
                price: 1999,
                color: 'bg-green-500',
                recommended: true,
                description: "Perfect for multiple incomes & house property",
                features: [
                    'Multiple Form 16s',
                    'House Property Income',
                    'Capital Gains (Basic)',
                    'Deductions (80C, 80D, etc.)',
                    'Support for Notices (Basic)',
                    'ITR-1 / ITR-2 Filing'
                ]
            },
            {
                name: 'Professional',
                price: 3499,
                color: 'bg-purple-500',
                description: "For Freelancers, Consultants & Businesses",
                features: [
                    'Business/Profession Income',
                    'Presumptive Taxation (44AD)',
                    'Balance Sheet & P&L',
                    'GST Reconciliation',
                    'Depreciation Benefits',
                    'ITR-3 / ITR-4 Filing'
                ]
            },
            {
                name: 'Trader / Investor',
                price: 4999,
                color: 'bg-yellow-500',
                description: "For Stock Market & Crypto Traders",
                features: [
                    'Capital Gains (Stocks/MF)',
                    'Intraday & F&O Trading',
                    'Crypto Assets Reporting',
                    'Foreign Assets Declaration',
                    'Loss Carry Forward',
                    'Expert Tax Planning'
                ]
            }
        ],
        descriptionTitle: "What is ITR Filing?",
        descriptionContent: "Income Tax Return (ITR) is a form that marks your declaration of income, tax liability, and tax payments to the government. Filing ITR is not just a mandatory annual compliance but a vital financial proof that facilitates loan approvals, visa processing, and carrying forward of losses. Whether you are salaried, a freelancer, or a business owner, timely filing ensures you stay compliant and claim legitimate tax refunds.",
        faqs: [
            {
                q: 'Is it mandatory to file ITR?',
                a: 'Yes, if your gross total income exceeds the basic exemption limit (₹2.5L or ₹3L depending on age/regime). Even if income is below the limit, filing ITR is necessary to claim tax refunds, carry forward losses, or for visa/loan applications.',
            },
            {
                q: 'What is the due date for filing ITR?',
                a: 'For most individuals (non-audit cases), the due date is usually 31st July of the assessment year. Late filing attracts penalties up to ₹5,000 and interest on unpaid taxes.',
            },
            {
                q: 'Can I file ITR if I don’t have Form 16?',
                a: 'Yes, you can. We can file your ITR using your salary slips, bank statements, and Form 26AS/AIS. Form 16 makes it easier but is not the only document.',
            },
            {
                q: 'How do you handle Capital Gains?',
                a: 'You simply need to upload the Capital Gain Statement (CAMS/Broker report). Our experts will analyze Short Term (STCG) and Long Term (LTCG) gains and apply relevant exemptions.',
            },
            {
                q: 'What if I receive a tax notice?',
                a: 'Our Premium plans cover basic notice management. We will guide you on how to respond to common intimations from the IT department. For complex scrutiny notices, we offer separate advisory services.',
            },
        ],
        checklist: [
            "PAN Card & Aadhaar Card",
            "Form 16 / Salary Slips",
            "Bank Account Details (Account No & IFSC)",
            "Interest Certificates (Savings/FD)",
            "Capital Gain Statements (if applicable)",
            "Home Loan Interest Certificate (if applicable)",
            "Investment Proofs (LIC, PPF, Donations, etc.)"
        ],
        termsAndConditions: [
            "Prices mentioned are starting prices and may vary based on complexity.",
            "Government fees/penalties, if any, are payable separately.",
            "Refund processing time is subject to Income Tax Department discretion.",
            "Data provided by the client is assumed to be true and correct.",
            "CA advisory included in plans is limited to specific time duration."
        ],
        benefits: [
            'Dedicated CA for your filing',
            'Maximum Tax Refund Guarantee',
            '100% Data Privacy & Security',
            'Year-round Tax Support',
            'Error-free Accurate Filing',
            'Notice Management Assistance',
        ],
        criticalConsiderations: [
            {
                title: 'Late Fees',
                description: 'Penalty of up to ₹5,000 u/s 234F for filing after the due date.',
                icon: DollarSign,
            },
            {
                title: 'Defective Return',
                description: 'Incorrect disclosures can lead to "Defective Return" notices u/s 139(9).',
                icon: AlertCircle,
            },
            {
                title: 'Foreign Assets',
                description: 'Mandatory disclosure of foreign assets to avoid Black Money Act implications.',
                icon: Globe,
            },
            {
                title: 'Losses',
                description: 'Filing on time is mandatory to carry forward stock market or business losses.',
                icon: TrendingUp,
            }
        ]
    };

    // Merge fetched plans if available
    const content = { ...defaultContent };
    if (fetchedService && fetchedService.plans && fetchedService.plans.length > 0) {
        content.plans = fetchedService.plans.map((p: any, index: number) => {
            // Colors logic
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

    return <ServiceTemplate serviceSlug="itr-filing" serviceId={fetchedService?.id} content={content} />;
}
