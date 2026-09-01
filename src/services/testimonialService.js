/**
 * testimonialService.js
 * Frontend mock service for Sprint 13 - Owner Content & Reports Hardening.
 *
 * Shared Testimonials CRUD using localStorage.
 * Replace with real API calls when backend is available.
 */

const STORAGE_KEY = 'praksha_academy_testimonials'

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () =>
  `testimonial-${Math.random().toString(36).substring(2, 9)}`

const defaultTestimonials = [
  {
    id: 'testimonial-1',
    name: 'Aditi Sharma',
    role: 'React Developer',
    course: 'React & Modern JS',
    rating: 5,
    status: 'Published',
    content: 'Amazing course! Really helped me land my first job.',
  },
  {
    id: 'testimonial-2',
    name: 'Rohan Mehta',
    role: 'Cloud Engineer',
    course: 'Cloud Computing',
    rating: 4,
    status: 'Published',
    content: 'Very detailed and well-structured content.',
  },
  {
    id: 'testimonial-3',
    name: 'Priya Patel',
    role: 'Data Scientist',
    course: 'ML Fundamentals',
    rating: 5,
    status: 'Draft',
    content: 'The instructors are incredibly knowledgeable.',
  },
  {
    id: 'testimonial-4',
    name: 'Karan Singh',
    role: 'UI/UX Designer',
    course: 'UI/UX Principles',
    rating: 4,
    status: 'Published',
    content: 'Practical projects made learning much easier.',
  },
  {
    id: 'testimonial-5',
    name: 'Sneha Kapoor',
    role: 'Full Stack Dev',
    course: 'Full-Stack Roadmap',
    rating: 5,
    status: 'Published',
    content: 'Best investment I have made in my career.',
  },
]

const loadTestimonials = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      const parsed = JSON.parse(saved)

      if (Array.isArray(parsed)) {
        return parsed
      }
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultTestimonials)
    )

    return [...defaultTestimonials]
  } catch (error) {
    console.error('Failed to load testimonials:', error)

    return [...defaultTestimonials]
  }
}

let testimonials = loadTestimonials()

const saveTestimonials = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(testimonials)
    )
  } catch (error) {
    console.error('Failed to save testimonials:', error)
  }
}

// =========================================================
// GET ALL TESTIMONIALS
// =========================================================

export async function getTestimonials() {
  await delay(500)

  return [...testimonials]
}

// =========================================================
// GET TESTIMONIAL BY ID
// =========================================================

export async function getTestimonialById(id) {
  await delay(400)

  return (
    testimonials.find(
      (item) =>
        String(item.id) === String(id)
    ) || null
  )
}

// =========================================================
// CREATE TESTIMONIAL
// =========================================================

export async function createTestimonial(data) {
  await delay(700)

  const name = data.name?.trim()
  const role = data.role?.trim()
  const course = data.course?.trim()
  const content = data.content?.trim()

  if (!name) {
    throw new Error('Reviewer name is required.')
  }

  if (!content) {
    throw new Error('Testimonial content is required.')
  }

  if (!course) {
    throw new Error('Course is required.')
  }

  const rating = Number(data.rating)

  if (!rating || rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5.')
  }

  const duplicate = testimonials.some(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase() &&
      item.content.toLowerCase() === content.toLowerCase()
  )

  if (duplicate) {
    throw new Error(
      'This testimonial already exists.'
    )
  }

  const newTestimonial = {
    id: generateId(),
    name,
    role: role || '',
    course,
    rating,
    status: data.status || 'Draft',
    content,
  }

  testimonials = [
    newTestimonial,
    ...testimonials,
  ]

  saveTestimonials()

  return newTestimonial
}

// =========================================================
// UPDATE TESTIMONIAL
// =========================================================

export async function updateTestimonial(id, data) {
  await delay(700)

  const index = testimonials.findIndex(
    (item) =>
      String(item.id) === String(id)
  )

  if (index === -1) {
    throw new Error(
      'Testimonial not found.'
    )
  }

  const name = data.name?.trim()
  const role = data.role?.trim()
  const course = data.course?.trim()
  const content = data.content?.trim()

  if (!name) {
    throw new Error('Reviewer name is required.')
  }

  if (!content) {
    throw new Error(
      'Testimonial content is required.'
    )
  }

  if (!course) {
    throw new Error('Course is required.')
  }

  const rating = Number(data.rating)

  if (!rating || rating < 1 || rating > 5) {
    throw new Error(
      'Rating must be between 1 and 5.'
    )
  }

  const duplicate = testimonials.some(
    (item) =>
      String(item.id) !== String(id) &&
      item.name.toLowerCase() === name.toLowerCase() &&
      item.content.toLowerCase() === content.toLowerCase()
  )

  if (duplicate) {
    throw new Error(
      'This testimonial already exists.'
    )
  }

  testimonials[index] = {
    ...testimonials[index],
    ...data,
    name,
    role: role || '',
    course,
    rating,
    status: data.status || 'Draft',
    content,
  }

  saveTestimonials()

  return testimonials[index]
}

// =========================================================
// DELETE TESTIMONIAL
// =========================================================

export async function deleteTestimonial(id) {
  await delay(600)

  const exists = testimonials.some(
    (item) =>
      String(item.id) === String(id)
  )

  if (!exists) {
    throw new Error(
      'Testimonial not found.'
    )
  }

  testimonials = testimonials.filter(
    (item) =>
      String(item.id) !== String(id)
  )

  saveTestimonials()

  return {
    success: true,
  }
}