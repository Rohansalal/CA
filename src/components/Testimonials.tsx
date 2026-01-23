import { Star } from 'lucide-react';

export function Testimonials() {
    const testimonials = [
        {
            name: 'Rajesh Kumar',
            company: 'Tech Innovations Pvt Ltd',
            role: 'CEO',
            content: 'Avinash Payal & Co. has been instrumental in managing our complex tax structure. Their proactive approach saved us significant costs.',
            rating: 5,
            avatar: 'RK',
        },
        {
            name: 'Priya Sharma',
            company: 'Fashion Retail Chain',
            role: 'CFO',
            content: 'Outstanding service quality and deep expertise in GST compliance. They are true partners in our business growth.',
            rating: 5,
            avatar: 'PS',
        },
        {
            name: 'Amit Patel',
            company: 'Manufacturing Group',
            role: 'Managing Director',
            content: 'Their audit services are thorough and professional. We trust them completely with our financial compliance.',
            rating: 5,
            avatar: 'AP',
        },
    ];

    return (
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
            {/* Professional Visible Texture */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 mt-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
                        <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                        <span className="text-sm font-semibold text-white uppercase tracking-wide">Client Success Stories</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Trusted by businesses across industries for excellence and reliability
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group hover:-translate-y-2"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-bl-full" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                                ))}
                            </div>
                            <p className="text-neutral-700 mb-1 italic leading-relaxed text-lg">"{testimonial.content}"</p>
                            <div className="flex items-center gap-3 pt-12 border-t border-neutral-200">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="text-primary font-bold text-lg">{testimonial.name}</div>
                                    <div className="text-sm text-neutral-600">{testimonial.role}</div>
                                    <div className="text-sm text-neutral-500">{testimonial.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
        </section>
    );
}
