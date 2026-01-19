import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
    return (
        <div className="bg-white p-10 shadow-lg border border-gray-50 flex flex-col items-start transition-transform hover:-translate-y-2 duration-300">
            <div className="flex items-center w-full mb-6">
                <div className="bg-gray-100 p-4 rounded-full text-gray-400">
                    {icon}
                </div>
                <div className="h-[1px] bg-gray-200 flex-grow mx-4"></div>
                <h3 className="text-indigo-900 font-bold text-xl">{title}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                {description}
            </p>
            <button className="text-indigo-900 font-bold text-xs uppercase tracking-widest hover:text-blue-600 border-b border-transparent hover:border-blue-600 pb-1">
                Read More
            </button>
        </div>
    );
};

const WhyChooseUs: React.FC = () => {
    const features = [
        {
            title: "Professional",
            description: "Explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete.",
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        },
        // Repeat for other cards...
    ];

    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* The Dotted Background Pattern */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-center text-4xl font-semibold text-gray-800 mb-16 relative">
                    Why Choosing Chartered Accountants
                    {/* Faded Background 'W' */}
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-gray-100 -z-10 opacity-50">
                        W
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.concat(features).slice(0, 3).map((f, index) => (
                        <FeatureCard key={index} {...f} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;