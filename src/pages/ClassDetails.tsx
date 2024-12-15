import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QrCode, Users, Clock } from 'lucide-react';
import CreateLectureModal from '../components/CreateLectureModal';
import LectureQRCode from '../components/LectureQRCode';
import { Class, Lecture } from '../types';

export default function ClassDetails() {
  const { id } = useParams<{ id: string }>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);

  // Mock data - replace with actual data fetching
  const classData: Class = {
    id: id!,
    name: 'Blockchain Fundamentals',
    teacherId: 'teacher1',
    contractAddress: '0x123...',
    students: ['student1', 'student2'],
    lectures: []
  };

  const handleCreateLecture = async (title: string, validityPeriod: number) => {
    // Implement lecture creation logic using smart contract
    console.log('Creating lecture:', { title, validityPeriod });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          <QrCode className="h-5 w-5 mr-2" />
          Create New Lecture
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Class Information</h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span>{classData.students.length} Students Enrolled</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>{classData.lectures.length} Lectures Conducted</span>
            </div>
          </div>
        </div>

        {activeLecture && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Active Lecture</h2>
            <LectureQRCode
              lectureId={activeLecture.id}
              validityPeriod={activeLecture.validityPeriod}
            />
          </div>
        )}
      </div>

      <CreateLectureModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateLecture={handleCreateLecture}
      />
    </div>
  );
}