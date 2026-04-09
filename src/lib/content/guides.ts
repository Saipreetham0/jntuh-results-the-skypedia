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
    title: 'JNTUH Grading System Explained (R22/R18): Marks vs Grade Points',
    description: 'Complete guide to JNTUH R22 & R18 grading system. Convert marks to grade points, understand O to F grades, and check promotion rules for B.Tech students.',
    publishedAt: '2024-02-15',
    tags: ['Grading System', 'R22', 'R18', 'Promotion Rules'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">Jawaharlal Nehru Technological University Hyderabad (JNTUH) uses a <strong>Choice Based Credit System (CBCS)</strong> via a 10-point grading scale. Your final percentage and class depend entirely on these grade points, not just raw marks.</p>
      </div>

      <h2>Official Grading Table (R22 & R18)</h2>
      <p>Used for all B.Tech, B.Pharmacy, and M.Tech courses. Save this for reference.</p>
      
      <div class="not-prose overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md my-8">
        <table class="w-full text-sm text-center">
            <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
                <tr>
                    <th class="px-4 py-3 border-b dark:border-slate-800">Marks Range</th>
                    <th class="px-4 py-3 border-b dark:border-slate-800">Grade Point</th>
                    <th class="px-4 py-3 border-b dark:border-slate-800">Letter Grade</th>
                    <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Performance</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                <tr class="hover:bg-green-50 dark:hover:bg-green-900/10"><td class="py-3 font-mono">≥ 90</td><td class="font-bold text-lg">10</td><td class="font-bold text-green-600">O</td><td class="text-left text-slate-600 dark:text-slate-400">Outstanding</td></tr>
                <tr class="hover:bg-green-50 dark:hover:bg-green-900/10"><td class="py-3 font-mono">80 - 89</td><td class="font-bold text-lg">9</td><td class="font-bold text-green-500">A+</td><td class="text-left text-slate-600 dark:text-slate-400">Excellent</td></tr>
                <tr class="hover:bg-blue-50 dark:hover:bg-blue-900/10"><td class="py-3 font-mono">70 - 79</td><td class="font-bold text-lg">8</td><td class="font-bold text-blue-500">A</td><td class="text-left text-slate-600 dark:text-slate-400">Very Good</td></tr>
                <tr class="hover:bg-blue-50 dark:hover:bg-blue-900/10"><td class="py-3 font-mono">60 - 69</td><td class="font-bold text-lg">7</td><td class="font-bold text-cyan-500">B+</td><td class="text-left text-slate-600 dark:text-slate-400">Good</td></tr>
                <tr class="hover:bg-yellow-50 dark:hover:bg-yellow-900/10"><td class="py-3 font-mono">50 - 59</td><td class="font-bold text-lg">6</td><td class="font-bold text-yellow-500">B</td><td class="text-left text-slate-600 dark:text-slate-400">Average</td></tr>
                <tr class="hover:bg-orange-50 dark:hover:bg-orange-900/10"><td class="py-3 font-mono">40 - 49</td><td class="font-bold text-lg">5</td><td class="font-bold text-orange-500">C</td><td class="text-left text-slate-600 dark:text-slate-400">Pass</td></tr>
                <tr class="hover:bg-red-50 dark:hover:bg-red-900/10"><td class="py-3 font-mono">< 40</td><td class="font-bold text-lg">0</td><td class="font-bold text-red-600">F</td><td class="text-left text-slate-600 dark:text-slate-400">Fail</td></tr>
                <tr class="bg-gray-50 dark:bg-gray-900/50"><td class="py-3 font-mono">-</td><td class="font-bold text-lg">0</td><td class="font-bold text-gray-500">Ab</td><td class="text-left text-slate-600 dark:text-slate-400">Absent</td></tr>
            </tbody>
        </table>
      </div>

      <h3>Promotion Rules (Detention System)</h3>
      <p>Standard JNTUH promotion rules for B.Tech students:</p>
      <div class="grid md:grid-cols-2 gap-4 not-prose my-6">
        <div class="p-5 border border-l-4 border-slate-200 border-l-blue-500 rounded-xl bg-white dark:bg-slate-800/50">
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">1st Year → 2nd Year</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Must secure at least <strong>50% of total credits</strong> (approx 20 credits) of 1st year.</p>
        </div>
        <div class="p-5 border border-l-4 border-slate-200 border-l-purple-500 rounded-xl bg-white dark:bg-slate-800/50">
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">2nd Year → 3rd Year</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">Must secure at least <strong>60% of total credits</strong> up to 2nd year 1st sem (varies by regulation).</p>
        </div>
      </div>
    `
  },
  {
    slug: 'how-to-calculate-sgpa-to-cgpa-jntuh',
    title: 'How to Calculate SGPA to CGPA for JNTUH (Calculator & Steps)',
    description: 'Confusion between SGPA and CGPA? Learn the weighted average formula used by JNTUH to calculate your Cumulative GPA from semester results.',
    publishedAt: '2024-02-14',
    tags: ['Calculator Guide', 'SGPA', 'CGPA', 'Exam Tips'],
    content: `
      <h2>SGPA vs CGPA: The Core Difference</h2>
      <p><strong>SGPA (Semester Grade Point Average)</strong> is your score for a <em>single semester</em>. <br><strong>CGPA (Cumulative Grade Point Average)</strong> is the weighted average of <em>all semesters</em> completed so far.</p>

      <div class="my-8 p-6 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-xl">
        <h3 class="text-lg font-bold text-blue-800 dark:text-blue-200 m-0">The Golden Rule</h3>
        <p class="mb-0 mt-2 text-blue-700 dark:text-blue-300">You generally CANNOT calculate CGPA by just taking the average of SGPAs (e.g., (8.0 + 9.0)/2). You must consider the <strong>credits</strong> of each semester.</p>
      </div>

      <h3>The Accurate Formula</h3>
      <div class="bg-slate-900 text-white p-6 rounded-2xl font-mono text-center my-6 shadow-lg">
        CGPA = Σ (Credits × SGPA) / Total Credits
      </div>

      <h3>Real Calculation Example</h3>
      <p>Let's calculate CGPA for a student after 2 semesters:</p>
      
      <div class="not-prose grid gap-4 md:grid-cols-2 my-6">
        <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 class="font-bold text-sm uppercase tracking-wider text-slate-500 mb-2">Semester 1</h4>
            <div class="flex justify-between mb-2"><span class="text-slate-600 dark:text-slate-400">Credits (C1)</span><span class="font-bold">21</span></div>
            <div class="flex justify-between"><span class="text-slate-600 dark:text-slate-400">SGPA (S1)</span><span class="font-bold text-blue-600">7.5</span></div>
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-right text-slate-400">Points: 21 × 7.5 = 157.5</div>
        </div>
        <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 class="font-bold text-sm uppercase tracking-wider text-slate-500 mb-2">Semester 2</h4>
            <div class="flex justify-between mb-2"><span class="text-slate-600 dark:text-slate-400">Credits (C2)</span><span class="font-bold">21</span></div>
            <div class="flex justify-between"><span class="text-slate-600 dark:text-slate-400">SGPA (S2)</span><span class="font-bold text-blue-600">8.2</span></div>
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-right text-slate-400">Points: 21 × 8.2 = 172.2</div>
        </div>
      </div>

      <div class="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 my-6">
        <h4 class="font-bold text-emerald-800 dark:text-emerald-200 mb-2">Final Calculation:</h4>
        <ul class="space-y-2 font-mono text-sm text-emerald-900 dark:text-emerald-100">
            <li>Total Points = 157.5 + 172.2 = <strong>329.7</strong></li>
            <li>Total Credits = 21 + 21 = <strong>42</strong></li>
            <li class="pt-2 font-bold text-lg">CGPA = 329.7 / 42 = 7.85</li>
        </ul>
      </div>

      <p class="text-center mt-8">
        <a href="/sgpa-to-cgpa-calculator" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30">
            Try SGPA to CGPA Calculator
        </a>
      </p>
    `
  },
  {
    slug: 'jntuh-grace-marks-rules-eligibility',
    title: 'JNTUH Grace Marks Rules 2024: Eligibility & Exemption Guide',
    description: 'Failing? You might be eligible for Grace Marks or Credit Exemption (Subject Leaving) to get your JNTUH degree. Check the official rules for R22 & R18.',
    publishedAt: '2024-02-13',
    tags: ['Grace Marks', 'Rules', 'Degree', 'Exemption'],
    content: `
      <h2>What are Grace Marks?</h2>
      <p>JNTUH provides a provision for students who have failed in one or two subjects by a small margin to add "Grace Marks" to reach the pass marks. This is critical for final-year students wishing to obtain their Provisional Certificate (PC) without waiting for supplementary exams.</p>

      <h3>Eligibility Checklist (R18 & R22)</h3>
      <div class="not-prose grid gap-4 my-6">
        <div class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div class="mt-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs">✓</div>
            <div>
                <h4 class="font-bold text-slate-900 dark:text-white">Course Completion</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400">You must have completed the full 4 years (B.Tech) or regular course duration.</p>
            </div>
        </div>
        <div class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div class="mt-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs">✓</div>
            <div>
                <h4 class="font-bold text-slate-900 dark:text-white">Degree-Saving Requirement</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400">Grace marks are ONLY added if, by adding them, you pass the subject and become eligible for the degree immediately.</p>
            </div>
        </div>
        <div class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div class="mt-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs">✓</div>
            <div>
                <h4 class="font-bold text-slate-900 dark:text-white">Maximum Marks Limit</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400">Typically approx <strong>8-10 marks</strong> total (0.15% of total aggregate marks). This changes with every regulation.</p>
            </div>
        </div>
      </div>

      <h3>Credit Exemption (Subject Leaving)</h3>
      <p class="mb-4">Apart from grace marks, JNTUH allows students in certain regulations (like R18) to leave specific subjects and still graduate.</p>
      
      <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
        <table class="w-full text-sm text-left">
            <thead class="bg-slate-100 dark:bg-slate-900 font-bold uppercase text-slate-600 dark:text-slate-400">
                <tr><th class="p-4">Regulation</th><th class="p-4">Exemption Rule</th></tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr class="bg-white dark:bg-slate-950"><td class="p-4 font-bold">R18</td><td class="p-4">Can leave up to <strong>2 subjects</strong> if Total Credits ≥ 160.</td></tr>
                <tr class="bg-white dark:bg-slate-950"><td class="p-4 font-bold">R22</td><td class="p-4 text-red-500 font-semibold">No exemption (As per current rules). All subjects mandatory.</td></tr>
                 <tr class="bg-white dark:bg-slate-950"><td class="p-4 font-bold">R16</td><td class="p-4">Can leave 2 subjects.</td></tr>
            </tbody>
        </table>
      </div>

      <div class="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg text-sm text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800">
        <strong>Note:</strong> You generally cannot use both "Grace Marks" and "Credit Exemption" together. You must choose the one that benefits you the most.
      </div>
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
      <p>Understanding exactly how Jawaharlal Nehru Technological University Hyderabad (JNTUH) calculates your Cumulative Grade Point Average (CGPA) is critical for your career. Whether you're aiming for distinction or just passing, this guide breaks down the math.</p>

      <h3>1. The Foundation: Credits & Grade Points</h3>
      <p>JNTUH follows the <strong>Choice Based Credit System (CBCS)</strong>. Every subject has "Credits" (C) based on weekly hours. Your performance is measured in <strong>Grade Points</strong> (G) on a 10-point scale.</p>

      <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 my-8">
        <h4 class="font-bold mb-2 text-blue-800 dark:text-blue-200">Why Credits Matter:</h4>
        <p class="text-blue-700 dark:text-blue-300">A 4-credit Math subject affects your CGPA <strong>twice as much</strong> as a 2-credit Lab. Prioritize high-credit subjects for a better score.</p>
      </div>

      <h3>2. How to Calculate SGPA (Semester Average)</h3>
      <p>SGPA is for a single semester. The formula is:</p>
      <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl font-mono text-center my-6 shadow-inner">
        SGPA (Si) = Σ(Ci × Gi) / ΣCi
      </div>
      <p class="text-sm text-center text-gray-500">Sum of (Credits × Grade Points) divided by Total Credits.</p>

      <h4>Example Calculation:</h4>
      <div class="not-prose overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
        <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 dark:bg-gray-900 font-bold uppercase text-gray-600 dark:text-gray-400">
                <tr><th class="p-3">Subject</th><th class="p-3">Credits (C)</th><th class="p-3">Grade (G)</th><th class="p-3 text-right">Points (CxG)</th></tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <tr class="bg-white dark:bg-gray-950"><td class="p-3">Maths-I</td><td class="p-3">4</td><td class="p-3">8 (A)</td><td class="p-3 text-right font-mono">32</td></tr>
                <tr class="bg-white dark:bg-gray-950"><td class="p-3">Physics</td><td class="p-3">4</td><td class="p-3">9 (A+)</td><td class="p-3 text-right font-mono">36</td></tr>
                <tr class="bg-white dark:bg-gray-950"><td class="p-3">English</td><td class="p-3">2</td><td class="p-3">10 (O)</td><td class="p-3 text-right font-mono">20</td></tr>
                <tr class="bg-gray-50 dark:bg-gray-900/50 font-bold"><td class="p-3">TOTAL</td><td class="p-3">10</td><td class="p-3">-</td><td class="p-3 text-right font-mono text-blue-600">88</td></tr>
            </tbody>
        </table>
      </div>
      <p class="text-center font-bold text-xl">SGPA = 88 / 10 = <span class="text-blue-600">8.80</span></p>

      <h3>3. How to Calculate CGPA (Cumulative Average)</h3>
      <p>CGPA is the weighted average of all your SGPAs. <strong>Do not just average your SGPAs!</strong></p>
      
      <div class="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 my-8">
        <p class="font-mono text-xl text-center text-emerald-800 dark:text-emerald-200">CGPA = Σ(Ci × Si) / ΣCi</p>
        <p class="text-xs mt-4 text-center text-emerald-600 dark:text-emerald-400">Where Si is SGPA of semester i, and Ci is total credits of semester i.</p>
      </div>

      <h3>Common Mistakes</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Failing a Subject:</strong> An 'F' grade counts as 0 points, drastically lowering your average. Clearing the backlog replaces the 0 with passing grade points.</li>
        <li><strong>Ignoring Backlogs:</strong> Until a backlog is cleared, it technically pulls your CGPA down to failure levels in strict calculations, though for provisional results it's often shown as asterisked.</li>
      </ul>
    `
  },
  {
    slug: 'jntuh-cgpa-to-percentage-formula',
    title: 'JNTUH CGPA to Percentage Formula (R22, R18, R16) - Official Conversion Guide 2026',
    description: 'Official JNTUH CGPA to percentage conversion formula: (CGPA-0.5)×10. Includes quick answers for 6.76, 7.5, 8.0, 9.0 CGPA, a full conversion table, and why CGPA×9.5 is wrong for JNTUH.',
    publishedAt: '2026-04-09',
    tags: ['CGPA Calculator', 'JNTUH R22', 'JNTUH R18', 'Percentage Formula', 'B.Tech Results'],
    content: `
      <div class="not-prose mb-12">
        <div class="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
            <div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div class="relative p-8 md:p-12 text-center">
                <h2 class="text-2xl font-bold text-blue-200 mb-2 tracking-wider uppercase text-sm">Official JNTUH Formula</h2>
                <div class="inline-block relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-30"></div>
                    <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
                        <p class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                            (CGPA - 0.5) × 10
                        </p>
                    </div>
                </div>
                <p class="mt-6 text-slate-400 max-w-lg mx-auto">Applicable for all R22, R18, R16, R15, and R13 Regulations.</p>
                <div class="mt-8 flex justify-center gap-4">
                  <a href="/percentage-to-cgpa-calculator" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25">Use Calculator</a>
                </div>
            </div>
        </div>
      </div>

      <h2>How to Convert CGPA to Percentage?</h2>
      <p>Many students are confused between the <strong>9.5 multiplier</strong> (used by CBSE) and the <strong>(CGPA-0.5)*10</strong> formula. For JNTUH (Jawaharlal Nehru Technological University Hyderabad), the <strong>only official method</strong> is the deduction method.</p>
      
      <div class="my-8 p-6 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 rounded-r-xl">
        <h3 class="text-lg font-bold text-yellow-800 dark:text-yellow-200 m-0">⚠️ Important Warning</h3>
        <p class="mb-0 mt-2 text-yellow-700 dark:text-yellow-300">Do NOT use <strong>CGPA × 9.5</strong>. This will give you a lower percentage than your actual score! JNTUH's deduction method yields a higher percentage.</p>
      </div>

      <h3>Step-by-Step Calculation</h3>
      <div class="grid gap-6 md:grid-cols-3 my-10 not-prose">
        <div class="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden group">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-xl mb-4">1</span>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Get CGPA</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Find your final CGPA on your Consolidated Marks Memo (CMM) or Provisional Certificate (PC).</p>
        </div>
        <div class="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden group">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 font-bold text-xl mb-4">2</span>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Subtract 0.5</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Subtract 0.5 from your CGPA. <br><code class="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">Example: 8.5 - 0.5 = 8.0</code></p>
        </div>
        <div class="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden group">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-4">3</span>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Multiply by 10</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Multiply the result by 10. <br><code class="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">Example: 8.0 × 10 = 80%</code></p>
        </div>
      </div>

      <h3>Quick Conversion Table (Reference)</h3>
      <p>Use this table to quickly check your percentage without any calculation.</p>
      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-8">
        <table class="w-full text-sm text-center">
            <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
                <tr>
                    <th class="px-4 py-3 border-b dark:border-slate-800">CGPA</th>
                    <th class="px-4 py-3 border-b dark:border-slate-800 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">Percentage %</th>
                    <th class="px-4 py-3 border-b dark:border-slate-800">Class Awarded</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">10.0</td><td class="font-bold text-blue-600">95.0%</td><td>First Class with Dist.</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">9.5</td><td class="font-bold text-blue-600">90.0%</td><td>First Class with Dist.</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">9.0</td><td class="font-bold text-blue-600">85.0%</td><td>First Class with Dist.</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">8.5</td><td class="font-bold text-blue-600">80.0%</td><td>First Class with Dist.</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">8.0</td><td class="font-bold text-blue-600">75.0%</td><td>First Class with Dist.</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">7.5</td><td class="font-bold text-blue-600">70.0%</td><td>First Class with Dist.</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">7.0</td><td class="font-bold text-blue-600">65.0%</td><td>First Class</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">6.5</td><td class="font-bold text-blue-600">60.0%</td><td>First Class</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">6.0</td><td class="font-bold text-blue-600">55.0%</td><td>First Class</td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">5.5</td><td class="font-bold text-blue-600">50.0%</td><td>Second Class</td></tr>
                 <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-3">5.0</td><td class="font-bold text-blue-600">45.0%</td><td>Second Class</td></tr>
            </tbody>
        </table>
      </div>

      <h3>Frequently Asked Questions (FAQs)</h3>
      <div class="space-y-4 not-prose">
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
            <details class="p-6">
                <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
                    <span>Why do we subtract 0.5 from CGPA?</span>
                    <span class="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    The 0.5 subtraction is a scaling factor determined by JNTUH's academic council to align their grading system with percentage standards. It accounts for the variance between absolute marks and relative grading. Without this subtraction, the percentage would be artificially inflated.
                </p>
            </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
            <details class="p-6">
                <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
                    <span>What is the passing percentage in JNTUH?</span>
                    <span class="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                   For B.Tech courses (R18/R22), a student must secure at least <strong>35% marks in the external examination</strong> and <strong>40% marks in total (Internal + External)</strong> to pass a subject.
                </p>
            </details>
        </div>
         <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
            <details class="p-6">
                <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
                    <span>Does this formula apply to R19/R20 MBA/M.Tech?</span>
                    <span class="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                   Yes, as per recent circulars, the formula <code>(CGPA - 0.5) × 10</code> is standard across most JNTUH post-graduate courses as well, unless specified otherwise in a specific course's academic regulations.
                </p>
            </details>
        </div>
      </div>
    `
  },
  {
    slug: 'marks-percentage-calculator-guide',
    title: 'How to Calculate Marks Percentage for Exams? (Simple Formula)',
    description: 'Determine your exam percentage easily. Simple formula: (Marks Obtained / Total Marks) * 100. Examples for 600, 750, and 1000 marks.',
    publishedAt: '2025-02-05',
    tags: ['Calculator Guide', 'Academic Tips', 'Percentage Formula'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">Calculating your percentage from exam marks is a fundamental skill for every student. Whether it's for 10th class, Intermediate, or individual semester subjects, the logic remains the same.</p>
      </div>

      <h2>The Golden Formula</h2>
      <div class="bg-slate-900 text-white p-8 rounded-3xl font-mono text-center my-8 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
        <div class="relative z-10">
            <span class="text-lg text-slate-400 mb-2 block">Percentage % =</span>
            <span class="text-2xl md:text-4xl font-bold">(Obtained Marks ÷ Total Marks) × 100</span>
        </div>
      </div>

      <h3>Example Calculations</h3>
      
      <div class="not-prose grid gap-6 md:grid-cols-2 my-8">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md">
            <h4 class="font-bold text-lg mb-4 text-slate-900 dark:text-white">Scenario A: 600 Marks</h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li class="flex justify-between"><span>Secured:</span> <strong>450</strong></li>
                <li class="flex justify-between"><span>Total:</span> <strong>600</strong></li>
                <li class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 font-mono text-center bg-slate-50 dark:bg-slate-900/50 py-2 rounded">
                    (450 ÷ 600) × 100 = <span class="text-blue-600 font-bold">75%</span>
                </li>
            </ul>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md">
            <h4 class="font-bold text-lg mb-4 text-slate-900 dark:text-white">Scenario B: 1000 Marks</h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li class="flex justify-between"><span>Secured:</span> <strong>825</strong></li>
                <li class="flex justify-between"><span>Total:</span> <strong>1000</strong></li>
                <li class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 font-mono text-center bg-slate-50 dark:bg-slate-900/50 py-2 rounded">
                    (825 ÷ 1000) × 100 = <span class="text-blue-600 font-bold">82.5%</span>
                </li>
            </ul>
        </div>
      </div>

      <h3>Why is this important?</h3>
      <p>While JNTUH uses CGPA, many job applications (especially government jobs) and higher education portals allow you to enter raw percentage. Knowing how to derive this from your total marks (internal + external) is crucial.</p>
    `
  },
  {
    slug: 'percentage-to-cgpa-converter-jntuh',
    title: 'How to Convert Percentage to CGPA (Reverse Calculation)',
    description: 'Need to convert your percentage back to CGPA for applications? Learn the reverse calculation used by JNTUH.',
    publishedAt: '2025-02-04',
    tags: ['Official Formula', 'CGPA', 'JNTUH Rules', 'Reverse Calculation'],
    content: `
      <h2>Can you convert Percentage back to CGPA?</h2>
      <p>Technically, JNTUH results are generated in CGPA first. Converting back is an approximation, but it's often needed for filling out older application forms that ask for "CGPA" when you only have a percentage figure handy.</p>

      <h3>The Reverse Formula</h3>
      <p>Since the official formula is <code>% = (CGPA - 0.5) * 10</code>, we can reverse it algebraically:</p>

      <div class="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 my-6 font-mono text-center">
        CGPA = (Percentage / 10) + 0.5
      </div>

      <h3>Example</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Student Percentage:</strong> 75%</li>
        <li><strong>Step 1:</strong> 75 / 10 = 7.5</li>
        <li><strong>Step 2:</strong> 7.5 + 0.5 = <strong>8.0 CGPA</strong></li>
      </ul>

      <h3>Quick Lookup Table</h3>
      <div class="not-prose overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 my-6">
        <table class="w-full text-sm text-center">
            <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold uppercase">
                <tr><th class="px-4 py-3">Percentage</th><th class="px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-bold">CGPA</th></tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                <tr class="hover:bg-slate-50"><td class="py-2">60%</td><td class="font-bold">6.5</td></tr>
                <tr class="hover:bg-slate-50"><td class="py-2">65%</td><td class="font-bold">7.0</td></tr>
                <tr class="hover:bg-slate-50"><td class="py-2">70%</td><td class="font-bold">7.5</td></tr>
                <tr class="hover:bg-slate-50"><td class="py-2">75%</td><td class="font-bold">8.0</td></tr>
                <tr class="hover:bg-slate-50"><td class="py-2">80%</td><td class="font-bold">8.5</td></tr>
                <tr class="hover:bg-slate-50"><td class="py-2">85%</td><td class="font-bold">9.0</td></tr>
            </tbody>
        </table>
      </div>

      <div class="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg text-sm text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer:</strong> This calculated CGPA is an approximation. Your actual CGPA on the memo is calculated based on credit weightage, not just direct percentage conversion. Use this only for estimation.
      </div>
    `
  },
  {
    slug: 'cgpa-to-percentage-jntuh-common-values',
    title: '6.76 CGPA to Percentage in JNTUH - Full Conversion Table (All Values)',
    description: 'What is 6.76 CGPA in percentage for JNTUH? Use our complete conversion table covering 5.0 to 10.0 CGPA. Official formula: (CGPA - 0.5) × 10. Includes 6.13, 6.76, 7.5, 8.0, 9.0 and all common values.',
    publishedAt: '2026-04-09',
    tags: ['CGPA to Percentage', 'JNTUH Formula', 'Conversion Table', '6.76 CGPA', 'R22', 'R18'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">Every year, thousands of JNTUH students search "what is 6.76 CGPA in percentage?" or "6.13 CGPA in percentage JNTUH". This page has every answer — from 5.0 to 10.0 CGPA — calculated using the official JNTUH formula.</p>
      </div>

      <h2>Official JNTUH CGPA to Percentage Formula</h2>
      <p>JNTUH uses the following formula for all regulations (R22, R20, R18, R16, R15, R13):</p>

      <div class="bg-slate-900 text-white p-8 rounded-3xl font-mono text-center my-8 shadow-2xl">
        <span class="text-slate-400 block mb-2 text-sm">JNTUH Official Formula</span>
        <span class="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">(CGPA − 0.5) × 10</span>
      </div>

      <div class="my-6 p-5 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-xl">
        <p class="font-bold text-blue-800 dark:text-blue-200 m-0">Quick Answers</p>
        <ul class="mt-3 space-y-1 text-blue-700 dark:text-blue-300 text-sm mb-0">
          <li><strong>6.76 CGPA to Percentage:</strong> (6.76 − 0.5) × 10 = <strong>62.6%</strong></li>
          <li><strong>6.13 CGPA to Percentage:</strong> (6.13 − 0.5) × 10 = <strong>56.3%</strong></li>
          <li><strong>7.5 CGPA to Percentage:</strong> (7.5 − 0.5) × 10 = <strong>70.0%</strong></li>
          <li><strong>8.0 CGPA to Percentage:</strong> (8.0 − 0.5) × 10 = <strong>75.0%</strong></li>
          <li><strong>9.0 CGPA to Percentage:</strong> (9.0 − 0.5) × 10 = <strong>85.0%</strong></li>
        </ul>
      </div>

      <h2>Complete CGPA to Percentage Conversion Table (JNTUH)</h2>
      <p>Find your CGPA in the table below. All values are calculated using the official JNTUH formula.</p>

      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md my-8">
        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800">CGPA</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">Percentage %</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Class</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">10.0</td><td class="font-bold text-green-600">95.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">9.5</td><td class="font-bold text-green-600">90.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">9.0</td><td class="font-bold text-green-600">85.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.9</td><td class="font-bold text-green-600">84.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.8</td><td class="font-bold text-green-600">83.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.7</td><td class="font-bold text-green-600">82.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.6</td><td class="font-bold text-green-600">81.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.5</td><td class="font-bold text-green-500">80.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.4</td><td class="font-bold text-green-500">79.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.3</td><td class="font-bold text-green-500">78.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.2</td><td class="font-bold text-green-500">77.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.1</td><td class="font-bold text-green-500">76.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">8.0</td><td class="font-bold text-blue-600">75.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.9</td><td class="font-bold text-blue-600">74.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.8</td><td class="font-bold text-blue-600">73.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.7</td><td class="font-bold text-blue-600">72.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.6</td><td class="font-bold text-blue-600">71.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.5</td><td class="font-bold text-blue-600">70.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.4</td><td class="font-bold text-blue-500">69.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.3</td><td class="font-bold text-blue-500">68.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.2</td><td class="font-bold text-blue-500">67.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.1</td><td class="font-bold text-blue-500">66.0%</td><td class="text-slate-500 text-xs">First Class with Distinction</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">7.0</td><td class="font-bold text-blue-500">65.0%</td><td class="text-slate-500 text-xs">First Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.9</td><td class="font-bold text-cyan-600">64.0%</td><td class="text-slate-500 text-xs">First Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.8</td><td class="font-bold text-cyan-600">63.0%</td><td class="text-slate-500 text-xs">First Class</td></tr>
            <tr class="bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20"><td class="py-2.5 font-bold text-blue-700 dark:text-blue-300">6.76</td><td class="font-bold text-cyan-600">62.6%</td><td class="text-slate-500 text-xs">First Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.7</td><td class="font-bold text-cyan-600">62.0%</td><td class="text-slate-500 text-xs">First Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.6</td><td class="font-bold text-cyan-600">61.0%</td><td class="text-slate-500 text-xs">First Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.5</td><td class="font-bold text-cyan-600">60.0%</td><td class="text-slate-500 text-xs">First Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.4</td><td class="font-bold text-yellow-600">59.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.3</td><td class="font-bold text-yellow-600">58.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.2</td><td class="font-bold text-yellow-600">57.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20"><td class="py-2.5 font-bold text-blue-700 dark:text-blue-300">6.13</td><td class="font-bold text-yellow-600">56.3%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.1</td><td class="font-bold text-yellow-600">56.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">6.0</td><td class="font-bold text-yellow-600">55.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.9</td><td class="font-bold text-orange-600">54.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.8</td><td class="font-bold text-orange-600">53.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.7</td><td class="font-bold text-orange-600">52.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.6</td><td class="font-bold text-orange-600">51.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.5</td><td class="font-bold text-orange-600">50.0%</td><td class="text-slate-500 text-xs">Second Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.4</td><td class="font-bold text-red-500">49.0%</td><td class="text-slate-500 text-xs">Pass Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.3</td><td class="font-bold text-red-500">48.0%</td><td class="text-slate-500 text-xs">Pass Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.2</td><td class="font-bold text-red-500">47.0%</td><td class="text-slate-500 text-xs">Pass Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.1</td><td class="font-bold text-red-500">46.0%</td><td class="text-slate-500 text-xs">Pass Class</td></tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="py-2.5 font-semibold">5.0</td><td class="font-bold text-red-500">45.0%</td><td class="text-slate-500 text-xs">Pass Class</td></tr>
          </tbody>
        </table>
      </div>

      <p class="text-sm text-slate-500 dark:text-slate-400 -mt-4">Highlighted rows (6.76 and 6.13) are the most commonly searched CGPA values among JNTUH students.</p>

      <h2>Which Class Do You Get?</h2>
      <p>JNTUH awards classes based on your final percentage (derived from CGPA):</p>

      <div class="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-8">
        <div class="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-5 rounded-2xl text-center">
          <p class="text-2xl font-black text-green-600 mb-1">≥ 75%</p>
          <p class="font-bold text-green-800 dark:text-green-200 text-sm">First Class with Distinction</p>
          <p class="text-xs text-green-600 dark:text-green-400 mt-1">CGPA ≥ 8.0</p>
        </div>
        <div class="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-5 rounded-2xl text-center">
          <p class="text-2xl font-black text-blue-600 mb-1">60–74%</p>
          <p class="font-bold text-blue-800 dark:text-blue-200 text-sm">First Class</p>
          <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">CGPA 6.5–7.9</p>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-5 rounded-2xl text-center">
          <p class="text-2xl font-black text-yellow-600 mb-1">50–59%</p>
          <p class="font-bold text-yellow-800 dark:text-yellow-200 text-sm">Second Class</p>
          <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">CGPA 5.5–6.4</p>
        </div>
        <div class="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 p-5 rounded-2xl text-center">
          <p class="text-2xl font-black text-orange-600 mb-1">40–49%</p>
          <p class="font-bold text-orange-800 dark:text-orange-200 text-sm">Pass Class</p>
          <p class="text-xs text-orange-600 dark:text-orange-400 mt-1">CGPA 4.5–5.4</p>
        </div>
      </div>

      <h2>Frequently Asked Questions</h2>
      <div class="space-y-4 not-prose">
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>What is 6.76 CGPA in percentage for JNTUH?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              6.76 CGPA equals <strong>62.6%</strong> in JNTUH. Formula: (6.76 − 0.5) × 10 = 6.26 × 10 = 62.6%. This falls under First Class (60–74%).
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>What is 6.13 CGPA in percentage for JNTUH?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              6.13 CGPA equals <strong>56.3%</strong> in JNTUH. Formula: (6.13 − 0.5) × 10 = 5.63 × 10 = 56.3%. This falls under Second Class (50–59%).
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Does JNTUH use CGPA × 10 or (CGPA − 0.5) × 10?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              JNTUH officially uses <strong>(CGPA − 0.5) × 10</strong>. The simpler "CGPA × 10" formula is used by some other universities but NOT by JNTUH. Using the wrong formula would give you 5% higher than your actual percentage. Always use the deduction method for JNTUH certificates and applications.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>My CGPA is not in the table — how do I calculate?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Use the formula directly: subtract 0.5 from your CGPA, then multiply by 10. For example, if your CGPA is 7.34: (7.34 − 0.5) × 10 = 6.84 × 10 = <strong>68.4%</strong>. Or use our free <a href="/cgpa-percentage-converter" class="text-blue-600 hover:underline">CGPA to Percentage Calculator</a>.
            </p>
          </details>
        </div>
      </div>
    `
  },
  {
    slug: 'jntuh-cgpa-percentage-conversion-certificate',
    title: 'JNTUH CGPA to Percentage Conversion Certificate - How to Get It (2026)',
    description: 'Need a JNTUH CGPA to percentage conversion certificate for jobs or higher studies? Learn what it is, when you need it, the official formula, and how to get it from the university or write it yourself.',
    publishedAt: '2026-04-09',
    tags: ['Conversion Certificate', 'CGPA to Percentage', 'JNTUH Documents', 'Campus Placements'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">Many companies and universities ask JNTUH graduates for a <strong>CGPA to Percentage Conversion Certificate</strong> during placements, job applications, or PG admissions. This page explains exactly what it is, when you need it, and how to get one.</p>
      </div>

      <h2>What is a CGPA to Percentage Conversion Certificate?</h2>
      <p>It is an official document — typically a letter on university letterhead — that states the formula used by JNTUH to convert CGPA to percentage. It certifies that your CGPA (e.g., 8.0) is equivalent to a certain percentage (e.g., 75%) as per JNTUH's official method.</p>

      <div class="my-6 p-5 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 rounded-r-xl">
        <p class="font-bold text-yellow-800 dark:text-yellow-200 m-0">When is this certificate required?</p>
        <ul class="mt-3 text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
          <li>During campus or off-campus placements when a company requires a percentage cutoff</li>
          <li>GATE / IIT PG admissions that ask for percentage equivalence</li>
          <li>Government job applications (UPSC, SSC, state PSCs) where minimum % is specified</li>
          <li>Abroad university applications (US, UK, Australia) asking for percentage/GPA</li>
          <li>Scholarship applications that require a percentage</li>
        </ul>
      </div>

      <h2>The Official JNTUH Conversion Formula</h2>
      <p>JNTUH's academic regulations officially state this formula for converting CGPA to Percentage Equivalent:</p>

      <div class="bg-slate-900 text-white p-8 rounded-3xl font-mono text-center my-8 shadow-2xl">
        <span class="text-slate-400 block mb-2 text-sm">JNTUH Circular — All Regulations (R22, R20, R18, R16, R15, R13)</span>
        <span class="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">(CGPA − 0.5) × 10</span>
      </div>

      <h3>Example Calculations</h3>
      <div class="not-prose grid gap-4 md:grid-cols-3 my-8">
        <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
          <p class="text-3xl font-black text-blue-600 mb-1">8.0</p>
          <p class="text-sm text-slate-500 mb-3">CGPA</p>
          <p class="font-mono text-xs text-slate-400 mb-2">(8.0 − 0.5) × 10</p>
          <p class="text-2xl font-bold text-emerald-600">75.0%</p>
          <p class="text-xs text-slate-400 mt-1">First Class with Distinction</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
          <p class="text-3xl font-black text-blue-600 mb-1">7.0</p>
          <p class="text-sm text-slate-500 mb-3">CGPA</p>
          <p class="font-mono text-xs text-slate-400 mb-2">(7.0 − 0.5) × 10</p>
          <p class="text-2xl font-bold text-emerald-600">65.0%</p>
          <p class="text-xs text-slate-400 mt-1">First Class</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
          <p class="text-3xl font-black text-blue-600 mb-1">6.0</p>
          <p class="text-sm text-slate-500 mb-3">CGPA</p>
          <p class="font-mono text-xs text-slate-400 mb-2">(6.0 − 0.5) × 10</p>
          <p class="text-2xl font-bold text-emerald-600">55.0%</p>
          <p class="text-xs text-slate-400 mt-1">Second Class</p>
        </div>
      </div>

      <h2>How to Get the Conversion Certificate from JNTUH</h2>
      <p>There are two ways to obtain or use a JNTUH CGPA to Percentage Conversion Certificate:</p>

      <h3>Option 1: From Your College (Most Common)</h3>
      <p>Most affiliated colleges issue this certificate on their own letterhead quoting JNTUH's official circular. Steps:</p>
      <div class="not-prose space-y-3 my-6">
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-sm">1</span>
          <div><p class="font-semibold text-slate-900 dark:text-white m-0">Visit the Examination Cell / Principal's Office</p><p class="text-sm text-slate-500 m-0 mt-1">Most colleges issue this routinely. Carry your hall ticket, mark memos, and a college ID.</p></div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-sm">2</span>
          <div><p class="font-semibold text-slate-900 dark:text-white m-0">Request a "CGPA to Percentage Conversion Certificate"</p><p class="text-sm text-slate-500 m-0 mt-1">Mention the purpose (e.g., placement drive, university application) and your CGPA from CMM.</p></div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-sm">3</span>
          <div><p class="font-semibold text-slate-900 dark:text-white m-0">Get it signed and stamped</p><p class="text-sm text-slate-500 m-0 mt-1">It should be signed by the Principal/HoD and stamped with the college seal to be accepted by recruiters.</p></div>
        </div>
      </div>

      <h3>Option 2: Directly from JNTUH (For Alumni)</h3>
      <p>If you have graduated and need a certificate directly from JNTUH, you can apply through the JNTUH ODE (Online Document Verification) portal or write to the Controller of Examinations (CoE) at JNTUH, Kukatpally, Hyderabad.</p>

      <h2>What the Certificate Should State</h2>
      <p>A valid JNTUH CGPA to Percentage Conversion Certificate typically contains:</p>
      <ul>
        <li>Student name, roll number, and regulation (e.g., R22, R18)</li>
        <li>Final CGPA as per the Consolidated Marks Memo (CMM)</li>
        <li>The official conversion formula: <strong>Percentage = (CGPA − 0.5) × 10</strong></li>
        <li>Calculated percentage equivalent</li>
        <li>Reference to the JNTUH circular or academic regulations</li>
        <li>Principal/HoD signature with college seal</li>
      </ul>

      <h2>Sample Format (Self-Declaration)</h2>
      <p>When companies accept a self-declaration (common in online applications), here's the text you can use:</p>

      <div class="not-prose bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 my-6 font-serif text-sm leading-relaxed">
        <p class="text-center font-bold text-base mb-4">CGPA to Percentage Equivalence Certificate</p>
        <p>This is to certify that <strong>[Your Name]</strong>, bearing Roll No. <strong>[Your Roll No.]</strong>, has successfully completed the B.Tech programme in <strong>[Branch]</strong> from <strong>[College Name]</strong>, affiliated to Jawaharlal Nehru Technological University Hyderabad (JNTUH), under the <strong>[R22/R18/R16]</strong> Regulation.</p>
        <p class="mt-3">As per the JNTUH Academic Regulations, the CGPA to Percentage conversion formula is:</p>
        <p class="text-center font-mono font-bold my-3 text-base">Percentage = (CGPA − 0.5) × 10</p>
        <p>The final CGPA of <strong>[Your CGPA]</strong> is equivalent to <strong>[(CGPA−0.5)×10]%</strong> as per the above formula.</p>
      </div>

      <h2>Frequently Asked Questions</h2>
      <div class="space-y-4 not-prose">
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Is a conversion certificate mandatory for campus placements?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Not always. Many companies operating at JNTUH campuses are already aware of the CGPA system and calculate your percentage themselves. However, for companies that have a strict "60% minimum" cutoff and verify documents, the conversion certificate avoids confusion.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Can I convert CGPA 6.5 as 65% for a job with 65% cutoff?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Using JNTUH's official formula: (6.5 − 0.5) × 10 = <strong>60%</strong> — not 65%. However, some private companies accept CGPA × 10 (i.e., 65%) if you show the conversion certificate explicitly. Always clarify with the recruiter which formula they accept before applying.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Does the conversion formula differ for R22 vs R18?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              No — the formula <strong>(CGPA − 0.5) × 10</strong> is the same for R22, R20, R18, R16, R15, and R13 regulations. JNTUH standardised this across all B.Tech and M.Tech programmes.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>My college is not issuing the certificate. What do I do?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              You can write directly to JNTUH's Controller of Examinations at JNTUH, Kukatpally, Hyderabad — 500085, referencing your roll number and regulation. Alternatively, share the official JNTUH academic regulations circular with the employer directly, as many recruiters accept the published formula as sufficient proof.
            </p>
          </details>
        </div>
      </div>

      <div class="not-prose mt-8 p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="flex-1">
          <p class="font-bold text-blue-900 dark:text-blue-100 mb-1">Need to calculate your exact percentage?</p>
          <p class="text-sm text-blue-700 dark:text-blue-300 mb-0">Use our free CGPA to Percentage converter — enter your CGPA and get the result instantly.</p>
        </div>
        <a href="/cgpa-percentage-converter" class="flex-shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all text-sm shadow-lg shadow-blue-500/25">Calculate Now</a>
      </div>
    `
  },
  {
    slug: 'top-jntuh-engineering-colleges-2026-rankings',
    title: 'Top Engineering Colleges Under JNTUH (2026) – Rankings, Placements & Fees',
    description: 'Discover the best engineering colleges under JNTUH in 2026. Compare placements, highest packages, fees, and branch-wise ranking for CSE, IT, ECE and more.',
    publishedAt: '2026-02-14',
    tags: ['JNTUH Colleges', 'Rankings 2026', 'Engineering Placements', 'Top Colleges Hyderabad'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">Choosing the best engineering college under JNTUH can directly impact your placements, salary package, higher studies opportunities, and career growth. If you are planning B.Tech under Jawaharlal Nehru Technological University Hyderabad (JNTUH), this guide will help you compare the top affiliated engineering colleges in Hyderabad (2026).</p>
      </div>

      <h2>Top 5 JNTUH Engineering Colleges (2026 Rankings)</h2>
      <p>Based on NAAC accreditation, recent placement statistics, and student reviews.</p>

      <div class="space-y-8 my-8 not-prose">
        <!-- College 1: CBIT -->
        <div class="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
          <div class="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl">#1 RANK</div>
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">Chaitanya Bharathi Institute of Technology (CBIT)</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">📍 Gandipet, Hyderabad • <span class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 rounded text-xs font-bold">NAAC A++</span></p>
              </div>
              <div class="text-left md:text-right">
                  <div class="text-sm text-slate-500 dark:text-slate-400">Highest Package</div>
                  <div class="text-2xl font-black text-blue-600 dark:text-blue-400">₹50+ LPA</div>
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <h4 class="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">Why CBIT?</h4>
                  <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li class="flex gap-2">✅ Strong coding culture & top-tier placements.</li>
                      <li class="flex gap-2">✅ Recruiters: Amazon, Deloitte, Infosys, TCS.</li>
                      <li class="flex gap-2">✅ Excellent campus infrastructure.</li>
                  </ul>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                   <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-semibold text-blue-800 dark:text-blue-200">Average Package</span>
                      <span class="font-bold text-blue-900 dark:text-blue-100">₹6–10 LPA</span>
                   </div>
                   <div class="flex justify-between items-center">
                      <span class="text-sm font-semibold text-blue-800 dark:text-blue-200">Best Branches</span>
                      <span class="font-bold text-blue-900 dark:text-blue-100">CSE, IT, ECE</span>
                   </div>
              </div>
            </div>
          </div>
        </div>

        <!-- College 2: VNR -->
        <div class="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
          <div class="absolute top-0 right-0 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-bl-xl">#2 RANK</div>
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">VNR Vignana Jyothi (VNR VJIET)</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">📍 Bachupally, Hyderabad • <span class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 rounded text-xs font-bold">NAAC A++</span></p>
              </div>
              <div class="text-left md:text-right">
                  <div class="text-sm text-slate-500 dark:text-slate-400">Highest Package</div>
                  <div class="text-2xl font-black text-blue-600 dark:text-blue-400">₹45+ LPA</div>
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <h4 class="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">Why VNR?</h4>
                   <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li class="flex gap-2">✅ Consistent 90%+ placement in CSE.</li>
                      <li class="flex gap-2">✅ Strong focus on AI/ML.</li>
                      <li class="flex gap-2">✅ Active alumni network.</li>
                  </ul>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                   <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-semibold text-blue-800 dark:text-blue-200">Average Package</span>
                      <span class="font-bold text-blue-900 dark:text-blue-100">₹7–9 LPA</span>
                   </div>
                   <div class="flex justify-between items-center">
                      <span class="text-sm font-semibold text-blue-800 dark:text-blue-200">Best Branches</span>
                      <span class="font-bold text-blue-900 dark:text-blue-100">CSE, AI & DS</span>
                   </div>
              </div>
            </div>
          </div>
        </div>

         <!-- College 3: Vasavi -->
        <div class="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
          <div class="absolute top-0 right-0 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-bl-xl">#3 RANK</div>
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">Vasavi College of Engineering</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">📍 Ibrahimbagh, Hyderabad • <span class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 rounded text-xs font-bold">NAAC A</span></p>
              </div>
              <div class="text-left md:text-right">
                  <div class="text-sm text-slate-500 dark:text-slate-400">Highest Package</div>
                  <div class="text-2xl font-black text-blue-600 dark:text-blue-400">₹40+ LPA</div>
              </div>
            </div>
            
             <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <h4 class="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">Why Vasavi?</h4>
                   <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li class="flex gap-2">✅ Strong academic discipline.</li>
                      <li class="flex gap-2">✅ Excellent core engineering placements.</li>
                      <li class="flex gap-2">✅ Technical clubs & activities.</li>
                  </ul>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                   <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-semibold text-blue-800 dark:text-blue-200">Average Package</span>
                      <span class="font-bold text-blue-900 dark:text-blue-100">₹6–8 LPA</span>
                   </div>
                   <div class="flex justify-between items-center">
                      <span class="text-sm font-semibold text-blue-800 dark:text-blue-200">Best Branches</span>
                      <span class="font-bold text-blue-900 dark:text-blue-100">CSE, IT</span>
                   </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>Comparison: Top 5 JNTUH Colleges</h3>
      <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 mb-8 not-prose">
        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100 dark:bg-slate-900 font-bold uppercase text-slate-600 dark:text-slate-400">
              <tr>
                  <th class="p-4 text-left">College</th>
                  <th class="p-4">NAAC</th>
                  <th class="p-4">Highest Package</th>
                  <th class="p-4">Avg Package</th>
              </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr class="bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="p-4 text-left font-bold">CBIT</td><td class="p-4"><span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">A++</span></td><td class="p-4 font-mono font-bold text-blue-600">₹50 LPA</td><td class="p-4">₹8 LPA</td></tr>
              <tr class="bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="p-4 text-left font-bold">VNR VJIET</td><td class="p-4"><span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">A++</span></td><td class="p-4 font-mono font-bold text-blue-600">₹45 LPA</td><td class="p-4">₹8 LPA</td></tr>
              <tr class="bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="p-4 text-left font-bold">Vasavi</td><td class="p-4"><span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">A</span></td><td class="p-4 font-mono font-bold text-blue-600">₹40 LPA</td><td class="p-4">₹7 LPA</td></tr>
              <tr class="bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="p-4 text-left font-bold">GRIET</td><td class="p-4"><span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">A++</span></td><td class="p-4 font-mono font-bold text-blue-600">₹35 LPA</td><td class="p-4">₹6 LPA</td></tr>
              <tr class="bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/50"><td class="p-4 text-left font-bold">MVSR</td><td class="p-4"><span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">A</span></td><td class="p-4 font-mono font-bold text-blue-600">₹30 LPA</td><td class="p-4">₹5 LPA</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Best Branch for Placements?</h3>
      <p>Based on 2026 placement trends, CSE and AI/ML currently offer the highest salary packages, while ECE and IT also show strong demand in product-based companies.</p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose my-6">
          <div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl text-center border border-purple-100 dark:border-purple-800 hover:scale-105 transition-transform">
              <div class="text-3xl mb-2">💻</div>
              <div class="font-bold text-purple-900 dark:text-purple-100 text-sm">CSE (Core)</div>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl text-center border border-blue-100 dark:border-blue-800 hover:scale-105 transition-transform">
              <div class="text-3xl mb-2">🤖</div>
              <div class="font-bold text-blue-900 dark:text-blue-100 text-sm">AI & ML</div>
          </div>
          <div class="bg-cyan-50 dark:bg-cyan-900/10 p-4 rounded-xl text-center border border-cyan-100 dark:border-cyan-800 hover:scale-105 transition-transform">
              <div class="text-3xl mb-2">📡</div>
              <div class="font-bold text-cyan-900 dark:text-cyan-100 text-sm">IT</div>
          </div>
          <div class="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl text-center border border-orange-100 dark:border-orange-800 hover:scale-105 transition-transform">
              <div class="text-3xl mb-2">⚡</div>
              <div class="font-bold text-orange-900 dark:text-orange-100 text-sm">ECE</div>
          </div>
      </div>

      <h3>Frequently Asked Questions (FAQ)</h3>
      <div class="space-y-4 not-prose">
          <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
              <details class="p-6">
                  <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
                      <span>Which is the No.1 engineering college under JNTUH?</span>
                      <span class="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                      <strong>CBIT</strong> and <strong>VNR VJIET</strong> are generally ranked highest based on consistent placements, infrastructure, and reputation.
                  </p>
              </details>
          </div>
          <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
              <details class="p-6">
                  <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
                      <span>Is 7 CGPA good for placements?</span>
                      <span class="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                      Yes, <strong>7 CGPA is sufficient for most MNCs</strong> (like TCS, Infosys, Accenture). However, product-based companies (Amazon, Microsoft) often prefer students with <strong>8.0+ CGPA</strong>.
                  </p>
              </details>
          </div>
          <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
              <details class="p-6">
                  <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
                      <span>Autonomous vs Affiliated Colleges – Which is Better?</span>
                      <span class="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                      <strong>Autonomous colleges</strong> (like CBIT, VNR) are generally preferred because they have a flexible syllabus, conduct their own exams, and declare results faster compared to non-autonomous affiliated colleges.
                  </p>
              </details>
          </div>
      </div>
    `
  },
  {
    slug: 'jntuh-supplementary-exam-guide',
    title: 'JNTUH Supplementary Exams 2026 - Eligibility, Application, Fees & Schedule',
    description: 'Complete guide to JNTUH supplementary exams. Who can apply, how to fill the application, exam fees, schedule, and what happens to your CGPA after clearing backlogs.',
    publishedAt: '2026-04-09',
    tags: ['Supplementary Exam', 'Backlogs', 'JNTUH 2026', 'Exam Schedule', 'B.Tech'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">Failed a subject in JNTUH? Don't panic. The supplementary examination system gives every student a fair chance to clear backlogs and continue toward their B.Tech degree. Here's everything you need to know.</p>
      </div>

      <h2>What is a JNTUH Supplementary Exam?</h2>
      <p>A supplementary exam (also called a "supply" or "backlog exam") is an additional examination conducted by JNTUH for students who:</p>
      <ul>
        <li>Failed one or more subjects in the regular semester exam</li>
        <li>Were absent for a subject (Ab grade)</li>
        <li>Want to improve their grade (in some regulations)</li>
      </ul>
      <p>These exams are typically held 2–3 months after the regular exam results are announced and follow the same pattern as the regular exam.</p>

      <h2>Who is Eligible for Supplementary Exams?</h2>
      <div class="not-prose space-y-3 my-8">
        <div class="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800">
          <span class="text-xl mt-0.5">✅</span>
          <div>
            <p class="font-bold text-green-800 dark:text-green-200 m-0">Students who failed (F grade) in any subject</p>
            <p class="text-sm text-green-700 dark:text-green-300 m-0 mt-1">You must register separately for each failed subject. There is no automatic enrollment.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800">
          <span class="text-xl mt-0.5">✅</span>
          <div>
            <p class="font-bold text-green-800 dark:text-green-200 m-0">Students who were absent (Ab grade)</p>
            <p class="text-sm text-green-700 dark:text-green-300 m-0 mt-1">Absence in the main exam counts as a fail. You can appear in the next supplementary.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
          <span class="text-xl mt-0.5">❌</span>
          <div>
            <p class="font-bold text-red-800 dark:text-red-200 m-0">Students with attendance shortage (unless condonation is obtained)</p>
            <p class="text-sm text-red-700 dark:text-red-300 m-0 mt-1">If you were detained due to less than 75% attendance, you are NOT eligible for supplementary. You must re-register for the semester.</p>
          </div>
        </div>
      </div>

      <h2>JNTUH Supplementary Exam Schedule (Typical Pattern)</h2>
      <p>JNTUH does not fix supplementary dates in advance, but the general pattern is:</p>

      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-8">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Event</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Approximate Timing</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="px-4 py-3">Regular Exam Ends</td><td class="px-4 py-3 text-slate-500">November / May</td></tr>
            <tr><td class="px-4 py-3">Results Declared</td><td class="px-4 py-3 text-slate-500">January / July (approx 6–8 weeks later)</td></tr>
            <tr><td class="px-4 py-3">Supplementary Application Opens</td><td class="px-4 py-3 text-slate-500">2–3 weeks after results</td></tr>
            <tr><td class="px-4 py-3">Last Date to Apply</td><td class="px-4 py-3 text-slate-500">Typically 10–15 days window</td></tr>
            <tr><td class="px-4 py-3">Supplementary Exam Held</td><td class="px-4 py-3 text-slate-500">February–March / August–September</td></tr>
            <tr><td class="px-4 py-3">Supplementary Results</td><td class="px-4 py-3 text-slate-500">4–6 weeks after exam</td></tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-slate-500 -mt-4">Always check the official JNTUH website or your college notice board for exact dates. Dates vary each year.</p>

      <h2>How to Apply for JNTUH Supplementary Exam</h2>
      <div class="not-prose space-y-3 my-6">
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold">1</span>
          <div>
            <p class="font-semibold text-slate-900 dark:text-white m-0">Check your failed subjects</p>
            <p class="text-sm text-slate-500 m-0 mt-1">Log in to JNTUH results portal or ask your college examination cell for your semester result memo.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold">2</span>
          <div>
            <p class="font-semibold text-slate-900 dark:text-white m-0">Visit your college examination section</p>
            <p class="text-sm text-slate-500 m-0 mt-1">JNTUH supplementary applications are submitted through your college, not directly to JNTUH. Your college collects forms and fees.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold">3</span>
          <div>
            <p class="font-semibold text-slate-900 dark:text-white m-0">Fill the application form and pay fees</p>
            <p class="text-sm text-slate-500 m-0 mt-1">Fee per subject is typically ₹500–₹800. Late fee applies if you miss the first deadline. Carry hall ticket copy and ID proof.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold">4</span>
          <div>
            <p class="font-semibold text-slate-900 dark:text-white m-0">Download supplementary hall ticket</p>
            <p class="text-sm text-slate-500 m-0 mt-1">Hall tickets are available on the JNTUH portal or given by your college 1–2 weeks before the exam.</p>
          </div>
        </div>
      </div>

      <h2>Supplementary Exam Fees (Approximate)</h2>
      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-6">
        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Number of Subjects</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Regular Fee</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Late Fee (after deadline)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="px-4 py-3 text-left">1 subject</td><td class="py-3">₹500–₹600</td><td class="py-3 text-orange-500">₹800–₹1000</td></tr>
            <tr><td class="px-4 py-3 text-left">2–3 subjects</td><td class="py-3">₹600–₹900</td><td class="py-3 text-orange-500">₹1000–₹1500</td></tr>
            <tr><td class="px-4 py-3 text-left">4+ subjects</td><td class="py-3">₹900–₹1500</td><td class="py-3 text-orange-500">₹1500–₹2500</td></tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-slate-500 -mt-4">Fees are indicative and change annually. Confirm exact amounts with your college examination cell.</p>

      <h2>Does Supplementary Affect Your CGPA?</h2>
      <p>Yes — but in a <strong>positive way</strong>. When you clear a backlog:</p>
      <ul>
        <li>The 'F' (0 grade points) is replaced with your new passing grade (5, 6, 7, etc.)</li>
        <li>Your CGPA is recalculated with the updated grade points</li>
        <li>Your mark memo will show the subject cleared with "(S)" notation indicating supplementary attempt</li>
        <li>The number of attempts (1st attempt, 2nd attempt) is recorded, which some employers check</li>
      </ul>

      <div class="my-6 p-5 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-xl">
        <p class="font-bold text-blue-800 dark:text-blue-200 m-0">Important: Grade Cap in Supplementary</p>
        <p class="mt-2 text-blue-700 dark:text-blue-300 m-0">In JNTUH R22 and R18, even if you score 90+ in a supplementary exam, the maximum grade you can receive is typically <strong>Grade C (5 points)</strong> — which equals just above 40%. The "pass but capped" rule is applied for supplementary attempts in most regulations.</p>
      </div>

      <h2>Frequently Asked Questions</h2>
      <div class="space-y-4 not-prose">
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>How many times can I appear in supplementary exams in JNTUH?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              JNTUH allows multiple attempts for supplementary exams, but there is a time limit. For R22 and R18, students must complete their degree within <strong>2 years after the normal course duration</strong> (i.e., 6 years total for a 4-year B.Tech). After that, the student's registration expires.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Can I attend regular classes while having a backlog?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes. Having a backlog does not stop you from attending the next semester's classes or exams (as long as you meet the promotion criteria). You can write your regular semester exams and supplementary exams simultaneously.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>What is the difference between supplementary and improvement exams?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Supplementary</strong> is for students who failed. <strong>Improvement exams</strong> (where available) are for students who passed but want a better grade. JNTUH R22 does not currently have a formal improvement exam provision. Check the latest circular from JNTUH for the most up-to-date policy.
            </p>
          </details>
        </div>
      </div>
    `
  },
  {
    slug: 'jntuh-attendance-rules-shortage-condonation',
    title: 'JNTUH 75% Attendance Rule 2026 - Shortage, Condonation & Detention Explained',
    description: 'JNTUH requires 75% attendance to sit for exams. Learn what happens with attendance shortage, how condonation works, when you get detained, and how to calculate if you are safe.',
    publishedAt: '2026-04-09',
    tags: ['Attendance Rules', 'JNTUH 2026', 'Condonation', 'Detention', 'R22', 'R18'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">One of the most common reasons JNTUH students get held back is <strong>attendance shortage</strong>. Missing classes can stop you from writing exams entirely — even if you've studied well. This guide explains everything about JNTUH's 75% attendance rule.</p>
      </div>

      <h2>The 75% Attendance Rule — What It Means</h2>
      <p>As per JNTUH academic regulations (R22, R18, R16), a student must attend a minimum of <strong>75% of the total classes held</strong> in each subject to be eligible to write the end-semester examination.</p>

      <div class="not-prose grid gap-4 md:grid-cols-3 my-8">
        <div class="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-5 rounded-2xl text-center">
          <p class="text-3xl font-black text-green-600 mb-1">≥ 75%</p>
          <p class="font-bold text-green-800 dark:text-green-200 text-sm">Eligible to write exam</p>
          <p class="text-xs text-green-600 dark:text-green-400 mt-1">No issues. Proceed normally.</p>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-5 rounded-2xl text-center">
          <p class="text-3xl font-black text-yellow-600 mb-1">65–74%</p>
          <p class="font-bold text-yellow-800 dark:text-yellow-200 text-sm">Eligible with Condonation</p>
          <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Must apply and pay fine.</p>
        </div>
        <div class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-5 rounded-2xl text-center">
          <p class="text-3xl font-black text-red-600 mb-1">&lt; 65%</p>
          <p class="font-bold text-red-800 dark:text-red-200 text-sm">Detained — Cannot Write</p>
          <p class="text-xs text-red-600 dark:text-red-400 mt-1">Must repeat the semester.</p>
        </div>
      </div>

      <h2>How to Calculate Your Attendance Percentage</h2>
      <p>The formula is simple:</p>

      <div class="bg-slate-900 text-white p-6 rounded-2xl font-mono text-center my-6 shadow-lg">
        Attendance % = (Classes Attended / Total Classes Held) × 100
      </div>

      <h3>Example Calculation</h3>
      <p>Say your college held 90 classes this semester in a subject, and you attended 65:</p>
      <ul>
        <li>Attendance = (65 / 90) × 100 = <strong>72.2%</strong></li>
        <li>72.2% falls in the 65–74% range → eligible for <strong>condonation</strong></li>
        <li>If you had attended only 57 classes → (57/90) × 100 = 63.3% → <strong>Detained</strong></li>
      </ul>

      <h3>How Many Classes Can You Miss?</h3>
      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-6">
        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800">Total Classes Held</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-green-600">Max Absences (75%)</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-yellow-600">Max Absences (65% condonation)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="py-3">60</td><td class="font-bold text-green-600">15 classes</td><td class="font-bold text-yellow-600">21 classes</td></tr>
            <tr><td class="py-3">70</td><td class="font-bold text-green-600">17 classes</td><td class="font-bold text-yellow-600">24 classes</td></tr>
            <tr><td class="py-3">80</td><td class="font-bold text-green-600">20 classes</td><td class="font-bold text-yellow-600">28 classes</td></tr>
            <tr><td class="py-3">90</td><td class="font-bold text-green-600">22 classes</td><td class="font-bold text-yellow-600">31 classes</td></tr>
            <tr><td class="py-3">100</td><td class="font-bold text-green-600">25 classes</td><td class="font-bold text-yellow-600">35 classes</td></tr>
          </tbody>
        </table>
      </div>

      <h2>What is Attendance Condonation?</h2>
      <p>Condonation is a provision where JNTUH "forgives" your attendance shortage (between 65% and 74%) and allows you to write the exam — usually in exchange for a fine and valid reasons.</p>

      <h3>Who Can Apply for Condonation?</h3>
      <ul>
        <li>Attendance between <strong>65% and 74%</strong> (subject-wise)</li>
        <li>Absence due to medical reasons (hospitalization, illness) with proper documentation</li>
        <li>Participation in college/university sports, cultural events, NSS, NCC activities</li>
        <li>Bereavement (death in the family) with supporting documents</li>
      </ul>

      <h3>How to Apply for Condonation</h3>
      <div class="not-prose space-y-3 my-6">
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-sm">1</span>
          <div><p class="font-semibold text-slate-900 dark:text-white m-0">Collect the condonation application from your college</p><p class="text-sm text-slate-500 m-0 mt-1">Usually available from the examination cell or principal's office.</p></div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-sm">2</span>
          <div><p class="font-semibold text-slate-900 dark:text-white m-0">Attach supporting documents</p><p class="text-sm text-slate-500 m-0 mt-1">Medical certificate from a registered doctor/hospital, event participation certificates, etc.</p></div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-sm">3</span>
          <div><p class="font-semibold text-slate-900 dark:text-white m-0">Pay the condonation fine</p><p class="text-sm text-slate-500 m-0 mt-1">Typically ₹200–₹500 per subject. Submit to college accounts section.</p></div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-sm">4</span>
          <div><p class="font-semibold text-slate-900 dark:text-white m-0">Get principal's approval and hall ticket</p><p class="text-sm text-slate-500 m-0 mt-1">After approval, you'll be issued a hall ticket for the end-semester exam.</p></div>
        </div>
      </div>

      <h2>What Happens If You Are Detained?</h2>
      <div class="my-6 p-5 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-xl">
        <p class="font-bold text-red-800 dark:text-red-200 m-0">Detention means you cannot write the semester exam at all.</p>
        <ul class="mt-3 text-red-700 dark:text-red-300 text-sm space-y-1 mb-0">
          <li>You will be marked as "Detained" (DT) for all subjects where attendance is below 65%</li>
          <li>You must re-register for the semester and attend classes again next year</li>
          <li>This effectively adds an extra year to your degree</li>
          <li>Grace marks or exemptions cannot save you from detention</li>
        </ul>
      </div>

      <h2>Pro Tips to Manage Attendance</h2>
      <div class="not-prose grid gap-4 md:grid-cols-2 my-8">
        <div class="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="font-bold text-slate-900 dark:text-white mb-2">Track weekly, not monthly</p>
          <p class="text-sm text-slate-500 m-0">Reviewing attendance every week lets you catch a shortfall before it becomes critical. Monthly reviews are often too late.</p>
        </div>
        <div class="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="font-bold text-slate-900 dark:text-white mb-2">Never assume proxy fixes it</p>
          <p class="text-sm text-slate-500 m-0">Proxy attendance is a serious violation. If caught, you can be debarred from the exam — a far worse outcome than a simple shortage.</p>
        </div>
        <div class="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="font-bold text-slate-900 dark:text-white mb-2">Prioritize lab attendance</p>
          <p class="text-sm text-slate-500 m-0">Labs typically have fewer sessions, so missing even 2–3 labs can drop you below 75% quickly. Lab attendance is tracked per batch session.</p>
        </div>
        <div class="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="font-bold text-slate-900 dark:text-white mb-2">Save medical certificates</p>
          <p class="text-sm text-slate-500 m-0">Any time you miss class due to illness, get a proper medical certificate immediately — even if you don't need it yet. It becomes essential for condonation.</p>
        </div>
      </div>

      <h2>Frequently Asked Questions</h2>
      <div class="space-y-4 not-prose">
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Is the 75% rule applied per subject or overall?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Per subject.</strong> You could have 90% overall attendance but still be detained in one subject if you have less than 65% in it. Monitor each subject's attendance separately — not just the overall average on your portal.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Can I get condonation for sports/NSS/NCC activities?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes. Participation in JNTUH-recognized sports events, NSS camps, NCC training, and university-level cultural events qualifies for condonation. You need an official participation certificate signed by the relevant authority (sports officer, NSS coordinator, etc.).
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Does attendance shortage appear on my final mark memo?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              No. Your final Consolidated Marks Memo (CMM) only shows your grades and CGPA. Attendance issues do not appear on your degree or CMM. However, your academic record within the college may note DT (detained) semesters.
            </p>
          </details>
        </div>
      </div>
    `
  },
  {
    slug: 'how-to-clear-jntuh-backlogs-fast',
    title: 'How to Clear JNTUH Backlogs Fast - Proven Strategy for B.Tech Students',
    description: 'Struggling with JNTUH backlogs? This practical guide covers smart study strategies, exam pattern analysis, prioritization techniques, and mindset tips to clear all your backlogs efficiently.',
    publishedAt: '2026-04-09',
    tags: ['Backlogs', 'Study Tips', 'Exam Strategy', 'JNTUH B.Tech', 'Academic Success'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">Having backlogs doesn't mean your engineering career is over. Thousands of JNTUH students clear multiple backlogs every semester and go on to land great jobs. The key is the right strategy — not just working harder, but smarter.</p>
      </div>

      <h2>Understanding the JNTUH Exam Pattern First</h2>
      <p>Before you start studying, understand exactly what JNTUH is testing. Every B.Tech exam in JNTUH follows this structure:</p>

      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-8">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Component</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-center">Max Marks</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="px-4 py-3 font-semibold">Internal Marks (IA)</td><td class="px-4 py-3 text-center font-bold text-blue-600">30</td><td class="px-4 py-3 text-slate-500">Mid-1, Mid-2 exams + assignments/attendance</td></tr>
            <tr><td class="px-4 py-3 font-semibold">End Semester Exam</td><td class="px-4 py-3 text-center font-bold text-blue-600">70</td><td class="px-4 py-3 text-slate-500">3-hour written exam. 5 units, choose 5 of 8 questions</td></tr>
            <tr class="bg-slate-50 dark:bg-slate-900/50"><td class="px-4 py-3 font-bold">Total</td><td class="px-4 py-3 text-center font-black text-emerald-600">100</td><td class="px-4 py-3 text-slate-500">Pass = 40 total AND 35% in end-sem (≥ 25/70)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="my-6 p-5 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 rounded-r-xl">
        <p class="font-bold text-amber-800 dark:text-amber-200 m-0">The Key Insight: You only need 25 out of 70 in the external exam to pass (35%).</p>
        <p class="mt-2 text-amber-700 dark:text-amber-300 m-0">If you have 20+ internal marks, you only need 20 in the end-sem exam to reach 40 total. Focus your energy on the minimum viable score, then go higher if you can.</p>
      </div>

      <h2>Step 1 — Prioritize Your Backlogs</h2>
      <p>Not all backlogs are equal. Sort them before you start studying:</p>

      <div class="not-prose grid gap-4 md:grid-cols-3 my-6">
        <div class="bg-red-50 dark:bg-red-900/10 border-2 border-red-300 dark:border-red-700 p-5 rounded-2xl">
          <p class="font-bold text-red-700 dark:text-red-300 mb-2">High Priority</p>
          <ul class="text-sm text-red-600 dark:text-red-400 space-y-1 m-0">
            <li>Subjects blocking your promotion</li>
            <li>Core subjects needed for your branch</li>
            <li>Final year subjects (needed for degree)</li>
          </ul>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900/10 border-2 border-yellow-300 dark:border-yellow-700 p-5 rounded-2xl">
          <p class="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Medium Priority</p>
          <ul class="text-sm text-yellow-600 dark:text-yellow-400 space-y-1 m-0">
            <li>Subjects appearing again next sem</li>
            <li>Subjects linked to other backlogs</li>
            <li>High-credit subjects (4 credits)</li>
          </ul>
        </div>
        <div class="bg-green-50 dark:bg-green-900/10 border-2 border-green-300 dark:border-green-700 p-5 rounded-2xl">
          <p class="font-bold text-green-700 dark:text-green-300 mb-2">Lower Priority</p>
          <ul class="text-sm text-green-600 dark:text-green-400 space-y-1 m-0">
            <li>Electives and open electives</li>
            <li>Non-core subjects (Env Science, etc.)</li>
            <li>Subjects you're close to passing</li>
          </ul>
        </div>
      </div>

      <h2>Step 2 — Use Previous Question Papers Strategically</h2>
      <p>JNTUH follows a <strong>very predictable pattern</strong> in supplementary exams. Each unit typically has 1–2 "important questions" that repeat across years. Here's how to use this:</p>

      <div class="not-prose space-y-3 my-6">
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="text-2xl">📋</span>
          <div>
            <p class="font-semibold text-slate-900 dark:text-white m-0">Collect 5 years of previous papers</p>
            <p class="text-sm text-slate-500 m-0 mt-1">Available on JNTUH website, your college library, or student Telegram groups. 5 years of papers gives you ~90% coverage of likely exam questions.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="text-2xl">🎯</span>
          <div>
            <p class="font-semibold text-slate-900 dark:text-white m-0">Identify "hot" questions per unit</p>
            <p class="text-sm text-slate-500 m-0 mt-1">A question that appears in 3+ of the 5 years is almost guaranteed to appear again. Write it out, understand it, and practice answering it.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span class="text-2xl">📝</span>
          <div>
            <p class="font-semibold text-slate-900 dark:text-white m-0">Prepare 2 answers per unit minimum</p>
            <p class="text-sm text-slate-500 m-0 mt-1">JNTUH exams give choice within each unit. If you have 2 solid answers ready per unit (10 total for 5 units), you can comfortably pass even if some questions are new.</p>
          </div>
        </div>
      </div>

      <h2>Step 3 — Smart Study Schedule for Backlogs</h2>
      <p>If you have multiple backlogs and limited time, follow this approach:</p>

      <div class="not-prose bg-slate-900 rounded-2xl p-6 my-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <p class="text-blue-400 font-bold uppercase text-xs tracking-wider mb-3">WEEK 1–2</p>
            <ul class="text-slate-300 text-sm space-y-2">
              <li>• Collect all previous papers</li>
              <li>• Identify important questions</li>
              <li>• Make a single-sheet "cheat sheet" per subject with key formulas, definitions, diagrams</li>
              <li>• Focus on units 1 and 5 first (highest repeat rate)</li>
            </ul>
          </div>
          <div>
            <p class="text-purple-400 font-bold uppercase text-xs tracking-wider mb-3">WEEK 3–4</p>
            <ul class="text-slate-300 text-sm space-y-2">
              <li>• Practice writing answers (time yourself — 20 min max per 10-mark question)</li>
              <li>• Cover all 5 units with at least 2 answers each</li>
              <li>• Revise your cheat sheets daily</li>
              <li>• Do one full mock exam paper under timed conditions</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Step 4 — On Exam Day</h2>
      <ul>
        <li><strong>Read all questions first (5 minutes):</strong> Choose wisely. Pick the questions you know best, not just the ones from the units you studied most.</li>
        <li><strong>Write neatly and use headings:</strong> JNTUH examiners appreciate structured answers. Use sub-headings, bullet points, and label diagrams clearly.</li>
        <li><strong>Attempt all required questions:</strong> Never leave a question unanswered. Partial marks (2–3/10) can push you over the pass line.</li>
        <li><strong>Start with your strongest unit:</strong> Getting the first question right builds confidence and sets a good pace.</li>
        <li><strong>Manage time:</strong> With 5 questions in 3 hours, that's 36 minutes per question. Don't overspend on any one answer.</li>
      </ul>

      <h2>Mindset: What to Do When You Have Many Backlogs</h2>
      <div class="my-6 p-5 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-xl">
        <p class="font-bold text-blue-800 dark:text-blue-200 m-0">Having 5–8 backlogs is more common than you think at JNTUH.</p>
        <p class="mt-2 text-blue-700 dark:text-blue-300 m-0">Many students who graduate with distinction had backlogs in earlier semesters. What matters is that you clear them systematically. Don't try to clear all 8 at once — focus on 3–4 per supplementary cycle, prioritize the oldest ones, and build momentum.</p>
      </div>

      <h2>Frequently Asked Questions</h2>
      <div class="space-y-4 not-prose">
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Do backlogs affect campus placements?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Most JNTUH campus placement companies have a "0 active backlogs" policy at the time of placement — meaning you must have cleared all subjects before or during your final year, not necessarily before 3rd year. However, some top MNCs check your total number of attempts and may reject if you have 5+ total backlogs across your degree. Clear backlogs early to keep your options open.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Can I clear JNTUH backlogs by studying just 2 weeks?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes — if you study smart. 2 focused weeks using previous year papers is genuinely sufficient to pass most JNTUH subjects. You're not aiming for O or A+ in a supplementary — you're aiming to pass (40/100 total, 25/70 external). That's very achievable with the right approach.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Where can I find JNTUH previous question papers?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              The official JNTUH website (jntuh.ac.in) has some previous papers under the Examinations section. Your college library is another good source. Student communities on Telegram and WhatsApp groups specific to your branch and regulation are often the fastest source for organized, year-wise collections.
            </p>
          </details>
        </div>
      </div>
    `
  },
  {
    slug: 'jntuh-r22-regulation-complete-guide',
    title: 'JNTUH R22 Regulation Guide - Subjects, Credits, Grading & Key Changes from R18',
    description: 'Complete guide to JNTUH R22 B.Tech regulation. Understand the credit structure, new subjects, grading system changes, promotion rules, and how R22 differs from R18 — for all branches.',
    publishedAt: '2026-04-09',
    tags: ['R22 Regulation', 'JNTUH B.Tech', 'Credit Structure', 'R22 vs R18', 'Curriculum'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">If you joined JNTUH B.Tech from the academic year 2022–23 onwards, you are under the <strong>R22 Regulation</strong>. This guide explains everything — from how many credits you need to graduate, to what changed from R18, to how your grades are calculated.</p>
      </div>

      <h2>What is R22 Regulation?</h2>
      <p>R22 (Regulation 2022) is the latest academic framework for B.Tech programs at Jawaharlal Nehru Technological University Hyderabad. It replaced R18 for students admitted from 2022–23. R22 incorporates new NEP (National Education Policy) guidelines and industry-relevant updates.</p>

      <h2>R22 Credit Structure — B.Tech (4 Years)</h2>

      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md my-8">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Year / Semester</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-center">Typical Credits</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Key Subjects (CSE example)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="px-4 py-3 font-semibold">Year 1 – Sem 1</td><td class="px-4 py-3 text-center">20–22</td><td class="px-4 py-3 text-slate-500">Maths-I, Applied Physics, English, Programming with C, Workshop</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Year 1 – Sem 2</td><td class="px-4 py-3 text-center">20–22</td><td class="px-4 py-3 text-slate-500">Maths-II, Applied Chemistry, BEEE, Problem Solving using Python, Engineering Drawing</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Year 2 – Sem 1</td><td class="px-4 py-3 text-center">20–22</td><td class="px-4 py-3 text-slate-500">Maths-III, DBMS, Data Structures, COA, OOP with Java</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Year 2 – Sem 2</td><td class="px-4 py-3 text-center">20–22</td><td class="px-4 py-3 text-slate-500">OS, CN, Design & Analysis of Algorithms, Discrete Maths, Software Engineering</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Year 3 – Sem 1</td><td class="px-4 py-3 text-center">20–22</td><td class="px-4 py-3 text-slate-500">Compiler Design, AI, Full Stack Dev, Professional Elective-I, Open Elective-I</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Year 3 – Sem 2</td><td class="px-4 py-3 text-center">20–22</td><td class="px-4 py-3 text-slate-500">ML, Cloud Computing, Professional Elective-II, Open Elective-II, Mini Project</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Year 4 – Sem 1</td><td class="px-4 py-3 text-center">20–22</td><td class="px-4 py-3 text-slate-500">Professional Elective-III/IV, Open Elective-III, Industry Internship, Project Phase-I</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Year 4 – Sem 2</td><td class="px-4 py-3 text-center">16–18</td><td class="px-4 py-3 text-slate-500">Professional Elective-V, Project Phase-II, Industry Internship (if not done)</td></tr>
            <tr class="bg-blue-50 dark:bg-blue-900/10"><td class="px-4 py-3 font-black text-blue-700 dark:text-blue-300">Total Credits Required</td><td class="px-4 py-3 text-center font-black text-blue-700 dark:text-blue-300">160+</td><td class="px-4 py-3 text-slate-500">Minimum for B.Tech degree conferral</td></tr>
          </tbody>
        </table>
      </div>

      <h2>R22 Grading System</h2>
      <p>R22 uses the same 10-point grading scale as R18:</p>

      <div class="not-prose overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-6">
        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800">Marks</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Grade</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Points</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Class</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="py-2.5">≥ 90</td><td class="font-bold text-green-600">O</td><td class="font-bold">10</td><td>Outstanding</td></tr>
            <tr><td class="py-2.5">80–89</td><td class="font-bold text-green-500">A+</td><td class="font-bold">9</td><td>Excellent</td></tr>
            <tr><td class="py-2.5">70–79</td><td class="font-bold text-blue-500">A</td><td class="font-bold">8</td><td>Very Good</td></tr>
            <tr><td class="py-2.5">60–69</td><td class="font-bold text-cyan-500">B+</td><td class="font-bold">7</td><td>Good</td></tr>
            <tr><td class="py-2.5">50–59</td><td class="font-bold text-yellow-500">B</td><td class="font-bold">6</td><td>Average</td></tr>
            <tr><td class="py-2.5">40–49</td><td class="font-bold text-orange-500">C</td><td class="font-bold">5</td><td>Pass</td></tr>
            <tr><td class="py-2.5">&lt; 40</td><td class="font-bold text-red-600">F</td><td class="font-bold">0</td><td>Fail</td></tr>
          </tbody>
        </table>
      </div>

      <h2>R22 Promotion Rules (Year-Wise)</h2>
      <div class="not-prose space-y-4 my-6">
        <div class="p-5 border border-l-4 border-slate-200 dark:border-slate-700 border-l-blue-500 rounded-xl bg-white dark:bg-slate-800/50">
          <p class="font-bold text-slate-900 dark:text-white m-0">1st Year → 2nd Year</p>
          <p class="text-sm text-slate-600 dark:text-slate-400 m-0 mt-2">Must earn at least 50% of total credits of Year 1 (i.e., pass subjects worth ≥ 20–21 credits out of ~42).</p>
        </div>
        <div class="p-5 border border-l-4 border-slate-200 dark:border-slate-700 border-l-purple-500 rounded-xl bg-white dark:bg-slate-800/50">
          <p class="font-bold text-slate-900 dark:text-white m-0">2nd Year → 3rd Year</p>
          <p class="text-sm text-slate-600 dark:text-slate-400 m-0 mt-2">Must earn at least 50% of total credits of Years 1 + 2 Sem 1 combined (approximately 50 credits out of 100).</p>
        </div>
        <div class="p-5 border border-l-4 border-slate-200 dark:border-slate-700 border-l-emerald-500 rounded-xl bg-white dark:bg-slate-800/50">
          <p class="font-bold text-slate-900 dark:text-white m-0">3rd Year → 4th Year</p>
          <p class="text-sm text-slate-600 dark:text-slate-400 m-0 mt-2">Must earn at least 50% of all credits up to Year 3 Sem 1. Students with many uncleared backlogs may be held back at this stage.</p>
        </div>
        <div class="p-5 border border-l-4 border-slate-200 dark:border-slate-700 border-l-amber-500 rounded-xl bg-white dark:bg-slate-800/50">
          <p class="font-bold text-slate-900 dark:text-white m-0">Degree Award</p>
          <p class="text-sm text-slate-600 dark:text-slate-400 m-0 mt-2">Must earn <strong>all required credits (160+)</strong> within 2 years of the normal course duration (maximum 6 years). No subject leaving (exemption) allowed in R22.</p>
        </div>
      </div>

      <h2>Key Differences: R22 vs R18</h2>
      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md my-8">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Feature</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-center text-blue-600">R22</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-center text-slate-500">R18</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="px-4 py-3 font-semibold">Subject Exemption (Leaving)</td><td class="px-4 py-3 text-center font-bold text-red-500">❌ Not allowed</td><td class="px-4 py-3 text-center text-green-600">✅ Up to 2 subjects</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Industry Internship</td><td class="px-4 py-3 text-center font-bold text-green-600">✅ Mandatory</td><td class="px-4 py-3 text-center text-slate-500">Optional</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Honours / Minor Degree</td><td class="px-4 py-3 text-center font-bold text-green-600">✅ Available</td><td class="px-4 py-3 text-center text-slate-500">Not available</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Total Credits Required</td><td class="px-4 py-3 text-center">160+</td><td class="px-4 py-3 text-center">160+</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Grading Scale</td><td class="px-4 py-3 text-center">10-point (same)</td><td class="px-4 py-3 text-center">10-point (same)</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Internal Marks Split</td><td class="px-4 py-3 text-center">30 IA + 70 External</td><td class="px-4 py-3 text-center">30 IA + 70 External</td></tr>
            <tr><td class="px-4 py-3 font-semibold">MOOC Courses</td><td class="px-4 py-3 text-center font-bold text-green-600">✅ Credit-eligible</td><td class="px-4 py-3 text-center text-slate-500">Limited</td></tr>
            <tr><td class="px-4 py-3 font-semibold">Lateral Entry (2nd year)</td><td class="px-4 py-3 text-center">Allowed</td><td class="px-4 py-3 text-center">Allowed</td></tr>
          </tbody>
        </table>
      </div>

      <h2>R22 Honours Degree and Minor Degree</h2>
      <p>A major new feature in R22 is the option to earn an <strong>Honours</strong> or <strong>Minor Degree</strong> alongside your regular B.Tech:</p>
      <ul>
        <li><strong>Honours (B.Tech Hons.):</strong> 20 additional credits in your own branch's advanced subjects. Shown on your degree certificate.</li>
        <li><strong>Minor Degree:</strong> 20 additional credits in a different discipline (e.g., a CSE student adding Data Science minor). Highly valued for placements and higher studies.</li>
        <li>These are optional and must be completed without affecting your regular semester performance.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <div class="space-y-4 not-prose">
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Can R22 students leave (exempt) failing subjects like R18?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              No. R22 does not allow subject exemption (leaving subjects). Every subject in the curriculum must be passed to earn the degree. This is a significant change from R18, where students could leave up to 2 subjects if they earned enough total credits.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Is the industry internship in R22 graded?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes. The industry internship in R22 carries credits and is graded based on the internship report, presentation, and evaluation by a faculty guide. You need to complete it and pass to earn those credits toward your degree.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Do MOOC courses count toward my R22 CGPA?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              MOOC courses (like NPTEL, Coursera) can earn you credits in R22 under the open elective category. The grade/credit awarded depends on the course completion certificate and your college's approval. They are typically reflected in your transcript and contribute to CGPA. Check with your college's academic section for the exact mapping.
            </p>
          </details>
        </div>
      </div>
    `
  },
  {
    slug: 'jntuh-internal-marks-calculation',
    title: 'JNTUH Internal Marks (IA) Calculation - How Mid Exams & Assignments Work',
    description: 'Confused about how JNTUH internal marks are calculated? Learn how Mid-1, Mid-2, assignments and attendance combine to give your 30 internal marks — with examples for R22 and R18.',
    publishedAt: '2026-04-09',
    tags: ['Internal Marks', 'Mid Exams', 'JNTUH IA', 'R22', 'R18', 'Academic Guide'],
    content: `
      <div class="not-prose mb-8">
        <p class="text-lg text-slate-600 dark:text-slate-300">Your internal marks (IA) form 30 out of every 100 marks in JNTUH. Getting good internals can be the difference between passing and failing without even writing a great end-semester exam. Here's exactly how they're calculated.</p>
      </div>

      <h2>The 30-Mark Internal Assessment Breakdown</h2>
      <p>JNTUH awards 30 internal marks per subject, split across three components:</p>

      <div class="not-prose grid gap-4 md:grid-cols-3 my-8">
        <div class="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 p-6 rounded-2xl text-center">
          <p class="text-4xl font-black text-blue-600 mb-2">25</p>
          <p class="font-bold text-blue-800 dark:text-blue-200 mb-1">Mid-term Exams</p>
          <p class="text-xs text-blue-600 dark:text-blue-400">Best of 2 mids, scaled to 25 marks</p>
        </div>
        <div class="bg-purple-50 dark:bg-purple-900/10 border-2 border-purple-200 dark:border-purple-800 p-6 rounded-2xl text-center">
          <p class="text-4xl font-black text-purple-600 mb-2">5</p>
          <p class="font-bold text-purple-800 dark:text-purple-200 mb-1">Assignments</p>
          <p class="text-xs text-purple-600 dark:text-purple-400">Typically 5 marks for 2 assignments</p>
        </div>
        <div class="bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-200 dark:border-emerald-800 p-6 rounded-2xl text-center">
          <p class="text-4xl font-black text-emerald-600 mb-2">30</p>
          <p class="font-bold text-emerald-800 dark:text-emerald-200 mb-1">Total Internal</p>
          <p class="text-xs text-emerald-600 dark:text-emerald-400">Out of 100 total marks</p>
        </div>
      </div>

      <h2>How Mid-Term Exams Work in JNTUH</h2>
      <p>Each semester has <strong>two mid-term exams</strong> — Mid-1 (after 8–9 weeks) and Mid-2 (at the end of the semester). Each covers approximately half the syllabus:</p>

      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-6">
        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Mid Exam</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Max Marks</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Units Covered</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Scaled To</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="px-4 py-3 text-left font-semibold">Mid-1</td><td class="py-3">30</td><td class="py-3">Units 1, 2, 3</td><td class="py-3 font-bold text-blue-600">Out of 25</td></tr>
            <tr><td class="px-4 py-3 text-left font-semibold">Mid-2</td><td class="py-3">30</td><td class="py-3">Units 3, 4, 5</td><td class="py-3 font-bold text-blue-600">Out of 25</td></tr>
          </tbody>
        </table>
      </div>

      <p>JNTUH takes the <strong>best of the two mid scores</strong> (after scaling both to 25) for the final internal calculation — not the average. This means if you perform poorly in Mid-1 but well in Mid-2, only Mid-2 counts.</p>

      <h3>Mid-Exam Scaling Formula</h3>
      <div class="bg-slate-900 text-white p-6 rounded-2xl font-mono text-center my-6 shadow-lg">
        Scaled Score = (Marks Obtained / 30) × 25
      </div>

      <h3>Example</h3>
      <p>A student scored 22/30 in Mid-1 and 27/30 in Mid-2:</p>
      <ul>
        <li>Mid-1 scaled: (22/30) × 25 = <strong>18.33/25</strong></li>
        <li>Mid-2 scaled: (27/30) × 25 = <strong>22.5/25</strong></li>
        <li>Best of two: <strong>22.5</strong> is taken for IA</li>
        <li>Add assignments (say 4/5): Total IA = 22.5 + 4 = <strong>26.5/30</strong> → rounded to 27</li>
      </ul>

      <h2>How Lab Internal Marks Work</h2>
      <p>Lab subjects have a different IA structure:</p>

      <div class="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-6">
        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Component</th>
              <th class="px-4 py-3 border-b dark:border-slate-800">Marks</th>
              <th class="px-4 py-3 border-b dark:border-slate-800 text-left">Based On</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            <tr><td class="px-4 py-3 text-left font-semibold">Lab Record (Journal)</td><td class="py-3">20</td><td class="px-4 py-3 text-left text-slate-500">Neatness, completion of all experiments, observations</td></tr>
            <tr><td class="px-4 py-3 text-left font-semibold">Lab Internal Exam</td><td class="py-3">30</td><td class="px-4 py-3 text-left text-slate-500">Conducting an experiment and viva questions</td></tr>
            <tr class="bg-slate-50 dark:bg-slate-900/50"><td class="px-4 py-3 text-left font-bold">Total Lab IA</td><td class="py-3 font-black text-blue-600">50</td><td class="px-4 py-3 text-left text-slate-500">Out of 50 (internal). External lab exam is another 50.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Why Internal Marks Matter So Much</h2>
      <div class="my-6 p-5 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 rounded-r-xl">
        <p class="font-bold text-amber-800 dark:text-amber-200 m-0">With 25+ internal marks, passing becomes much easier.</p>
        <p class="mt-2 text-amber-700 dark:text-amber-300 m-0">To pass, you need 40/100 total AND 25/70 in external (35%). If you have 25 internals, you only need 15 more in external — that's just scoring 21% in the end-sem exam. Strong internals give you a huge buffer.</p>
      </div>

      <h2>How to Maximize Your Internal Marks</h2>
      <div class="not-prose grid gap-4 md:grid-cols-2 my-8">
        <div class="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="font-bold text-slate-900 dark:text-white mb-2">Submit all assignments on time</p>
          <p class="text-sm text-slate-500 m-0">Assignment marks (5 marks) are often given generously to students who submit on time, even if quality is average. Never skip assignments.</p>
        </div>
        <div class="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="font-bold text-slate-900 dark:text-white mb-2">Focus on Mid-2 if you bombed Mid-1</p>
          <p class="text-sm text-slate-500 m-0">Since JNTUH takes the best mid score, Mid-2 is your recovery opportunity. Prepare specifically for it — it covers Units 3, 4, 5 which overlap with the end-sem.</p>
        </div>
        <div class="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="font-bold text-slate-900 dark:text-white mb-2">Keep lab journal complete and neat</p>
          <p class="text-sm text-slate-500 m-0">Lab journal marks are the easiest 15–20 marks you'll ever get. A complete, neat record book with all experiments is almost always full marks from faculty.</p>
        </div>
        <div class="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="font-bold text-slate-900 dark:text-white mb-2">Don't ignore attendance for IA</p>
          <p class="text-sm text-slate-500 m-0">In some colleges, attendance directly affects assignment or participation marks (part of the 5-mark component). Below 75% can also impact how faculty view your IA.</p>
        </div>
      </div>

      <h2>Frequently Asked Questions</h2>
      <div class="space-y-4 not-prose">
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Can I see my internal marks before the end-sem exam?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes. Your college is required to display internal marks (both mid scores and final IA) on the notice board or college portal before the end-semester exam. If you disagree with your marks, you have the right to raise a grievance with your college examination cell before the marks are submitted to JNTUH.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Can internal marks be changed after submission to JNTUH?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Once submitted to JNTUH by your college, internal marks are very difficult to change. There is a formal correction request process, but it requires strong justification and principal's approval. This is why it's important to check your IA marks before the end-sem exam and raise any errors with your college immediately.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>Do internal marks carry over when you appear for a supplementary exam?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes. Your internal marks (IA) are fixed and carry over to supplementary exams. You do not retake mid exams or resubmit assignments when writing a supplementary. Only the external exam (70 marks) is re-attempted. This means the internals you earned during the regular semester are counted every time you appear for that subject.
            </p>
          </details>
        </div>
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
          <details class="p-6">
            <summary class="flex justify-between items-center font-bold text-slate-900 dark:text-white cursor-pointer list-none">
              <span>What is the minimum score needed in mid exams to pass internals?</span>
              <span class="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              There is no separate "pass" mark for internals — the 40% pass requirement applies to the final total (40/100), and the only separate minimum is 35% in the external exam (25/70). However, getting at least 15/30 in your best mid exam (scaled to 12.5/25) and full assignment marks (5/5) gives you 17.5/30 IA — combined with external, you'd need 22.5/70 externally to pass, which is very achievable.
            </p>
          </details>
        </div>
      </div>
    `
  }
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(article => article.slug === slug);
}

export function getAllGuides(): Guide[] {
  return [...guides].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
