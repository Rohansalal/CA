import React from 'react';
import { 
    Calendar, 
    Clock, 
    ArrowLeft, 
    Share2, 
    Printer, 
    ChevronRight, 
    Building2, 
    Globe2, 
    UserCheck, 
    Leaf, 
    FileSpreadsheet,
    Lightbulb,
    Target,
    TrendingUp,
    Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';
import { cn } from '../../ui/utils';

// ─────────────────────────────────────────────
// Modular Sub-Components
// ─────────────────────────────────────────────

/**
 * SEO-Optimized Table of Contents Sidebar
 */
const TableOfContents = ({ items }: { items: { id: string; title: string }[] }) => (
    <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Navigation</h3>
        <nav className="flex flex-col gap-3">
            {items.map((item) => (
                <a 
                    key={item.id} 
                    href={`#${item.id}`}
                    className="group flex items-center gap-3 text-[13px] font-bold text-slate-600 hover:text-primary transition-all"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-colors shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform">{item.title}</span>
                </a>
            ))}
        </nav>
    </div>
);

/**
 * Key Takeaways / Executive Summary Card
 */
const ExecutiveSummary = ({ points }: { points: string[] }) => (
    <div className="bg-[#f8fafc] rounded-[2.5rem] border border-slate-100 p-8 md:p-12 mb-16 relative overflow-hidden group shadow-sm">
        <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent">
                <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Executive Summary</h2>
        </div>
        <ul className="grid gap-5">
            {points.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="mt-1.5 shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-[15px] text-slate-700 leading-relaxed font-bold">{point}</span>
                </li>
            ))}
        </ul>
    </div>
);

/**
 * Modular Article Section with SEO-friendly structure
 */
const ArticleSection = ({ id, icon: Icon, title, children }: { id: string; icon: any; title: string; children: React.ReactNode }) => (
    <section id={id} className="pt-16 first:pt-8 scroll-mt-32">
        <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                <Icon className="w-5 h-5" />
            </div>
            <h2 className="!m-0 text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
        </div>
        <div className="prose-content">
            {children}
        </div>
    </section>
);

/**
 * Professional Partner Quote Component
 */
const PartnerPerspective = ({ quote, name, title, initials }: { quote: string; name: string; title: string; initials: string }) => (
    <div className="my-20 relative p-1 bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/20 rounded-[3rem]">
        <div className="bg-white rounded-[2.9rem] p-10 md:p-14 relative overflow-hidden border border-white">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                <Lightbulb className="w-48 h-48 text-primary" />
            </div>
            <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Strategic Insight</span>
            </div>
            <blockquote className="text-2xl md:text-3xl font-black text-slate-900 leading-tight border-none p-0 m-0 mb-10 italic tracking-tight">
                "{quote}"
            </blockquote>
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shadow-primary/20">
                    {initials}
                </div>
                <div>
                    <p className="text-[16px] font-black text-slate-900 leading-none mb-1.5">{name}</p>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{title}</p>
                </div>
            </div>
        </div>
    </div>
);

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────

export function Budget2026() {
    const tableOfContents = [
        { id: 'corporate-tax', title: 'Corporate Tax Reforms' },
        { id: 'digital-economy', title: 'Digital Economy & Global Tax' },
        { id: 'personal-finance', title: 'Personal Finance & IT Slabs' },
        { id: 'green-energy', title: 'Sustainability & ESG Credits' },
        { id: 'compliance-ease', title: 'Ease of Compliance & TDS' },
    ];

    const keyTakeaways = [
        "SME Corporate tax reduced to 22% for entities under ₹50 Cr turnover.",
        "Extension of 15% concessional tax for new manufacturing units.",
        "Personal Tax: Standard deduction hiked to ₹75,000 in New Regime.",
        "New 'Green Investment Credits' for ESG-compliant organizations.",
        "Unified TDS framework to reduce litigation and classification errors."
    ];

    const mainImage = "https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

    return (
        <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-primary/10 selection:text-primary">
            <SEO
                title="Budget 2026: Tax Strategy & Corporate Impact Analysis | Avinash Payal & Associates"
                description="Expert analysis of Budget 2026 tax changes. Learn how new corporate rates, digital taxes, and ESG incentives impact your business strategy."
                keywords="Budget 2026, Tax Reforms India, Corporate Tax slabs 2026, GST updates 2026, ESG Tax incentives, CA Avinash Payal"
            />

            {/* Progress Bar (Visual only) */}
            <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-[60]">
                <div className="h-full bg-primary w-1/3" />
            </div>

            {/* Breadcrumb & Top Actions */}
            <div className="max-w-7xl mx-auto px-6 pt-12 flex justify-between items-center">
                <Link to="/resources" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-all group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Resources</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button className="text-slate-400 hover:text-primary transition-colors p-2">
                        <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-primary transition-colors p-2">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <header className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/10">
                            Budget Analysis 2026
                        </span>
                        <span className="text-slate-200">•</span>
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <Clock className="w-3 h-3" /> 12 Min Read
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-10 tracking-tight">
                        Navigating the <span className="text-primary">Fiscal Shift:</span> <br className="hidden lg:block" />
                        Budget 2026 Strategy Guide
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-3xl font-medium tracking-tight">
                        A definitive breakdown of the Union Budget 2026 tax proposals and their long-term impact on corporate governance and financial planning.
                    </p>

                    <div className="flex items-center gap-4 mt-12 pt-12 border-t border-slate-100">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400">AP</div>
                        <div>
                            <p className="text-[14px] font-black text-slate-900 leading-none">CA Avinash Payal</p>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Updated: Jan 15, 2026</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                    <img 
                        src={mainImage} 
                        alt="Chartered Accountant analyzing Budget 2026" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/5" />
                </div>
            </section>

            {/* Content Layout */}
            <div className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">
                    
                    {/* Sidebar */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32 space-y-12">
                            <TableOfContents items={tableOfContents} />

                            <div className="pt-10 border-t border-slate-100">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Tools & Downloads</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[12px] font-bold text-slate-700 hover:bg-white hover:shadow-md transition-all">
                                        Tax Slab PDF <Printer className="w-4 h-4 text-slate-400" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[12px] font-bold text-slate-700 hover:bg-white hover:shadow-md transition-all">
                                        Impact Calculator <ArrowUpRight className="w-4 h-4 text-slate-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
                                <h4 className="text-[13px] font-black uppercase tracking-widest mb-4">Strategic Review</h4>
                                <p className="text-[12px] text-white/80 font-medium leading-relaxed mb-6">
                                    Book a one-on-one session to evaluate your company's tax exposure under the 2026 regime.
                                </p>
                                <button onClick={() => window.location.href = '/#consultation-form'} className="w-full py-3 bg-white text-primary text-[11px] font-black rounded-xl hover:scale-105 transition-all uppercase tracking-widest">
                                    Consult Now
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Article Body */}
                    <article className="lg:col-span-9 max-w-3xl">
                        
                        <ExecutiveSummary points={keyTakeaways} />

                        {/* Article Typography System */}
                        <div className="prose-optimized">
                            
                            <p className="text-2xl font-black text-slate-900 mb-12 leading-tight tracking-tight">
                                Budget 2026 serves as a structural pivot point for the Indian economy, emphasizing digital integration and sustainability as the new benchmarks for fiscal health.
                            </p>

                            <ArticleSection id="corporate-tax" icon={Building2} title="1. Corporate Tax Reforms">
                                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">
                                    The cornerstone of this budget's corporate outreach is the rationalization of rates for Small and Medium Enterprises (SMEs), aimed at fueling reinvestment.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 my-10">
                                    <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-100">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">New Rate</p>
                                        <h4 className="text-3xl font-black text-slate-900 mb-2">22%</h4>
                                        <p className="text-[12px] text-slate-500 font-bold leading-tight">For companies with turnover up to ₹50 Crores.</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-100">
                                        <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Extension</p>
                                        <h4 className="text-3xl font-black text-slate-900 mb-2">15%</h4>
                                        <p className="text-[12px] text-slate-500 font-bold leading-tight">Concessional rate for new manufacturing until March 2027.</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    This move is expected to improve the debt-to-equity ratios for thousands of MSMEs, providing them with the necessary fiscal cushion to scale operations globally.
                                </p>
                            </ArticleSection>

                            <ArticleSection id="digital-economy" icon={Globe2} title="2. Digital Economy & Global Tax">
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    In alignment with OECD's Pillar Two, the government has introduced a Global Minimum Tax framework for large conglomerates, while simultaneously refining the Digital Services Tax for cross-border transactions.
                                </p>
                                <ul className="my-8 space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-700 font-bold">New definition of 'Digital Presence' for tax residency.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-700 font-bold">Refined Equalization Levy on data monetization.</span>
                                    </li>
                                </ul>
                            </ArticleSection>

                            <PartnerPerspective 
                                initials="AP"
                                name="CA Avinash Payal"
                                title="Senior Partner & Founder"
                                quote="Budget 2026 isn't just about numbers; it's about the modernization of India's fiscal DNA. The focus on Green Credits and TDS simplification is a direct response to global business needs."
                            />

                            <ArticleSection id="personal-finance" icon={UserCheck} title="3. Personal Finance & IT Slabs">
                                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                                    For individual taxpayers, the New Tax Regime is being positioned as the default, simplified pathway. The increased standard deduction provides direct relief to the salaried class.
                                </p>
                                <div className="p-8 rounded-[2rem] bg-slate-900 text-white my-10 relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-black mb-4">New Standard Deduction</h4>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-5xl font-black text-accent">₹75,000</span>
                                            <span className="text-white/60 font-bold line-through">₹50,000</span>
                                        </div>
                                        <p className="mt-6 text-sm text-white/70 font-medium">Effective for FY 2026-27 under the New Tax Regime.</p>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                </div>
                            </ArticleSection>

                            <ArticleSection id="green-energy" icon={Leaf} title="4. Sustainability & ESG Credits">
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    For the first time, 'Green Investment Credits' have been introduced. Companies meeting certain ESG benchmarks can now offset their tax liability through verified environmental contributions.
                                </p>
                                <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-4">
                                    <Lightbulb className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                                    <p className="text-[13px] text-emerald-800 font-bold leading-relaxed">
                                        <strong>Pro Tip:</strong> Evaluate your carbon footprint now to leverage the 60% accelerated depreciation on renewable infrastructure coming in April 2026.
                                    </p>
                                </div>
                            </ArticleSection>

                            <ArticleSection id="compliance-ease" icon={FileSpreadsheet} title="5. Ease of Compliance & TDS">
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    To reduce the burden of litigation, the TDS framework has been unified. The move to consolidate over 15 different rates into 3 standard buckets is a massive win for corporate accountants.
                                </p>
                            </ArticleSection>

                            {/* Conclusion */}
                            <div className="mt-20 pt-16 border-t-2 border-slate-100">
                                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Strategic Conclusion</h2>
                                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                                    Budget 2026 demands a proactive rather than reactive approach. The integration of ESG, digital taxation, and simplified compliance means that businesses must modernize their financial reporting systems to stay competitive.
                                </p>
                                <div className="p-10 rounded-[2.5rem] bg-[#fcfcfd] border border-slate-100">
                                    <h4 className="text-[15px] font-black text-slate-900 mb-4">Ready for the shift?</h4>
                                    <p className="text-[14px] text-slate-500 font-medium mb-8">
                                        Our team provides end-to-end impact analysis and restructuring services to align your business with the Budget 2026 mandates.
                                    </p>
                                    <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black rounded-2xl text-[12px] uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                                        Request Strategic Review <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Professional Author Bio */}
                        <div className="mt-24 p-10 md:p-14 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                <div className="w-32 h-32 bg-primary rounded-[2rem] flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-primary/30 shrink-0 rotate-3">
                                    AP
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h4 className="text-2xl font-black text-slate-900 mb-2">CA Avinash Payal</h4>
                                    <p className="text-primary font-black mb-5 text-[11px] uppercase tracking-[0.2em]">Founder & Senior Partner</p>
                                    <p className="text-slate-500 leading-relaxed font-medium text-[15px] mb-8">
                                        A veteran in Indian taxation and corporate law, CA Avinash Payal has successfully guided over 500+ corporate clients through major fiscal transitions in the last two decades.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                        <a href="#" className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-primary transition-all">LinkedIn</a>
                                        <a href="#" className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-primary transition-all">Publications</a>
                                        <a href="#" className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-primary transition-all">Contact</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            {/* Premium CTA Section */}
            <section className="bg-slate-900 py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                        Future-Proof Your <br /> <span className="text-primary">Tax Strategy</span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto font-medium">
                        Don't let Budget 2026 catch you off-guard. Get a personalized analysis of your fiscal risks and opportunities today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button
                            onClick={() => window.location.href = '/#consultation-form'}
                            className="px-12 py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 group uppercase tracking-widest text-[12px]"
                        >
                            Get Expert Analysis
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
