interface HeroSectionProps {
  title: string;
  subtitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export function HeroSection({
  title,
  subtitle,
  gradientFrom = 'from-primary',
  gradientTo = 'to-secondary',
}: HeroSectionProps) {
  return (
    <section className={`bg-gradient-to-br ${gradientFrom} via-primary ${gradientTo} text-white py-16 lg:py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl text-white mb-6 font-bold">{title}</h1>
          {subtitle && (
            <p className="text-xl text-neutral-100 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
