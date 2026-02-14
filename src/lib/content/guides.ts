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
    title: 'JNTUH CGPA to Percentage Calculator & Formula (R22, R18, R16) - 2024 Update',
    description: 'Calculate your JNTUH percentage from CGPA instantly. Official R22/R18 formula: (CGPA-0.5)*10. Download conversion table and see why the 9.5 multiplier is wrong.',
    publishedAt: '2025-02-14',
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
  }
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(article => article.slug === slug);
}

export function getAllGuides(): Guide[] {
  return [...guides].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
