import { useState, useCallback } from 'react';
import { contractService } from '../services/contract';
import { Class, Lecture } from '../types';

export const useClass = (classId: string) => {
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClassDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contractService.getClassDetails(classId);
      setClassData(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch class details';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  const createLecture = useCallback(async (title: string, validityPeriod: number): Promise<Lecture> => {
    try {
      setError(null);
      return await contractService.createLecture(classId, title, validityPeriod);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create lecture';
      setError(message);
      throw err;
    }
  }, [classId]);

  return {
    classData,
    loading,
    error,
    fetchClassDetails,
    createLecture
  };
};