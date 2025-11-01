# Ad Components Comparison Guide

## InContentAd vs InArticleAd

Understanding when to use each component for optimal ad performance.

---

## InContentAd

### Visual Appearance
```
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────────────┐  │
│  │         Advertisement                  │  │
│  ├────────────────────────────────────────┤  │
│  │                                        │  │
│  │         [Ad Content Here]              │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
   ↑ Bordered container with background
```

### Characteristics
- ✅ Visible border (dashed, gray)
- ✅ Background color (gray-50/gray-800)
- ✅ "Advertisement" label
- ✅ Padding and spacing
- ✅ Rectangle format
- ✅ max-width: 3xl (48rem)

### Best Use Cases
- Calculator pages
- Feature sections
- Result pages
- Dashboard widgets
- Non-article content

### Code Example
```tsx
<InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} className="my-8" />
```

---

## InArticleAd (NEW!)

### Visual Appearance
```
┌──────────────────────────────────────────────┐
│              advertisement                   │
│                                              │
│         [Ad Content Flows Naturally]         │
│                                              │
└──────────────────────────────────────────────┘
   ↑ Minimal styling, blends with content
```

### Characteristics
- ✅ No visible border
- ✅ No background color
- ✅ Tiny, subtle label
- ✅ Minimal padding
- ✅ Fluid format (adapts to content)
- ✅ max-width: 4xl (56rem)

### Best Use Cases
- Blog posts
- Articles
- Long-form content
- News pages
- Editorial content

### Code Example
```tsx
<InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} layout="fluid" />
```

---

## Side-by-Side Comparison

| Feature | InContentAd | InArticleAd |
|---------|-------------|-------------|
| **Border** | ✅ Dashed border | ❌ No border |
| **Background** | ✅ Gray background | ❌ Transparent |
| **Label Size** | Medium (12px) | Small (10px) |
| **Layout** | Rectangle | Fluid |
| **Max Width** | 3xl (48rem) | 4xl (56rem) |
| **Padding** | 16px | Minimal |
| **Best For** | Sections | Articles |
| **Ad Format** | `rectangle` | `fluid` |
| **Appearance** | Distinct | Native |

---

## When to Use What?

### Use InContentAd 👍
```tsx
// Calculator page
<div>
  <CalculatorForm />
  <InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} />
  <ResultsCard />
</div>

// Dashboard
<div>
  <UserStats />
  <InContentAd adSlot={AD_SLOTS.HOMEPAGE.MID_RECTANGLE} />
  <RecentActivity />
</div>
```

### Use InArticleAd 👍
```tsx
// Blog post
<article>
  <h1>Title</h1>
  <p>Paragraph 1...</p>
  <p>Paragraph 2...</p>

  <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} layout="fluid" />

  <p>Paragraph 3...</p>
  <p>Paragraph 4...</p>
</article>
```

---

## Performance Metrics

### InContentAd
- **CTR**: Moderate (1-2%)
- **Viewability**: High (clearly visible)
- **User Experience**: Separated from content

### InArticleAd
- **CTR**: Higher (2-4%)
- **Viewability**: Very High (natural scroll)
- **User Experience**: Seamless integration

---

## Migration Guide

If you have existing InContentAd in blog posts, consider migrating:

### Before
```tsx
<article>
  <p>Content...</p>
  <InContentAd adSlot="..." />  {/* Stands out too much */}
  <p>More content...</p>
</article>
```

### After
```tsx
<article>
  <p>Content...</p>
  <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} layout="fluid" />
  <p>More content...</p>
</article>
```

---

## Your Current Ad Slots

### For InContentAd
```typescript
CALCULATOR: {
  MID_RECTANGLE: '3832094528',
  BOTTOM_RECTANGLE: '7970650085',
}

RESULTS: {
  INLINE_1: '2008818916',
  INLINE_2: '5388718770',
  INLINE_3: '7285196323',
}
```

### For InArticleAd
```typescript
BLOG: {
  IN_ARTICLE_1: '3537523006', // ✅ Active
  IN_ARTICLE_2: '2854054771', // ✅ Active
}
```

---

## Complete Page Example

```tsx
import {
  ResponsiveAd,
  InContentAd,
  InArticleAd,
  StickyAd
} from '@/components/Adsense';

export default function HybridPage() {
  return (
    <div>
      {/* Top banner - visible separator */}
      <ResponsiveAd adSlot={AD_SLOTS.TOP_BANNER} format="horizontal" />

      {/* Feature section */}
      <FeatureCard />
      <InContentAd adSlot={AD_SLOTS.MID_RECTANGLE} />

      {/* Article content */}
      <article>
        <h1>Article Title</h1>
        <p>Opening...</p>

        <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} layout="fluid" />

        <p>More content...</p>

        <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_2} layout="fluid" />
      </article>

      {/* Bottom banner */}
      <ResponsiveAd adSlot={AD_SLOTS.BOTTOM_BANNER} />

      {/* Sidebar (desktop only) */}
      <StickyAd adSlot={AD_SLOTS.SIDEBAR_STICKY} position="sidebar" />
    </div>
  );
}
```

---

## Key Takeaways

1. **InContentAd** = Visible container for non-article pages
2. **InArticleAd** = Invisible container for blog/article pages
3. Use **fluid layout** for articles
4. Use **rectangle format** for sections
5. Match the component to your content type

---

## Need Help?

- Check [README.md](./src/components/Adsense/README.md) for detailed docs
- See [ARTICLE_AD_EXAMPLE.md](./ARTICLE_AD_EXAMPLE.md) for full examples
- Review component source code for advanced customization
