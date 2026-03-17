import React from 'react';
import { Gavel, Scale, FileWarning, HelpCircle, Mail, MapPin } from 'lucide-react';
import SEO from '../SEO';

export const TermsAndConditions: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Terms & Conditions"
                description="Terms and Conditions for using the services of Avinash Payal & Associates."
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Please read these terms carefully before using our services.
                    </p>
                    <div className="mt-8 text-sm text-blue-200">
                        Last Updated: February 2026
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose prose-lg max-w-none text-neutral-600">
                    <p className="lead text-xl text-neutral-800 mb-8">
                        These Terms and Conditions ("Terms") govern your use of the website and services provided by <strong>Avinash Payal & Associates</strong>. By accessing our website or engaging our services, you agree to comply with and be bound by these Terms.
                    </p>

                    <div className="grid gap-12">
                        {/* Section 1 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <Gavel className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">1. Acceptance of Terms</h2>
                            </div>
                            <p>
                                By accessing this website, you accept these Terms and Conditions in full. Do not continue to use Avinash Payal & Associates' website if you do not accept all of the terms and conditions stated on this page.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">2. Professional Services</h2>
                            </div>
                            <p>
                                Avinash Payal & Associates provides professional Chartered Accountancy services including but not limited to Audit, Taxation, Business Registration, and Advisory.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Material on this website is for general informational purposes only and does not constitute professional advice.</li>
                                <li>Engagement of our services is subject to a separate formal agreement (Engagement Letter).</li>
                                <li>We do not guarantee the outcome of any tax or legal proceeding.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <FileWarning className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">3. Limitation of Liability</h2>
                            </div>
                            <p>
                                In no event shall Avinash Payal & Associates, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website or reliance on any information provided herein.
                            </p>
                            <p className="mt-4">
                                We shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <HelpCircle className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">4. User Responsibilities</h2>
                            </div>
                            <p>When engaging our services or using our portal, you agree to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Provide accurate, current, and complete information.</li>
                                <li>Maintain the confidentiality of your account credentials (if applicable).</li>
                                <li>Not use our services for any illegal or unauthorized purpose.</li>
                                <li>Comply with all applicable laws and regulations in India.</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">5. Governing Law</h2>
                            </div>
                            <p>
                                These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in New Delhi for the resolution of any disputes.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-neutral-200 pt-8">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Contact Information</h3>
                        <p className="mb-4">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>206-207 S/F Vardhman Tower, Behind Petrol Pump, Near CBSE building, Preet Vihar, New Delhi, Delhi, 110092</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                <a href="mailto:info@caavinash.in" className="text-primary hover:underline">info@caavinash.in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};




