import React, { useState } from 'react';
import {
    Scale, CheckCircle, FileText, Clock, ArrowRight, Shield, Building2, Gavel, AlertCircle,
    Award, Zap, TrendingUp
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function StatutoryAudit() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    // Fetch dynamic content
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/statutory-audit`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error("Failed to fetch Statutory Audit service details", err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: "Statutory Audit",
        subtitle: "Independent Assurance on Financial Statements",
        description: "Comprehensive statutory audit services ensuring compliance with Companies Act, 2013 and Accounting Standards. Independent opinion for stakeholder confidence.",
        heroFeatures: [
            { icon: Award, text: "MCA Compliant" },
            { icon: Shield, text: "Risk Assessment" },
            { icon: Clock, text: "Timely Reporting" }
        ],
        process: [
            { step: "1", title: "Appointment", description: "Filing ADT-1 and issuing Engagement Letter defining audit scope." },
            { step: "2", title: "Planning", description: "Understanding business operations, risk assessment, and audit strategy." },
            { step: "3", title: "Execution", description: "Substantive testing of transactions, balances, and internal controls." },
            { step: "4", title: "Reporting", description: "Drafting Audit Report with true and fair opinion on financials." }
        ],
        typesTitle: "Our Audit Approach",
        types: [
            {
                title: 'Independent Opinion',
                description: 'True & Fair view certification of financial statements.',
                icon: Scale,
                features: ['Financial Analysis', 'Accounting Standards', 'Fraud Detection'],
            },
            {
                title: 'Legal Compliance',
                description: 'Full compliance with Companies Act, 2013 requirements.',
                icon: Gavel,
                features: ['Section 143', 'CARO 2020', 'Ind AS Compliance'],
            },
            {
                title: 'Stakeholder Trust',
                description: 'Enhanced credibility for banks, investors, and regulators.',
                icon: Shield,
                features: ['Investor Confidence', 'Bank Loans', 'Valuation Support'],
            },
        ],
        // Default plans
        plans: [
            {
                id: 1,
                name: 'Small Company',
                price: 15000,
                color: 'bg-blue-500',
                description: "For Startups & Small Cos",
                features: [
                    'Turnover < ₹50 Lakhs',
                    'Basic Audit Report',
                    'Compliance Check',
                    'AOC-4 Filing Support',
                    'Email Support'
                ]
            },
            {
                id: 2,
                name: 'Medium Company',
                price: 35000,
                color: 'bg-green-500',
                recommended: true,
                description: "For Growing Businesses",
                features: [
                    'Turnover < ₹5 Crore',
                    'Detailed CARO Reporting',
                    'Internal Controls Review',
                    'Tax Audit Coordination',
                    'Priority Support'
                ]
            },
            {
                id: 3,
                name: 'Large Enterprise',
                price: 'Custom',
                color: 'bg-purple-500',
                description: "For Listed & Large Cos",
                features: [
                    'Full IFRS/Ind AS Audit',
                    'IFC Assessment',
                    'Consolidated Statements',
                    'Board Presentation',
                    'Dedicated Audit Team'
                ]
            }
        ],
        descriptionTitle: "What is Statutory Audit?",
        descriptionContent: "Statutory Audit is a mandatory audit of financial statements conducted by an independent Chartered Accountant to ensure they present a true and fair view of the company's financial position. Required under Section 143 of the Companies Act 2013, it involves examination of books of accounts, vouchers, and financial records. The auditor provides an opinion on whether financial statements comply with accounting standards and applicable laws, giving stakeholders confidence in the reported financial information.",
        faqs: [
            {
                q: 'Is Statutory Audit mandatory for all companies?',
                a: 'Yes, every company registered under the Companies Act 2013, irrespective of turnover or business activity, must get its annual accounts audited by a practicing Chartered Accountant.',
            },
            {
                q: 'What is CARO 2020?',
                a: 'Companies (Auditor\'s Report) Order, 2020 requires auditors to report on 21 specific matters including inventory, loans, fixed assets, fraud, and related party transactions.',
            },
            {
                q: 'Can a relative of director be appointed as auditor?',
                a: 'No, a person who is a relative of a director or key managerial personnel cannot be appointed as auditor. Also, indebtedness > ₹5 Lakhs disqualifies an auditor.',
            },
            {
                q: 'What are penalties for non-compliance?',
                a: 'Minimum fine of ₹25,000 under Section 147. Officers in default may face imprisonment up to 1 year. Company cannot file annual returns without audit.',
            },
            {
                q: 'What is the audit deadline?',
                a: 'Audit must be completed before AGM (Annual General Meeting), which should be held within 6 months from financial year end (by September 30th).',
            },
        ],
        checklist: [
            "Books of Accounts (Tally/Zoho/ERP)",
            "Bank Statements & Reconciliation",
            "Vouchers & Bills (Purchase/Sales)",
            "Fixed Asset Register",
            "Inventory Records",
            "Statutory Registers",
            "Previous Year Audit Report",
            "Board Minutes & Resolutions"
        ],
        termsAndConditions: [
            "Audit fees are based on company size and complexity.",
            "All statutory documents must be provided for verification.",
            "Management representation letter is mandatory.",
            "Fraud detection is incidental, not primary audit objective.",
            "Timely cooperation is essential for audit completion."
        ],
        benefits: [
            'Mandatory legal compliance',
            'True & fair financial reporting',
            'Fraud and error detection',
            'Improved internal controls',
            'Investor & banker confidence',
            'Loan and funding eligibility',
        ],
        criticalConsiderations: [
            {
                title: '₹25,000 Penalty',
                description: 'Section 147 imposes minimum ₹25,000 fine. Officers may face imprisonment up to 1 year for willful non-compliance.',
                icon: AlertCircle,
            },
            {
                title: 'Auditor Independence',
                description: 'Auditor holding securities or indebted > ₹5 Lakhs cannot be appointed. Must maintain strict independence.',
                icon: Shield,
            },
            {
                title: 'Mandatory Rotation',
                description: 'Listed and certain class companies must rotate auditors after specified tenure to ensure independence.',
                icon: Clock,
            },
            {
                title: 'Fraud Reporting',
                description: 'Auditor must report fraud > ₹1 Crore to Central Government under Section 143(12).',
                icon: Scale,
            }
        ],
        // New detailed content fields
        documentsRequired: [
            'Books of Accounts (Tally/Zoho/ERP)',
            'Supporting Vouchers & Bills',
            'Bank Statements & Confirmations',
            'Minutes of Board Meetings',
            'Previous Audit Report',
            'Statutory Registers',
            'Shareholding Patterns',
            'Related Party Transactions',
        ],
        dataRequired: [
            'Trial Balance & Financials',
            'List of Related Parties',
            'Contingent Liabilities Statement',
            'Fixed Asset Register Details',
            'Inventory Valuation Method',
            'Legal Case Details',
            'Internal Control Documentation',
            'Management Representations',
        ],
        serviceDetails: [
            {
                title: 'Financial Statement Audit',
                description: 'Comprehensive audit of Balance Sheet, P&L Account, and Cash Flow Statement per Ind AS.',
                icon: FileText,
            },
            {
                title: 'CARO 2020 Compliance',
                description: 'Detailed reporting on 21 specific clauses as mandated by Companies Auditor Report Order.',
                icon: Gavel,
            },
            {
                title: 'Internal Controls Review',
                description: 'Assessment of Internal Financial Controls over Financial Reporting (IFC-FR).',
                icon: Shield,
            },
            {
                title: 'Risk-Based Audit',
                description: 'Identification of material misstatements through risk assessment procedures.',
                icon: TrendingUp,
            },
        ],
        timeline: [
            { stage: 'Appointment', duration: 'Day 1' },
            { stage: 'Planning', duration: 'Week 1' },
            { stage: 'Field Work', duration: '2-3 Weeks' },
            { stage: 'Reporting', duration: 'Week 4' },
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

    return <ServiceTemplate serviceSlug="statutory-audit" serviceId={fetchedService?.id} content={content} />;
}
