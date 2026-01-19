export interface ServiceFeature {
  title: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface ServiceBenefit {
  text: string;
  icon?: React.ReactNode;
}

export interface ServiceDocument {
  name: string;
  description?: string;
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

export interface ServiceOption {
  type: string;
  icon: React.ComponentType;
  description: string;
  minMembers?: string;
  maxMembers?: string;
  liabilityType?: string;
  suitableFor?: string;
  benefits: string[];
  documents?: string[];
  process?: string[];
  timeline?: string;
  governmentFees?: string;
  color: string;
}

export interface ServiceCategory {
  category: string;
  icon: React.ComponentType;
  color: string;
  services: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType;
  popular?: boolean;
  comingSoon?: boolean;
  linkedTo?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HeroSectionProps {
  title: string;
  description: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}
