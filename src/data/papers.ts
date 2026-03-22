export interface QuestionPaper {
    id: string;
    subject: string;
    code: string;
    branch: string;
    regulation: string;
    year: number;
    semester: number;
    examType: 'Regular' | 'Supply';
    downloadUrl: string;
}

export const MOCK_PAPERS: QuestionPaper[] = [
    {
        id: '1',
        subject: 'Mathematics-I',
        code: 'MA101BS',
        branch: 'Common',
        regulation: 'R22',
        year: 2023,
        semester: 1,
        examType: 'Regular',
        downloadUrl: '#'
    },
    {
        id: '2',
        subject: 'Programming for Problem Solving',
        code: 'CS102ES',
        branch: 'Common',
        regulation: 'R22',
        year: 2023,
        semester: 1,
        examType: 'Regular',
        downloadUrl: '#'
    },
    {
        id: '3',
        subject: 'Applied Physics',
        code: 'PH103BS',
        branch: 'Common',
        regulation: 'R22',
        year: 2023,
        semester: 1,
        examType: 'Regular',
        downloadUrl: '#'
    },
    {
        id: '4',
        subject: 'Digital Electronics',
        code: 'EC302PC',
        branch: 'ECE',
        regulation: 'R18',
        year: 2022,
        semester: 3,
        examType: 'Regular',
        downloadUrl: '#'
    },
    {
        id: '5',
        subject: 'Data Structures',
        code: 'CS301PC',
        branch: 'CSE',
        regulation: 'R18',
        year: 2022,
        semester: 3,
        examType: 'Regular',
        downloadUrl: '#'
    },
    {
        id: '6',
        subject: 'Discrete Mathematics',
        code: 'CS303PC',
        branch: 'CSE',
        regulation: 'R18',
        year: 2021,
        semester: 3,
        examType: 'Supply',
        downloadUrl: '#'
    },
    {
        id: '7',
        subject: 'Electrical Circuit Analysis',
        code: 'EE301PC',
        branch: 'EEE',
        regulation: 'R18',
        year: 2022,
        semester: 3,
        examType: 'Regular',
        downloadUrl: '#'
    }
];
