import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Printer, Tag, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';

export function TaxSavingStartups() {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="5 Tax Saving Strategies for Startups in 2026"
                description="Maximize your startup tax benefits with these proven strategies including 80-IAC exemptions, R&D tax credits, and more."
            />

            {/* Hero Section */}
            <section className="bg-slate-50 text-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link to="/resources" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Resources
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                        <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full border border-orange-200">Business Advisory</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>December 28, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>7 min read</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        5 Tax Saving Strategies for Startups in 2026
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                        Maximize your startup tax benefits with these proven strategies including 80IAC exemptions and more.
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
                                        {['Startups', 'Tax Saving', '80-IAC', 'Planning'].map(tag => (
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
                                    Startups today operate in a highly competitive environment where capital efficiency is everything. One of the most significant "leakages" of cash flow can be taxes. However, the Indian government provides several incentives for startups. Here are the top 5 strategies to minimize your tax liability in 2026.
                                </p>

                                <h2>1. Leverage the 80-IAC Tax Holiday</h2>
                                <p>
                                    Eligible startups incorporated between April 1, 2016, and March 31, 2025 (with potential extensions in Budget 2026), can avail of a 100% tax exemption on profits for 3 consecutive years out of their first 10 years.
                                </p>
                                <ul>
                                    <li>Must be recognized by DPIIT.</li>
                                    <li>Total turnover must not exceed ₹100 Crores.</li>
                                    <li>Must be working towards innovation, development, or improvement of products or services.</li>
                                </ul>

                                <h2>2. Section 56(2)(viib) - Angel Tax Exemption</h2>
                                <p>
                                    Registered startups are exempt from Section 56(2)(viib) of the Income Tax Act, which previously taxed any excess premium received on shares beyond their Fair Market Value. This is a game-changer for startups raising funds at high valuations.
                                </p>

                                <h2>3. Strategic Use of Carry Forward Losses</h2>
                                <p>
                                    Startups can carry forward business losses for up to 8 years. What's unique for startups is that the condition of continuous 51% shareholding for carry forward of losses (Section 79) is relaxed, provided all original shareholders continue to stay with the company.
                                </p>

                                <h2>4. Research & Development (R&D) Deductions</h2>
                                <p>
                                    Innovation is the core of any startup. Expenses incurred on scientific research and R&D are eligible for weighted deductions. Ensure that all R&D expenses are tracked separately and backed by proper documentation to qualify for these benefits.
                                </p>

                                <h2>5. Employee Stock Option Plans (ESOPs) Tax Deferral</h2>
                                <p>
                                    To help startups attract talent, the tax payment on ESOPs (Perquisite Tax) can be deferred for up to 5 years, or until the employee leaves the company or sells the shares, whichever is earlier. This helps in conserving cash both for the startup and its employees.
                                </p>

                                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8 rounded-r-xl">
                                    <h4 className="text-orange-900 font-bold mb-2 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5" />
                                        Strategy Insight
                                    </h4>
                                    <p className="text-orange-800 italic">
                                        "Don't wait for your startup to become profitable to think about taxes. Many tax elections and registrations, like the 80-IAC certification, should be applied for early in the business lifecycle."
                                    </p>
                                </div>

                                <h2>Conclusion</h2>
                                <p>
                                    Smart tax planning is as essential as product-market fit. By leveraging these statutory benefits, startups can reinvest more capital into leur and scale faster. At Avinash Payal & Associates, we specialize in startup advisory, from incorporation to Series-A planning.
                                </p>
                            </div>

                            {/* Author Bio */}
                            <div className="mt-16 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl">
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
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Are you a founder looking to optimize your taxes?</h2>
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





