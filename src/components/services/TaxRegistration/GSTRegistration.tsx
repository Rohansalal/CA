import React, { useState } from 'react';
import {
    FileText, CheckCircle, Clock, ArrowRight, TrendingUp, Shield, Globe,
    Building2, Store, Briefcase, Zap, AlertCircle, DollarSign, Award
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function GSTRegistration() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    // Fetch dynamic content
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/gst-registration`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error("Failed to fetch GST service details", err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: "GST Registration",
        subtitle: "Get Your GSTIN in 3-7 Working Days",
        description: "Complete GST registration online with expert assistance. Mandatory for businesses with turnover above ₹20L/₹40L and for inter-state trade. Get your 15-digit GSTIN with complete paperless process.",
        heroFeatures: [
            { icon: Award, text: "50,000+ GST Registrations" },
            { icon: Clock, text: "3-7 Days Processing" },
            { icon: Shield, text: "100% Online Process" }
        ],
        process: [
            { step: "1", title: "Document Collection", description: "Upload PAN, Aadhaar, business proof, and address documents through our secure portal." },
            { step: "2", title: "TRN Generation", description: "We generate Temporary Reference Number (TRN) using your PAN, Email, and Mobile on GST portal." },
            { step: "3", title: "Application Filing", description: "Our experts fill REG-01 form with accurate business and promoter details." },
            { step: "4", title: "GSTIN Allotment", description: "After department processing, your 15-digit GSTIN is generated and certificate issued." }
        ],
        typesTitle: "Who Should Register for GST?",
        types: [
            {
                title: 'Regular Businesses',
                description: 'For businesses with turnover above threshold or doing inter-state trade.',
                icon: Building2,
                features: ['Mandatory Registration', 'Input Tax Credit', 'Inter-state Sales', 'E-commerce Selling'],
            },
            {
                title: 'Small Businesses',
                description: 'Voluntary registration for small traders and service providers.',
                icon: Store,
                features: ['Voluntary Registration', 'Claim ITC', 'Build Credibility', 'Govt Tenders'],
            },
            {
                title: 'Professionals',
                description: 'For consultants, freelancers, and service providers.',
                icon: Briefcase,
                features: ['Professional Services', 'Export Services', 'Composition Scheme', 'Easy Compliance'],
            },
        ],
        // Default plans
        plans: [
            {
                id: 1,
                name: 'Basic',
                price: 1499,
                color: 'bg-blue-500',
                description: "Essential registration for new businesses",
                features: [
                    'GST Registration (REG-01)',
                    'TRN Generation',
                    'Application Filing',
                    'Query Resolution',
                    'Digital Document Upload',
                    'Email Support',
                ]
            },
            {
                id: 2,
                name: 'Standard',
                price: 2999,
                color: 'bg-green-500',
                recommended: true,
                description: "Registration + First month compliance",
                features: [
                    'Everything in Basic',
                    'First Month GSTR-1 Filing',
                    'First Month GSTR-3B Filing',
                    'Nil Return Filing',
                    'Dedicated Account Manager',
                    'Phone & WhatsApp Support',
                    'Billing Software Trial',
                ]
            },
            {
                id: 3,
                name: 'Premium',
                price: 4999,
                color: 'bg-purple-500',
                description: "Complete 6-month package",
                features: [
                    'Everything in Standard',
                    '6 Months Return Filing',
                    'GSTR-1 & GSTR-3B Monthly',
                    'GST Advisory Calls (2)',
                    'Invoice Template Design',
                    'Priority Processing',
                    'E-way Bill Setup',
                ]
            },
            {
                id: 4,
                name: 'Enterprise',
                price: 'Custom',
                color: 'bg-yellow-500',
                description: "For multi-state & complex cases",
                features: [
                    'Everything in Premium',
                    'Multi-State Registration',
                    'Voluntary Registration',
                    'GST Audit Support',
                    'Annual Return Filing (GSTR-9)',
                    'Dedicated GST Expert',
                    'Compliance Calendar',
                ]
            }
        ],
        descriptionTitle: "What is GST Registration?",
        descriptionContent: "GST (Goods and Services Tax) registration is the process of obtaining a unique 15-digit Goods and Services Tax Identification Number (GSTIN) from the tax authorities. It is mandatory for businesses whose annual turnover exceeds the prescribed threshold limit. Registration allows businesses to collect GST from customers, claim input tax credit, and comply with the tax laws of India.",
        faqs: [
            {
                q: 'Who needs to register for GST?',
                a: 'GST registration is mandatory if your aggregate turnover exceeds ₹40 lakhs for goods (₹20 lakhs for services) or ₹20 lakhs (₹10 lakhs for NE states). It is also mandatory for inter-state suppliers, e-commerce operators, and casual taxable persons.',
            },
            {
                q: 'What is the validity of GST registration?',
                a: 'GST registration is permanent unless surrendered, cancelled, or suspended. For casual taxable persons and non-resident taxable persons, registration is valid for the period specified in the application (maximum 90 days).',
            },
            {
                q: 'Can I apply for GST registration voluntarily?',
                a: 'Yes, voluntary registration is allowed even if your turnover is below the threshold limit. Benefits include claiming Input Tax Credit (ITC), ability to sell on e-commerce platforms, and increased business credibility.',
            },
            {
                q: 'What is the penalty for not registering under GST?',
                a: 'The penalty for not registering is 10% of the tax due or ₹10,000, whichever is higher. For intentional tax evasion, the penalty can be 100% of the tax amount.',
            },
            {
                q: 'How long does it take to get GST registration?',
                a: 'Normally, GST registration takes 3-7 working days from the date of application submission. If the department raises any query, the timeline may extend based on response time.',
            },
        ],
        checklist: [
            "PAN Card of Business/Applicant",
            "Aadhaar Card of Promoters/Directors",
            "Proof of Business Registration",
            "Address Proof of Place of Business",
            "Cancelled Cheque / Bank Statement",
            "Digital Signature Certificate (for Company/LLP)",
            "Letter of Authorization",
            "Photo of Promoters/Partners"
        ],
        termsAndConditions: [
            "Prices mentioned are starting prices and may vary based on complexity.",
            "Government fees/penalties, if any, are payable separately.",
            "GSTIN generation is subject to department approval.",
            "Data provided by the client is assumed to be true and correct.",
            "CA advisory included in plans is limited to specific time duration."
        ],
        benefits: [
            'Legal recognition as supplier',
            'Seamless Input Tax Credit flow',
            'Legally authorized for E-commerce',
            'Ability to bid for Govt Tenders',
            'Boosts credibility with banks',
            'Inter-state sales without restrictions',
        ],
        criticalConsiderations: [
            {
                title: 'Late Registration',
                description: 'Penalty of 10% of tax due or ₹10,000 for late GST registration.',
                icon: DollarSign,
            },
            {
                title: 'Mandatory Fields',
                description: 'All core fields must be accurate to avoid rejection of application.',
                icon: AlertCircle,
            },
            {
                title: 'Inter-state Trade',
                description: 'Mandatory registration for all inter-state suppliers regardless of turnover.',
                icon: Globe,
            },
            {
                title: 'E-commerce Sellers',
                description: 'All e-commerce sellers must register for GST irrespective of turnover.',
                icon: TrendingUp,
            }
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

    return <ServiceTemplate serviceSlug="gst-registration" serviceId={fetchedService?.id} content={content} />;
}

