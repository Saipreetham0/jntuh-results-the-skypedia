// app/page.tsx
'use client';

import { useState } from 'react';

const CoursePage = () => {
    const [linkData, setLinkData] = useState({
        course: '',
        link: '',
        syllabusName: '',
        children: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLinkData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/router', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(linkData),
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="course" placeholder="Course" onChange={handleChange} required />
            <input type="text" name="link" placeholder="Link" onChange={handleChange} required />
            <input type="text" name="syllabusName" placeholder="Syllabus Name" onChange={handleChange} required />
            <button type="submit">Add Link</button>
        </form>
    );
};

export default CoursePage;
