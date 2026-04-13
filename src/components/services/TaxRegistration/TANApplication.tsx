import React, { useState } from 'react';
import {
    FileText, CheckCircle, Clock, ArrowRight, AlertCircle, Building2, Wallet, Shield,
    Award, Zap, TrendingUp, Crown, Calculator, Phone
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function TANApplication() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    // Fetch dynamic content
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/tan-application`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error("Failed to fetch TAN service details", err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: "TAN Application",
        subtitle: "Get Your TAN for TDS Deduction",
        description: "Mandatory 10-digit number for businesses to Deduct Tax at Source (TDS). Apply for new TAN or correct existing details with expert assistance.",
        heroFeatures: [
            { icon: Award, text: "5-7 Days Processing" },
            { icon: Shield, text: "Lifetime Validity" },
            { icon: Clock, text: "100% Online" }
        ],
        process: [
            { step: "1", title: "Form 49B Filing", description: "Our experts fill Form 49B with accurate deductor details and AO code." },
            { step: "2", title: "Document Upload", description: "Upload PAN, incorporation documents, and address proof securely." },
            { step: "3", title: "Fee Payment", description: "Pay government processing fee online." },
            { step: "4", title: "TAN Allotment", description: "NSDL verifies and generates your 10-digit TAN number." }
        ],
        typesTitle: "TAN Services We Offer",
        types: [
            {
                title: 'New TAN Application',
                description: 'For businesses deducting tax for the first time using Form 49B.',
                icon: FileText,
                features: ['Proprietors & Firms', 'Companies & LLPs', 'Trusts & NGOs', 'Govt Authorities'],
            },
            {
                title: 'TAN Correction',
                description: 'Update address, name, or contact details in existing TAN database.',
                icon: Building2,
                features: ['Address Change', 'Name Correction', 'Re-issue Letter', 'Online Update'],
            },
            {
                title: 'TCS Registration',
                description: 'For businesses collecting tax at source (Scrap, Minerals, etc.).',
                icon: Wallet,
                features: ['Tax Collection', 'Form 49B', 'TCS Returns', 'Sales Compliance'],
            },
        ],
        // Default plans
        plans: [
            {
                id: 1,
                name: 'New Application',
                price: 999,
                color: 'bg-blue-500',
                description: "For Fresh TAN Registration",
                features: [
                    'Form 49B Filing',
                    'Govt Fee (₹65) Included',
                    'Document Review',
                    'TAN Allotment',
                    'Digital Letter',
                    'Email Support'
                ]
            },
            {
                id: 2,
                name: 'Correction',
                price: 1499,
                color: 'bg-green-500',
                recommended: true,
                description: "For TAN Data Modification",
                features: [
                    'Address/Name Change',
                    'Database Update',
                    'Document Validation',
                    'Re-issue Letter',
                    'Priority Processing',
                    'Expert Assistance'
                ]
            },
            {
                id: 3,
                name: 'TAN + TDS Combo',
                price: 2499,
                color: 'bg-purple-500',
                description: "Complete TDS Compliance Package",
                features: [
                    'TAN Registration',
                    '1st Quarter TDS Return',
                    'Compliance Guidance',
                    'TDS Software Setup',
                    'Priority Support',
                    'Dedicated Manager'
                ]
            }
        ],
        descriptionTitle: "What is TAN?",
        descriptionContent: "Tax Deduction and Collection Account Number (TAN) is a unique 10-digit alphanumeric identifier issued by the Income Tax Department to persons who are required to deduct or collect tax on payments made by them under the Indian Income Tax Act, 1961. TAN is mandatory for all persons responsible for deducting tax at source (TDS) or collecting tax at source (TCS). It must be quoted on all TDS/TCS returns, challans, and certificates issued.",
        faqs: [
            {
                q: 'Is TAN mandatory for all businesses?',
                a: 'Yes, if you are deducting TDS on salary, rent, professional fees, or contractors above specified limits, you must have a TAN. The penalty for not obtaining TAN is ₹10,000 under Section 272BB.',
            },
            {
                q: 'Can I use PAN instead of TAN for TDS?',
                a: 'No, PAN and TAN serve different purposes. You cannot quote PAN for depositing TDS. TAN is mandatory for all TDS-related compliance including return filing and challan payments.',
            },
            {
                q: 'What is the validity of TAN?',
                a: 'Once allotted, TAN is valid for a lifetime unless surrendered or cancelled by the Income Tax Department. No renewal is required.',
            },
            {
                q: 'How do I find the correct AO Code?',
                a: 'AO Code depends on your jurisdiction and category of deductor. It can be found on the NSDL website or we can assist you in identifying the correct code for your location.',
            },
            {
                q: 'Can I have multiple TANs?',
                a: 'No, possessing more than one TAN is illegal. If you have multiple TANs, you must surrender the additional ones to avoid penalties.',
            },
        ],
        checklist: [
            "PAN Card of Entity/Proprietor",
            "Certificate of Incorporation (Companies/LLPs)",
            "Partnership Deed (Firms)",
            "Trust Deed/Registration (Trusts)",
            "Address Proof of Office",
            "Aadhaar of Authorized Signatory"
        ],
        termsAndConditions: [
            "Government fees once paid are non-refundable.",
            "TAN processing time depends on NSDL workload.",
            "Multiple TANs are illegal and must be surrendered.",
            "TDS returns must be filed quarterly after obtaining TAN.",
            "Late filing of TDS returns attracts ₹200/day penalty."
        ],
        benefits: [
            'Mandatory for TDS deduction',
            'Required for TDS return filing',
            'Needed for Form 16/16A issuance',
            'Avoids ₹10,000 penalty',
            'Essential for govt tenders',
            'Lifetime validity',
        ],
        criticalConsiderations: [
            {
                title: '₹10,000 Penalty',
                description: 'Failure to obtain TAN attracts a flat penalty of ₹10,000 under Section 272BB of Income Tax Act.',
                icon: AlertCircle,
            },
            {
                title: 'No Multiple TANs',
                description: 'Possessing more than one TAN for same branch is illegal. Must surrender additional TANs.',
                icon: Shield,
            },
            {
                title: 'Late Filing Penalty',
                description: 'Delay in TDS return filing attracts ₹200/day late fee plus interest on delayed deposit.',
                icon: Clock,
            },
            {
                title: 'PAN-TAN Link',
                description: 'TAN must be linked to valid PAN. Incorrect PAN quoting leads to penalties and compliance issues.',
                icon: CheckCircle,
            }
        ],
        // New detailed content fields
        documentsRequired: [
            'PAN Card of the Applicant (Entity/Proprietor)',
            'Certificate of Incorporation (Company/LLP)',
            'Partnership Deed (Partnership Firm)',
            'Trust Deed / Registration Certificate (Trust/NGO)',
            'Address Proof of Registered Office',
            'Aadhaar Card of Authorized Signatory',
            'Passport Size Photo (Individual/HUF)',
            'Rubber Stamp of Organization',
        ],
        dataRequired: [
            'AO Code (Area, Type, Range, AO Number)',
            'Category of Deductor (Govt/Non-Govt)',
            'Responsible Person Details',
            'Authorized Signatory Designation',
            'Office Address with PIN Code',
            'Email & Mobile for OTP',
            'Nature of Payments (Salary/Rent/Contract)',
            'Expected TDS Amount per Quarter',
        ],
        serviceDetails: [
            {
                title: 'Form 49B Filing',
                description: 'Complete and accurate filing of TAN application form with proper AO code selection.',
                icon: FileText,
            },
            {
                title: 'AO Code Identification',
                description: 'Expert assistance in identifying correct Assessing Officer code for your jurisdiction.',
                icon: Building2,
            },
            {
                title: 'Document Scrutiny',
                description: 'Thorough verification of all documents to ensure compliance and avoid rejection.',
                icon: Shield,
            },
            {
                title: 'TDS Compliance Setup',
                description: 'Guidance on quarterly TDS return filing and challan payment procedures.',
                icon: Calculator,
            },
        ],
        timeline: [
            { stage: 'Form Filing', duration: '1 Day' },
            { stage: 'Fee Payment', duration: 'Instant' },
            { stage: 'NSDL Verification', duration: '5-7 Days' },
            { stage: 'TAN Allotment', duration: '7-10 Days' },
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

    return <ServiceTemplate serviceSlug="tan-application" serviceId={fetchedService?.id} content={content} />;
}





