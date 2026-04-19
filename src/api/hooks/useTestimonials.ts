import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  status: 'VISIBLE' | 'HIDDEN';
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      // Mock data representing the 8+ testimonials requested
      return [
        {
          id: 1,
          name: 'Rajesh Kumar',
          company: 'Tech Innovations Pvt Ltd',
          role: 'CEO',
          content: 'Avinash Payal & Associated has been instrumental in managing our complex tax structure. Their proactive approach saved us significant costs and provided much-needed clarity during audit season.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
          status: 'VISIBLE'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          company: 'Fashion Retail Chain',
          role: 'CFO',
          content: 'Outstanding service quality and deep expertise in GST compliance. They are true partners in our business growth, handling every regulatory hurdle with absolute professional finesse.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
          status: 'VISIBLE'
        },
        {
          id: 3,
          name: 'Amit Patel',
          company: 'Manufacturing Group',
          role: 'Managing Director',
          content: 'Their audit services are thorough and professional. We trust them completely with our financial compliance. They don\'t just find errors; they provide solutions to improve our workflow.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
          status: 'VISIBLE'
        },
        {
          id: 4,
          name: 'Sneha Reddy',
          company: 'Global Logistics',
          role: 'Director',
          content: 'Handling international taxation was a nightmare until we met Protech Planner CA. Their expertise in FEMA and cross-border compliance is truly world-class and exceptionally reliable.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
          status: 'VISIBLE'
        },
        {
          id: 5,
          name: 'Vikram Singh',
          company: 'Solar Power Systems',
          role: 'Founder',
          content: 'The level of dedication this firm shows is rare. They helped us restructure our entire financial department, leading to a 20% increase in operational efficiency within six months.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
          status: 'VISIBLE'
        },
        {
          id: 6,
          name: 'Anjali Gupta',
          company: 'Wellness Pharma',
          role: 'COO',
          content: 'Excellent guidance on corporate legal matters and ROC compliance. Their team is responsive, knowledgeable, and always goes the extra mile to ensure our interests are protected.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop',
          status: 'VISIBLE'
        },
        {
          id: 7,
          name: 'Siddharth Mehra',
          company: 'Real Estate Developers',
          role: 'Partner',
          content: 'Navigating RERA and GST in the real estate sector is complex, but Protech Planner CA made it look simple. Their advisory services have been a cornerstone of our project success.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop',
          status: 'VISIBLE'
        },
        {
          id: 8,
          name: 'Meera Iyer',
          company: 'Organic Foods Co.',
          role: 'CEO',
          content: 'Starting as a small business, we needed a CA who understood growth challenges. They\'ve been with us from day one, providing invaluable tax planning and financial strategy.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop',
          status: 'VISIBLE'
        },
      ] as Testimonial[];
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}
