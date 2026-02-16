import { Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FeaturedInsights() {
    const blogPosts = [
        {
            title: 'Budget 2026: Key Tax Changes Every Business Should Know',
            category: 'Taxation',
            date: 'January 15, 2026',
            readTime: '8 min read',
            excerpt: 'Comprehensive analysis of the latest budget proposals and their impact on corporate and individual taxation.',
            image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            gradient: 'from-blue-500 to-blue-600',
            route: '/resources/budget-2026'
        },
        {
            title: 'GST Compliance Checklist for January 2026',
            category: 'GST',
            date: 'January 10, 2026',
            readTime: '6 min read',
            excerpt: 'Stay compliant with our monthly GST checklist covering all important due dates and filing requirements.',
            image: 'https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            gradient: 'from-blue-500 to-blue-600',
            route: '/resources/gst-checklist-jan-2026'
        },
        {
            title: '5 Tax Saving Strategies for Startups in 2026',
            category: 'Business Advisory',
            date: 'December 28, 2025',
            readTime: '7 min read',
            excerpt: 'Maximize your startup tax benefits with these proven strategies including 80IAC exemptions and more.',
            image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            gradient: 'from-blue-500 to-blue-600',
            route: '/resources/tax-saving-startups'
        },
    ];

    return (
        <section className="pt-24 pb-32 bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-full mb-4">
                        <BookOpen className="w-4 h-4 text-white" />
                        <span className="text-sm font-semibold text-white uppercase tracking-wide">
                            Latest Insights
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                        Tax & Compliance Insights
                    </h2>

                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Stay ahead with expert insights, tax updates, and compliance guides from our chartered accountants.
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {blogPosts.map((post, index) => (
                        <article
                            key={index}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 hover:border-orange-500/50 hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-56">
                                <ImageWithFallback
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-4 py-1.5 bg-gradient-to-r ${post.gradient} text-white text-xs font-bold rounded-full uppercase tracking-wide`}>
                                        {post.category}
                                    </span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Read Time */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="px-3 py-1 bg-white/90 text-neutral-900 text-xs font-semibold rounded-full">
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>

                                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <Link
                                    to={post.route}
                                    className="text-orange-600 font-semibold flex items-center gap-2 hover:text-orange-700 transition-all"
                                >
                                    Read Full Article
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Bottom Accent */}
                            <div className={`h-1 bg-gradient-to-r ${post.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center pb-16">
                    <Link
                        to="/resources"
                        className="inline-flex items-center gap-3 px-14 py-4
                        bg-orange-600 text-white hover:text-white font-bold text-base
                        rounded-full shadow-md
                        hover:bg-orange-700 hover:shadow-xl
                        transition-all duration-300 ease-out
                        transform hover:-translate-y-1
                        group mx-auto"
                    >
                        <BookOpen className="w-5 h-5 opacity-90" />
                        <span className="tracking-wide text-black">VIEW ALL INSIGHTS</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
            <div>
                <br />
                <br />
                <br />
                <br />
            </div>
        </section>
    );
}
