# Analytics Usage Examples

Real-world examples for tracking events in the JNTUH Results website.

---

## 📝 Table of Contents

1. [Results Pages](#results-pages)
2. [Calculators](#calculators)
3. [Alert Subscriptions](#alert-subscriptions)
4. [Form Submissions](#form-submissions)
5. [Downloads](#downloads)
6. [Navigation](#navigation)

---

## 🎯 Results Pages

### Consolidated Results Page
**File**: `src/app/(student-res)/consolidated-results/page.tsx`

```tsx
import { trackResultCheck } from "@/lib/analytics-utils";

const ConsolidatedResults = () => {
  const [rollNumber, setRollNumber] = useState("");

  const handleCheckResults = async () => {
    // Track before fetching
    trackResultCheck(rollNumber.substring(0, 4), "consolidated_results");

    try {
      const response = await fetch(`/api/consolidated-results?htno=${rollNumber}`);
      // ... handle response
    } catch (error) {
      trackError("API Error", "Failed to fetch consolidated results");
    }
  };

  return (
    <div>
      <input value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
      <button onClick={handleCheckResults}>Check Results</button>
    </div>
  );
};
```

### Semester-Wise Results
**File**: `src/app/(student-res)/semester-wise-results/page.tsx`

```tsx
import { trackResultCheck, trackError } from "@/lib/analytics-utils";

const SemesterResults = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    trackResultCheck(rollNumber.substring(0, 4), "semester_results");

    try {
      const response = await fetch(`/api/semester-wise-results?htno=${rollNumber}`);
      if (!response.ok) throw new Error("Failed to fetch");

      // ... handle success
    } catch (error) {
      trackError("Semester Results", error.message);
    }
  };
};
```

### Backlog Check
**File**: `src/app/(student-res)/check-backlogs/page.tsx`

```tsx
import { trackResultCheck } from "@/lib/analytics-utils";

const BacklogChecker = () => {
  const checkBacklogs = async (rollNo: string) => {
    trackResultCheck(rollNo.substring(0, 4), "backlog_check");

    const response = await fetch(`/api/backlogs?htno=${rollNo}`);
    // ... handle response
  };
};
```

---

## 🧮 Calculators

### CGPA Calculator
**File**: `src/app/(converter)/cgpa-calculator/page.tsx`

```tsx
import { trackCalculatorUse } from "@/lib/analytics-utils";

const CGPACalculator = () => {
  useEffect(() => {
    // Track page view
    trackCalculatorUse("CGPA Calculator");
  }, []);

  const handleCalculate = () => {
    // Track calculation action
    trackUniversalEvent("calculator_calculate", {
      category: "Tools",
      label: "CGPA Calculator",
      value: grades.length, // Number of subjects
    });

    // ... calculation logic
  };
};
```

### CGPA to Percentage Converter
**File**: `src/app/(converter)/cgpa-percentage-converter/page.tsx`

```tsx
import { trackCalculatorUse } from "@/lib/analytics-utils";

const CGPAPercentageConverter = () => {
  useEffect(() => {
    trackCalculatorUse("CGPA to Percentage Converter");
  }, []);

  const handleConvert = () => {
    trackUniversalEvent("conversion_complete", {
      category: "Converters",
      label: "CGPA to Percentage",
      cgpa: cgpaValue,
    });
  };
};
```

### SGPA to CGPA Calculator
**File**: `src/app/(converter)/sgpa-to-cgpa-calculator/page.tsx`

```tsx
import { trackCalculatorUse } from "@/lib/analytics-utils";

const SGPAToCGPA = () => {
  useEffect(() => {
    trackCalculatorUse("SGPA to CGPA Calculator");
  }, []);
};
```

---

## 📧 Alert Subscriptions

### Result Alerts Subscription
**File**: `src/app/(features)/result-alerts/page.tsx`

```tsx
import { trackAlertSubscription } from "@/lib/analytics-utils";

const ResultAlerts = () => {
  const handleSubscribe = async (formData: FormData) => {
    try {
      const response = await fetch("/api/result-alerts/subscribe", {
        method: "POST",
        body: JSON.stringify({ email, rollNumber }),
      });

      if (response.ok) {
        trackAlertSubscription("result_alerts");
        setSuccess(true);
      }
    } catch (error) {
      trackError("Subscription Error", error.message);
    }
  };
};
```

### Notification Subscription
**File**: `src/app/(features)/notifications/page.tsx`

```tsx
import { trackAlertSubscription } from "@/lib/analytics-utils";

const NotificationsPage = () => {
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        trackAlertSubscription("notification_alerts");
        setSubscriptionStatus("success");
      }
    } catch (err) {
      trackError("Notification Subscription", err.message);
    }
  };
};
```

---

## 📝 Form Submissions

### Contact Form
**File**: `src/app/(static-pages)/contact/page.tsx`

```tsx
import { trackFormSubmission, trackError } from "@/lib/analytics-utils";

const ContactPage = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        trackFormSubmission("contact_form");
        setStatus("success");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      trackError("Contact Form", error.message);
      setStatus("error");
    }
  };
};
```

---

## 📥 Downloads

### Previous Question Papers
**File**: `src/app/(student-res)/previous-question-papers/page.tsx`

```tsx
import { trackResourceDownload } from "@/lib/analytics-utils";

const QuestionPapers = () => {
  const handleDownload = (paperName: string, regulation: string) => {
    trackResourceDownload("Question Paper", `${regulation} - ${paperName}`);

    // Trigger download
    window.open(downloadUrl, "_blank");
  };

  return (
    <button onClick={() => handleDownload("CSE Sem 3", "R22")}>
      Download Paper
    </button>
  );
};
```

### Syllabus Download
**File**: `src/app/(student-res)/syllabus/page.tsx`

```tsx
import { trackResourceDownload } from "@/lib/analytics-utils";

const SyllabusPage = () => {
  const downloadSyllabus = (branch: string, regulation: string) => {
    trackResourceDownload("Syllabus", `${regulation} ${branch}`);

    // ... download logic
  };
};
```

---

## 🧭 Navigation

### External Links
**File**: Any component with external links

```tsx
import { trackOutboundLink } from "@/lib/analytics-utils";

const Footer = () => {
  return (
    <a
      href="https://jntuh.ac.in"
      onClick={() => trackOutboundLink("https://jntuh.ac.in", "JNTUH Official")}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit JNTUH Official
    </a>
  );
};
```

### Navigation Menu
**File**: `src/components/layout/nav-bar/navBar.tsx`

```tsx
import { trackUniversalEvent } from "@/lib/analytics-utils";

const NavBar = () => {
  const handleNavClick = (menuItem: string) => {
    trackUniversalEvent("navigation", {
      category: "Menu",
      label: menuItem,
    });
  };

  return (
    <nav>
      <Link href="/cgpa-calculator" onClick={() => handleNavClick("CGPA Calculator")}>
        CGPA Calculator
      </Link>
    </nav>
  );
};
```

---

## 🔍 Search

### Search Functionality
**File**: Any search component

```tsx
import { trackUniversalEvent } from "@/lib/analytics-utils";

const SearchBar = () => {
  const handleSearch = (query: string) => {
    trackUniversalEvent("search", {
      category: "Search",
      label: query,
      search_term: query,
    });

    // ... search logic
  };
};
```

---

## 🚨 Error Tracking

### Global Error Boundary
**File**: `src/components/ErrorBoundary.tsx`

```tsx
import { trackError } from "@/lib/analytics-utils";

class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    trackError("React Error Boundary", `${error.name}: ${error.message}`);

    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### API Error Tracking
**File**: Any API route or fetch call

```tsx
import { trackError } from "@/lib/analytics-utils";

const fetchResults = async (htno: string) => {
  try {
    const response = await fetch(`/api/results?htno=${htno}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    trackError("API Fetch Error", error.message);
    throw error;
  }
};
```

---

## ⏱️ Performance Tracking

### Page Load Time
**File**: Any page component

```tsx
import { trackPageLoadTime } from "@/lib/analytics-utils";

const ResultsPage = () => {
  useEffect(() => {
    const startTime = performance.now();

    // Simulate data loading
    fetchData().then(() => {
      const loadTime = performance.now() - startTime;
      trackPageLoadTime("Results Page", loadTime);
    });
  }, []);
};
```

### API Response Time
**File**: API utility functions

```tsx
import { trackUniversalEvent } from "@/lib/analytics-utils";

const fetchWithTiming = async (url: string) => {
  const startTime = performance.now();

  try {
    const response = await fetch(url);
    const data = await response.json();

    const responseTime = performance.now() - startTime;

    trackUniversalEvent("api_response_time", {
      category: "Performance",
      label: url,
      value: Math.round(responseTime),
    });

    return data;
  } catch (error) {
    trackError("API Error", error.message);
    throw error;
  }
};
```

---

## 📱 Share Actions

### Social Sharing
**File**: Any component with social share buttons

```tsx
import { trackShare } from "@/lib/analytics-utils";

const ShareButtons = ({ contentType, url }: ShareProps) => {
  const handleShare = (platform: string) => {
    trackShare(platform, contentType);

    // Open share dialog
    window.open(getShareUrl(platform, url), "_blank");
  };

  return (
    <div>
      <button onClick={() => handleShare("WhatsApp")}>Share on WhatsApp</button>
      <button onClick={() => handleShare("Facebook")}>Share on Facebook</button>
      <button onClick={() => handleShare("Twitter")}>Share on Twitter</button>
    </div>
  );
};
```

---

## 💡 Best Practices

### 1. Track User Journey
```tsx
// Login
trackUniversalEvent("user_login");

// Check results
trackResultCheck(rollNo, "consolidated");

// Subscribe to alerts
trackAlertSubscription("result_alerts");

// Download resources
trackResourceDownload("Syllabus", "R22 CSE");
```

### 2. Anonymize Personal Data
```tsx
// ✅ Good - Only track first 4 digits
trackResultCheck(rollNumber.substring(0, 4), "results");

// ❌ Bad - Full roll number
trackResultCheck(rollNumber, "results");
```

### 3. Track Errors Gracefully
```tsx
try {
  await submitForm(data);
  trackFormSubmission("contact_form");
} catch (error) {
  trackError("Form Submission", error.message);
  showErrorToUser();
}
```

### 4. Use Universal Events for Important Actions
```tsx
// Use trackUniversalEvent for conversions
trackUniversalEvent("subscription_complete", {
  category: "Conversions",
  label: "Premium Plan",
  value: 99,
});
```

---

## 📚 More Information

- **Full Guide**: [ANALYTICS_GUIDE.md](./ANALYTICS_GUIDE.md)
- **Quick Reference**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Configuration**: [src/config/analytics.ts](../../src/config/analytics.ts)
- **Utilities**: [src/lib/analytics-utils.ts](../../src/lib/analytics-utils.ts)
