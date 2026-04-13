import React, { useState } from 'react';
import {
    CreditCard, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, User, Globe, Building2, Fingerprint,
    Shield, Award, Zap, TrendingUp, Crown, Phone
} from 'lucide-react';
import { ServiceTemplate, ServiceContent } from '../ServiceTemplate';

export function PANApplication() {
    const [fetchedService, setFetchedService] = useState<any>(null);

    // Fetch dynamic content
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/services/slug/pan-application`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedService(data.service);
                }
            } catch (err) {
                console.error("Failed to fetch PAN service details", err);
            }
        };
        fetchService();
    }, []);

    const defaultContent: ServiceContent = {
        title: "PAN Application",
        subtitle: "Get Your PAN Card in 3-5 Working Days",
        description: "Essential identity for every taxpayer. Apply for a new PAN, correct details, or request a reprint. Fast and totally online with expert assistance.",
        heroFeatures: [
            { icon: Award, text: "e-PAN in 3 Days" },
            { icon: Shield, text: "Lifetime Validity" },
            { icon: Clock, text: "100% Online" }
        ],
        process: [
            { step: "1", title: "Document Upload", description: "Upload your Aadhaar and other documents securely through our portal." },
            { step: "2", title: "Form Filing", description: "Our experts fill Form 49A/49AA with accurate details matching your IDs." },
            { step: "3", title: "Payment & KYC", description: "Pay government fee and complete Aadhaar e-KYC authentication." },
            { step: "4", title: "PAN Generation", description: "NSDL/UTIITSL processes your application and generates your PAN." }
        ],
        typesTitle: "Who Can Apply for PAN?",
        types: [
            {
                title: 'Individual (Indian)',
                description: 'For Indian citizens residing in India or abroad.',
                icon: User,
                features: ['Form 49A', 'Aadhaar e-KYC', 'Photo & Signature', 'Instant e-PAN'],
            },
            {
                title: 'Entities & Companies',
                description: 'For Companies, LLPs, Partnerships, Trusts, and NGOs.',
                icon: Building2,
                features: ['Form 49A', 'Incorporation Deed', 'Auth Signatory KYC', 'No photo'],
            },
            {
                title: 'Foreign Citizens',
                description: 'For NRIs and Foreign Companies transacting in India.',
                icon: Globe,
                features: ['Form 49AA', 'Passport/OCI', 'Apostilled docs', 'Intl dispatch'],
            },
        ],
        // Default plans
        plans: [
            {
                id: 1,
                name: 'Individual',
                price: 499,
                color: 'bg-blue-500',
                description: "For Indian Citizens",
                features: [
                    'Form 49A Filing',
                    'Govt Fees (₹107) Included',
                    'e-PAN Generation',
                    'Dispatch Tracking',
                    'Email Support'
                ]
            },
            {
                id: 2,
                name: 'Organization',
                price: 999,
                color: 'bg-green-500',
                recommended: true,
                description: "For Firm/Company/LLP",
                features: [
                    'Form 49A Filing',
                    'Govt Fees Included',
                    'Document Scrutiny',
                    'Correction Support',
                    'Priority Processing',
                    'Dedicated Manager'
                ]
            },
            {
                id: 3,
                name: 'Foreign / NRI',
                price: 2999,
                color: 'bg-purple-500',
                description: "For NRIs & Foreign Entities",
                features: [
                    'Form 49AA Filing',
                    'Govt Fees (₹1017) Included',
                    'International Dispatch',
                    'Priority Support',
                    'Document Verification',
                    'Expert Assistance'
                ]
            }
        ],
        descriptionTitle: "What is PAN?",
        descriptionContent: "Permanent Account Number (PAN) is a unique 10-digit alphanumeric identity assigned to all taxpayers in India. It is mandatory for filing income tax returns, opening bank accounts, making high-value transactions, and serves as a universally accepted proof of identity. The PAN system helps the government track financial transactions and prevent tax evasion.",
        faqs: [
            {
                q: 'How long does it take to get a new PAN?',
                a: 'e-PAN is usually generated within 2-4 days. Physical PAN card takes about 10-15 working days to reach your address via registered post.',
            },
            {
                q: 'Can a minor apply for PAN?',
                a: 'Yes, a PAN can be allotted to a minor. The application is filed by a Representative Assessee (Parent/Guardian). No photo appears on minor\'s PAN.',
            },
            {
                q: 'What should I do if my PAN has errors?',
                a: 'You need to file a "Request for New PAN Card or/and Changes or Correction in PAN Data" form along with supporting proofs for the correct details.',
            },
            {
                q: 'Is Aadhaar-PAN linking mandatory?',
                a: 'Yes, linking Aadhaar with PAN is mandatory. Failure to link may result in your PAN becoming inoperative and higher TDS deduction.',
            },
            {
                q: 'Can a foreign company apply for PAN?',
                a: 'Yes, foreign entities generating income in India must apply for PAN using Form 49AA. This is mandatory for compliance with Indian tax laws.',
            },
        ],
        checklist: [
            "Aadhaar Card (Identity & Address Proof)",
            "Birth Certificate (Date of Birth Proof)",
            "Passport Size Photos (2 copies)",
            "ID Proof (Voter ID/Passport/Driving License)",
            "Office Address Proof (if applicable)",
            "Certificate of Incorporation (for Companies)"
        ],
        termsAndConditions: [
            "Government fees are non-refundable once application is submitted.",
            "PAN processing time depends on NSDL/UTIITSL workload.",
            "Name and DOB must exactly match Aadhaar/supporting documents.",
            "Duplicate PAN possession is illegal with ₹10,000 penalty.",
            "Physical card dispatch may take additional 10-15 days."
        ],
        benefits: [
            'Universal Valid Proof of Identity',
            'Mandatory for Income Tax Returns',
            'Essential for Opening Bank Accounts',
            'Required for Property Transactions',
            'Mandatory for Investments & Trading',
            'Needed for Credit Cards & Loans',
        ],
        criticalConsiderations: [
            {
                title: 'Aadhaar Link Mandatory',
                description: 'PAN must be linked with Aadhaar. Inoperative PAN leads to higher TDS and compliance issues.',
                icon: Fingerprint,
            },
            {
                title: 'No Duplicate PAN',
                description: 'Possessing more than one PAN is illegal under Section 272B with ₹10,000 penalty.',
                icon: AlertCircle,
            },
            {
                title: 'Minor PAN Rules',
                description: 'PAN for minors has no photo/signature. Must be updated with photo after turning 18.',
                icon: User,
            },
            {
                title: 'Data Accuracy',
                description: 'Name and DOB must exactly match Aadhaar to avoid rejection or correction needs.',
                icon: FileText,
            }
        ],
        // New detailed content fields
        documentsRequired: [
            'Aadhaar Card (Proof of Identity & Address)',
            'Birth Certificate (Proof of Date of Birth)',
            'Passport Size Photographs (2 Nos)',
            'Voter ID / Passport / Driving License (Alternative ID)',
            'Certificate of Incorporation (For Companies)',
            'Partnership Deed (For Firms)',
            'Trust Deed (For Trusts)',
            'NOC from Office Address (For Business)',
        ],
        dataRequired: [
            'Full Name (as per Aadhaar)',
            'Date of Birth / Incorporation',
            'Father\'s Name (for individuals)',
            'Residential Address',
            'Office Address (if applicable)',
            'Mobile Number & Email ID',
            'Source of Income',
            'AO Code (Area Code details)',
        ],
        serviceDetails: [
            {
                title: 'Form 49A Filing',
                description: 'Complete filing of PAN application form with accurate details verification.',
                icon: FileText,
            },
            {
                title: 'Aadhaar e-KYC',
                description: 'Digital signature using Aadhaar OTP - no physical documents needed.',
                icon: Shield,
            },
            {
                title: 'Document Verification',
                description: 'Expert scrutiny of all documents to ensure compliance and avoid rejection.',
                icon: CheckCircle,
            },
            {
                title: 'Tracking & Support',
                description: 'Real-time status tracking with dedicated support throughout the process.',
                icon: TrendingUp,
            },
        ],
        timeline: [
            { stage: 'Application Filing', duration: '1 Day' },
            { stage: 'Document Verification', duration: '1-2 Days' },
            { stage: 'NSDL Processing', duration: '5-7 Days' },
            { stage: 'Card Dispatch', duration: '7-10 Days' },
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

    return <ServiceTemplate serviceSlug="pan-application" serviceId={fetchedService?.id} content={content} />;
}




