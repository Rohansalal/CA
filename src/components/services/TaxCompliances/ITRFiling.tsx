
import React, { useState } from 'react';
import {
    FileText, CheckCircle, PieChart, Clock, ArrowRight, TrendingUp, AlertCircle, DollarSign, Shield, Briefcase, Globe, Award
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
        subtitle: "Expert ITR Filing Service",
        description: "Accurate, secure, and hassle-free Income Tax Return filing by expert Chartered Accountants. Maximize your refunds and stay compliant.",
        heroFeatures: [
            { icon: Award, text: "Expert Assisted" },
            { icon: Shield, text: "Secure & Confidential" }
        ],
        typesTitle: "Who Should File?",
        types: [
            {
                title: 'Salaried & Individuals',
                description: 'For employees with salary income, house property, and other sources.',
                icon: FileText,
                features: ['Form 16 Analysis', 'House Rent Allowance', 'Deductions (80C, 80D)', 'Tax Refund Claims'],
            },
            {
                title: 'Capital Gains & Investors',
                description: 'For traders and investors with income from stocks, mutual funds, or crypto.',
                icon: TrendingUp,
                features: ['Stock Market Gains', 'Crypto Assets', 'Real Estate Sale', 'Foreign Assets'],
            },
            {
                title: 'Business & Profession',
                description: 'For freelancers, doctors, lawyers, and small business owners.',
                icon: Briefcase,
                features: ['Presumptive Taxation', 'Business Expenses', 'Balance Sheet', 'Audit Applicability Check'],
            },
        ],
        // Default plans (fallback)
        plans: [
            {
                name: 'Basic',
                price: 2500,
                color: 'bg-blue-500',
                features: [
                    'Salary / Pension / House Property',
                    'Bank Interest / Dividend',
                    'Presumptive Business (44AD/ADA)',
                    'Single Form 16 / Single House'
                ]
            },
            {
                name: 'Standard',
                price: 5000,
                color: 'bg-green-500',
                recommended: true,
                features: [
                    'Everything in Basic',
                    'Multiple Form 16 / Multiple House',
                    'Capital Gain / Commission Inc.',
                    'Tax payment assistance',
                    'Pre-filling discussion',
                    'Post filing petty issues*'
                ]
            },
            {
                name: 'Premium',
                price: 7000,
                color: 'bg-purple-500',
                features: [
                    'Everything in Standard',
                    'Multiple Capital Gains / F&O',
                    'Crypto / ESOPs',
                    'Directorship / Unlisted Shares',
                    'Business Balance Sheet',
                    'Year round advisory**'
                ]
            },
            {
                name: 'Elite',
                price: 8000,
                color: 'bg-yellow-500',
                features: [
                    'Everything in Premium',
                    'Income >1 Crore',
                    'Foreign Income / Assets',
                    'Personal Balance Sheet',
                    'Advance Tax Compliances',
                    'AIS-TIS-26AS Reconciliation'
                ]
            }
        ],
        descriptionTitle: "What is Income Tax Return (ITR)?",
        descriptionContent: "Income Tax Return (ITR) is a form that every taxpayer files with the Income Tax Department of India. It contains details of your income, tax deductions, and tax payments for a financial year. Filing ITR is mandatory if your income exceeds the basic exemption limit. Even if it's not mandatory, filing ITR is crucial for claiming tax refunds, applying for loans, and processing visas.",
        faqs: [
            {
                q: 'Is it mandatory to file ITR?',
                a: 'Yes, if your gross total income exceeds the basic exemption limit (₹2.5L or ₹3L under new regime). It is also mandatory for carrying forward losses or claiming refunds.',
            },
            {
                q: 'What are "Post filing petty issues"?',
                a: 'These include handling minor discrepancies like bank mismatches, TDS mismatches, or refund failures that may occur after filing.',
            },
            {
                q: 'Do you provide year-round advisory?',
                a: 'Yes, our Premium and Elite plans include verbal year-round tax and investment advisory to help you plan your finances better.',
            },
            {
                q: 'What information is needed for Foreign Assets?',
                a: 'You need to provide details like Nature of asset, Cost of acquisition, Country where located, and Income earned from such assets.',
            },
            {
                q: 'How do I share my documents?',
                a: 'You can securely upload documents on our dashboard after logging in, or share them via email/WhatsApp as per your convenience.',
            },
        ],
        checklist: [
            "Copy of PAN & Aadhaar",
            "Form 16 (Salary Certificate)",
            "Bank Statements (Interest Income)",
            "Investment Proofs (LIC/PPF/ELSS)",
            "Capital Gain Statements (Broker)",
            "Home Loan Interest Certificate",
            "Form 26AS & AIS/TIS Report"
        ],
        termsAndConditions: [
            "Fee is subject to change without prior information.",
            "If any additional calculation is needed, it will be charged separately.",
            "If any additional form need to file, it will be charged separately.",
            "Fee paid is non refundable if computation is prepared.",
            "* Post filing petty issues like bank mismatch, tds mismatch, refund failure etc.",
            "** Verbal advice only."
        ],
        benefits: [
            'Prefiling consultation for tax saving insights',
            'Expert team ensures accurate filing',
            'Post-filing support: notices & refunds',
            'Financial data safely backed up',
            'Confidential, personalized guidance',
            'Year-round tax & investment advisory**',
        ],
        criticalConsiderations: [
            {
                title: 'Late Filing Fee',
                description: 'Penalty of up to ₹5,000 u/s 234F for filing after the due date (31st July).',
                icon: DollarSign,
            },
            {
                title: 'Defective Return',
                description: 'Mismatches with AIS/TIS can lead to notices and defective return status.',
                icon: AlertCircle,
            },
            {
                title: 'Foreign Assets',
                description: 'Non-disclosure of foreign assets (shares, bank challenges) attracts heavy penalties.',
                icon: Globe,
            },
            {
                title: 'Loss Carrier',
                description: 'Losses from stocks/business cannot be carried forward if return is filed late.',
                icon: Shield,
            }
        ]
    };

    // Merge fetched plans if available
    const content = { ...defaultContent };
    if (fetchedService && fetchedService.plans && fetchedService.plans.length > 0) {
        content.plans = fetchedService.plans.map((p: any, index: number) => {
            // Basic color mapping logic if backend doesn't provide color
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
            const color = colors[index % colors.length];

            return {
                id: p.id,
                name: p.planType,
                price: p.discountedPrice || p.price,
                description: p.planType === 'Standard' ? 'Recommended for most' : '', // Simple logic
                recommended: p.planType === 'Standard' || p.isPopular, // fallback logic
                color: color,
                features: p.scopes ? p.scopes.map((s: any) => s.title || s.description) : (p.features || [])
            };
        });
    }

    return <ServiceTemplate serviceSlug="itr-filing" serviceId={fetchedService?.id} content={content} />;
}
