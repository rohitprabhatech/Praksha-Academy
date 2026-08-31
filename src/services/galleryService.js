/**
 * galleryService.js
 * Frontend mock service for Sprint 13 - Owner Content & Reports Hardening.
 *
 * Shared Gallery CRUD using localStorage.
 * Replace with real API calls when backend is available.
 */

const STORAGE_KEY = 'praksha_academy_gallery'

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () =>
  `gallery-${Math.random().toString(36).substring(2, 9)}`

const defaultGalleryItems = [
  {
    id: 'gallery-1',
    type: 'image',
    title: 'Campus Tour 2025',
    url: null,
    tags: ['campus', 'tour'],
    date: '2025-07-10',
    altText: 'Praksha Academy campus',
  },
  {
    id: 'gallery-2',
    type: 'video',
    title: 'Introduction to React',
    url: 'https://www.youtube.com/embed/N3AkSS5hXMA',
    tags: ['react', 'course'],
    date: '2025-07-15',
    description: 'Introduction to React and modern frontend development.',
  },
  {
    id: 'gallery-3',
    type: 'image',
    title: 'Graduation Ceremony',
    url: null,
    tags: ['graduation', 'students'],
    date: '2025-07-20',
    altText: 'Students during graduation ceremony',
  },
  {
    id: 'gallery-4',
    type: 'image',
    title: 'Workshop Day',
    url: null,
    tags: ['workshop'],
    date: '2025-07-25',
    altText: 'Students attending an academy workshop',
  },
  {
    id: 'gallery-5',
    type: 'video',
    title: 'Python for Beginners',
    url: 'https://www.youtube.com/embed/rfscVS0vtbw',
    tags: ['python', 'course'],
    date: '2025-08-01',
    description: 'Python programming introduction for beginners.',
  },
  {
    id: 'gallery-6',
    type: 'image',
    title: 'Lab Sessions',
    url: null,
    tags: ['lab', 'practical'],
    date: '2025-08-05',
    altText: 'Students working during practical lab sessions',
  },
]

const loadGallery = () => {
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
      JSON.stringify(defaultGalleryItems)
    )

    return [...defaultGalleryItems]
  } catch (error) {
    console.error('Failed to load gallery:', error)

    return [...defaultGalleryItems]
  }
}

let galleryItems = loadGallery()

const saveGallery = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(galleryItems)
    )
  } catch (error) {
    console.error('Failed to save gallery:', error)
  }
}

export async function getGalleryItems() {
  await delay(500)

  return [...galleryItems]
}

export async function getGalleryItemById(id) {
  await delay(400)

  return (
    galleryItems.find(
      (item) => String(item.id) === String(id)
    ) || null
  )
}

export async function createGalleryItem(data) {
  await delay(700)

  const title = data.title?.trim()

  if (!title) {
    throw new Error('Gallery item title is required.')
  }

  if (!data.type) {
    throw new Error('Gallery item type is required.')
  }

  if (!['image', 'video'].includes(data.type)) {
    throw new Error('Invalid gallery item type.')
  }

  if (data.type === 'video' && !data.url?.trim()) {
    throw new Error('Video URL is required.')
  }

  const duplicate = galleryItems.some(
    (item) =>
      item.title.toLowerCase() === title.toLowerCase()
  )

  if (duplicate) {
    throw new Error(
      'A gallery item with this title already exists.'
    )
  }

  const newItem = {
    id: generateId(),
    ...data,
    title,
    tags: Array.isArray(data.tags) ? data.tags : [],
    url: data.url || null,
    date:
      data.date ||
      new Date().toISOString().slice(0, 10),
  }

  galleryItems = [newItem, ...galleryItems]

  saveGallery()

  return newItem
}

export async function updateGalleryItem(id, data) {
  await delay(700)

  const index = galleryItems.findIndex(
    (item) => String(item.id) === String(id)
  )

  if (index === -1) {
    throw new Error('Gallery item not found.')
  }

  const title = data.title?.trim()

  if (!title) {
    throw new Error('Gallery item title is required.')
  }

  const duplicate = galleryItems.some(
    (item) =>
      String(item.id) !== String(id) &&
      item.title.toLowerCase() === title.toLowerCase()
  )

  if (duplicate) {
    throw new Error(
      'A gallery item with this title already exists.'
    )
  }

  galleryItems[index] = {
    ...galleryItems[index],
    ...data,
    title,
    tags: Array.isArray(data.tags)
      ? data.tags
      : galleryItems[index].tags || [],
  }

  saveGallery()

  return galleryItems[index]
}

export async function deleteGalleryItem(id) {
  await delay(600)

  const exists = galleryItems.some(
    (item) => String(item.id) === String(id)
  )

  if (!exists) {
    throw new Error('Gallery item not found.')
  }

  galleryItems = galleryItems.filter(
    (item) => String(item.id) !== String(id)
  )

  saveGallery()

  return {
    success: true,
  }
}