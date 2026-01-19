import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export function BackButton({ onClick, label = 'Back to All Services' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-24 left-4 z-40 px-4 py-2 bg-white shadow-lg rounded-lg text-primary font-semibold hover:bg-neutral-50 transition-all flex items-center gap-2 hover:-translate-x-1 duration-300"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
