import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function CTASection({
  title,
  description,
  primaryButtonText = 'SCHEDULE CONSULTATION',
  secondaryButtonText = 'CALL US NOW',
  onPrimaryClick,
  onSecondaryClick,
}: CTASectionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl text-white mb-4 font-bold">{title}</h2>
        <p className="text-xl text-neutral-100 mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onPrimaryClick}
            className="group px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {primaryButtonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button 
            onClick={onSecondaryClick}
            className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </section>
  );
}




