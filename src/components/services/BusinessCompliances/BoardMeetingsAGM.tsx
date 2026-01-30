import { Users, FileText, CheckCircle, Clock, ArrowRight, Calendar, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function BoardMeetingsAGM() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Board Meetings & AGM' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Board Meetings & AGM' } });
        }
    };

    const meetings = [
        {
            title: 'First Board Meeting',
            timing: 'Within 30 days of Incorporation',
            agenda: 'Appointment of auditors, bank account opening, share certificate issuance.',
        },
        {
            title: 'Regular Board Meetings',
            timing: 'Minimum 4 meetings every year',
            agenda: 'Quarterly review, financial performance, major decisions.',
            note: 'Gap between two meetings cannot exceed 120 days.',
        },
        {
            title: 'Annual General Meeting',
            timing: 'Within 6 months from end of FY (30th Sept)',
            agenda: 'Adoption of financial statements, director appointment, dividend declaration.',
        },
        {
            title: 'Extraordinary GM',
            timing: 'As and when required',
            agenda: 'Urgent matters requiring shareholder approval (e.g. name change, fresh capital).',
        },
    ];

    const pricing = [
        {
            plan: 'Meeting Basics',
            price: '₹2,499',
            unit: '/meeting',
            features: [
                'Notice & Agenda Drafting',
                'Minutes Preparation',
                'Attendance Register Update',
                'Basic Resolution Drafting'
            ]
        },
        {
            plan: 'Annual Package',
            price: '₹14,999',
            unit: '/year',
            features: [
                '4 Board Meetings',
                '1 Annual General Meeting',
                'All Secretarial Documentation',
                'MGT-14 Filings (if any)',
                'Statutory Register Maintenance'
            ]
        },
        {
            plan: 'Virtual Support',
            price: 'Custom',
            unit: '',
            features: [
                'Video Conferencing Setup',
                'Recording Compliances',
                'Host Management',
                'Transcription Services'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <Users className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Secretarial Compliance
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Board Meetings & AGM <br />
                            <span className="text-accent">Corporate Governance Simplified</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            Expert assistance in drafting notices, agendas, minutes, and resolutions. Ensure your company meetings comply with the Companies Act, 2013 and Secretarial Standards.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <FileText className="w-5 h-5 text-accent" />
                                <span className="font-medium">Drafting Minutes</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span className="font-medium">SS-1 & SS-2 Compliance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mandatory Meetings Grid */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {meetings.map((meeting, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{meeting.title}</h3>
                                    </div>
                                    {meeting.note && <span className="text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded uppercase">Important</span>}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wide font-bold mb-1">Timeline</div>
                                        <div className="text-primary font-medium bg-primary/5 px-4 py-2 rounded-lg inline-block w-full">
                                            {meeting.timing}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wide font-bold mb-1">Key Agenda</div>
                                        <p className="text-gray-700 text-sm leading-relaxed">{meeting.agenda}</p>
                                    </div>
                                </div>

                                {meeting.note && (
                                    <div className="mt-6 text-xs text-gray-500 italic border-t border-dashed border-gray-200 pt-4 flex items-center gap-2">
                                        <Clock className="w-3 h-3" /> {meeting.note}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Included */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Full Suite Secretarial Services</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                We act as your virtual company secretary, ensuring every minute detail is recorded and compliant.
                            </p>
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                                {[
                                    'Drafting Notice & Agenda of Meetings',
                                    'Drafting Board Resolutions',
                                    'Preparation of Minutes of Meetings',
                                    'Maintaining Attendance Registers (Physical/Virtual)',
                                    'Filing MGT-14 for Special Resolutions',
                                    'Advisory on Secretarial Standards',
                                    'Shorter Notice Consent Collection',
                                    'Certified True Copies of Resolutions'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 border-b border-neutral-100 last:border-0 hover:bg-blue-50/50 transition-colors">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Section Embedded */}
                        <div className="space-y-6">
                            <div className="text-center lg:text-left mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">Professional Fees</h3>
                                <p className="text-sm text-gray-500">Transparent pricing for compliance support</p>
                            </div>
                            {pricing.map((plan, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-primary transition-colors">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">{plan.plan}</h4>
                                        <ul className="text-sm text-gray-500 mt-2 space-y-1">
                                            {plan.features.slice(0, 2).map((f, i) => <li key={i}>{f}</li>)}
                                        </ul>
                                    </div>
                                    <div className="text-center sm:text-right flex-shrink-0">
                                        <div className="text-2xl font-bold text-primary">{plan.price}</div>
                                        <div className="text-xs text-gray-400 uppercase">{plan.unit}</div>
                                        <button onClick={handleStart} className="mt-3 px-6 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ensure Impeccable Corporate Governance</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Let our experts handle the paperwork while you focus on the boardroom decisions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStart}
                            className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                        >
                            Get Secretarial Assistance
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                            Request Sample Minutes
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
