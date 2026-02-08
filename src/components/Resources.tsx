import { Calendar, ArrowRight, BookOpen, Download, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Taxation', 'GST', 'Compliance', 'Business Advisory'];

  const blogPosts = [
    {
      title: 'Budget 2026: Key Tax Changes Every Business Should Know',
      category: 'Taxation',
      date: 'January 15, 2026',
      readTime: '8 min read',
      excerpt: 'Comprehensive analysis of the latest budget proposals and their impact on corporate and individual taxation.',
      image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY4NzI0MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      route: '/resources/budget-2026'
    },
    {
      title: 'GST Compliance Checklist for January 2026',
      category: 'GST',
      date: 'January 10, 2026',
      readTime: '6 min read',
      excerpt: 'Stay compliant with our monthly GST checklist covering all important due dates and filing requirements.',
      image: 'https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjYWxjdWxhdG9yJTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2ODgyNTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      route: '/resources/gst-checklist-jan-2026'
    },
    {
      title: 'New ROC Compliance Requirements for Private Limited Companies',
      category: 'Compliance',
      date: 'January 5, 2026',
      readTime: '10 min read',
      excerpt: 'Understanding the updated MCA regulations and annual compliance obligations for Pvt Ltd companies.',
      image: 'https://images.unsplash.com/photo-1692133226337-55e513450a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhY2NvdW50YW50JTIwb2ZmaWNlfGVufDF8fHx8MTc2ODc0NzA0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      route: '/resources/roc-compliance'
    },
    {
      title: '5 Tax Saving Strategies for Startups in 2026',
      category: 'Business Advisory',
      date: 'December 28, 2025',
      readTime: '7 min read',
      excerpt: 'Maximize your startup tax benefits with these proven strategies including 80IAC exemptions and more.',
      image: 'https://images.unsplash.com/photo-1759310610325-2c7cb621e5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHRydXN0fGVufDF8fHx8MTc2ODgwOTM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      route: '/resources/tax-saving-startups'
    },
    {
      title: 'ITR Filing Deadlines and Penalties: Complete Guide',
      category: 'Taxation',
      date: 'December 20, 2025',
      readTime: '9 min read',
      excerpt: 'Everything you need to know about Income Tax Return filing deadlines, late fees, and consequences.',
      image: 'https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2ODc4ODMwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      route: '/resources/itr-filing-guide'
    },
    {
      title: 'Understanding Transfer Pricing for SMEs',
      category: 'Taxation',
      date: 'December 15, 2025',
      readTime: '12 min read',
      excerpt: 'A practical guide to transfer pricing regulations and compliance for small and medium enterprises.',
      image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY4NzI0MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      route: '/resources/transfer-pricing-smes'
    },
  ];

  const downloads = [
    { title: 'GST Rate Card 2026', type: 'PDF', size: '2.4 MB' },
    { title: 'Income Tax Slab Rates', type: 'PDF', size: '1.2 MB' },
    { title: 'ROC Compliance Calendar', type: 'Excel', size: '0.8 MB' },
    { title: 'TDS Rate Chart', type: 'PDF', size: '1.5 MB' },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl text-white mb-6">Resources & Insights</h1>
            <p className="text-xl text-neutral-100 leading-relaxed mb-8">
              Stay informed with the latest tax updates, compliance guides, and expert insights from our chartered accountants
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search articles, guides, and resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-neutral-800 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 -mt-12 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-accent rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl text-white mb-2">Subscribe to Tax Updates</h3>
                <p className="text-white/90">Get monthly compliance reminders and tax updates directly in your inbox</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all whitespace-nowrap">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category.toLowerCase()
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 group"
              >
                <div className="relative overflow-hidden h-48">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl text-primary mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    to={post.route}
                    className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Downloadable Resources</h2>
            <p className="text-lg text-neutral-600">
              Quick reference guides and tools for your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {downloads.map((download, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-200 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg text-primary mb-2">{download.title}</h3>
                <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                  <span>{download.type}</span>
                  <span>{download.size}</span>
                </div>
                <button className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600">
              Quick answers to common tax and compliance questions
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: 'What is the deadline for ITR filing for AY 2025-26?',
                answer: 'The deadline for individual taxpayers is July 31, 2025. For taxpayers requiring audit, the deadline is October 31, 2025.',
              },
              {
                question: 'What are the current GST return filing due dates?',
                answer: 'GSTR-1 is due by 11th of next month, GSTR-3B by 20th of next month. GSTR-9 (annual) is due by December 31st.',
              },
              {
                question: 'Do I need a tax audit for my business?',
                answer: 'Tax audit under section 44AB is mandatory if business turnover exceeds ₹1 crore (or ₹10 crore for businesses maintaining digital records) or professional receipts exceed ₹50 lakhs.',
              },
              {
                question: 'What is the penalty for late GST filing?',
                answer: 'Late fee of ₹50 per day (₹20 for nil returns) per Act (CGST + SGST), subject to maximum of ₹5,000.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-medium text-primary hover:bg-neutral-50 transition-colors list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-neutral-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-6">Need Personalized Advice?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Our chartered accountants are here to answer your specific tax and compliance questions
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1">
            BOOK A CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
}
