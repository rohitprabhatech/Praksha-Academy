/**
 * courseService.js
 * Frontend mock service for Sprint 08 - Course Management.
 * Replace with real API calls in future sprints.
 */

// ─────────────────────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────────────────────

const mockTeachers = [
  { id: 't1', name: 'Rohan Mehta' },
  { id: 't2', name: 'Sneha Kapoor' },
  { id: 't3', name: 'Aarav Singh' },
]

const mockClasses = [
  { id: 'c1', name: 'Class 10' },
  { id: 'c2', name: 'Class 11' },
  { id: 'c3', name: 'Class 12' },
]

const mockSubjects = [
  { id: 's1', name: 'Mathematics' },
  { id: 's2', name: 'Physics' },
  { id: 's3', name: 'Computer Science' },
]

// Initialize from local storage or use defaults
const initialCourses = [
  {
    id: '1',
    name: 'Python for Beginners',
    category: 'Programming',
    classId: '',
    subjectId: '',
    teacherId: 't1',
    description: 'Learn Python from scratch with hands-on projects.',
    thumbnail: null,
    price: 5000,
    discountPrice: 4000,
    duration: '3 Months',
    language: 'English',
    courseType: 'Recorded',
    status: 'Published',
    createdAt: new Date('2025-08-01').toISOString(),
  },
  {
    id: '2',
    name: 'Class 12 Physics Revision',
    category: 'Academic',
    classId: 'c3',
    subjectId: 's2',
    teacherId: 't2',
    description: 'Complete revision of Class 12 Physics syllabus.',
    thumbnail: null,
    price: 3000,
    discountPrice: 2500,
    duration: '1 Month',
    language: 'Hindi',
    courseType: 'Live',
    status: 'Draft',
    createdAt: new Date('2025-08-10').toISOString(),
  },
]

let courses = [...initialCourses]

// ─────────────────────────────────────────────────────────────────
// Curriculum Storage
// ─────────────────────────────────────────────────────────────────

const CURRICULUM_STORAGE_KEY = 'praksha_academy_curriculums'

const getStoredCurriculums = () => {
  try {
    const stored = localStorage.getItem(CURRICULUM_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Failed to read curriculum:', error)
    return {}
  }
}

const saveStoredCurriculums = (curriculums) => {
  localStorage.setItem(
    CURRICULUM_STORAGE_KEY,
    JSON.stringify(curriculums)
  )
}

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () => Math.random().toString(36).substring(2, 9)

// ─────────────────────────────────────────────────────────────────
// Course Service Functions
// ─────────────────────────────────────────────────────────────────

/**
 * Fetch all courses
 */
export async function getCourses() {
  await delay(800)

  // Return courses with teacher object populated for the list view
  return courses.map(course => ({
    ...course,
    teacher: mockTeachers.find(t => t.id === course.teacherId) || null,
    className: mockClasses.find(c => c.id === course.classId)?.name || '-',
    subjectName: mockSubjects.find(s => s.id === course.subjectId)?.name || '-',
  }))
}

/**
 * Fetch a single course by ID
 */
export async function getCourseById(id) {
  await delay(600)
  const course = courses.find((c) => c.id === id)
  if (!course) {
    throw new Error('Course not found')
  }
  return course
}

/**
 * Create a new course
 */
export async function createCourse(data) {
  await delay(1000)

  // Basic validation check
  if (!data.name || !data.teacherId || !data.status) {
    throw new Error('Missing required fields')
  }

  const newCourse = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }

  courses = [newCourse, ...courses]
  return newCourse
}

/**
 * Update an existing course
 */
export async function updateCourse(id, data) {
  await delay(1000)
  const index = courses.findIndex((c) => c.id === id)
  if (index === -1) {
    throw new Error('Course not found')
  }

  courses[index] = { ...courses[index], ...data }
  return courses[index]
}

/**
 * Delete a course
 */
export async function deleteCourse(id) {
  await delay(800)
  courses = courses.filter((c) => c.id !== id)
  return { success: true }
}

/**
 * Get form options (teachers, classes, subjects)
 */
export async function getCourseFormOptions() {
  await delay(500)
  return {
    teachers: mockTeachers,
    classes: mockClasses,
    subjects: mockSubjects,
  }
}

// ─────────────────────────────────────────────────────────────────
// Curriculum Service Functions
// ─────────────────────────────────────────────────────────────────

/**
 * Get curriculum for a course
 */
export async function getCurriculum(courseId) {
  await delay(500)

  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    throw new Error('Course not found')
  }

  const curriculums = getStoredCurriculums()

  return curriculums[courseId] || []
}

/**
 * Save complete curriculum for a course
 */
export async function saveCurriculum(courseId, curriculum) {
  await delay(800)

  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    throw new Error('Course not found')
  }

  const curriculums = getStoredCurriculums()

  curriculums[courseId] = curriculum

  saveStoredCurriculums(curriculums)

  return {
    success: true,
    courseId,
    curriculum,
  }
}