import { MapPin, CheckCircle, Clock, ArrowRight, Building, FileText, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function RegisteredOfficeChange() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Registered Office Change' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Registered Office Change' } });
        }
    };

    const types = [
        {
            title: 'Within Local Limits',
            desc: 'Shifting office within the same city/town/village limits.',
            form: 'Form INC-22',
            approval: 'Board Resolution only',
            time: '2-3 Days',
            icon: Building
        },
        {
            title: 'Outside Local Limits',
            desc: 'Moving to a different city but within the same state.',
            form: 'MGT-14 + INC-22',
            approval: 'Shareholders (Special Resolution)',
            time: '7-10 Days',
            icon: MapPin
        },
        {
            title: 'One ROC to Another',
            desc: 'Moving between jurisdictions (e.g., Mumbai to Pune) within same state.',
            form: 'Form INC-23',
            approval: 'Regional Director (RD) Approval',
            time: '30-45 Days',
            icon: Globe
        },
        {
            title: 'One State to Another',
            desc: 'Shifting registered office from one state to another (e.g., Delhi to Haryana).',
            form: 'INC-23 + INC-28',
            approval: 'Central Govt & New ROC',
            time: '45-60 Days',
            icon: ArrowRight
        },
    ];

    const pricing = [
        {
            plan: 'Local Shifting',
            desc: 'Within same city/town',
            price: '₹2,999',
            features: [
                'Board Resolution Drafting',
                'Form INC-22 Filing',
                'Rent Agreement Review',
                'NOC Drafting'
            ]
        },
        {
            plan: 'State Shifting',
            desc: 'One city to another (Same ROC)',
            price: '₹7,999',
            features: [
                'Special Resolution (MGT-14)',
                'Form INC-22 Filing',
                'New Office Proof Verification',
                'Liaison with ROC'
            ]
        },
        {
            plan: 'Inter-State',
            desc: 'One State to Another',
            price: '₹24,999',
            features: [
                'Central Govt Approval',
                'Regional Director Hearing',
                'Newspaper Advertisement',
                'Complete Legal Representation'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <MapPin className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Address Update
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Change Registered Office <br />
                            <span className="text-accent">Anywhere in India</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            Moving your business? We assist in updating your registered office address with the ROC, handling complex Central Government approvals for inter-state shifting.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Globe className="w-5 h-5 text-accent" />
                                <span className="font-medium">Pan-India Service</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Building className="w-5 h-5 text-accent" />
                                <span className="font-medium">RD/ROC Liaison</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types Grid */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {types.map((type, index) => (
                            <div key={index} className="bg-white border border-neutral-100 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                                <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                    <type.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{type.title}</h3>
                                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">{type.desc}</p>

                                <div className="space-y-3 pt-6 border-t border-gray-100 text-sm mt-auto">
                                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                        <span className="text-gray-500 text-xs uppercase font-bold">Form</span>
                                        <span className="font-bold text-primary">{type.form}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                        <span className="text-gray-500 text-xs uppercase font-bold">Time</span>
                                        <span className="font-bold text-green-600">{type.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Service Packages</h2>
                        <p className="text-gray-600">Choose based on your shifting requirements.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 flex flex-col hover:border-primary/50 transition-all">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.plan}</h3>
                                <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    <span className="text-gray-400 text-sm font-medium"> + Govt Fees</span>
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={handleStart}
                                    className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30"
                                >
                                    Start Process
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Section */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden flex flex-col md:flex-row">
                        <div className="bg-primary p-10 md:w-1/3 flex flex-col justify-center text-white">
                            <FileText className="w-12 h-12 mb-6 text-accent" />
                            <h3 className="text-2xl font-bold mb-4">Required Documents</h3>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                These documents verify the existence and authorization of the new office premises.
                            </p>
                        </div>
                        <div className="p-10 md:w-2/3">
                            <ul className="space-y-4">
                                {[
                                    'Utility Bill (Electricity/Telephone/Gas) - Not older than 2 months',
                                    'Notarized Rent/Lease Agreement (if rented)',
                                    'NOC from Property Owner (if rented)',
                                    'Proof of Ownership (if owned)',
                                    'Digital Signature of Directors',
                                    'Board Resolution Copy'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 p-3 hover:bg-neutral-50 rounded-lg transition-colors border border-transparent hover:border-neutral-100">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Shift?</h2>
                    <p className="text-xl text-blue-100 mb-12">
                        Ensure all official communications reach you. We handle the entire documentation and filing work.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={handleStart}
                            className="px-10 py-5 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl inline-flex items-center justify-center gap-2 group"
                        >
                            Start Address Change
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
