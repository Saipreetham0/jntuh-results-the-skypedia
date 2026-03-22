// Re-export from specific type modules.
// Note: api.ts and results.ts share some interface names (Subject, SemesterResult, StudentDetails)
// with different shapes (legacy API format vs normalized format).
// Import directly from the specific file when you need a particular shape:
//   import { Subject } from '@/types/api'       — raw JNTUH API response shape
//   import { Subject } from '@/types/results'   — normalized consolidated result shape

export type { APIResponse, StudentResult, Results, SemesterResult as APISemesterResult, StudentDetails as APIStudentDetails, Subject as APISubject } from './api';
export type { ConsolidatedResult, SemesterResult, StudentDetails, Subject, Exam } from './results';
