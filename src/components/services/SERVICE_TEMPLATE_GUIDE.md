# Professional Service Template Guide

## Overview

All services now use a **unified professional template** with:
- ✅ Consistent modern design across all 48+ services
- ✅ API-driven dynamic pricing
- ✅ Loading skeletons & error handling
- ✅ Responsive design (mobile & desktop)
- ✅ SEO-friendly structure

## Quick Start

### 1. Basic Service Component

```tsx
import { UnifiedServiceTemplate, ServiceContent } from '../UnifiedServiceTemplate';
import { Zap, Shield, Clock } from 'lucide-react';

export function YourService() {
    const content: ServiceContent = {
        // Hero Section
        title: 'Your Service Name',
        subtitle: 'Compelling subtitle here',
        description: 'Detailed description of the service...',
        categoryBadge: 'Category Name',
        
        // Trust Badges (optional)
        trustBadges: [
            { icon: Shield, text: '10,000+', subtext: 'Clients' },
            { icon: Clock, text: '3-5 Days', subtext: 'Processing' },
        ],
        
        // Hero Stats (optional)
        heroStats: [
            { value: '99%', label: 'Success Rate' },
            { value: '24/7', label: 'Support' },
        ],
        
        // Pricing Plans (will be overridden by API if configured)
        plans: [
            {
                id: 1,
                name: 'Basic',
                price: '₹1,499',
                originalPrice: '₹2,999',
                badge: 'Most Popular',
                description: 'Essential features',
                features: ['Feature 1', 'Feature 2', 'Feature 3'],
                popular: true,
                icon: Zap,
            },
            // Add more plans...
        ],
        
        // Benefits
        benefits: [
            'Benefit 1 description',
            'Benefit 2 description',
            // Add more benefits...
        ],
        
        // Process Steps
        process: [
            {
                step: '1',
                title: 'Step Title',
                description: 'Step description',
                time: '1-2 days',
            },
            // Add more steps...
        ],
        
        // Documents Required
        documents: [
            'Document 1',
            'Document 2',
            // Add more documents...
        ],
        
        // FAQs
        faqs: [
            {
                q: 'Question 1?',
                a: 'Answer to question 1...',
            },
            // Add more FAQs...
        ],
    };

    return (
        <UnifiedServiceTemplate
            serviceSlug="your-service-slug"
            serviceId={1}
            content={content}
        />
    );
}
```

### 2. With Dynamic Pricing from API

```tsx
export function YourService() {
    const content = { /* ... default content ... */ };

    // API Configuration
    const apiConfig = {
        endpoint: '/api/services/your-service/pricing',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    // Fallback if API fails
    const fallbackContent = {
        plans: content.plans
    };

    return (
        <UnifiedServiceTemplate
            serviceSlug="your-service-slug"
            serviceId={1}
            content={content}
            apiConfig={apiConfig}
            fallbackContent={fallbackContent}
        />
    );
}
```

## API Response Format

Your backend should return pricing data in this format:

```json
{
    "plans": [
        {
            "id": 1,
            "name": "Basic",
            "price": "₹1,499",
            "originalPrice": "₹2,999",
            "badge": "Most Popular",
            "description": "Essential features",
            "features": ["Feature 1", "Feature 2", "Feature 3"],
            "popular": true
        },
        {
            "id": 2,
            "name": "Standard",
            "price": "₹2,999",
            "originalPrice": "₹4,999",
            "badge": "Best Value",
            "description": "Advanced features",
            "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
            "recommended": true
        }
    ],
    "plansTitle": "Custom Pricing Plans",
    "plansSubtitle": "Limited time offer!"
}
```

## Template Sections

### 1. Hero Section
- Dark gradient background with animated elements
- Category badge with icon
- Main title & subtitle
- Description text
- Two CTA buttons (Primary + Secondary)
- Trust badges (4 items with icons)
- Stats grid (4 stats)

### 2. Pricing Section
- Section header with badge
- 4-column responsive grid
- Loading skeleton during API fetch
- Error message with retry button
- Plan cards with:
  - Icon
  - Name
  - Price (with strikethrough original)
  - Badge (Popular/Recommended)
  - Feature list with checkmarks
  - CTA button

### 3. Benefits Section
- Two-column layout
- "Why Choose Us" card with stats
- Benefits grid with icons

### 4. Process Section
- Timeline with connecting line
- Step numbers in circles
- Time badges
- Description cards

### 5. Documents Section
- List of required documents
- Icon + text format
- Additional info card

### 6. FAQ Section
- Accordion style
- Expandable/collapsible
- First FAQ open by default

### 7. CTA Section
- Dark gradient background
- Title & description
- Two buttons

## Styling Features

### Professional Design Elements
- ✅ Gradient backgrounds (hero, CTA)
- ✅ Glassmorphism effects (backdrop blur)
- ✅ Animated transitions (fade, slide)
- ✅ Hover effects (lift, glow)
- ✅ Loading skeletons
- ✅ Professional shadows
- ✅ Consistent spacing

### Responsive Breakpoints
- Desktop: 4-column pricing grid
- Tablet: 2-column pricing grid
- Mobile: 1-column stack

## Icons Available

Import from `lucide-react`:
- Zap, TrendingUp, Crown, Building2 (pricing tiers)
- CheckCircle, Shield, Star, Users, Award
- Clock, FileText, Phone, Sparkles
- ChevronDown, ChevronUp
- Plus any other Lucide icons

## Migration Guide

To migrate existing service pages:

1. **Import the template**:
   ```tsx
   import { UnifiedServiceTemplate, ServiceContent } from '../UnifiedServiceTemplate';
   ```

2. **Extract content** from your existing component into the `content` object

3. **Replace** your JSX with:
   ```tsx
   <UnifiedServiceTemplate
       serviceSlug="your-service"
       serviceId={1}
       content={content}
   />
   ```

4. **Add API config** (optional) for dynamic pricing

5. **Test** thoroughly on desktop and mobile

## Example: Complete Service

See `GSTRegistration.tsx` for a complete working example with:
- Full content configuration
- API integration setup
- Fallback pricing
- All sections populated

## Need Help?

- Check `GSTRegistration.tsx` as reference
- Review the `ServiceContent` interface for all options
- Test API endpoints with sample responses

---

**All services should follow this template for consistency!**
