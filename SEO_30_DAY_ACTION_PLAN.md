# 30-Day SEO Recovery Action Plan
**TheSkypedia - JNTUH Results**

---

## 📅 Week 1: Technical Foundation (Days 1-7)

### **Day 1** ✅ COMPLETED
- [x] Install SEO packages
- [x] Create SEO config files
- [x] Fix root layout metadata
- [x] Update sitemap priorities
- [x] Improve robots.txt
- [x] Test build

### **Day 2** 🎯 NEXT
- [ ] Deploy to production
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Search Console ownership
- [ ] Check initial indexing status

### **Day 3**
- [ ] Validate schemas using Google Rich Results Test
- [ ] Test Open Graph tags (opengraph.xyz)
- [ ] Test Twitter Cards (cards-dev.twitter.com/validator)
- [ ] Fix any validation errors
- [ ] Request indexing for all calculator pages

### **Day 4**
- [ ] Monitor Google Search Console for crawl errors
- [ ] Check Coverage report
- [ ] Review Mobile Usability report
- [ ] Fix any technical issues

### **Day 5**
- [ ] Create OG images for calculator pages (1200x630):
  - `/public/og-cgpa-calculator.jpg`
  - `/public/og-cgpa-percentage.jpg`
  - `/public/og-sgpa-cgpa.jpg`
  - `/public/og-percentage-cgpa.jpg`
- [ ] Optimize images to WebP
- [ ] Update metadata to use new images

### **Day 6**
- [ ] Run Lighthouse audits on all calculator pages
- [ ] Aim for 90+ performance score
- [ ] Fix any performance issues
- [ ] Check Core Web Vitals

### **Day 7**
- [ ] Review Week 1 progress
- [ ] Document any issues found
- [ ] Prepare content plan for Week 2

**Expected Week 1 Impact:** +5-10% traffic recovery

---

## 📅 Week 2: Content Enhancement (Days 8-14)

### **Day 8-9: Add Content to Calculator Pages**

For each calculator page, add these sections:

#### **CGPA Calculator** (`/cgpa-calculator`)
- [ ] Add "How to Use" section (150+ words)
- [ ] Add "CGPA Calculation Formula" section
- [ ] Add "Understanding Grades" table
- [ ] Add 4-6 FAQs:
  - What is CGPA in JNTUH?
  - How to calculate CGPA for R22?
  - What is the difference between SGPA and CGPA?
  - How many credits are required for graduation?

#### **CGPA to Percentage** (`/cgpa-percentage-converter`)
- [ ] Add "Conversion Formula" section
- [ ] Add examples for different regulations
- [ ] Add "Why Convert CGPA?" section
- [ ] Add 4 FAQs about conversion

#### **SGPA to CGPA** (`/sgpa-to-cgpa-calculator`)
- [ ] Add "Understanding SGPA vs CGPA" section
- [ ] Add calculation methodology
- [ ] Add semester-wise tips
- [ ] Add 4 FAQs

### **Day 10-11: Internal Linking**

Add contextual links in calculator pages:

```markdown
Example for CGPA Calculator:
"After calculating your CGPA, you might want to
[convert it to percentage](/cgpa-percentage-converter) for
job applications or check your
[consolidated results](/consolidated-results)."
```

- [ ] Link CGPA Calculator → CGPA to Percentage
- [ ] Link CGPA Calculator → Consolidated Results
- [ ] Link SGPA to CGPA → CGPA Calculator
- [ ] Link Percentage to CGPA → CGPA Calculator
- [ ] Add "Related Tools" section to each calculator
- [ ] Link from Homepage to top calculators

### **Day 12-13: Create Regulation-Specific Pages**

#### **Create R22 CGPA Calculator** (`/r22-cgpa-calculator`)
```typescript
// Copy cgpa-calculator
// Customize for R22:
// - R22-specific grading table
// - R22 credit structure
// - R22 regulations link
// Add metadata focusing on "R22" keyword
```

- [ ] Create `/r22-cgpa-calculator/page.tsx`
- [ ] Create `/r22-cgpa-calculator/layout.tsx` with R22 metadata
- [ ] Add to sitemap (priority: 0.9)
- [ ] Link from main CGPA calculator

#### **Create R20 CGPA Calculator** (`/r20-cgpa-calculator`)
- [ ] Same as above but for R20

### **Day 14: Update Sitemap & Submit**
- [ ] Add new regulation pages to sitemap
- [ ] Re-submit sitemap to search engines
- [ ] Request indexing for new pages

**Expected Week 2 Impact:** +10-15% traffic recovery (total: 15-25%)

---

## 📅 Week 3: Expansion & Authority (Days 15-21)

### **Day 15-16: Create Information Hub Pages**

#### **How to Calculate CGPA** (`/how-to-calculate-cgpa`)
```markdown
Sections:
1. What is CGPA? (100 words)
2. CGPA vs Percentage (150 words)
3. Step-by-Step Guide (200 words)
4. Examples for R22, R20, R18 (150 words each)
5. Common Mistakes (100 words)
6. FAQs (6 questions)
```

- [ ] Create page with 800+ words
- [ ] Add internal links to calculators
- [ ] Add to sitemap (priority: 0.7)
- [ ] Create metadata with long-tail keywords

#### **CGPA to Percentage Formula** (`/cgpa-to-percentage-formula`)
- [ ] 500+ words explaining formula
- [ ] Examples for each regulation
- [ ] Comparison table
- [ ] Add to sitemap

#### **JNTUH Grading System** (`/jntuh-grading-system`)
- [ ] Comprehensive guide (1000+ words)
- [ ] Grade tables for all regulations
- [ ] Credit system explanation
- [ ] Add to sitemap

### **Day 17-18: Blog Content**

Create 3 blog posts in `/blog/`:

#### **Post 1:** "Complete Guide to JNTUH CGPA Calculation 2024"
```markdown
Target: 1500+ words
Sections:
- Understanding CGPA
- Calculation methods by regulation
- Tools and calculators
- Tips to improve CGPA
- FAQs
Internal links: All calculators
```

#### **Post 2:** "How to Improve Your CGPA: Tips for JNTUH Students"
```markdown
Target: 1200+ words
Sections:
- Study strategies
- Time management
- Resource utilization
- Common pitfalls
Internal links: CGPA calculator, resources
```

#### **Post 3:** "CGPA vs Percentage: What You Need to Know"
```markdown
Target: 1000+ words
Sections:
- Differences explained
- When to use each
- Conversion formulas
- Job market perspectives
Internal links: Converters
```

- [ ] Write all 3 posts
- [ ] Add featured images
- [ ] Optimize for keywords
- [ ] Add to sitemap
- [ ] Share on social media

### **Day 19-20: Results Pages Enhancement**

#### **Consolidated Results** (`/consolidated-results`)
- [ ] Add metadata if missing
- [ ] Add breadcrumb schema
- [ ] Add "How to Check" guide
- [ ] Add FAQs

#### **Semester Results** (`/semester-wise-results`)
- [ ] Add comprehensive guide
- [ ] Add result date information
- [ ] Add download instructions

#### **Check Backlogs** (`/check-backlogs`)
- [ ] Add "What are Backlogs?" section
- [ ] Add impact on career
- [ ] Add clearing process
- [ ] Add FAQs

### **Day 21: Search Engine Submission Round 2**
- [ ] Submit all new pages for indexing
- [ ] Update sitemap
- [ ] Check Google Search Console for issues
- [ ] Monitor crawl stats

**Expected Week 3 Impact:** +15-20% traffic recovery (total: 30-45%)

---

## 📅 Week 4: Monitoring & Refinement (Days 22-30)

### **Day 22-24: Analytics Deep Dive**

#### **Google Search Console**
- [ ] Review Top Queries report
- [ ] Identify winning keywords
- [ ] Find keywords ranking 11-20 (easy wins)
- [ ] Analyze click-through rates
- [ ] Check coverage issues
- [ ] Review Core Web Vitals

#### **Create Tracking Sheet**
```
Keywords to Track:
1. JNTUH CGPA Calculator - Target: Top 3
2. CGPA to Percentage JNTUH - Target: Top 3
3. JNTUH Results - Target: Top 5
4. SGPA to CGPA Calculator - Target: Top 5
5. JNTUH R22 CGPA Calculator - Target: Top 5
6. JNTUH R20 Results - Target: Top 10
7. Percentage to CGPA - Target: Top 10
8. JNTUH Grade Calculator - Target: Top 10
9. JNTUH Previous Papers - Target: Top 5
10. JNTUH Syllabus - Target: Top 10

Track Weekly in Google Sheets
```

### **Day 25-26: Speed Optimization**

#### **Run Lighthouse Audits**
- [ ] Audit Homepage
- [ ] Audit all calculator pages
- [ ] Audit results pages
- [ ] Target: 90+ performance score

#### **Optimization Checklist**
- [ ] Compress images further if needed
- [ ] Minimize unused JavaScript
- [ ] Defer non-critical CSS
- [ ] Check font loading
- [ ] Review bundle size
- [ ] Optimize third-party scripts

#### **Core Web Vitals Targets**
- LCP: < 2.5s ✅
- FID: < 100ms ✅
- CLS: < 0.1 ✅

### **Day 27-28: Schema Validation & Testing**

#### **Google Rich Results Test**
Test all pages with schemas:
- [ ] Homepage (Organization + Website)
- [ ] CGPA Calculator (SoftwareApplication + Breadcrumb)
- [ ] CGPA to Percentage (SoftwareApplication + Breadcrumb)
- [ ] SGPA to CGPA (SoftwareApplication + Breadcrumb)
- [ ] Percentage to CGPA (SoftwareApplication + Breadcrumb)
- [ ] Marks Calculator (SoftwareApplication + Breadcrumb)

#### **Social Media Testing**
- [ ] Facebook Debugger - Test all OG tags
- [ ] Twitter Card Validator - Test Twitter cards
- [ ] LinkedIn Post Inspector - Test LinkedIn previews
- [ ] WhatsApp - Test preview images

### **Day 29: Backlink Strategy**

#### **Outreach Targets**
1. **Education Blogs**
   - [ ] Contact TheSkypedia main blog for backlink
   - [ ] Reach out to JNTUH-related blogs
   - [ ] Comment on education forums

2. **Directory Submissions**
   - [ ] Submit to education directories
   - [ ] Student resource websites
   - [ ] Technical education portals

3. **Community Engagement**
   - [ ] Join JNTUH student Facebook groups
   - [ ] Participate in Reddit discussions (r/JNTU)
   - [ ] Answer Quora questions about CGPA
   - [ ] Engage on Twitter with student community

4. **College Partnerships**
   - [ ] Reach out to college placement cells
   - [ ] Offer free resources to colleges
   - [ ] Guest post opportunities

### **Day 30: Review & Planning**

#### **Review Metrics**
- [ ] Total traffic comparison (Day 1 vs Day 30)
- [ ] Keyword ranking improvements
- [ ] Pages indexed (goal: all pages)
- [ ] Click-through rate improvements
- [ ] Backlinks acquired
- [ ] Core Web Vitals scores

#### **Create Next Month Plan**
Based on data, focus on:
- [ ] Best performing pages → Create more similar content
- [ ] Keywords ranking 11-20 → Optimize for top 10
- [ ] High impression, low CTR → Improve titles/descriptions
- [ ] Technical issues → Fix immediately

#### **Document Learnings**
- [ ] What worked best?
- [ ] What didn't work?
- [ ] Unexpected wins?
- [ ] Areas needing more work?

**Expected Week 4 Impact:** +10-15% traffic recovery (total: 40-60%)

---

## 📊 Success Metrics Summary

### **Week 1**
- Traffic: +5-10%
- Pages indexed: 35/35
- Schema errors: 0
- Core Web Vitals: All green

### **Week 2**
- Traffic: +15-25% (cumulative)
- New pages created: 2-3
- Internal links added: 15+
- FAQs added: 20+

### **Week 3**
- Traffic: +30-45% (cumulative)
- New pages created: 6+
- Blog posts: 3
- Information pages: 3

### **Week 4**
- Traffic: +40-60% (cumulative)
- Ranking improvements: 5+ keywords in top 10
- Backlinks acquired: 5-10
- Performance score: 90+

---

## 🎯 Month 2 Goals (Days 31-60)

- **Traffic:** +70-100% recovery
- **Top 3 rankings:** 3 main keywords
- **New pages:** 10+ regulation/course specific pages
- **Backlinks:** 20+ quality links
- **Featured snippets:** 2-3 calculator queries

---

## 🎯 Month 3 Goals (Days 61-90)

- **Traffic:** +120-150% (exceeding previous)
- **Top 3 rankings:** 5+ main keywords
- **Authority pages:** 20+ comprehensive guides
- **Backlinks:** 50+ quality links
- **Monthly traffic:** 50K+ visits

---

## 🚨 Daily Checklist (Days 1-30)

**Every Day:**
- [ ] Check Google Search Console for errors
- [ ] Monitor Core Web Vitals
- [ ] Check for broken links
- [ ] Review traffic analytics
- [ ] Engage on social media (5-10 min)

**Every Week:**
- [ ] Track keyword rankings
- [ ] Review top-performing pages
- [ ] Create 1 piece of content
- [ ] Build 2-3 backlinks
- [ ] Test site speed

**Every Month:**
- [ ] Comprehensive SEO audit
- [ ] Competitor analysis
- [ ] Strategy adjustment
- [ ] Performance report

---

## 📞 Tools Needed

**Free Tools:**
- ✅ Google Search Console (primary)
- ✅ Bing Webmaster Tools
- ✅ Google Analytics
- ✅ Google Rich Results Test
- ✅ PageSpeed Insights
- ✅ Facebook Debugger
- ✅ Twitter Card Validator

**Optional (Paid):**
- Ahrefs (backlink research)
- SEMrush (keyword research)
- Screaming Frog (technical SEO)

---

## ✅ Quick Wins (Do These First)

1. **Submit sitemap** (Day 1)
2. **Fix any crawl errors** (Day 2-3)
3. **Create OG images** (Day 5)
4. **Add FAQs to calculators** (Day 8-9)
5. **Create R22 calculator page** (Day 12)
6. **Write 1 comprehensive guide** (Day 15)
7. **Get 5 backlinks** (Day 29)

---

## 🎓 Remember

- **Quality > Quantity:** Better to have 5 amazing pages than 20 mediocre ones
- **User First:** Write for users, not search engines
- **Consistency:** Small daily efforts compound over time
- **Patience:** SEO takes 2-3 months to show full results
- **Data-Driven:** Make decisions based on Search Console data

---

**Status:** 📅 Day 1 Complete ✅
**Next:** Deploy and submit to search engines
**Timeline:** 30 days to 50-60% traffic recovery
**Final Goal:** 100%+ traffic recovery by Day 90
