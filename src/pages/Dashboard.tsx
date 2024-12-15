import React from 'react';
import { Plus } from 'lucide-react';
import ClassCard from '../components/ClassCard';

const mockClasses = [
  {
    id: '1',
    name: 'Blockchain Fundamentals',
    teacherId: 'teacher1',
    contractAddress: '0x123...',
    students: ['student1', 'student2'],
    lectures: []
  },
  {
    id: '2',
    name: 'Smart Contract Development',
    teacherId: 'teacher1',
    contractAddress: '0x456...',
    students: ['student1', 'student3'],
    lectures: []
  }
];

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
        <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Create New Class
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClasses.map((classData) => (
          <ClassCard 
            key={classData.id} 
            classData={classData}
            onClick={() => console.log('Navigate to class', classData.id)}
          />
        ))}
      </div>
    </div>
  );
}