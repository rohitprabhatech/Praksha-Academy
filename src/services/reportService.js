/**
 * reportService.js
 * Frontend mock report service for Admin Reports.
 *
 * Reports are calculated from the application's existing
 * course, assessment and localStorage data.
 */

import { getCourses } from './courseService';
import {
  getAssignments,
  getQuizzes,
  getExams,
} from './assessmentService';

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const CONTACT_STORAGE_KEY =
  'praksha_academy_contact_messages';

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const loadLocalStorage = (key, fallback = []) => {
  try {
    const saved = localStorage.getItem(key);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
  }

  return fallback;
};

const getPercentage = (value, total) => {
  if (!total) return 0;

  return Math.round((value / total) * 100);
};

const getAverage = (values) => {
  if (!values.length) return 0;

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) /
      values.length
  );
};

const getScorePercentage = (score, total) => {
  if (
    typeof score !== 'number' ||
    typeof total !== 'number' ||
    total <= 0
  ) {
    return null;
  }

  return Math.round((score / total) * 100);
};

const getMonthName = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleString('en-US', {
    month: 'short',
  });
};

// -----------------------------------------------------------------------------
// Student Reports
// -----------------------------------------------------------------------------

export async function getStudentReport() {
  await delay(500);

  const contacts = loadLocalStorage(
    CONTACT_STORAGE_KEY
  );

  /*
   * There is currently no dedicated student service.
   * Contact records are therefore used only as available
   * user activity data.
   */

  const studentRecords = contacts.filter(
    (item) =>
      item &&
      item.name &&
      item.email
  );

  const totalStudents = studentRecords.length;

  const recentStudents = studentRecords
    .slice()
    .sort((a, b) => {
      return (
        new Date(b.date || 0) -
        new Date(a.date || 0)
      );
    })
    .map((student) => ({
      id: student.id,
      name: student.name,
      email: student.email,
      course: student.program || '-',
      enrolledOn: student.date || '-',
      status:
        student.status === 'New'
          ? 'Active'
          : 'Inactive',
    }));

  const activeStudents =
    recentStudents.filter(
      (student) => student.status === 'Active'
    ).length;

  const inactiveStudents =
    totalStudents - activeStudents;

  return {
    stats: {
      totalStudents,
      newThisMonth: totalStudents,
      activeStudents,
      inactiveStudents,
    },

    monthlySignups: [],

    categoryDistribution: [],

    recentStudents,
  };
}

// -----------------------------------------------------------------------------
// Course Reports
// -----------------------------------------------------------------------------

export async function getCourseReport() {
  await delay(500);

  const courses = await getCourses();

  const publishedCourses = courses.filter(
    (course) => course.status === 'Published'
  );

  const draftCourses = courses.filter(
    (course) => course.status === 'Draft'
  );

  /*
   * Enrollment information is not currently stored
   * in courseService.
   *
   * Therefore enrollment cannot be calculated yet.
   */

  const enrollmentData = courses.map((course) => ({
    course: course.name,
    enrollments: 0,
  }));

  const topCourses = courses.map((course) => ({
    id: course.id,
    title: course.name,
    category: course.category || '-',
    enrolled: 0,
    completion: '0%',
    rating: '-',
  }));

  return {
    stats: {
      totalCourses: courses.length,
      published: publishedCourses.length,
      draft: draftCourses.length,
      averageCompletion: 0,
    },

    enrollmentData,

    completionTrend: [],

    topCourses,
  };
}

// -----------------------------------------------------------------------------
// Performance Reports
// -----------------------------------------------------------------------------

export async function getPerformanceReport() {
  await delay(500);

  const [
    courses,
    quizzes,
    exams,
    assignments,
  ] = await Promise.all([
    getCourses(),
    getQuizzes(),
    getExams(),
    getAssignments(),
  ]);

  // ---------------------------------------------------------------------------
  // Quiz scores
  // ---------------------------------------------------------------------------

  const quizScores = [];

  quizzes.forEach((quiz) => {
    (quiz.results || []).forEach((result) => {
      const percentage = getScorePercentage(
        result.score,
        result.total
      );

      if (percentage !== null) {
        quizScores.push({
          percentage,
          student: result.student || 'Unknown Student',
          courseId: quiz.courseId,
          courseName:
            quiz.courseName || 'Unknown Course',
          date: quiz.date || null,
          assessmentType: 'Quiz',
        });
      }
    });
  });

  // ---------------------------------------------------------------------------
  // Exam scores
  // ---------------------------------------------------------------------------

  const examScores = [];

  exams.forEach((exam) => {
    (exam.results || []).forEach((result) => {
      const percentage = getScorePercentage(
        result.score,
        result.total
      );

      if (percentage !== null) {
        examScores.push({
          percentage,
          student: result.student || 'Unknown Student',
          courseId: exam.courseId,
          courseName:
            exam.courseName || 'Unknown Course',
          date: exam.date || null,
          assessmentType: 'Exam',
        });
      }
    });
  });

  const allScores = [
    ...quizScores,
    ...examScores,
  ];

  // ---------------------------------------------------------------------------
  // Overall statistics
  // ---------------------------------------------------------------------------

  const quizScoreValues = quizScores.map(
    (item) => item.percentage
  );

  const examScoreValues = examScores.map(
    (item) => item.percentage
  );

  const allScoreValues = allScores.map(
    (item) => item.percentage
  );

  const averageQuizScore =
    getAverage(quizScoreValues);

  const averageScore =
    getAverage(allScoreValues);

  const passedScores = allScoreValues.filter(
    (score) => score >= 40
  );

  const passRate = getPercentage(
    passedScores.length,
    allScoreValues.length
  );

  /*
   * Certificates are not stored by the current
   * assessment/course services.
   *
   * Keep this at zero instead of inventing data.
   */
  const certificates = 0;

  /*
   * At this stage assignmentsDone represents the
   * number of created assignments.
   */
  const assignmentsCount = assignments.length;

  // ---------------------------------------------------------------------------
  // Average score by course
  // ---------------------------------------------------------------------------

  const courseScoreMap = {};

  allScores.forEach((item) => {
    const courseKey =
      item.courseId || item.courseName;

    if (!courseScoreMap[courseKey]) {
      courseScoreMap[courseKey] = {
        courseId: item.courseId,
        course: item.courseName,
        scores: [],
      };
    }

    courseScoreMap[courseKey].scores.push(
      item.percentage
    );
  });

  const coursePerformance = Object.values(
    courseScoreMap
  )
    .map((item) => ({
      course: item.course,
      avgScore: getAverage(item.scores),
      attempts: item.scores.length,
    }))
    .sort((a, b) => b.avgScore - a.avgScore);

  /*
   * If there are courses without assessment results,
   * they are intentionally not added to the chart.
   *
   * Showing 0% would incorrectly suggest students
   * actually scored zero.
   */

  // ---------------------------------------------------------------------------
  // Monthly average performance
  // ---------------------------------------------------------------------------

  const monthlyScoreMap = {};

  allScores.forEach((item) => {
    const month = getMonthName(item.date);

    if (!month) return;

    if (!monthlyScoreMap[month]) {
      monthlyScoreMap[month] = [];
    }

    monthlyScoreMap[month].push(
      item.percentage
    );
  });

  /*
   * Sort using actual date order rather than alphabetically.
   */

  const monthOrder = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthlyPerformance = Object.entries(
    monthlyScoreMap
  )
    .map(([month, scores]) => ({
      month,
      score: getAverage(scores),
    }))
    .sort(
      (a, b) =>
        monthOrder.indexOf(a.month) -
        monthOrder.indexOf(b.month)
    );

  // ---------------------------------------------------------------------------
  // Top performing students
  // ---------------------------------------------------------------------------

  const studentPerformanceMap = {};

  allScores.forEach((item) => {
    const studentName =
      item.student || 'Unknown Student';

    if (!studentPerformanceMap[studentName]) {
      studentPerformanceMap[studentName] = {
        name: studentName,
        scores: [],
        courses: new Set(),
        quizCount: 0,
        examCount: 0,
      };
    }

    studentPerformanceMap[
      studentName
    ].scores.push(item.percentage);

    if (item.courseName) {
      studentPerformanceMap[
        studentName
      ].courses.add(item.courseName);
    }

    if (item.assessmentType === 'Quiz') {
      studentPerformanceMap[
        studentName
      ].quizCount += 1;
    }

    if (item.assessmentType === 'Exam') {
      studentPerformanceMap[
        studentName
      ].examCount += 1;
    }
  });

  const topStudents = Object.values(
    studentPerformanceMap
  )
    .map((student) => ({
      name: student.name,
      course:
        Array.from(student.courses).join(', ') ||
        '-',
      quizScore: `${getAverage(
        student.scores
      )}%`,
      assignments: student.quizCount +
        student.examCount,
      certificates: 0,
      averageScore: getAverage(
        student.scores
      ),
    }))
    .sort(
      (a, b) =>
        b.averageScore - a.averageScore
    )
    .slice(0, 10)
    .map((student, index) => ({
      ...student,
      rank: `#${index + 1}`,
    }));

  // ---------------------------------------------------------------------------
  // Return report
  // ---------------------------------------------------------------------------

  return {
    stats: {
      averageQuizScore,
      assignmentsDone: assignmentsCount,
      passRate,
      certificates,
    },

    coursePerformance,

    monthlyPerformance,

    topStudents,

    summary: {
      averageScore,
      quizAttempts: quizScores.length,
      examAttempts: examScores.length,
      totalAttempts: allScores.length,
    },
  };
}

// -----------------------------------------------------------------------------
// Revenue Reports
// -----------------------------------------------------------------------------

export async function getRevenueReport() {
  await delay(500);

  const courses = await getCourses();

  /*
   * There is currently no payment/enrollment
   * transaction service.
   *
   * Course price is not the same as revenue.
   * Therefore revenue is not fabricated.
   */

  const revenueByCourse = courses.map((course) => ({
    course: course.name,
    revenue: 0,
  }));

  return {
    stats: {
      totalRevenue: 0,
      thisMonth: 0,
      pending: 0,
      refunds: 0,
    },

    monthlyRevenue: [],

    revenueByCourse,

    transactions: [],
  };
}

// -----------------------------------------------------------------------------
// Combined Reports
// -----------------------------------------------------------------------------

export async function getAllReports() {
  const [
    studentReport,
    courseReport,
    performanceReport,
    revenueReport,
  ] = await Promise.all([
    getStudentReport(),
    getCourseReport(),
    getPerformanceReport(),
    getRevenueReport(),
  ]);

  return {
    student: studentReport,
    course: courseReport,
    performance: performanceReport,
    revenue: revenueReport,
  };
}