'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

const branches = ['Computer Science', 'Electrical', 'Mechanical', 'Civil'];
const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function UploadTimetable() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [exams, setExams] = useState([{
    title: '',
    subject: '',
    date: '',
    duration: '',
    color: '#4285f4'
  }]);

  const handleAddExam = () => {
    setExams([...exams, {
      title: '',
      subject: '',
      date: '',
      duration: '',
      color: '#4285f4'
    }]);
  };

  const handleExamChange = (index: number, field: string, value: string) => {
    const updatedExams = [...exams];
    updatedExams[index] = { ...updatedExams[index], [field]: value };
    setExams(updatedExams);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedExams = exams.map(exam => ({
        ...exam,
        branch,
        semester,
        date: new Date(exam.date).toISOString()
      }));

      const { error } = await supabase
        .from('exams')
        .insert(formattedExams);

      if (error) throw error;

      alert('Timetable uploaded successfully!');
      router.refresh();
      router.push('/admin/timetable');
    } catch (error) {
      console.error('Error uploading timetable:', error);
      alert('Failed to upload timetable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Exam Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={branch}
                onValueChange={setBranch}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(b => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={semester}
                onValueChange={setSemester}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(s => (
                    <SelectItem key={s} value={s}>Semester {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {exams.map((exam, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Exam Title"
                    value={exam.title}
                    onChange={(e) => handleExamChange(index, 'title', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Subject"
                    value={exam.subject}
                    onChange={(e) => handleExamChange(index, 'subject', e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="datetime-local"
                    value={exam.date}
                    onChange={(e) => handleExamChange(index, 'date', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Duration (in minutes)"
                    type="number"
                    value={exam.duration}
                    onChange={(e) => handleExamChange(index, 'duration', e.target.value)}
                    required
                  />
                </div>
                <Input
                  type="color"
                  value={exam.color}
                  onChange={(e) => handleExamChange(index, 'color', e.target.value)}
                />
              </div>
            ))}

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddExam}
              >
                Add Another Exam
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload Timetable'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}