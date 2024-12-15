import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateLectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateLecture: (title: string, validityPeriod: number) => Promise<void>;
}

export default function CreateLectureModal({ 
  isOpen, 
  onClose, 
  onCreateLecture 
}: CreateLectureModalProps) {
  const [title, setTitle] = useState('');
  const [validityPeriod, setValidityPeriod] = useState(5); // Default 5 minutes

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateLecture(title, validityPeriod * 60); // Convert to seconds
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Lecture</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lecture Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Validity Period (minutes)
            </label>
            <input
              type="number"
              value={validityPeriod}
              onChange={(e) => setValidityPeriod(Number(e.target.value))}
              min="1"
              max="60"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Create Lecture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}