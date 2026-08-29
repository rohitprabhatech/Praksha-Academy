import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_STUDENTS } from '../data/students';

const StudentsContext = createContext(null);
const STORAGE_KEY = 'praksha-admin-students';

const readStudents = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  } catch {
    return INITIAL_STUDENTS;
  }
};

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState(readStudents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(students)); }, [students]);

  const value = useMemo(() => ({
    students, loading, error,
    retry: () => { setError(false); setLoading(true); window.setTimeout(() => setLoading(false), 350); },
    addStudent: (student) => setStudents((current) => [...current, { ...student, id: `STU-${Date.now().toString().slice(-6)}` }]),
    updateStudent: (id, student) => setStudents((current) => current.map((item) => item.id === id ? { ...item, ...student, id } : item)),
    deleteStudent: (id) => setStudents((current) => current.filter((item) => item.id !== id)),
  }), [students, loading, error]);
  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
};

export const useStudents = () => {
  const value = useContext(StudentsContext);
  if (!value) throw new Error('useStudents must be used within StudentsProvider');
  return value;
};
