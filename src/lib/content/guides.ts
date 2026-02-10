export interface Guide {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  content: string; // Storing as HTML string for simplicity in restricted env
  tags: string[];
}

export const guides: Guide[] = [
  {
    slug: 'jntuh-grading-system-explained',
    title: 'JNTUH Grading System Explained (R22/R18): Determining Your Grade',
    description: 'Understand the JNTUH grading system for R22 and R18 regulations. Learn what O, A+, A, B+, B, C, and F grades mean and how grade points are calculated.',
    publishedAt: '2024-02-15',
    tags: ['Grading System', 'R22', 'R18', 'JNTUH Rules'],
    content: `
      <h2>Understanding JNTUH Grades and Credits</h2>
      <p>Jawaharlal Nehru Technological University Hyderabad (JNTUH) follows the Choice Based Credit System (CBCS). Your performance in each subject is evaluated based on internal and external exams, converted into letter grades.</p>

      <h3>Grade Point Allocation (R22 & R18)</h3>
      <p>The following table shows how marks are converted to letter grades and grade points:</p>
      
      <div class="overflow-x-auto my-6">
        <table class="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800 text-left">
              <th class="border p-2">Marks Range (Out of 100)</th>
              <th class="border p-2">Letter Grade</th>
              <th class="border p-2">Level</th>
              <th class="border p-2">Grade Points</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="border p-2">90 - 100</td><td class="border p-2 font-bold text-green-600">O</td><td class="border p-2">Outstanding</td><td class="border p-2">10</td></tr>
            <tr><td class="border p-2">80 - 89</td><td class="border p-2 font-bold text-green-500">A+</td><td class="border p-2">Excellent</td><td class="border p-2">9</td></tr>
            <tr><td class="border p-2">70 - 79</td><td class="border p-2 font-bold text-blue-500">A</td><td class="border p-2">Very Good</td><td class="border p-2">8</td></tr>
            <tr><td class="border p-2">60 - 69</td><td class="border p-2 font-bold text-cyan-500">B+</td><td class="border p-2">Good</td><td class="border p-2">7</td></tr>
            <tr><td class="border p-2">50 - 59</td><td class="border p-2 font-bold text-yellow-500">B</td><td class="border p-2">Above Average</td><td class="border p-2">6</td></tr>
            <tr><td class="border p-2">40 - 49</td><td class="border p-2 font-bold text-orange-500">C</td><td class="border p-2">Average</td><td class="border p-2">5</td></tr>
            <tr><td class="border p-2">< 40</td><td class="border p-2 font-bold text-red-600">F</td><td class="border p-2">Fail</td><td class="border p-2">0</td></tr>
            <tr><td class="border p-2">-</td><td class="border p-2 font-bold text-gray-500">Ab</td><td class="border p-2">Absent</td><td class="border p-2">0</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Important Rules</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Passing Marks:</strong> You need to secure at least <strong>35% marks in the external exam</strong> and <strong>40% marks in total (Internal + External)</strong> to pass a subject.</li>
        <li><strong>Promotion:</strong> To be promoted to the next year (e.g., 1st to 2nd year), you must satisfy specific credit detention rules (usually 50% of total credits).</li>
      </ul>
    `
  },
  {
    slug: 'how-to-calculate-sgpa-to-cgpa-jntuh',
    title: 'How to Calculate SGPA to CGPA for JNTUH (Step-by-Step)',
    description: 'Confused about the difference between SGPA and CGPA? Follow this simple guide to calculate your Cumulative GPA from your semester results.',
    publishedAt: '2024-02-14',
    tags: ['Calculator Guide', 'SGPA', 'CGPA', 'Exam Tips'],
    content: `
      <h2>SGPA vs CGPA: What's the Difference?</h2>
      <p><strong>SGPA (Semester Grade Point Average)</strong> measures your performance in a single semester, while <strong>CGPA (Cumulative Grade Point Average)</strong> is the weighted average of all your SGPAs up to the current semester.</p>

      <h3>The Formula</h3>
      <p>The formula for calculating CGPA is:</p>
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-center">
        CGPA = Σ (C × GP) / Σ C
      </div>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>C</strong> = Credits for credit course</li>
        <li><strong>GP</strong> = Grade point obtained for limit course</li>
        <li><strong>Σ</strong> = Sum of all courses</li>
      </ul>

      <h3>Example Calculation</h3>
      <p>Suppose you have completed two semesters:</p>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Sem 1:</strong> 20 Credits, SGPA 8.0 → Total Points = 20 × 8.0 = 160</li>
        <li><strong>Sem 2:</strong> 22 Credits, SGPA 7.5 → Total Points = 22 × 7.5 = 165</li>
      </ul>
      <p><strong>Calculation:</strong></p>
      <p>Total Credits = 20 + 22 = 42</p>
      <p>Total Points = 160 + 165 = 325</p>
      <p><strong>CGPA = 325 / 42 = 7.73</strong></p>

      <h3>Use Our Calculator</h3>
      <p>Don't want to do the math manually? Use our free <a href="/cgpa-calculator" class="text-blue-600 hover:underline">JNTUH CGPA Calculator</a> to get your result instantly!</p>
    `
  },
  {
    slug: 'jntuh-grace-marks-rules-eligibility',
    title: 'JNTUH Grace Marks Rules 2024: Are You Eligible?',
    description: 'Failing a subject by a few marks? Check if you are eligible for JNTUH grace marks or credit exemption to get your degree.',
    publishedAt: '2024-02-13',
    tags: ['Grace Marks', 'Rules', 'Degree', 'Exemption'],
    content: `
      <h2>What are Grace Marks?</h2>
      <p>JNTUH allows students who are short of a few marks to pass one or two subjects to add "Grace Marks" to reach the passing threshold. This is a lifeline for many final-year students.</p>

      <h3>Eligibility Criteria</h3>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li>You must have completed the course duration (4 years for B.Tech).</li>
        <li>Grace marks are usually applicable only if adding them helps you <strong>pass the subject and obtain the degree</strong>.</li>
        <li>The maximum grace marks usually allowed are around <strong>0.15% of the total marks</strong> of your entire course (approx 8-10 marks total).</li>
      </ul>

      <h3>Credit Exemption (Leaving Subjects)</h3>
      <p>Alternatively, R18 and certain other regulations allow students to <strong>leave 1 or 2 subjects</strong> (exception rules apply) and still get their degree, provided they have secured the minimum required credits (e.g., 160 credits).</p>
      <p><em>Note: Rules change with every regulation (R16, R18, R22). Always verify with your college examination branch for the specific notification relevant to your batch.</em></p>
    `
  },
  {
    slug: 'how-to-calculate-cgpa-in-jntuh',
    title: 'How to Calculate CGPA in JNTUH: The Ultimate Student Guide (R22, R18, R16)',
    description: 'The most comprehensive guide on JNTUH CGPA calculation. Learn how to calculate SGPA and CGPA with official formulas, credit weightage, and regulation-wise examples.',
    publishedAt: '2025-01-20',
    tags: ['CGPA Calculation', 'JNTUH Guide', 'R22', 'R18', 'Academic Success'],
    content: `
      <h2>The Definitive JNTUH CGPA Calculation Handbook</h2>
      <p>Whether you are a first-year student trying to understand your first semester results or a final-year student aiming for a gold medal, understanding exactly how Jawaharlal Nehru Technological University Hyderabad (JNTUH) calculates your Cumulative Grade Point Average (CGPA) is critical for your career. In this exhaustive guide, we cover everything you need to know.</p>

      <h3>1. The Foundation: Understanding Credit-Based Systems</h3>
      <p>JNTUH follows the <strong>Choice Based Credit System (CBCS)</strong>. In this system, every subject is assigned a specific number of "Credits" based on the weekly workload (Lectures, Tutorials, or Practicals). Your performance is not measured just by marks, but by <strong>Grade Points</strong> earned per credit.</p>

      <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 my-8">
        <h4 class="font-bold mb-2">Why Credits Matter:</h4>
        <p>A 4-credit Math subject affects your CGPA twice as much as a 2-credit English subject. This is why scoring high in core engineering subjects is vital for a strong GPA.</p>
      </div>

      <h3>2. JNTUH Grading Scale (R22, R18, R16)</h3>
      <p>Marks are converted into Letter Grades and Grade Points (Gi) as follows:</p>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full border-collapse border border-gray-200 dark:border-gray-800">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="border p-3 text-left">Marks %</th>
              <th class="border p-3 text-left">Grade</th>
              <th class="border p-3 text-left">Points (Gi)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="border p-3">90 - 100</td><td class="border p-3 font-bold text-green-600">O (Outstanding)</td><td class="border p-3">10</td></tr>
            <tr><td class="border p-3">80 - 89</td><td class="border p-3 font-bold text-green-500">A+ (Excellent)</td><td class="border p-3">9</td></tr>
            <tr><td class="border p-3">70 - 79</td><td class="border p-3 font-bold text-blue-500">A (Very Good)</td><td class="border p-3">8</td></tr>
            <tr><td class="border p-3">60 - 69</td><td class="border p-3 font-bold text-cyan-500">B+ (Good)</td><td class="border p-3">7</td></tr>
            <tr><td class="border p-3">50 - 59</td><td class="border p-3 font-bold text-yellow-500">B (Above Average)</td><td class="border p-3">6</td></tr>
            <tr><td class="border p-3">40 - 49</td><td class="border p-3 font-bold text-orange-500">C (Average)</td><td class="border p-3">5</td></tr>
            <tr><td class="border p-3">< 40</td><td class="border p-3 font-bold text-red-600">F (Fail)</td><td class="border p-3">0</td></tr>
          </tbody>
        </table>
      </div>

      <h3>3. Step 1: Calculate SGPA (Semester Average)</h3>
      <p>SGPA represents your performance in a single semester. The formula is the sum of products of credits and grade points, divided by the total credits.</p>
      <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl font-mono text-center my-6">
        SGPA (Si) = Σ(Ci × Gi) / ΣCi
      </div>

      <h4>Example Calculation (B.Tech 1st Year, 1st Sem):</h4>
      <ul class="space-y-2 mb-6">
        <li><strong>Math-I (4 Credits):</strong> Grade A (8 points) → 4 × 8 = 32</li>
        <li><strong>Physics (4 Credits):</strong> Grade O (10 points) → 4 × 10 = 40</li>
        <li><strong>Programming (3 Credits):</strong> Grade B+ (7 points) → 3 × 7 = 21</li>
        <li><strong>English Lab (1 Credit):</strong> Grade O (10 points) → 1 × 10 = 10</li>
      </ul>
      <p><strong>Total Points:</strong> 32 + 40 + 21 + 10 = 103 <br> <strong>Total Credits:</strong> 4 + 4 + 3 + 1 = 12 <br> <strong>SGPA:</strong> 103 / 12 = <strong>8.58</strong></p>

      <h3>4. Step 2: Calculate CGPA (Cumulative Average)</h3>
      <p>CGPA is the weighted average of all your SGPAs. You cannot simply add all SGPAs and divide by the number of semesters because credit counts vary.</p>
      <div class="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 my-8">
        <p class="font-mono text-xl text-center">CGPA = Σ(Ci × Si) / ΣCi</p>
        <p class="text-xs mt-4 text-center">Where Si is the SGPA of the i-th semester and Ci is the total credits of that semester.</p>
      </div>

      <h3>5. Regulation Specifics (R22 vs R18)</h3>
      <p><strong>R22 Regulation (Latest):</strong> Introduced more practical-based credits and minor changes to internal assessment weightage. The passing marks remain 35% in external and 40% overall (Internal + External).</p>
      <p><strong>R18 Regulation:</strong> Follows a standard CBCS pattern with 160 total credits required for a degree. Detention rules are strictly based on securing a minimum percentage of credits at the end of each academic year.</p>

      <h3>Common Pitfalls to Avoid</h3>
      <ol class="list-decimal pl-5 space-y-4">
        <li><strong>The "Simple Average" Trap:</strong> Never average your SGPAs. Always use the credit-weighted method.</li>
        <li><strong>Ignoring Backlogs:</strong> An 'F' grade earns 0 points but the credits are still included in the average, which severely drops your CGPA. Clearing the backlog replaces the 'F' grade's contribution.</li>
        <li><strong>Credit Exemption:</strong> Remember that in some regulations like R18, you might be allowed to leave 2 subjects (exception rules apply). This can improve your final CGPA if those subjects were your lowest scores.</li>
      </ol>

      <div class="mt-8 p-8 bg-gray-50 dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700">
        <h4 class="text-2xl font-bold mb-4">Want to avoid the manual math?</h4>
        <p class="mb-6">Our automated calculator handles all these complex formulas for you. Just enter your grades and it does the rest!</p>
        <div class="flex flex-wrap gap-4">
          <a href="/cgpa-calculator" class="px-8 py-4 bg-[#1C61E7] text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-blue-500/20">Go to CGPA Calculator</a>
          <a href="/jntuh-cgpa-to-percentage-formula" class="px-8 py-4 bg-white dark:bg-gray-700 text-[#1C61E7] dark:text-gray-100 rounded-2xl font-bold border border-gray-200 dark:border-gray-600 hover:bg-gray-50 transition-all">Percentage Formula</a>
        </div>
      </div>
    `
  },
  {
    slug: 'jntuh-cgpa-to-percentage-formula',
    title: 'JNTUH CGPA to Percentage Formula: Official R22, R20, R18 Guide',
    description: 'Learn the official JNTUH formula to convert CGPA to percentage for R22, R18, and other regulations. Step-by-step calculation with examples.',
    publishedAt: '2025-02-06',
    tags: ['Official Formula', 'Academic Rules', 'R22', 'R18'],
    content: `
      <h2>How to Convert JNTUH CGPA to Percentage?</h2>
      <p>Converting your Cumulative Grade Point Average (CGPA) to a percentage is essential for job applications, higher education admissions, and competitive exams. JNTUH follows a standardized formula: <strong>Percentage = (CGPA - 0.5) × 10</strong>.</p>

      <h3>Step-by-Step Calculation</h3>
      <div class="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 my-8">
        <ol class="list-decimal pl-5 space-y-4">
          <li>Find your current CGPA from your memo or online portal.</li>
          <li>Subtract <strong>0.5</strong> from your CGPA score.</li>
          <li>Multiply the resulting value by <strong>10</strong>.</li>
        </ol>
      </div>

      <h3>Example Calculation</h3>
      <p>Suppose you have a CGPA of <strong>8.25</strong>:</p>
      <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl font-mono text-center my-6">
        Step 1: 8.25 - 0.5 = 7.75 <br>
        Step 2: 7.75 × 10 = 77.5% <br>
        <strong>Result: 77.5%</strong>
      </div>

      <h3>Regulation Wise Details</h3>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800 text-left">
              <th class="border p-2">Regulation</th>
              <th class="border p-2">Pass %</th>
              <th class="border p-2">Formula</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="border p-2">R22 / R20</td><td class="border p-2">40% Aggregate</td><td class="border p-2">(CGPA - 0.5) * 10</td></tr>
            <tr><td class="border p-2">R18 / R16</td><td class="border p-2">40% Aggregate</td><td class="border p-2">(CGPA - 0.5) * 10</td></tr>
            <tr><td class="border p-2">R15 / R13</td><td class="border p-2">40% Aggregate</td><td class="border p-2">(CGPA - 0.5) * 10</td></tr>
          </tbody>
        </table>
      </div>

      <p>Need an instant conversion? Use our <a href="/cgpa-percentage-converter" class="text-blue-600 hover:underline">JNTUH CGPA to Percentage Calculator</a> for accurate results.</p>
    `
  },
  {
    slug: 'marks-percentage-calculator-guide',
    title: 'How to calculate Marks Percentage? (Formula & Examples)',
    description: 'A simple guide to calculating your percentage from obtained marks. Useful for JNTUH students and general academic purposes.',
    publishedAt: '2025-02-05',
    tags: ['Calculator Guide', 'Academic Tips'],
    content: `
      <h2>The Standard Percentage Formula</h2>
      <p>Calculating your percentage is the most basic yet important academic skill. The formula is: <strong>Percentage = (Obtained Marks / Total Marks) × 100</strong>.</p>
      
      <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 my-6">
        <p class="font-mono text-center">Percentage = (Obtained / Total) * 100</p>
      </div>

      <h3>Example</h3>
      <p>If you scored 450 marks out of 600:</p>
      <p class="font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center"> (450 / 600) * 100 = 75% </p>
      
      <p>Try our <a href="/marks-percentage-calculator" class="text-blue-600 hover:underline">Interactive Marks Calculator</a> for instant results with grades!</p>
    `
  },
  {
    slug: 'percentage-to-cgpa-converter-jntuh',
    title: 'How to Convert Percentage to CGPA (JNTUH Official Method)',
    description: 'Need to convert your percentage back to CGPA for applications? Learn the reverse calculation used by JNTUH.',
    publishedAt: '2025-02-04',
    tags: ['Official Formula', 'CGPA', 'JNTUH Rules'],
    content: `
      <h2>Reverse Engineering the JNTUH Formula</h2>
      <p>While JNTUH primarily provides a CGPA to Percentage formula, many students need the reverse for certain forms. Since <strong>Percentage = (CGPA - 0.5) × 10</strong>, the reverse is:</p>
      
      <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 my-8">
        <p class="font-mono text-xl text-center uppercase">CGPA = (Percentage / 10) + 0.5</p>
      </div>

      <h3>Quick Conversion Table</h3>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full border-collapse border border-gray-200 dark:border-gray-800 text-sm">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr><th class="border p-2">Percentage</th><th class="border p-2">Equivalent CGPA</th></tr>
          </thead>
          <tbody>
            <tr><td class="border p-2">85%</td><td class="border p-2">9.0</td></tr>
            <tr><td class="border p-2">75%</td><td class="border p-2">8.0</td></tr>
            <tr><td class="border p-2">65%</td><td class="border p-2">7.0</td></tr>
          </tbody>
        </table>
      </div>

      <p>Use our <a href="/percentage-to-cgpa-calculator" class="text-blue-600 hover:underline">Percentage to CGPA Calculator</a> for precise values.</p>
    `
  }
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(article => article.slug === slug);
}

export function getAllGuides(): Guide[] {
  return [...guides].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
