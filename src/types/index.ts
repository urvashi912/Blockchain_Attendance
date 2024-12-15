export interface User {
  id: string;
  role: 'teacher' | 'student';
  name: string;
  walletAddress: string;
}

export interface Lecture {
  id: string;
  classId: string;
  title: string;
  timestamp: number;
  validityPeriod: number;
  qrCode?: string;
}

export interface Class {
  id: string;
  name: string;
  teacherId: string;
  contractAddress: string;
  students: string[];
  lectures: Lecture[];
}