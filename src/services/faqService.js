/**
 * faqService.js
 * Frontend mock service for Sprint 13 - Owner Content & Reports Hardening.
 *
 * Shared FAQ CRUD using localStorage.
 * Replace with real API calls when backend is available.
 */

const STORAGE_KEY = 'praksha_academy_faqs'

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () =>
  `faq-${Math.random().toString(36).substring(2, 9)}`

const defaultFAQs = [
  {
    id: 'faq-1',
    question: 'How do I enroll in a course?',
    answer:
      'To enroll in a course, navigate to the Courses page, select your desired course, and click the "Enroll Now" button. You will be guided through the payment process. Once payment is complete, the course will appear in your student dashboard.',
    category: 'Enrollment',
    status: 'Active',
  },
  {
    id: 'faq-2',
    question: 'What payment methods are accepted?',
    answer:
      'We accept major debit cards, credit cards, UPI, and other supported online payment methods available during checkout.',
    category: 'Payments',
    status: 'Active',
  },
  {
    id: 'faq-3',
    question: 'Can I get a refund if I change my mind?',
    answer:
      'Refund eligibility depends on the course and the applicable refund policy. Please contact the academy support team for assistance.',
    category: 'Payments',
    status: 'Active',
  },
  {
    id: 'faq-4',
    question: 'How do live classes work?',
    answer:
      'Live classes are conducted online according to the schedule provided for your course. Students can join using the class link available in their dashboard.',
    category: 'Classes',
    status: 'Inactive',
  },
  {
    id: 'faq-5',
    question: 'Is a certificate provided after completion?',
    answer:
      'Yes. Eligible students receive a certificate after successfully completing the required course activities and assessments.',
    category: 'Certificates',
    status: 'Active',
  },
  {
    id: 'faq-6',
    question: 'Can I download course materials?',
    answer:
      'Course materials can be downloaded when the instructor or course provides downloadable resources.',
    category: 'Materials',
    status: 'Active',
  },
  {
    id: 'faq-7',
    question: 'How long is each course?',
    answer:
      'Course duration varies depending on the program. Check the individual course page for the complete schedule and duration.',
    category: 'Courses',
    status: 'Active',
  },
]

const loadFAQs = () => {
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
      JSON.stringify(defaultFAQs)
    )

    return [...defaultFAQs]
  } catch (error) {
    console.error('Failed to load FAQs:', error)

    return [...defaultFAQs]
  }
}

let faqs = loadFAQs()

const saveFAQs = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(faqs)
    )
  } catch (error) {
    console.error('Failed to save FAQs:', error)
  }
}

// =========================================================
// GET ALL FAQS
// =========================================================

export async function getFAQs() {
  await delay(500)

  return [...faqs]
}

// =========================================================
// GET FAQ BY ID
// =========================================================

export async function getFAQById(id) {
  await delay(400)

  return (
    faqs.find(
      (faq) => String(faq.id) === String(id)
    ) || null
  )
}

// =========================================================
// CREATE FAQ
// =========================================================

export async function createFAQ(data) {
  await delay(700)

  const question = data.question?.trim()
  const answer = data.answer?.trim()

  if (!question) {
    throw new Error('FAQ question is required.')
  }

  if (!answer) {
    throw new Error('FAQ answer is required.')
  }

  if (!data.category?.trim()) {
    throw new Error('FAQ category is required.')
  }

  const duplicate = faqs.some(
    (faq) =>
      faq.question.toLowerCase() ===
      question.toLowerCase()
  )

  if (duplicate) {
    throw new Error(
      'An FAQ with this question already exists.'
    )
  }

  const newFAQ = {
    id: generateId(),
    question,
    answer,
    category: data.category,
    status: data.status || 'Active',
  }

  faqs = [newFAQ, ...faqs]

  saveFAQs()

  return newFAQ
}

// =========================================================
// UPDATE FAQ
// =========================================================

export async function updateFAQ(id, data) {
  await delay(700)

  const index = faqs.findIndex(
    (faq) =>
      String(faq.id) === String(id)
  )

  if (index === -1) {
    throw new Error('FAQ not found.')
  }

  const question = data.question?.trim()
  const answer = data.answer?.trim()

  if (!question) {
    throw new Error('FAQ question is required.')
  }

  if (!answer) {
    throw new Error('FAQ answer is required.')
  }

  if (!data.category?.trim()) {
    throw new Error('FAQ category is required.')
  }

  const duplicate = faqs.some(
    (faq) =>
      String(faq.id) !== String(id) &&
      faq.question.toLowerCase() ===
        question.toLowerCase()
  )

  if (duplicate) {
    throw new Error(
      'An FAQ with this question already exists.'
    )
  }

  faqs[index] = {
    ...faqs[index],
    ...data,
    question,
    answer,
    category: data.category,
    status: data.status || 'Active',
  }

  saveFAQs()

  return faqs[index]
}

// =========================================================
// DELETE FAQ
// =========================================================

export async function deleteFAQ(id) {
  await delay(600)

  const exists = faqs.some(
    (faq) =>
      String(faq.id) === String(id)
  )

  if (!exists) {
    throw new Error('FAQ not found.')
  }

  faqs = faqs.filter(
    (faq) =>
      String(faq.id) !== String(id)
  )

  saveFAQs()

  return {
    success: true,
  }
}