import React from 'react';
import { Shield, Lock, Eye, FileText, Server, Globe, Mail } from 'lucide-react';
import SEO from '../SEO';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for Avinash Payal & Associates. Learn how we collect, use, and protect your personal information."
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        We are committed to protecting your privacy and ensuring the security of your personal information.
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
                        At <strong>Avinash Payal & Associates</strong> ("we," "us," or "our"), we value your trust and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
                    </p>

                    <div className="grid gap-12">
                        {/* Section 1 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <Eye className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">1. Information We Collect</h2>
                            </div>
                            <p>We may collect personal information that you voluntarily provide to us when you:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Register on our website or client portal.</li>
                                <li>Fill out contact forms or book a consultation.</li>
                                <li>Subscribe to our newsletters or updates.</li>
                                <li>Engage with our services (e.g., Audit, Taxation, Business Registration).</li>
                            </ul>
                            <p className="mt-4">
                                <strong>Types of Data:</strong> Name, Email Address, Phone Number, Business Name, Financial Documents (for service delivery), and usage data via cookies.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">2. How We Use Your Information</h2>
                            </div>
                            <p>We use the information we collect for the following purposes:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>To provide and maintain our professional services.</li>
                                <li>To communicate with you regarding updates, reminders, and service-related information.</li>
                                <li>To process transactions and manage your account.</li>
                                <li>To improve our website functionality and user experience.</li>
                                <li>To comply with legal and regulatory obligations as Chartered Accountants.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">3. Data Security</h2>
                            </div>
                            <p>
                                We implement industry-standard security measures to protect your personal and financial data. This includes encryption, secure servers, and strict access controls. However, please note that no method of transmission over the Internet is 100% secure.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">4. Third-Party Disclosure</h2>
                            </div>
                            <p>
                                We do NOT sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates for the purposes outlined above.
                            </p>
                            <p className="mt-4">
                                We may disclose your information if required by law or in response to valid requests by public authorities (e.g., a court or a government agency).
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 m-0">5. Your Rights</h2>
                            </div>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Access, update, or delete the information we have on you.</li>
                                <li>Opt-out of receiving marketing communications from us.</li>
                                <li>Request a copy of your personal data.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-neutral-200 pt-8">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Contact Us</h3>
                        <p className="mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                <a href="mailto:info@caavinash.in" className="text-primary hover:underline">info@caavinash.in</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Server className="w-5 h-5 text-primary" />
                                <span>206-207 S/F Vardhman Tower, Preet Vihar, Delhi, 110092</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
