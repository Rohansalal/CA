import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Printer, Tag, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';

export function TransferPricingSMEs() {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Understanding Transfer Pricing for SMEs: A Practical Guide"
                description="A practical guide to transfer pricing regulations, armchair length principle, and compliance for small and medium enterprises."
            />

            {/* Hero Section */}
            <section className="bg-slate-50 text-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link to="/resources" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Resources
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full border border-blue-200">Taxation</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>December 15, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>12 min read</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Understanding Transfer Pricing for SMEs
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                        A practical guide to transfer pricing regulations and compliance for small and medium enterprises.
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
                                        {['Transfer Pricing', 'SME', 'International Tax', 'OECD'].map(tag => (
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
                                    In an increasingly globalized world, even Small and Medium Enterprises (SMEs) are engaging in cross-border transactions. Whether it's procuring services from a foreign parent company or selling goods to an overseas subsidiary, "Transfer Pricing" regulations are no longer just for large multinationals.
                                </p>

                                <h2>What is Transfer Pricing?</h2>
                                <p>
                                    Transfer pricing refers to the prices charged for transactions between "Associated Enterprises" (AEs). Associated enterprises are entities that are related through common management, control, or capital.
                                </p>

                                <h2>The Arm's Length Principle (ALP)</h2>
                                <p>
                                    The fundamental rule of transfer pricing is the "Arm's Length Principle." It states that transactions between related parties should be priced as if they were between independent entities under similar circumstances.
                                </p>

                                <h2>Documentation Requirements for SMEs</h2>
                                <p>
                                    While the law requires all international transactions to be at ALP, the burden of maintaining detailed "Transfer Pricing Documentation" (Local File) is mandatory only if the aggregate value of international transactions exceeds <strong>₹1 Crore</strong> in a financial year. However, even below this limit, taxpayers should maintain basic documents to justify the pricing.
                                </p>

                                <h2>Methods for Determining ALP</h2>
                                <p>
                                    The Income Tax Act prescribes five main methods for determining the arm's length price:
                                </p>
                                <ul>
                                    <li>Comparable Uncontrolled Price (CUP) Method</li>
                                    <li>Resale Price Method (RPM)</li>
                                    <li>Cost Plus Method (CPM)</li>
                                    <li>Profit Split Method (PSM)</li>
                                    <li>Transactional Net Margin Method (TNMM)</li>
                                </ul>

                                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
                                    <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                                        <Globe className="w-5 h-5" />
                                        Global Perspective
                                    </h4>
                                    <p className="text-blue-800 italic">
                                        "SMEs should be aware of 'Safe Harbour Rules' provided by the CBDT. These rules provide a simplified compliance path for certain types of transactions, like IT services or lending, where the government accepts a pre-defined margin."
                                    </p>
                                </div>

                                <h2>Key Compliance: Form 3CEB</h2>
                                <p>
                                    Every person who has entered into an international transaction or a specified domestic transaction during a previous year must obtain a report from a Chartered Accountant in Form 3CEB. The deadline for this is typically <strong>October 31st</strong>.
                                </p>

                                <h2>Conclusion</h2>
                                <p>
                                    Transfer pricing is complex, but with the right guidance, SMEs can navigate these regulations without excessive compliance costs. At Avinash Payal & Associates, we provide tailored transfer pricing solutions that balance compliance with business efficiency.
                                </p>
                            </div>

                            {/* Author Bio */}
                            <div className="mt-16 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
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
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Dealing with international transactions?</h2>
                    <button
                        onClick={() => window.location.href = '/#consultation-form'}
                        className="px-8 py-4 bg-slate-200 text-black font-semibold rounded-lg hover:bg-slate-300 transition-all shadow-lg"
                    >
                        GET EXPERT CA GUIDANCE
                    </button>
                </div>
            </section>
        </div>
    );
}
