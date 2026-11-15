export interface SyllabusDoc {
  yearTitle: string;
  semesters: string;
  pdfUrl: string;
  fileName: string;
  fileSize?: string;
}

export interface RegulationSyllabus {
  regulation: string;
  status: 'Latest' | 'Active' | 'Archived';
  description: string;
  creditSystem: string;
  docs: SyllabusDoc[];
}

export interface BranchSyllabusData {
  branchCode: string;
  shortName: string;
  fullName: string;
  description: string;
  regulations: RegulationSyllabus[];
}

const BASE_URL = 'https://studentservices.jntuh.ac.in/oss/resources/files/SYLLABUS';

export const BRANCH_SYLLABUS: Record<string, BranchSyllabusData> = {
  cse: {
    branchCode: 'cse',
    shortName: 'CSE',
    fullName: 'Computer Science and Engineering',
    description: 'Official JNTUH Computer Science and Engineering syllabus covering Data Structures, Algorithms, OS, DBMS, AI/ML, and Software Engineering.',
    regulations: [
      {
        regulation: 'R22',
        status: 'Latest',
        description: 'Choice Based Credit System (CBCS) implemented from 2022-23 academic year.',
        creditSystem: '160 Credits Total (40/60 Assessment Pattern)',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R22 B.Tech. CSE I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/1.B.Tech I Year R22 Syllabus/R22 B.Tech. CSE I Year Syllabus.pdf`,
            fileSize: '1.2 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R22 B.Tech. CSE I and II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/2.B.Tech II Year R22 Syllabus/R22 B.Tech. CSE I and II Year Syllabus.pdf`,
            fileSize: '1.8 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R22 B.Tech. CSE III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/3.B.Tech III Year R22 Syllabus/R22 B.Tech. CSE III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R22 B.Tech. CSE IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/4.B.Tech IV Year R22 Syllabus/R22 B.Tech. CSE IV Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
        ],
      },
      {
        regulation: 'R18',
        status: 'Active',
        description: 'AICTE Model Curriculum CBCS regulation for 2018–2021 batches.',
        creditSystem: '160 Credits Total (25/75 Assessment Pattern)',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R18 B.Tech. CSE I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/1.B.Tech I Year R18 Syllabus/R18 B.Tech. CSE I Year Syllabus.pdf`,
            fileSize: '1.1 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R18 B.Tech. CSE II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/2.B.Tech II Year R18 Syllabus/R18 B.Tech. CSE II Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R18 B.Tech. CSE III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/3.B.Tech III Year R18 Syllabus/R18 B.Tech. CSE III Year Syllabus.pdf`,
            fileSize: '1.6 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R18 B.Tech. CSE IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/4.B.Tech IV Year R18 Syllabus/R18 B.Tech. CSE IV Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
        ],
      },
      {
        regulation: 'R16',
        status: 'Archived',
        description: 'Complete 4-Year B.Tech curriculum for R16 regulation candidates.',
        creditSystem: '192 Credits Total',
        docs: [
          {
            yearTitle: 'Complete 4-Year Curriculum',
            semesters: '1st to 8th Semesters',
            fileName: 'R16 B.Tech CSE Complete Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/3.R16/R16 B.Tech CSE Complete Syllabus.pdf`,
            fileSize: '2.5 MB',
          },
        ],
      },
    ],
  },
  ece: {
    branchCode: 'ece',
    shortName: 'ECE',
    fullName: 'Electronics and Communication Engineering',
    description: 'Official JNTUH ECE syllabus covering Analog & Digital Circuits, Signals & Systems, VLSI, Embedded Systems, and Communication Networks.',
    regulations: [
      {
        regulation: 'R22',
        status: 'Latest',
        description: 'Updated R22 curriculum with focus on VLSI, IoT, and Embedded electronics.',
        creditSystem: '160 Credits Total (40/60 Assessment Pattern)',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R22 B.Tech. ECE I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/1.B.Tech I Year R22 Syllabus/R22 B.Tech. ECE I Year Syllabus.pdf`,
            fileSize: '1.2 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R22 B.Tech. ECE I and II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/2.B.Tech II Year R22 Syllabus/R22 B.Tech. ECE I and II Year Syllabus.pdf`,
            fileSize: '1.7 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R22 B.Tech. ECE III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/3.B.Tech III Year R22 Syllabus/R22 B.Tech. ECE III Year Syllabus.pdf`,
            fileSize: '1.6 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R22 B.Tech. ECE IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/4.B.Tech IV Year R22 Syllabus/R22 B.Tech. ECE IV Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
        ],
      },
      {
        regulation: 'R18',
        status: 'Active',
        description: 'Official R18 curriculum for Electronics and Communication Engineering.',
        creditSystem: '160 Credits Total (25/75 Assessment Pattern)',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R18 B.Tech. ECE I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/1.B.Tech I Year R18 Syllabus/R18 B.Tech. ECE I Year Syllabus.pdf`,
            fileSize: '1.1 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R18 B.Tech. ECE II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/2.B.Tech II Year R18 Syllabus/R18 B.Tech. ECE II Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R18 B.Tech. ECE III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/3.B.Tech III Year R18 Syllabus/R18 B.Tech. ECE III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R18 B.Tech. ECE IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/4.B.Tech IV Year R18 Syllabus/R18 B.Tech. ECE IV Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
        ],
      },
      {
        regulation: 'R16',
        status: 'Archived',
        description: 'Complete 4-Year B.Tech ECE curriculum for R16 candidates.',
        creditSystem: '192 Credits Total',
        docs: [
          {
            yearTitle: 'Complete 4-Year Curriculum',
            semesters: '1st to 8th Semesters',
            fileName: 'R16 B.Tech ECE Complete Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/3.R16/R16 B.Tech ECE Complete Syllabus.pdf`,
            fileSize: '2.4 MB',
          },
        ],
      },
    ],
  },
  eee: {
    branchCode: 'eee',
    shortName: 'EEE',
    fullName: 'Electrical and Electronics Engineering',
    description: 'Official JNTUH EEE syllabus covering Power Systems, Control Systems, Power Electronics, Machines, and Renewable Energy.',
    regulations: [
      {
        regulation: 'R22',
        status: 'Latest',
        description: 'R22 Electrical and Electronics curriculum with Smart Grid & EV Technology.',
        creditSystem: '160 Credits Total (40/60 Assessment Pattern)',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R22 B.Tech. EEE I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/1.B.Tech I Year R22 Syllabus/R22 B.Tech. EEE I Year Syllabus.pdf`,
            fileSize: '1.1 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R22 B.Tech. EEE I and II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/2.B.Tech II Year R22 Syllabus/R22 B.Tech. EEE I and II Year Syllabus.pdf`,
            fileSize: '1.6 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R22 B.Tech. EEE III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/3.B.Tech III Year R22 Syllabus/R22 B.Tech. EEE III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R22 B.Tech. EEE IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/4.B.Tech IV Year R22 Syllabus/R22 B.Tech. EEE IV Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
        ],
      },
      {
        regulation: 'R18',
        status: 'Active',
        description: 'Official R18 curriculum for Electrical and Electronics Engineering.',
        creditSystem: '160 Credits Total',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R18 B.Tech. EEE I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/1.B.Tech I Year R18 Syllabus/R18 B.Tech. EEE I Year Syllabus.pdf`,
            fileSize: '1.1 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R18 B.Tech. EEE II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/2.B.Tech II Year R18 Syllabus/R18 B.Tech. EEE II Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R18 B.Tech. EEE III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/3.B.Tech III Year R18 Syllabus/R18 B.Tech. EEE III Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R18 B.Tech. EEE IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/4.B.Tech IV Year R18 Syllabus/R18 B.Tech. EEE IV Year Syllabus.pdf`,
            fileSize: '1.2 MB',
          },
        ],
      },
      {
        regulation: 'R16',
        status: 'Archived',
        description: 'Complete 4-Year B.Tech EEE curriculum for R16 candidates.',
        creditSystem: '192 Credits Total',
        docs: [
          {
            yearTitle: 'Complete 4-Year Curriculum',
            semesters: '1st to 8th Semesters',
            fileName: 'R16 B.Tech EEE Complete Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/3.R16/R16 B.Tech EEE Complete Syllabus.pdf`,
            fileSize: '2.3 MB',
          },
        ],
      },
    ],
  },
  me: {
    branchCode: 'me',
    shortName: 'ME',
    fullName: 'Mechanical Engineering',
    description: 'Official JNTUH Mechanical Engineering syllabus covering Thermodynamics, Heat Transfer, Machine Design, CAD/CAM, and Manufacturing Systems.',
    regulations: [
      {
        regulation: 'R22',
        status: 'Latest',
        description: 'R22 Mechanical Engineering curriculum with Automation & Robotics electives.',
        creditSystem: '160 Credits Total (40/60 Assessment Pattern)',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R22 B.Tech. MECHANICAL ENGG. I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/1.B.Tech I Year R22 Syllabus/R22 B.Tech. MECHANICAL ENGG. I Year Syllabus.pdf`,
            fileSize: '1.2 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R22 B.Tech. MECHANICAL ENGG. I & II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/2.B.Tech II Year R22 Syllabus/R22 B.Tech. MECHANICAL ENGG. I & II Year Syllabus.pdf`,
            fileSize: '1.7 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R22 B.Tech. ME III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/3.B.Tech III Year R22 Syllabus/R22 B.Tech. ME III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R22 B.Tech. ME IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/4.B.Tech IV Year R22 Syllabus/R22 B.Tech. ME IV Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
        ],
      },
      {
        regulation: 'R18',
        status: 'Active',
        description: 'Official R18 curriculum for Mechanical Engineering.',
        creditSystem: '160 Credits Total',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R18 B.Tech. ME I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/1.B.Tech I Year R18 Syllabus/R18 B.Tech. ME I Year Syllabus.pdf`,
            fileSize: '1.1 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R18 B.Tech. ME II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/2.B.Tech II Year R18 Syllabus/R18 B.Tech. ME II Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R18 B.Tech. ME III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/3.B.Tech III Year R18 Syllabus/R18 B.Tech. ME III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R18 B.Tech. ME IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/4.B.Tech IV Year R18 Syllabus/R18 B.Tech. ME IV Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
        ],
      },
      {
        regulation: 'R16',
        status: 'Archived',
        description: 'Complete 4-Year B.Tech Mechanical Engineering curriculum for R16 candidates.',
        creditSystem: '192 Credits Total',
        docs: [
          {
            yearTitle: 'Complete 4-Year Curriculum',
            semesters: '1st to 8th Semesters',
            fileName: 'R16 B.Tech ME Complete Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/3.R16/R16 B.Tech ME Complete Syllabus.pdf`,
            fileSize: '2.5 MB',
          },
        ],
      },
    ],
  },
  ce: {
    branchCode: 'ce',
    shortName: 'CE',
    fullName: 'Civil Engineering',
    description: 'Official JNTUH Civil Engineering syllabus covering Structural Analysis, Concrete Technology, Geotechnical Engineering, and Transportation.',
    regulations: [
      {
        regulation: 'R22',
        status: 'Latest',
        description: 'R22 Civil Engineering curriculum with Smart Infrastructure and GIS electives.',
        creditSystem: '160 Credits Total (40/60 Assessment Pattern)',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R22 B.Tech. CIVIL ENGG. I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/1.B.Tech I Year R22 Syllabus/R22 B.Tech. CIVIL ENGG. I Year Syllabus.pdf`,
            fileSize: '1.2 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R22 B.Tech. CIVIL ENGG. I & II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/2.B.Tech II Year R22 Syllabus/R22 B.Tech. CIVIL ENGG. I & II Year Syllabus.pdf`,
            fileSize: '1.7 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R22 B.Tech. CIVIL ENGG. III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/3.B.Tech III Year R22 Syllabus/R22 B.Tech. CIVIL ENGG. III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R22 B.Tech. CIVIL ENGG. IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/4.B.Tech IV Year R22 Syllabus/R22 B.Tech. CIVIL ENGG. IV Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
        ],
      },
      {
        regulation: 'R18',
        status: 'Active',
        description: 'Official R18 curriculum for Civil Engineering.',
        creditSystem: '160 Credits Total',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R18 B.Tech. CE I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/1.B.Tech I Year R18 Syllabus/R18 B.Tech. CE I Year Syllabus.pdf`,
            fileSize: '1.1 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R18 B.Tech. CE II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/2.B.Tech II Year R18 Syllabus/R18 B.Tech. CE II Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R18 B.Tech. CE III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/3.B.Tech III Year R18 Syllabus/R18 B.Tech. CE III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R18 B.Tech. CE IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/4.B.Tech IV Year R18 Syllabus/R18 B.Tech. CE IV Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
        ],
      },
      {
        regulation: 'R16',
        status: 'Archived',
        description: 'Complete 4-Year B.Tech Civil Engineering curriculum for R16 candidates.',
        creditSystem: '192 Credits Total',
        docs: [
          {
            yearTitle: 'Complete 4-Year Curriculum',
            semesters: '1st to 8th Semesters',
            fileName: 'R16 B.Tech CE Complete Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/3.R16/R16 B.Tech CE Complete Syllabus.pdf`,
            fileSize: '2.4 MB',
          },
        ],
      },
    ],
  },
  it: {
    branchCode: 'it',
    shortName: 'IT',
    fullName: 'Information Technology',
    description: 'Official JNTUH Information Technology syllabus covering Web Technologies, Cloud Computing, Cyber Security, and Software Testing.',
    regulations: [
      {
        regulation: 'R22',
        status: 'Latest',
        description: 'R22 Information Technology curriculum focused on Full Stack & Cloud Technologies.',
        creditSystem: '160 Credits Total (40/60 Assessment Pattern)',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R22 B.Tech. IT I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/1.B.Tech I Year R22 Syllabus/R22 B.Tech. IT I Year Syllabus.pdf`,
            fileSize: '1.2 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R22 B.Tech. IT I & II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/2.B.Tech II Year R22 Syllabus/R22 B.Tech. IT I & II Year Syllabus.pdf`,
            fileSize: '1.7 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R22 B.Tech. IT III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/3.B.Tech III Year R22 Syllabus/R22 B.Tech. IT III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R22 B.Tech. IT IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/1.R22/4.B.Tech IV Year R22 Syllabus/R22 B.Tech. IT IV Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
        ],
      },
      {
        regulation: 'R18',
        status: 'Active',
        description: 'Official R18 curriculum for Information Technology.',
        creditSystem: '160 Credits Total',
        docs: [
          {
            yearTitle: 'I Year (1st & 2nd Sem)',
            semesters: '1-1 & 1-2 Semesters',
            fileName: 'R18 B.Tech. IT I Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/1.B.Tech I Year R18 Syllabus/R18 B.Tech. IT I Year Syllabus.pdf`,
            fileSize: '1.1 MB',
          },
          {
            yearTitle: 'II Year (3rd & 4th Sem)',
            semesters: '2-1 & 2-2 Semesters',
            fileName: 'R18 B.Tech. IT II Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/2.B.Tech II Year R18 Syllabus/R18 B.Tech. IT II Year Syllabus.pdf`,
            fileSize: '1.4 MB',
          },
          {
            yearTitle: 'III Year (5th & 6th Sem)',
            semesters: '3-1 & 3-2 Semesters',
            fileName: 'R18 B.Tech. IT III Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/3.B.Tech III Year R18 Syllabus/R18 B.Tech. IT III Year Syllabus.pdf`,
            fileSize: '1.5 MB',
          },
          {
            yearTitle: 'IV Year (7th & 8th Sem)',
            semesters: '4-1 & 4-2 Semesters',
            fileName: 'R18 B.Tech. IT IV Year Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/2.R18/4.B.Tech IV Year R18 Syllabus/R18 B.Tech. IT IV Year Syllabus.pdf`,
            fileSize: '1.3 MB',
          },
        ],
      },
      {
        regulation: 'R16',
        status: 'Archived',
        description: 'Complete 4-Year B.Tech IT curriculum for R16 candidates.',
        creditSystem: '192 Credits Total',
        docs: [
          {
            yearTitle: 'Complete 4-Year Curriculum',
            semesters: '1st to 8th Semesters',
            fileName: 'R16 B.Tech IT Complete Syllabus.pdf',
            pdfUrl: `${BASE_URL}/1.B.Tech/3.R16/R16 B.Tech IT Complete Syllabus.pdf`,
            fileSize: '2.4 MB',
          },
        ],
      },
    ],
  },
};
