/**
 * batchService.js
 * Frontend mock service for Sprint 07 - Owner Academic Structure.
 *
 * Handles Batch CRUD using localStorage.
 * Replace with real API calls when backend is available.
 */


const STORAGE_KEY = 'praksha_academy_batches'

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () =>
  `batch-${Math.random().toString(36).substring(2, 9)}`

const defaultBatches = [
  {
    id: 'batch-1',
    name: 'Morning Batch',
    classId: 'class-12-science',
    courseId: '',
    status: 'Active',
  },
  {
    id: 'batch-2',
    name: 'Evening A',
    classId: 'class-11-science',
    courseId: '',
    status: 'Active',
  },
  {
    id: 'batch-3',
    name: 'Evening B',
    classId: 'class-12-commerce',
    courseId: '',
    status: 'Active',
  },
]

const loadBatches = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      return JSON.parse(saved)
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultBatches)
    )

    return [...defaultBatches]
  } catch (error) {
    console.error('Failed to load batches:', error)
    return [...defaultBatches]
  }
}

let batches = loadBatches()

const saveBatches = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(batches)
    )
  } catch (error) {
    console.error('Failed to save batches:', error)
  }
}

export async function getBatches() {
  await delay(500)

  return [...batches]
}

export async function getBatchById(id) {
  await delay(400)

  return batches.find((item) => item.id === id) || null
}

export async function createBatch(data) {
  await delay(700)

  const name = data.name?.trim()
  const classId = data.classId

  if (!name) {
    throw new Error('Batch name is required.')
  }

  if (!classId) {
    throw new Error('Class is required.')
  }

  const duplicate = batches.some(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase() &&
      item.classId === classId
  )

  if (duplicate) {
    throw new Error(
      'A batch with this name already exists for this class.'
    )
  }

  const newBatch = {
    id: generateId(),
    name,
    classId,
    courseId: data.courseId || '',
    status: data.status || 'Active',
  }

  batches = [newBatch, ...batches]

  saveBatches()

  return newBatch
}

export async function updateBatch(id, data) {
  await delay(700)

  const index = batches.findIndex(
    (item) => item.id === id
  )

  if (index === -1) {
    throw new Error('Batch not found.')
  }

  const name = data.name?.trim()
  const classId = data.classId

  if (!name) {
    throw new Error('Batch name is required.')
  }

  if (!classId) {
    throw new Error('Class is required.')
  }

  const duplicate = batches.some(
    (item) =>
      item.id !== id &&
      item.name.toLowerCase() === name.toLowerCase() &&
      item.classId === classId
  )

  if (duplicate) {
    throw new Error(
      'A batch with this name already exists for this class.'
    )
  }

  batches[index] = {
    ...batches[index],
    name,
    classId,
    courseId: data.courseId || '',
    status: data.status || 'Active',
  }

  saveBatches()

  return batches[index]
}

export async function deleteBatch(id) {
  await delay(600)

  const exists = batches.some(
    (item) => item.id === id
  )

  if (!exists) {
    throw new Error('Batch not found.')
  }

  batches = batches.filter(
    (item) => item.id !== id
  )

  saveBatches()

  return { success: true }
}

export async function updateBatchStatus(id, status) {
  await delay(500)

  const index = batches.findIndex(
    (item) => item.id === id
  )

  if (index === -1) {
    throw new Error('Batch not found.')
  }

  batches[index] = {
    ...batches[index],
    status,
  }

  saveBatches()

  return batches[index]
}