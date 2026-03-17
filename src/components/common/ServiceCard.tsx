import { LucideIcon, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  popular?: boolean;
  comingSoon?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function ServiceCard({
  name,
  description,
  icon: Icon,
  color,
  popular,
  comingSoon,
  onClick,
  disabled,
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-white rounded-xl shadow-md border border-neutral-200 p-6 text-left transition-all group ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-2xl hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} bg-opacity-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon
            className={`w-6 h-6 bg-gradient-to-r ${color} bg-clip-text text-transparent`}
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          {popular && (
            <span className="px-2 py-1 bg-accent text-white text-xs font-semibold rounded-full">
              Popular
            </span>
          )}
          {comingSoon && (
            <span className="px-2 py-1 bg-neutral-300 text-neutral-700 text-xs font-semibold rounded-full">
              Coming Soon
            </span>
          )}
        </div>
      </div>
      <h3 className="text-lg text-primary mb-2 font-semibold group-hover:text-accent transition-colors">
        {name}
      </h3>
      <p className="text-sm text-neutral-600 mb-4">{description}</p>
      {!comingSoon && (
        <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </button>
  );
}




