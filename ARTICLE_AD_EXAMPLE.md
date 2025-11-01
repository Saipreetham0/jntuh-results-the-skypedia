# How to Use In-Article Display Ads

## What are In-Article Ads?

In-Article ads are Google AdSense display ads specifically designed to be placed **within the content** of blog posts or articles. They:

- Match your article's styling for a native appearance
- Have higher engagement rates than banner ads
- Use fluid layout to blend seamlessly with text
- Are optimized for both desktop and mobile

## Your Ad Slots

You have two in-article ad slots configured:

```typescript
BLOG: {
  IN_ARTICLE_1: '3537523006', // First in-article ad
  IN_ARTICLE_2: '2854054771', // Second in-article ad
}
```

## Implementation Example

Here's a complete example of a blog post with in-article ads:

```tsx
// app/blog/sample-article/page.tsx
"use client";

import { InArticleAd, ResponsiveAd } from '@/components/Adsense';
import AD_SLOTS from '@/config/adSlots';

export default function SampleArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Banner */}
        <ResponsiveAd
          adSlot={AD_SLOTS.BLOG.TOP_BANNER}
          format="horizontal"
          className="mb-8"
        />

        {/* Article Content */}
        <article className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How to Calculate CGPA: Complete Guide
          </h1>

          <div className="text-gray-600 dark:text-gray-400 mb-8">
            <span>By The Skypedia Team</span>
            <span className="mx-2">•</span>
            <span>November 1, 2025</span>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Understanding your CGPA (Cumulative Grade Point Average) is crucial
              for academic success. In this comprehensive guide, we'll walk you
              through everything you need to know about calculating and improving
              your CGPA.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">What is CGPA?</h2>
            <p className="mb-6">
              CGPA stands for Cumulative Grade Point Average. It's the average
              of grade points obtained in all subjects, excluding additional
              subjects as per the scheme of studies.
            </p>

            <p className="mb-6">
              The CGPA system is widely used in educational institutions across
              India, particularly in universities like JNTUH, JNTUK, and JNTUA.
            </p>

            {/* First In-Article Ad */}
            <InArticleAd
              adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1}
              layout="fluid"
            />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              How to Calculate CGPA
            </h2>
            <p className="mb-6">
              The formula for calculating CGPA is straightforward:
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <code className="text-lg font-semibold">
                CGPA = Sum of (Grade Points × Credits) / Total Credits
              </code>
            </div>

            <h3 className="text-xl font-bold mt-6 mb-4">Step-by-Step Process</h3>
            <ol className="list-decimal pl-6 mb-6 space-y-3">
              <li>Collect your grade points for all semesters</li>
              <li>Note the credits for each subject</li>
              <li>Multiply grade points by credits for each subject</li>
              <li>Add all the products</li>
              <li>Divide by total credits</li>
            </ol>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              CGPA to Percentage Conversion
            </h2>
            <p className="mb-6">
              Most universities use a 10-point CGPA scale. To convert CGPA to
              percentage, you typically multiply by 9.5 (for JNTUH):
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <code className="text-lg font-semibold">
                Percentage = CGPA × 9.5
              </code>
            </div>

            <p className="mb-6">
              For example, if your CGPA is 8.5, your equivalent percentage would
              be 8.5 × 9.5 = 80.75%
            </p>

            {/* Second In-Article Ad */}
            <InArticleAd
              adSlot={AD_SLOTS.BLOG.IN_ARTICLE_2}
              layout="fluid"
            />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Tips to Improve Your CGPA
            </h2>
            <ul className="list-disc pl-6 mb-6 space-y-3">
              <li>
                <strong>Focus on weak subjects:</strong> Identify areas where
                you're struggling and allocate more time to them
              </li>
              <li>
                <strong>Regular study schedule:</strong> Consistency is key to
                maintaining good grades
              </li>
              <li>
                <strong>Attend classes regularly:</strong> Class participation
                and attendance can boost your grades
              </li>
              <li>
                <strong>Use online calculators:</strong> Tools like our CGPA
                calculator help you track your progress
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Common CGPA Grading Scale
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      CGPA Range
                    </th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      Grade
                    </th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      9.0 - 10.0
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      A+
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      Outstanding
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      8.0 - 8.9
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      A
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      Excellent
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      7.0 - 7.9
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      B
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      Good
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      6.0 - 6.9
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      C
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      Average
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
            <p className="mb-6">
              Understanding and calculating your CGPA is essential for tracking
              your academic progress. Use our online calculators to make the
              process easier and more accurate.
            </p>

            <p className="mb-6">
              Whether you're applying for higher education or job opportunities,
              a strong CGPA can open many doors. Keep working hard and use the
              tips mentioned above to improve your grades consistently.
            </p>
          </div>
        </article>

        {/* Bottom Ad */}
        <ResponsiveAd
          adSlot={AD_SLOTS.BLOG.BOTTOM_RECTANGLE}
          format="auto"
          className="mt-8"
        />
      </div>
    </div>
  );
}
```

## Key Points

### Ad Placement Strategy
1. **First ad**: After 2-3 paragraphs (when reader is engaged)
2. **Second ad**: Mid-way through the article
3. **Spacing**: At least 3-4 paragraphs between ads
4. **Context**: Place near related content for higher relevance

### Layout Options
```tsx
// Fluid layout (recommended for articles)
<InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} layout="fluid" />

// Default layout
<InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} layout="default" />
```

### Styling
```tsx
// Add custom spacing
<InArticleAd
  adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1}
  className="my-12"
/>

// Custom label
<InArticleAd
  adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1}
  label="Sponsored Content"
/>
```

## Benefits of In-Article Ads

✅ **Higher viewability**: Readers naturally scroll through them
✅ **Better CTR**: More contextually relevant
✅ **Native appearance**: Blends with your content
✅ **Mobile-optimized**: Works great on all devices
✅ **Non-intrusive**: Doesn't interrupt reading flow

## Testing

To test your in-article ads:

1. Run development server: `npm run dev`
2. Create a test article page
3. Check browser console for any errors
4. Verify ads load correctly
5. Test on mobile devices

## Production Checklist

Before deploying:

- [ ] Verified ad slot IDs are correct
- [ ] Tested on multiple devices
- [ ] Confirmed AdSense account is approved
- [ ] Checked page load performance
- [ ] Ensured ads don't violate content policies
- [ ] Monitored ad viewability metrics

---

**Need help?** Check the [AdSense Components README](/src/components/Adsense/README.md) for more details.
