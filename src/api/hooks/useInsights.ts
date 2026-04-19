import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';

export interface Insight {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  views: string;
  excerpt: string;
  image: string;
  gradient: string;
  route: string;
  isFeatured: boolean;
  badge: string | null;
  author: string;
  isVerified: boolean;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
}

export function useInsights() {
  return useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      // For now, returning mock data as the backend might not have this endpoint yet
      return [
        {
          id: 1,
          title: 'Budget 2026: Key Tax Changes Every Business Should Know',
          category: 'Taxation',
          date: 'January 15, 2026',
          readTime: '8 min read',
          views: '2.4k',
          excerpt: 'Comprehensive analysis of the latest budget proposals and their impact on corporate and individual taxation.',
          image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          gradient: 'from-blue-500 to-blue-600',
          route: '/resources/budget-2026',
          isFeatured: true,
          badge: '🔥 Featured',
          author: 'CA Avinash Payal',
          isVerified: true,
          status: 'PUBLISHED'
        },
        {
          id: 2,
          title: 'GST Compliance Checklist for January 2026',
          category: 'GST',
          date: 'January 10, 2026',
          readTime: '6 min read',
          views: '1.8k',
          excerpt: 'Stay compliant with our monthly GST checklist covering all important due dates and filing requirements.',
          image: 'https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          gradient: 'from-orange-500 to-orange-600',
          route: '/resources/gst-checklist-jan-2026',
          isFeatured: false,
          badge: '🆕 Updated 2026',
          author: 'CA Avinash Payal',
          isVerified: true,
          status: 'PUBLISHED'
        },
        {
          id: 3,
          title: '5 Tax Saving Strategies for Startups in 2026',
          category: 'Business Advisory',
          date: 'December 28, 2025',
          readTime: '7 min read',
          views: '3.1k',
          excerpt: 'Maximize your startup tax benefits with these proven strategies including 80IAC exemptions and more.',
          image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          gradient: 'from-green-500 to-green-600',
          route: '/resources/tax-saving-startups',
          isFeatured: false,
          badge: '⭐ Most Read',
          author: 'CA Avinash Payal',
          isVerified: true,
          status: 'PUBLISHED'
        },
        {
          id: 4,
          title: 'ROC Compliance Requirements for Companies',
          category: 'Compliance',
          date: 'December 20, 2025',
          readTime: '5 min read',
          views: '1.2k',
          excerpt: 'Complete guide to ROC filings and annual compliance requirements under Companies Act 2013.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          gradient: 'from-purple-500 to-purple-600',
          route: '/resources/roc-compliance',
          isFeatured: false,
          badge: null,
          author: 'CA Avinash Payal',
          isVerified: true,
          status: 'PUBLISHED'
        },
      ] as Insight[];
    },
  });
}

export function useDeleteInsight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      // Mock delete
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insights'] });
    },
  });
}
