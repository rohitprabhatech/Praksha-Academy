/**
 * subjectService.js
 * Frontend mock service for Sprint 07 - Owner Academic Structure.
 *
 * Handles Subjects CRUD using localStorage.
 * Replace with real API calls when backend is available.
 */

const STORAGE_KEY = 'praksha_academy_subjects'

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () =>
  `subject-${Math.random().toString(36).substring(2, 9)}`

const defaultSubjects = [
  { id: 'subject-1', name: 'Mathematics', status: 'Active' },
  { id: 'subject-2', name: 'Science', status: 'Active' },
  { id: 'subject-3', name: 'English', status: 'Active' },
  { id: 'subject-4', name: 'Physics', status: 'Active' },
  { id: 'subject-5', name: 'Chemistry', status: 'Active' },
  { id: 'subject-6', name: 'Biology', status: 'Active' },
  { id: 'subject-7', name: 'Commerce', status: 'Active' },
  { id: 'subject-8', name: 'Economics', status: 'Active' },
  { id: 'subject-9', name: 'Accountancy', status: 'Active' },
]

const loadSubjects = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      return JSON.parse(saved)
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultSubjects)
    )

    return [...defaultSubjects]
  } catch (error) {
    console.error('Failed to load subjects:', error)
    return [...defaultSubjects]
  }
}

let subjects = loadSubjects()

const saveSubjects = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(subjects)
    )
  } catch (error) {
    console.error('Failed to save subjects:', error)
  }
}

/**
 * Get all subjects
 */
export async function getSubjects() {
  await delay(500)

  return [...subjects]
}

/**
 * Get one subject by ID
 */
export async function getSubjectById(id) {
  await delay(400)

  return (
    subjects.find((item) => item.id === id) || null
  )
}

/**
 * Create subject
 */
export async function createSubject(data) {
  await delay(700)

  const name = data.name?.trim()

  if (!name) {
    throw new Error('Subject name is required.')
  }

  const duplicate = subjects.some(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase()
  )

  if (duplicate) {
    throw new Error(
      'A subject with this name already exists.'
    )
  }

  const newSubject = {
    id: generateId(),
    name,
    status: data.status || 'Active',
  }

  subjects = [newSubject, ...subjects]

  saveSubjects()

  return newSubject
}

/**
 * Update subject
 */
export async function updateSubject(id, data) {
  await delay(700)

  const index = subjects.findIndex(
    (item) => item.id === id
  )

  if (index === -1) {
    throw new Error('Subject not found.')
  }

  const name = data.name?.trim()

  if (!name) {
    throw new Error('Subject name is required.')
  }

  const duplicate = subjects.some(
    (item) =>
      item.id !== id &&
      item.name.toLowerCase() === name.toLowerCase()
  )

  if (duplicate) {
    throw new Error(
      'A subject with this name already exists.'
    )
  }

  subjects[index] = {
    ...subjects[index],
    name,
    status: data.status || 'Active',
  }

  saveSubjects()

  return subjects[index]
}

/**
 * Delete subject
 */
export async function deleteSubject(id) {
  await delay(600)

  const exists = subjects.some(
    (item) => item.id === id
  )

  if (!exists) {
    throw new Error('Subject not found.')
  }

  subjects = subjects.filter(
    (item) => item.id !== id
  )

  saveSubjects()

  return { success: true }
}

/**
 * Change subject status
 */
export async function updateSubjectStatus(id, status) {
  await delay(500)

  const index = subjects.findIndex(
    (item) => item.id === id
  )

  if (index === -1) {
    throw new Error('Subject not found.')
  }

  subjects[index] = {
    ...subjects[index],
    status,
  }

  saveSubjects()

  return subjects[index]
}