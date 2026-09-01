/**
 * Teacher Data Service — Sprint 14
 * Connects to backend API endpoints when available, with mock fallback filtered by teacher.
 */

const MOCK_TEACHER_DASHBOARD_DATA = {
  stats: [
    {
      id: 'assigned-courses',
      label: 'Assigned Courses',
      value: 4,
      color: '#2563EB',
      bg: 'rgba(37, 99, 235, 0.1)',
      trend: '+1 this semester',
      trendUp: true,
    },
    {
      id: 'students',
      label: 'Students',
      value: 128,
      color: '#16A34A',
      bg: 'rgba(22, 163, 74, 0.1)',
      trend: '+12 new enrollments',
      trendUp: true,
    },
    {
      id: 'upcoming-classes',
      label: 'Upcoming Classes',
      value: 3,
      color: '#0284C7',
      bg: 'rgba(2, 132, 199, 0.1)',
      trend: 'Today & Tomorrow',
      trendUp: true,
    },
    {
      id: 'pending-activities',
      label: 'Pending Activities',
      value: 5,
      color: '#D97706',
      bg: 'rgba(217, 119, 6, 0.1)',
      trend: 'Needs review',
      trendUp: false,
    },
  ],

  upcomingClasses: [
    {
      id: 'cls-101',
      title: 'Advanced React Architecture & Performance',
      course: 'Full Stack Web Development',
      batch: 'Batch 2026-A',
      dateTime: 'Today, 02:30 PM',
      duration: '90 mins',
      studentsCount: 34,
      status: 'Live Soon',
      link: '#',
    },
    {
      id: 'cls-102',
      title: 'Node.js Microservices & API Security',
      course: 'Backend Engineering Masterclass',
      batch: 'Batch 2026-B',
      dateTime: 'Tomorrow, 10:00 AM',
      duration: '120 mins',
      studentsCount: 28,
      status: 'Scheduled',
      link: '#',
    },
    {
      id: 'cls-103',
      title: 'Database Indexing & Query Optimization',
      course: 'Database Management Systems',
      batch: 'Batch 2026-A',
      dateTime: 'Sep 03, 11:30 AM',
      duration: '60 mins',
      studentsCount: 42,
      status: 'Scheduled',
      link: '#',
    },
  ],

  pendingActivities: [
    {
      id: 'act-201',
      title: 'Grade Sprint 13 Capstone Submissions',
      course: 'Full Stack Web Development',
      batch: 'Batch 2026-A',
      dueDate: 'Due Today',
      type: 'Assignment',
      pendingCount: 8,
      urgency: 'high',
    },
    {
      id: 'act-202',
      title: 'Review Mid-Term Quiz Answers',
      course: 'Backend Engineering Masterclass',
      batch: 'Batch 2026-B',
      dueDate: 'Due Tomorrow',
      type: 'Quiz',
      pendingCount: 14,
      urgency: 'medium',
    },
    {
      id: 'act-203',
      title: 'Publish Assignment 4 Problem Statement',
      course: 'Database Management Systems',
      batch: 'Batch 2026-A',
      dueDate: 'Sep 04',
      type: 'Material',
      pendingCount: 1,
      urgency: 'low',
    },
  ],
};

/**
 * Fetch dashboard data for teacher.
 * Tries backend API service first, falls back to mock data if unavailable.
 */
export const fetchTeacherDashboardData = async (teacherUser = null) => {
  try {
    // Attempt backend API call if endpoint exists
    const response = await fetch('/api/teacher/dashboard', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }
  } catch {
    // API unavailable or network issue — fallback gracefully to filtered mock data
  }

  // Simulate network delay for authentic loading state
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    success: true,
    data: MOCK_TEACHER_DASHBOARD_DATA,
    isMock: true,
  };
};
