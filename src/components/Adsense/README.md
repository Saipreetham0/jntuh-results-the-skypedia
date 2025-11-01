# AdSense Components Documentation

Complete guide for implementing Google AdSense ads across your application.

## Available Components

### 1. InArticleAd (NEW!)
**Purpose**: Display ads optimized for article/blog content
**Ad Slots**: `IN_ARTICLE_1`, `IN_ARTICLE_2`

```tsx
import { InArticleAd } from '@/components/Adsense';
import AD_SLOTS from '@/config/adSlots';

// Basic usage
<InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} />

// With custom settings
<InArticleAd
  adSlot={AD_SLOTS.BLOG.IN_ARTICLE_2}
  layout="fluid"
  className="my-8"
  label="Sponsored Content"
/>
```

**Features**:
- Fluid layout that adapts to content width
- Minimal styling for native-like appearance
- Higher engagement rates
- Seamless integration with article text

**Best Practices**:
- Place between paragraphs (not at the top)
- Use 1-2 ads per article (avoid ad fatigue)
- Space ads at least 3-4 paragraphs apart
- First ad after 2-3 paragraphs of content

**Example Article Layout**:
```tsx
export default function BlogPost() {
  return (
    <article>
      <h1>Article Title</h1>

      <p>Opening paragraph...</p>
      <p>Second paragraph...</p>
      <p>Third paragraph...</p>

      {/* First in-article ad */}
      <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} />

      <p>More content...</p>
      <p>More content...</p>
      <p>More content...</p>

      {/* Second in-article ad */}
      <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_2} />

      <p>Closing content...</p>
    </article>
  );
}
```

---

### 2. InContentAd
**Purpose**: Content-related ads with styled containers
**Use Case**: Calculator results, feature sections

```tsx
import { InContentAd } from '@/components/Adsense';

<InContentAd
  adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE}
  className="my-8"
/>
```

**Features**:
- Bordered container with background
- "Advertisement" label
- Better suited for non-article pages

---

### 3. ResponsiveAd
**Purpose**: Flexible ads that adapt to screen size
**Use Case**: Top/bottom banners

```tsx
import { ResponsiveAd } from '@/components/Adsense';

<ResponsiveAd
  adSlot={AD_SLOTS.HOMEPAGE.TOP_BANNER}
  format="horizontal"
  className="mb-8"
/>
```

**Formats**:
- `horizontal`: Wide banners
- `auto`: Auto-size (default)

---

### 4. StickyAd
**Purpose**: Sidebar ads that stay visible while scrolling
**Use Case**: Desktop sidebars

```tsx
import { StickyAd } from '@/components/Adsense';

<StickyAd
  adSlot={AD_SLOTS.CALCULATOR.SIDEBAR_STICKY}
  position="sidebar"
/>
```

---

## Ad Placement Strategy

### Homepage
```tsx
<ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.TOP_BANNER} format="horizontal" />
// Content here
<InContentAd adSlot={AD_SLOTS.HOMEPAGE.MID_RECTANGLE} />
// More content
<ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} />
```

### Calculator Pages
```tsx
<ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} format="horizontal" />
// Calculator form
<InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} />
// Results
<ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BOTTOM_RECTANGLE} />
<StickyAd adSlot={AD_SLOTS.CALCULATOR.SIDEBAR_STICKY} position="sidebar" />
```

### Blog/Article Pages
```tsx
<ResponsiveAd adSlot={AD_SLOTS.BLOG.TOP_BANNER} format="horizontal" />

<article>
  {/* Opening paragraphs */}
  <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} layout="fluid" />

  {/* More content */}
  <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_2} layout="fluid" />

  {/* Closing content */}
</article>

<ResponsiveAd adSlot={AD_SLOTS.BLOG.BOTTOM_RECTANGLE} />
```

---

## Component Comparison

| Component | Layout | Best For | Container Style |
|-----------|--------|----------|-----------------|
| InArticleAd | Fluid | Blog posts, articles | Minimal, native-like |
| InContentAd | Rectangle | Feature sections | Bordered with bg |
| ResponsiveAd | Auto/Horizontal | Banners | Full width |
| StickyAd | Fixed | Sidebars | Sticky position |

---

## Configuration

Update your ad slots in `/src/config/adSlots.ts`:

```typescript
BLOG: {
  TOP_BANNER: 'your-slot-id',
  IN_ARTICLE_1: '3537523006', // ✅ Your actual slot ID
  IN_ARTICLE_2: '2854054771', // ✅ Your actual slot ID
  BOTTOM_RECTANGLE: 'your-slot-id',
}
```

---

## Performance Tips

1. **Lazy Loading**: Ads load automatically when in viewport
2. **Error Handling**: Built-in retry mechanism
3. **Development Mode**: Shows error messages in dev environment
4. **Responsive**: All components adapt to mobile/tablet/desktop

---

## Common Issues

### Ad not showing?
1. Check slot ID is correct
2. Verify AdSense account is approved
3. Check browser ad blockers
4. Wait 24-48 hours for new ad units to activate

### Layout shift?
- Use `minHeight` in InArticleAd to reserve space
- Consider skeleton loading for better UX

---

## Questions?
Refer to Google AdSense documentation or check the component source code for advanced customization.
