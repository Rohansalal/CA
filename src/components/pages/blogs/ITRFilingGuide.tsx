import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Printer, Tag, FileWarning } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';

export function ITRFilingGuide() {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="ITR Filing Deadlines and Penalties: Complete Guide 2026"
                description="Everything you need to know about Income Tax Return filing deadlines, late fees, and consequences of missing the due dates."
            />

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link to="/resources" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Resources
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                        <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/20">Taxation</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>December 20, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>9 min read</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        ITR Filing Deadlines and Penalties: Complete Guide
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                        Everything you need to know about Income Tax Return filing deadlines, late fees, and consequences.
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
                                        {['ITR', 'Income Tax', 'Deadlines', 'Penalties'].map(tag => (
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
                                    Filing Income Tax Returns (ITR) is a legal obligation for every person whose income exceeds the basic exemption limit. While the process has been simplified over the years, missing the deadline can still lead to significant financial penalties and legal consequences.
                                </p>

                                <h2>Key ITR Deadlines (Non-Audit Cases)</h2>
                                <p>
                                    For individuals, HUFs, and businesses not required to undergo a tax audit, the standard deadline for filing ITR is <strong>July 31st</strong> of the assessment year. For the Financial Year 2025-26, this will be July 31, 2026.
                                </p>

                                <h2>Key ITR Deadlines (Audit Cases)</h2>
                                <p>
                                    For taxpayers whose accounts are required to be audited under the Income Tax Act or any other law, the deadline is <strong>October 31st</strong>. This includes companies and partner firms that require audit.
                                </p>

                                <h2>Penalties for Late Filing (Section 234F)</h2>
                                <p>
                                    If you miss the July 31st deadline but file before December 31st, a late fee is applicable under Section 234F:
                                </p>
                                <ul>
                                    <li><strong>Total income &le; ₹5 Lakhs:</strong> Late fee of ₹1,000.</li>
                                    <li><strong>Total income &gt; ₹5 Lakhs:</strong> Late fee of ₹5,000.</li>
                                </ul>

                                <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
                                    <h4 className="text-red-900 font-bold mb-2 flex items-center gap-2">
                                        <FileWarning className="w-5 h-5" />
                                        Serious Consequences
                                    </h4>
                                    <p className="text-red-800 italic">
                                        "Beyond the late fee, missing the deadline means you cannot carry forward losses (except house property loss) and you may have to pay interest @ 1% per month on any unpaid tax liability under Section 234A."
                                    </p>
                                </div>

                                <h2>Belated and Revised Returns</h2>
                                <p>
                                    If you fail to file by the original due date, you can file a <strong>Belated Return</strong> by December 31st. Similarly, if you discover an error after filing, you can file a <strong>Revised Return</strong> by the same December 31st deadline.
                                </p>

                                <h2>Conclusion</h2>
                                <p>
                                    Punctuality in ITR filing not only saves you from penalties but also simplifies future processes like visa applications and home loan approvals. At Avinash Payal & Associates, we ensure your returns are filed accurately and well within the deadlines.
                                </p>
                            </div>

                            {/* Author Bio */}
                            <div className="mt-16 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
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
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Need help filing your ITR?</h2>
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
