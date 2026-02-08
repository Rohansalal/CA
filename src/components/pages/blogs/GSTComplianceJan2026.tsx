import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Printer, Tag, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';

export function GSTComplianceJan2026() {
    const checklistItems = [
        { date: 'Jan 11', task: 'Filing of GSTR-1 for the month of December 2025 (Monthly filers).' },
        { date: 'Jan 13', task: 'Filing of IFF for the month of December 2025 (Quarterly filers under QRMP scheme).' },
        { date: 'Jan 18', task: 'Payment of GST and filing of GSTR-4 (Annual Return for Composition taxpayers for FY 2024-25 if pending).' },
        { date: 'Jan 20', task: 'Filing of GSTR-3B for the month of December 2025 (Monthly filers).' },
        { date: 'Jan 22/24', task: 'Filing of GSTR-3B for the Oct-Dec 2025 Quarter (For QRMP filers depending on state).' },
        { date: 'Jan 25', task: 'Filing of ITC-04 for the half-year July-Dec 2025 (Job work details).' }
    ];

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="GST Compliance Checklist for January 2026"
                description="Stay compliant with our monthly GST checklist covering all important due dates and filing requirements for January 2026."
            />

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link to="/resources" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Resources
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">GST</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>January 10, 2026</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>6 min read</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        GST Compliance Checklist for January 2026
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                        Stay compliant with our monthly GST checklist covering all important due dates and filing requirements.
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
                                        {['GST', 'Compliance', 'January 2026', 'Taxes'].map(tag => (
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
                                    As we step into the first month of 2026, GST compliance remains a top priority for businesses. Missing a deadline not only attracts interest and penalties but can also impact your GST compliance rating. Here is your comprehensive guide and checklist for January 2026.
                                </p>

                                <h2>Key Due Dates for January 2026</h2>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 my-8">
                                    <div className="space-y-4">
                                        {checklistItems.map((item, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="shrink-0 w-24 font-bold text-primary">{item.date}</div>
                                                <div className="flex items-start gap-2">
                                                    <CheckSquare className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                                                    <span className="text-slate-700">{item.task}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <h2>Important Compliance Reminders</h2>

                                <h3>1. Reconciliation of ITC (GSTR-2B vs. Books)</h3>
                                <p>
                                    Ensure that the Input Tax Credit (ITC) claimed in your GSTR-3B matches the data populated in your GSTR-2B. Since Jan 1, 2022, strict 100% matching is required. Discrepancies should be communicated to the suppliers immediately to ensure they file their returns.
                                </p>

                                <h3>2. E-Invoicing Applicability</h3>
                                <p>
                                    Check if your turnover in the previous financial year has crossed the threshold for mandatory E-Invoicing. For 2026, ensure you are generating IRNs for all B2B and export transactions if you meet the criteria.
                                </p>

                                <h3>3. Blocking of E-Way Bill</h3>
                                <p>
                                    If a taxpayer fails to file GSTR-3B for two consecutive periods, their E-Way Bill generation facility will be blocked. Ensure timely filing to avoid disruptions in logistics and supply chain.
                                </p>

                                <h2>Consequences of Non-Compliance</h2>
                                <p>
                                    Late filing of GST returns attracts a late fee of ₹50 per day (₹20 for Nil returns) and interest @ 18% p.a. on the net tax liability. Persistent non-compliance can lead to the cancellation of GST registration.
                                </p>

                                <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-xl">
                                    <h4 className="text-green-900 font-bold mb-2">Compliance Action Plan</h4>
                                    <p className="text-green-800 italic">
                                        "Collect all purchase and sales invoices by the 5th of the month. Complete your internal reconciliation by the 7th. This gives you enough buffer to resolve any supplier issues before the GSTR-1 and GSTR-3B deadlines."
                                    </p>
                                </div>

                                <h2>Conclusion</h2>
                                <p>
                                    A proactive approach to GST compliance prevents last-minute hurdles and ensures a smooth financial flow. At Avinash Payal & Associates, we provide end-to-end GST management and advisory services to keep your business compliant and competitive.
                                </p>
                            </div>

                            {/* Author Bio */}
                            <div className="mt-16 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
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
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Want to automate your GST compliance?</h2>
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
