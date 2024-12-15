import React from 'react';
import { Users, BookOpen } from 'lucide-react';
import { Class } from '../types';

interface ClassCardProps {
  classData: Class;
  onClick: () => void;
}

export default function ClassCard({ classData, onClick }: ClassCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{classData.name}</h3>
      <div className="flex items-center justify-between text-gray-600">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          <span>{classData.students.length} Students</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          <span>{classData.lectures.length} Lectures</span>
        </div>
      </div>
    </div>
  );
}