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
    }
];

export function getGuideBySlug(slug: string): Guide | undefined {
    return guides.find(article => article.slug === slug);
}

export function getAllGuides(): Guide[] {
    return guides;
}
