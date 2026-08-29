/**
 * studentService.js
 * Frontend mock service for Sprint 05 - Owner Student Management.
 *
 * Replace these mock/localStorage operations with real API calls
 * when the backend student API is available.
 */

const STORAGE_KEY = 'praksha_academy_students';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () =>
  `student-${Math.random().toString(36).substring(2, 9)}`;

const defaultStudents = [
  {
    id: 'student-1',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9876543210',
    status: 'Active',
    enrolledCount: 3,
    enrolledCourses: [],
    progress: 68,
    createdAt: '2026-08-01',
  },
  {
    id: 'student-2',
    fullName: 'Priya Patil',
    email: 'priya.patil@example.com',
    phone: '9876543211',
    status: 'Active',
    enrolledCount: 2,
    enrolledCourses: [],
    progress: 82,
    createdAt: '2026-08-05',
  },
  {
    id: 'student-3',
    fullName: 'Rahul Deshmukh',
    email: 'rahul.deshmukh@example.com',
    phone: '9876543212',
    status: 'Inactive',
    enrolledCount: 0,
    enrolledCourses: [],
    progress: 0,
    createdAt: '2026-08-08',
  },
  {
    id: 'student-4',
    fullName: 'Sneha Kulkarni',
    email: 'sneha.kulkarni@example.com',
    phone: '9876543213',
    status: 'Active',
    enrolledCount: 4,
    enrolledCourses: [],
    progress: 74,
    createdAt: '2026-08-10',
  },
  {
    id: 'student-5',
    fullName: 'Vivek Joshi',
    email: 'vivek.joshi@example.com',
    phone: '9876543214',
    status: 'Active',
    enrolledCount: 1,
    enrolledCourses: [],
    progress: 45,
    createdAt: '2026-08-12',
  },
];

const readStudents = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultStudents)
      );

      return [...defaultStudents];
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to read students:', error);
    return [...defaultStudents];
  }
};

const writeStudents = (students) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

/**
 * Get all students.
 */
export const getStudents = async () => {
  await delay(300);
  return readStudents();
};

/**
 * Get a single student by ID.
 */
export const getStudentById = async (id) => {
  await delay(250);

  const students = readStudents();
  return students.find((student) => student.id === id) || null;
};

/**
 * Create a new student.
 */
export const createStudent = async (studentData) => {
  await delay(400);

  const students = readStudents();

  const newStudent = {
    id: generateId(),
    fullName: studentData.fullName.trim(),
    email: studentData.email.trim().toLowerCase(),
    phone: studentData.phone?.trim() || '',
    status: studentData.status || 'Active',
    enrolledCount: 0,
    enrolledCourses: [],
    progress: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updatedStudents = [newStudent, ...students];

  writeStudents(updatedStudents);

  return newStudent;
};

/**
 * Update an existing student.
 */
export const updateStudent = async (id, studentData) => {
  await delay(400);

  const students = readStudents();

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    throw new Error('Student not found.');
  }

  const updatedStudent = {
    ...students[index],
    fullName: studentData.fullName.trim(),
    email: studentData.email.trim().toLowerCase(),
    phone: studentData.phone?.trim() || '',
    status: studentData.status || students[index].status,
  };

  students[index] = updatedStudent;

  writeStudents(students);

  return updatedStudent;
};

/**
 * Delete a student.
 */
export const deleteStudent = async (id) => {
  await delay(350);

  const students = readStudents();

  const studentExists = students.some(
    (student) => student.id === id
  );

  if (!studentExists) {
    throw new Error('Student not found.');
  }

  const updatedStudents = students.filter(
    (student) => student.id !== id
  );

  writeStudents(updatedStudents);

  return true;
};

/**
 * Activate or deactivate a student.
 */
export const updateStudentStatus = async (id, status) => {
  await delay(300);

  const students = readStudents();

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    throw new Error('Student not found.');
  }

  students[index] = {
    ...students[index],
    status,
  };

  writeStudents(students);

  return students[index];
};

/**
 * Toggle student status.
 */
export const toggleStudentStatus = async (id) => {
  const student = await getStudentById(id);

  if (!student) {
    throw new Error('Student not found.');
  }

  const newStatus =
    student.status === 'Active' ? 'Inactive' : 'Active';

  return updateStudentStatus(id, newStatus);
};

/**
 * Clear all mock student data.
 *
 * Useful during development/testing.
 */
export const resetStudents = async () => {
  await delay(200);

  writeStudents(defaultStudents);

  return [...defaultStudents];
};