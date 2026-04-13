import React, { useState } from 'react';
import { ZoomIn, CheckCircle, FileText, Clock, ArrowRight, Shield, AlertTriangle, Activity, BarChart, Lock, Award, Zap } from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function InternalAudit() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    // Fetch dynamic content
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/internal-audit`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error("Failed to fetch Internal Audit service details", err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: "Internal Audit",
        subtitle: "Internal Controls & Risk Management",
        description: "Go beyond compliance. Enhance efficiency, mitigate risks, and strengthen internal controls with our expert audit services.",
        heroFeatures: [
            { icon: Activity, text: "Efficiency Boost" },
            { icon: Shield, text: "Fraud Prevention" },
            { icon: Award, text: "Risk Management" }
        ],
        process: [
            { step: "1", title: "Process Understanding", description: "Walkthrough of business processes and studying SOPs." },
            { step: "2", title: "Risk Assessment", description: "Identifying key risk areas and planning audit extent." },
            { step: "3", title: "Execution", description: "Testing of controls and substantive verification of transactions." },
            { step: "4", title: "Final Report", description: "Issuing detailed report with Management Action Plan." }
        ],
        typesTitle: "Audit Scope",
        types: [
            {
                title: 'Process Review',
                description: 'Evaluate operational efficiency and identify bottlenecks in business processes.',
                icon: Activity,
                features: ['SOP Verification', 'Cycle Time Analysis', 'Efficiency Check'],
            },
            {
                title: 'Risk Management',
                description: 'Identify potential risks and suggest mitigation strategies.',
                icon: Shield,
                features: ['Risk Matrix', 'Control Testing', 'Gap Analysis'],
            },
            {
                title: 'Fraud Detection',
                description: 'Proactive measures to detect and prevent fraud, pilferage, and revenue leakage.',
                icon: ZoomIn,
                features: ['Forensic Checks', 'Data Analytics', 'Transaction Monitoring'],
            },
        ],
        plans: [
            {
                id: 1,
                name: 'Quarterly',
                price: 25000,
                color: 'bg-blue-500',
                description: "Per Quarter",
                features: [
                    'Review of Key Areas',
                    'Basic Control Checks',
                    'Statutory Compliance',
                    'Report to Management'
                ]
            },
            {
                id: 2,
                name: 'Monthly',
                price: 15000,
                color: 'bg-green-500',
                recommended: true,
                description: "Per Month",
                features: [
                    'Continuous Monitoring',
                    'Inventory Verification',
                    'Detailed checking of Vouchers',
                    'Monthly Reporting'
                ]
            },
            {
                id: 3,
                name: 'Special',
                price: 0,
                color: 'bg-purple-500',
                description: "Custom Pricing",
                features: [
                    'Forensic Audit',
                    'Process Specific Audit',
                    'Investigation',
                    'Setting up SOPs'
                ]
            }
        ],
        descriptionTitle: "What is Internal Audit?",
        descriptionContent: "Internal Audit is an independent, objective assurance and consulting activity designed to add value and improve an organization's operations. It helps organizations accomplish their objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control, and governance processes. Our Internal Audit services go beyond compliance to enhance operational efficiency and strengthen internal controls.",
        faqs: [
            {
                q: 'Is Internal Audit mandatory?',
                a: 'It is mandatory for listed companies and certain unlisted public/private companies based on turnover/borrowing criteria.',
            },
            {
                q: 'How is it different from Statutory Audit?',
                a: 'Statutory audit focuses on "True & Fair" view of financials for shareholders. Internal audit focuses on improving operations and controls for management.',
            },
            {
                q: 'Can Internal Auditor do Statutory Audit?',
                a: 'No, the same firm cannot be appointed as both Internal and Statutory Auditor of the company to maintain independence.',
            },
            {
                q: 'Do you help in drafting SOPs?',
                a: 'Yes, we can help design and document Standard Operating Procedures as a separate advisory assignment.',
            },
            {
                q: 'What is the frequency of Internal Audit?',
                a: 'It can be monthly, quarterly, or yearly depending on the size and complexity of the business.',
            },
        ],
        checklist: [
            "Standard Operating Procedures (SOPs)",
            "Organization Structure & Roles",
            "Policy Manuals (HR, IT, Purchase)",
            "Ledger Scrutiny Reports",
            "Previous Audit Observations",
            "Inventory Records",
            "Fixed Asset Register"
        ],
        termsAndConditions: [
            "Internal audit fees vary based on scope and frequency.",
            "All process documents and system access must be provided.",
            "Management representation letter is required.",
            "Same firm cannot be both internal and statutory auditor.",
            "Follow-up audits are recommended for implementation."
        ],
        benefits: [
            'Improves operational efficiency & reduces cost',
            'Stronger internal controls & governance',
            'Early detection of fraud and errors',
            'Compliance with laws, regulations & policies',
            'Better inventory and asset management',
            'Reliable financial reporting for investors',
        ],
        criticalConsiderations: [
            {
                title: 'Management Responsibility',
                description: 'Internal controls are primarily the responsibility of the management. Audit provides assurance.',
                icon: CheckCircle,
            },
            {
                title: 'Fraud Risk',
                description: 'Companies lose ~5% of revenue to fraud annually without strong controls.',
                icon: AlertTriangle,
            },
            {
                title: 'Cyber Security',
                description: 'IT Controls are now a critical part of internal audit scope.',
                icon: Lock,
            },
            {
                title: 'Cost Benefit',
                description: 'Cost of controls should not exceed the benefit derived from them.',
                icon: BarChart,
            }
        ],
        documentsRequired: [
            'Standard Operating Procedures (SOPs)',
            'Organization Structure & Roles',
            'Policy Manuals (HR, IT, Purchase)',
            'Ledger Scrutiny Reports',
            'Previous Audit Observations',
            'Inventory Records',
            'Fixed Asset Register',
            'Bank Reconciliation Statements'
        ],
        dataRequired: [
            'Process Flowcharts',
            'Delegation of Authority Matrix',
            'MIS Reports',
            'Vendor/Customer Master Data',
            'Payroll Data',
            'Compliance Tracker',
            'Access to ERP System'
        ],
        serviceDetails: [
            {
                title: 'Process Review',
                description: 'Evaluate operational efficiency and identify bottlenecks in business processes.',
                icon: Activity,
            },
            {
                title: 'Risk Assessment',
                description: 'Identifying key risk areas and planning audit extent and procedures.',
                icon: Shield,
            },
            {
                title: 'Control Testing',
                description: 'Testing of controls and substantive verification of transactions.',
                icon: CheckCircle,
            },
            {
                title: 'Management Reporting',
                description: 'Issuing detailed reports with actionable Management Action Plans.',
                icon: FileText,
            },
        ],
        timeline: [
            { stage: 'Process Understanding', duration: 'Week 1' },
            { stage: 'Risk Assessment', duration: 'Week 1' },
            { stage: 'Execution', duration: 'Week 2-3' },
            { stage: 'Final Report', duration: 'Week 4' },
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

    return <ServiceTemplate serviceSlug="internal-audit" serviceId={fetchedService?.id} content={content} />;
}





