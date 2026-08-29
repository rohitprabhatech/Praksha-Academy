/**
 * assessmentService.js
 * Frontend mock service for Sprint 11 - Owner Assignments, Quizzes & Exams.
 * Replace with real API calls in future sprints.
 */

import { getCourses } from './courseService';

const STORAGE_KEY = 'praksha_academy_assessments';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = (prefix) =>
  `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

const defaultData = {
  assignments: [
    {
      id: 'a1',
      title: 'Python Basics Assignment',
      courseId: '1',
      dueDate: '2026-09-15',
      instructions: 'Complete the Python basics exercises.',
      attachment: null,
      status: 'Published',
    },
  ],

  quizzes: [
    {
      id: 'q1',
      title: 'Python Fundamentals Quiz',
      courseId: '1',
      date: '2026-09-10',
      duration: '30',
      status: 'Published',
      questions: [
        {
          id: 'qq1',
          prompt: 'Which keyword is used to define a function in Python?',
          type: 'MCQ',
          options: ['function', 'def', 'func', 'define'],
          answer: 'def',
        },
      ],
      results: [
        {
          id: 'qr1',
          student: 'Aarav Sharma',
          score: 8,
          total: 10,
        },
        {
          id: 'qr2',
          student: 'Priya Patil',
          score: 9,
          total: 10,
        },
      ],
    },
  ],

  exams: [
    {
      id: 'e1',
      title: 'Python Final Examination',
      courseId: '1',
      date: '2026-10-01',
      duration: '120',
      status: 'Draft',
      questions: [
        {
          id: 'eq1',
          prompt: 'What is the output of print(2 + 3)?',
          type: 'MCQ',
          options: ['4', '5', '6', '23'],
          answer: '5',
        },
      ],
      results: [
        {
          id: 'er1',
          student: 'Aarav Sharma',
          score: 82,
          total: 100,
        },
        {
          id: 'er2',
          student: 'Priya Patil',
          score: 91,
          total: 100,
        },
      ],
    },
  ],

  submissions: {
    a1: [
      {
        id: 'sub1',
        student: 'Aarav Sharma',
        date: '2026-08-20',
        status: 'Submitted',
        score: 9,
      },
      {
        id: 'sub2',
        student: 'Priya Patil',
        date: '2026-08-21',
        status: 'Submitted',
        score: 8,
      },
      {
        id: 'sub3',
        student: 'Rahul Joshi',
        date: '2026-08-22',
        status: 'Pending',
        score: null,
      },
    ],
  },
};

const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load assessments:', error);
  }

  return structuredClone(defaultData);
};

let data = loadData();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save assessments:', error);
  }
};

const getCourseName = async (courseId) => {
  const courses = await getCourses();
  return courses.find((course) => course.id === courseId)?.name || 'Unknown Course';
};

// -----------------------------------------------------------------------------
// Assignments
// -----------------------------------------------------------------------------

export async function getAssignments() {
  await delay(500);

  const assignments = await Promise.all(
    data.assignments.map(async (assignment) => ({
      ...assignment,
      courseName: await getCourseName(assignment.courseId),
    }))
  );

  return assignments;
}

export async function getAssignmentById(id) {
  await delay(400);

  const assignment = data.assignments.find(
    (item) => item.id === id
  );

  if (!assignment) {
    throw new Error('Assignment not found');
  }

  return {
    ...assignment,
    courseName: await getCourseName(assignment.courseId),
  };
}

export async function createAssignment(payload) {
  await delay(700);

  if (!payload.title || !payload.courseId || !payload.status) {
    throw new Error('Title, course and status are required');
  }

  if (payload.status === 'Published' && !payload.dueDate) {
    throw new Error('Due date is required when publishing an assignment');
  }

  const assignment = {
    ...payload,
    id: generateId('assignment'),
  };

  data.assignments = [assignment, ...data.assignments];
  data.submissions[assignment.id] = [];

  persist();

  return assignment;
}

export async function deleteAssignment(id) {
  await delay(500);

  const exists = data.assignments.some(
    (assignment) => assignment.id === id
  );

  if (!exists) {
    throw new Error('Assignment not found');
  }

  data.assignments = data.assignments.filter(
    (assignment) => assignment.id !== id
  );

  delete data.submissions[id];

  persist();

  return { success: true };
}

export async function getAssignmentSubmissions(id) {
  await delay(500);

  const assignment = data.assignments.find(
    (item) => item.id === id
  );

  if (!assignment) {
    throw new Error('Assignment not found');
  }

  return data.submissions[id] || [];
}

// -----------------------------------------------------------------------------
// Quizzes
// -----------------------------------------------------------------------------

export async function getQuizzes() {
  await delay(500);

  return Promise.all(
    data.quizzes.map(async (quiz) => ({
      ...quiz,
      courseName: await getCourseName(quiz.courseId),
      questionCount: quiz.questions?.length || 0,
    }))
  );
}

export async function getQuizById(id) {
  await delay(400);

  const quiz = data.quizzes.find((item) => item.id === id);

  if (!quiz) {
    throw new Error('Quiz not found');
  }

  return {
    ...quiz,
    courseName: await getCourseName(quiz.courseId),
  };
}

export async function createQuiz(payload) {
  await delay(700);

  if (!payload.title || !payload.courseId || !payload.status) {
    throw new Error('Title, course and status are required');
  }

  const quiz = {
    ...payload,
    id: generateId('quiz'),
    questions: [],
    results: [],
  };

  data.quizzes = [quiz, ...data.quizzes];

  persist();

  return quiz;
}

export async function updateQuizQuestions(id, questions) {
  await delay(600);

  const index = data.quizzes.findIndex(
    (quiz) => quiz.id === id
  );

  if (index === -1) {
    throw new Error('Quiz not found');
  }

  data.quizzes[index].questions = questions;

  persist();

  return data.quizzes[index];
}

export async function deleteQuiz(id) {
  await delay(500);

  const exists = data.quizzes.some(
    (quiz) => quiz.id === id
  );

  if (!exists) {
    throw new Error('Quiz not found');
  }

  data.quizzes = data.quizzes.filter(
    (quiz) => quiz.id !== id
  );

  persist();

  return { success: true };
}

export async function getQuizResults(id) {
  await delay(500);

  const quiz = data.quizzes.find(
    (item) => item.id === id
  );

  if (!quiz) {
    throw new Error('Quiz not found');
  }

  return quiz.results || [];
}

// -----------------------------------------------------------------------------
// Exams
// -----------------------------------------------------------------------------

export async function getExams() {
  await delay(500);

  return Promise.all(
    data.exams.map(async (exam) => ({
      ...exam,
      courseName: await getCourseName(exam.courseId),
      questionCount: exam.questions?.length || 0,
    }))
  );
}

export async function getExamById(id) {
  await delay(400);

  const exam = data.exams.find((item) => item.id === id);

  if (!exam) {
    throw new Error('Exam not found');
  }

  return {
    ...exam,
    courseName: await getCourseName(exam.courseId),
  };
}

export async function createExam(payload) {
  await delay(700);

  if (!payload.title || !payload.courseId || !payload.status) {
    throw new Error('Title, course and status are required');
  }

  const exam = {
    ...payload,
    id: generateId('exam'),
    questions: [],
    results: [],
  };

  data.exams = [exam, ...data.exams];

  persist();

  return exam;
}

export async function updateExamQuestions(id, questions) {
  await delay(600);

  const index = data.exams.findIndex(
    (exam) => exam.id === id
  );

  if (index === -1) {
    throw new Error('Exam not found');
  }

  data.exams[index].questions = questions;

  persist();

  return data.exams[index];
}

export async function deleteExam(id) {
  await delay(500);

  const exists = data.exams.some(
    (exam) => exam.id === id
  );

  if (!exists) {
    throw new Error('Exam not found');
  }

  data.exams = data.exams.filter(
    (exam) => exam.id !== id
  );

  persist();

  return { success: true };
}

export async function getExamResults(id) {
  await delay(500);

  const exam = data.exams.find(
    (item) => item.id === id
  );

  if (!exam) {
    throw new Error('Exam not found');
  }

  return exam.results || [];
}