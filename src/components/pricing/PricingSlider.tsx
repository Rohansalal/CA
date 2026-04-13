import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Check, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PricingSlider.css';

interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    title: 'Basic',
    subtitle: 'For Individuals',
    price: 999,
    period: '/month',
    description: 'Perfect for freelancers and small businesses just getting started.',
    features: [
      'GST Return Filing (Monthly)',
      'Basic Bookkeeping',
      'Email Support',
      '1 Business Registration',
      'Annual Compliance Report'
    ],
    ctaText: 'Get Started'
  },
  {
    id: 'professional',
    title: 'Professional',
    subtitle: 'For Growing Businesses',
    price: 2499,
    period: '/month',
    description: 'Ideal for small to medium businesses with expanding needs.',
    features: [
      'Everything in Basic',
      'GST & Income Tax Filing',
      'Priority Phone Support',
      '3 Business Registrations',
      'Monthly Financial Reports',
      'Dedicated Account Manager'
    ],
    popular: true,
    ctaText: 'Start Free Trial'
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    subtitle: 'For Large Organizations',
    price: 4999,
    period: '/month',
    description: 'Comprehensive solution for enterprises with complex requirements.',
    features: [
      'Everything in Professional',
      'Custom Compliance Solutions',
      '24/7 Dedicated Support',
      'Unlimited Business Registrations',
      'Weekly Financial Reports',
      'Audit & Assurance Services',
      'Tax Planning Consultation'
    ],
    ctaText: 'Contact Sales'
  },
  {
    id: 'custom',
    title: 'Custom',
    subtitle: 'Tailored Solutions',
    price: 0,
    period: '',
    description: 'Build a custom package that fits your unique business needs.',
    features: [
      'All Services Available',
      'Flexible Pricing',
      'Custom SLA',
      'Dedicated Team',
      'On-site Support Option',
      'API Integration'
    ],
    ctaText: 'Request Quote'
  }
];

export const PricingSlider: React.FC = () => {
  const handlePlanSelect = (plan: PricingPlan) => {
    console.log('Selected plan:', plan);
    // Add your plan selection logic here
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Simple Pricing
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transparent pricing with no hidden fees. Select the plan that best fits your business needs.
        </p>
      </div>

      {/* Swiper Slider */}
      <div className="relative pricing-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          slidesPerView={1}
          spaceBetween={24}
          centeredSlides={true}
          loop={true}
          className="pb-16"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
          }}
        >
          {pricingPlans.map((plan) => (
            <SwiperSlide key={plan.id}>
              <div className="h-full">
                <div
                  className={`
                    relative bg-white rounded-2xl p-8 md:p-10
                    border transition-all duration-300
                    hover:shadow-xl hover:-translate-y-1
                    h-full flex flex-col
                    ${plan.popular 
                      ? 'border-blue-500 shadow-lg shadow-blue-500/10' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.price > 0 ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg text-gray-500 font-medium">₹</span>
                        <span className="text-5xl font-bold text-gray-900 tracking-tight">
                          {plan.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 font-medium">{plan.period}</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-gray-900 tracking-tight">
                          Custom
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className={`
                      w-full py-4 px-6 rounded-xl font-semibold text-sm
                      transition-all duration-200
                      ${plan.popular
                        ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }
                    `}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:border-gray-300 transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:border-gray-300 transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed">
          <ArrowRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Additional Info */}
      <p className="text-center text-sm text-gray-500 mt-8">
        All plans include a 14-day free trial. No credit card required.
      </p>
    </div>
  );
};

export default PricingSlider;
