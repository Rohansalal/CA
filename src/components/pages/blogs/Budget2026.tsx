import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Printer, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';

export function Budget2026() {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Budget 2026: Key Tax Changes Every Business Should Know"
                description="Comprehensive analysis of the latest budget proposals and their impact on corporate and individual taxation."
            />

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link to="/resources" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Resources
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">Taxation</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>January 15, 2026</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>8 min read</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Budget 2026: Key Tax Changes Every Business Should Know
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                        Comprehensive analysis of the latest budget proposals and their impact on corporate and individual taxation.
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
                                        {['Budget 2026', 'Direct Tax', 'Corporate Tax', 'Compliance'].map(tag => (
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
                                    The Union Budget 2026 has introduced several significant changes to the Indian tax landscape. As businesses and individuals prepare for the new fiscal year, understanding these modifications is crucial for effective tax planning and financial management.
                                </p>

                                <h2>1. Revised Corporate Tax Slabs</h2>
                                <p>
                                    One of the most noteworthy proposals in Budget 2026 is the rationalization of corporate tax slabs for small and medium enterprises (SMEs). To encourage formalization and growth, the government has introduced a tiered structure based on turnover.
                                </p>
                                <ul>
                                    <li><strong>Turnover up to ₹50 Cr:</strong> Tax rate reduced to 22% (plus surcharge and cess).</li>
                                    <li><strong>New Manufacturing Units:</strong> Extension of the 15% concessional tax rate for units commencing operations before March 31, 2027.</li>
                                </ul>

                                <h2>2. Digital Services Tax Expansion</h2>
                                <p>
                                    Reflecting the growing digital economy, the scope of the Equalization Levy or 'Digital Services Tax' has been broadened to cover additional e-commerce activities. Multinational corporations should review their digital transactions to ensure compliance with the new definitions.
                                </p>

                                <h2>3. Personal Income Tax: New Regime Standardized</h2>
                                <p>
                                    For individual taxpayers, the New Tax Regime is now the default option, with further enhancements to the rebate limits. The standard deduction has been increased to ₹75,000, providing relief to the salaried class.
                                </p>

                                <h2>4. Incentives for ESG Compliance</h2>
                                <p>
                                    In a push towards sustainability, the budget introduces tax incentives for businesses meeting specific Environmental, Social, and Governance (ESG) criteria. Investments in renewable energy and green infrastructure are now eligible for higher depreciation rates.
                                </p>

                                <h2>5. Simplification of TDS Provisions</h2>
                                <p>
                                    To reduce the compliance burden, several TDS (Tax Deducted at Source) rates have been unified. The threshold for TDS on certain payments to resident contractors and professionals has also been adjusted to minimize small-value deductions.
                                </p>

                                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
                                    <h4 className="text-blue-900 font-bold mb-2">Expert Tip</h4>
                                    <p className="text-blue-800 italic">
                                        "Businesses should conduct a thorough impact analysis of these changes before the new fiscal year begins on April 1st. Early planning can help optimize tax liabilities and ensure seamless compliance."
                                    </p>
                                </div>

                                <h2>Conclusion</h2>
                                <p>
                                    Budget 2026 focuses on stability and growth while steering the economy towards digital transformation and sustainability. At Avinash Payal & Associates, our team of experts is ready to assist you in navigating these changes and aligning your business strategy with the new tax environment.
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
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Need expert help with Budget 2026 impact analysis?</h2>
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





