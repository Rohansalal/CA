import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Printer, Tag, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';

export function ROCComplianceRequirements() {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="New ROC Compliance Requirements for Private Limited Companies"
                description="Understanding the updated MCA regulations and annual compliance obligations for Pvt Ltd companies in 2026."
            />

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link to="/resources" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Resources
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">Compliance</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>January 5, 2026</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>10 min read</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        New ROC Compliance Requirements for Private Limited Companies
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                        Understanding the updated MCA regulations and annual compliance obligations for Pvt Ltd companies.
                    </p>
                </div>
            </section>

            {/* Blog Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar */}
                        <div className="lg:w-1/4 order-2 lg:order-1">
                            <div className="sticky top-24 space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Share</h3>
                                    <div className="flex gap-3">
                                        <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                                            <Share2 className="w-5 h-5 text-slate-600" />
                                        </button>
                                        <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                                            <Printer className="w-5 h-5 text-slate-600" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['ROC', 'MCA', 'Pvt Ltd', 'Compliance'].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-md flex items-center gap-1">
                                                <Tag className="w-3 h-3" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Article */}
                        <div className="lg:w-3/4 order-1 lg:order-2">
                            <div className="prose prose-slate lg:prose-lg max-w-none">
                                <p>
                                    Corporate governance and compliance standards in India are evolving rapidly. The Ministry of Corporate Affairs (MCA) has introduced several new requirements for Private Limited Companies that require immediate attention. Failing to comply can lead to heavy penalties and the disqualification of directors.
                                </p>

                                <h2>1. Mandatory Audit Trail in Accounting Software</h2>
                                <p>
                                    Effective from the previous assessment year and strengthened in 2026, companies must use accounting software that has a feature of recording an audit trail for every transaction. This means:
                                </p>
                                <ul>
                                    <li>Creating an edit log of each change made in books of account.</li>
                                    <li>Ensuring that the audit trail feature cannot be disabled.</li>
                                    <li>Maintaining the audit trail for the entire statutory period.</li>
                                </ul>

                                <h2>2. Disclosure of CSR Activities (Form CSR-2)</h2>
                                <p>
                                    For companies meeting the CSR threshold, the reporting requirements have become more granular. Form CSR-2 must now be filed as an addendum to Form AOC-4, detailing the impact assessment and the alignment of projects with Sustainable Development Goals.
                                </p>

                                <h2>3. Director KYC (DIR-3 KYC) and Web-KYC</h2>
                                <p>
                                    Annual KYC for all directors holding a DIN is mandatory. Even if there are no changes in the director's details, the "Web-based KYC" must be completed by September 30th every year. Late filing attracts a penalty of ₹5,000.
                                </p>

                                <h2>4. MSME-1 and BEN-2 Filings</h2>
                                <p>
                                    Companies must ensure they are reporting their outstanding dues to MSME suppliers semi-annually (Form MSME-1). Additionally, any changes in "Significant Beneficial Ownership" must be reported in Form BEN-2 to ensure transparency in corporate ownership.
                                </p>

                                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-xl">
                                    <h4 className="text-purple-900 font-bold mb-2">Statutory Deadlines At a Glance</h4>
                                    <ul className="text-purple-800 text-sm list-none p-0">
                                        <li className="mb-2"><strong>AOC-4 (Financial Statements):</strong> Within 30 days of AGM.</li>
                                        <li className="mb-2"><strong>MGT-7 (Annual Return):</strong> Within 60 days of AGM.</li>
                                        <li><strong>ADT-1 (Auditor Appointment):</strong> Within 15 days of appointment.</li>
                                    </ul>
                                </div>

                                <h2>5. Appointment of New Auditors</h2>
                                <p>
                                    The rules for auditor rotation and the cooling-off period must be strictly followed. Companies should ensure that the auditor appointment (Form ADT-1) is valid and that the auditor's firm is not disqualified under Section 141 of the Companies Act.
                                </p>

                                <h2>Conclusion</h2>
                                <p>
                                    ROC compliance is no longer just a year-end activity but a continuous process of governance. At Avinash Payal & Associates, we specialize in corporate law and MCA compliance, ensuring that your company remains in good standing with the regulators.
                                </p>
                            </div>

                            {/* Author Bio */}
                            <div className="mt-16 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                                        AP
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">CA Avinash Payal</h4>
                                        <p className="text-slate-500 text-sm">Founder & Senior Partner, Avinash Payal & Associates</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Need assistance with your ROC filings?</h2>
                    <button
                        onClick={() => window.location.href = '/#consultation-form'}
                        className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg"
                    >
                        GET EXPERT CA GUIDANCE
                    </button>
                </div>
            </section>
        </div>
    );
}
