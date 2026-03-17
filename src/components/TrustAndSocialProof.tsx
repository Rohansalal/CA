import React, { useState, useEffect } from 'react';
import { Star, Award, Users, Quote, Play } from 'lucide-react';

export function TrustAndSocialProof() {
  const [isScrolling, setIsScrolling] = useState(true);

  // Client logos data
  const clientLogos = [
    {
      id: 1,
      name: 'Tech Corp India',
      initials: 'TCI',
      color: 'from-blue-600 to-blue-400',
    },
    {
      id: 2,
      name: 'Retail Solutions',
      initials: 'RS',
      color: 'from-purple-600 to-purple-400',
    },
    {
      id: 3,
      name: 'Manufacturing Plus',
      initials: 'MP',
      color: 'from-green-600 to-green-400',
    },
    {
      id: 4,
      name: 'Finance Hub',
      initials: 'FH',
      color: 'from-red-600 to-red-400',
    },
    {
      id: 5,
      name: 'Healthcare Group',
      initials: 'HG',
      color: 'from-amber-600 to-amber-400',
    },
    {
      id: 6,
      name: 'Real Estate Co',
      initials: 'REC',
      color: 'from-cyan-600 to-cyan-400',
    },
    {
      id: 7,
      name: 'Education Plus',
      initials: 'EP',
      color: 'from-indigo-600 to-indigo-400',
    },
    {
      id: 8,
      name: 'E-Commerce Hub',
      initials: 'ECH',
      color: 'from-pink-600 to-pink-400',
    },
  ];

  // Repeat logos for seamless scrolling
  const extendedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP AREA: Trust Highlights */}
        <div className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Testimonial Card */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-amber-400/50 transition-all duration-300 h-full">
                {/* Decorative Quote */}
                <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition">
                  <Quote className="w-16 h-16 text-amber-400" />
                </div>

                <div className="relative">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-white/90 text-sm mb-6 leading-relaxed italic">
                    "Avinash Payal & Co. transformed our tax strategy and saved us ₹25 lakhs annually. Their expertise and dedication are unmatched in the industry."
                  </p>

                  {/* Reviewer Info */}
                  <div className="space-y-2">
                    <p className="text-white font-semibold">Rajesh Kumar</p>
                    <p className="text-white/60 text-sm">CEO, Tech Innovations Pvt Ltd</p>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0z" />
                          <path d="M10.295 16.816h3.293v-5.406h1.746l.177-3.211h-1.923v-1.165c0-.795.163-1.012.910-1.012h1.012V2.598h-1.582c-2.289 0-3.633 1.232-3.633 3.513v1.988h-1.74l-.177 3.211h1.917v5.406z" fill="white" />
                        </svg>
                      </div>
                      <span className="text-white/70 text-xs font-medium">Google Reviews</span>
                    </div>
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:via-amber-400/5 group-hover:to-amber-400/10 transition duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Award Badge Card */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-amber-400/50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                {/* Award Icon Background */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-300 flex items-center justify-center shadow-2xl">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="relative pt-8">
                  {/* Award Title */}
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-lg mb-2">Industry Recognition</h3>
                    <p className="text-amber-300 font-semibold text-sm">
                      Voted No.1 Legal & CA Platform in India – 2025
                    </p>
                  </div>

                  {/* Star Rating Display */}
                  <div className="space-y-3">
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white/80 text-sm font-medium">
                      Rating: <span className="text-amber-300 font-bold">4.9/5</span>
                    </p>
                  </div>

                  {/* Badge Details */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/70 text-xs">
                      Based on <span className="text-amber-300 font-semibold">2,847+ Reviews</span>
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:via-amber-400/5 group-hover:to-amber-400/10 transition duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Google Rating Card */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-amber-400/50 transition-all duration-300 h-full">
                {/* Google Icon */}
                <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition">
                  <svg className="w-16 h-16 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-lg">Google Rating</h3>
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1f2937" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335" />
                    </svg>
                  </div>

                  {/* Rating Score */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-5xl font-bold text-amber-300">4.9</span>
                      <span className="text-white/70 text-lg">/5</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Details */}
                  <div className="space-y-2 pt-6 border-t border-white/10">
                    <p className="text-white/80 text-sm">
                      <span className="text-white font-semibold">2,847+ Reviews</span>
                    </p>
                    <p className="text-white/60 text-xs">
                      Based on verified client feedback
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:via-amber-400/5 group-hover:to-amber-400/10 transition duration-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Center Text Below Cards */}
          <div className="text-center mt-12">
            <p className="text-white/70 text-sm font-medium">
              Trusted by businesses across India • Certified & Award-Winning
            </p>
          </div>
        </div>

        {/* BOTTOM AREA: Client Logo Scroller */}
        <div className="relative py-12 overflow-hidden">
          {/* Fade Effect Left */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />

          {/* Fade Effect Right */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div
            className="flex gap-8"
            onMouseEnter={() => setIsScrolling(false)}
            onMouseLeave={() => setIsScrolling(true)}
            style={{
              animation: isScrolling ? 'scroll 30s linear infinite' : 'none',
            }}
          >
            {extendedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-32 h-32 rounded-xl border border-white/20 backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group hover:border-amber-400/50 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${logo.color} w-24 h-24 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                  <span className="text-white font-bold text-sm text-center px-2">
                    {logo.initials}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Animation Style */}
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${100 / 3}%);
              }
            }
          `}</style>
        </div>

        {/* Bottom Section Label */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm font-medium">
            Trusted by Leading Businesses Across India
          </p>
        </div>
      </div>
    </section>
  );
}




