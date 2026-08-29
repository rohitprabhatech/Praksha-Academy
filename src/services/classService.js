/**
 * classService.js
 * Frontend mock service for Sprint 07 - Owner Academic Structure.
 *
 * Handles Classes CRUD using localStorage.
 * Replace with real API calls when backend is available.
 */

const STORAGE_KEY = 'praksha_academy_classes';

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () =>
  `class-${Math.random().toString(36).substring(2, 9)}`;

// Seed classes required by Sprint 07
const defaultClasses = [
  { id: 'class-8', name: 'Class 8', status: 'Active' },
  { id: 'class-9', name: 'Class 9', status: 'Active' },
  { id: 'class-10', name: 'Class 10', status: 'Active' },
  { id: 'class-11-science', name: 'Class 11 Science', status: 'Active' },
  { id: 'class-11-commerce', name: 'Class 11 Commerce', status: 'Active' },
  { id: 'class-11-arts', name: 'Class 11 Arts', status: 'Active' },
  { id: 'class-12-science', name: 'Class 12 Science', status: 'Active' },
  { id: 'class-12-commerce', name: 'Class 12 Commerce', status: 'Active' },
  { id: 'class-12-arts', name: 'Class 12 Arts', status: 'Active' },
];

const loadClasses = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultClasses)
    );

    return [...defaultClasses];
  } catch (error) {
    console.error('Failed to load classes:', error);
    return [...defaultClasses];
  }
};

let classes = loadClasses();

const saveClasses = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(classes)
    );
  } catch (error) {
    console.error('Failed to save classes:', error);
  }
};

/**
 * Get all classes
 */
export async function getClasses() {
  await delay(500);

  return [...classes];
}

/**
 * Get one class by ID
 */
export async function getClassById(id) {
  await delay(400);

  return classes.find((item) => item.id === id) || null;
}

/**
 * Create class
 */
export async function createClass(data) {
  await delay(700);

  const name = data.name?.trim();

  if (!name) {
    throw new Error('Class name is required.');
  }

  const duplicate = classes.some(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    throw new Error('A class with this name already exists.');
  }

  const newClass = {
    id: generateId(),
    name,
    status: data.status || 'Active',
  };

  classes = [newClass, ...classes];

  saveClasses();

  return newClass;
}

/**
 * Update class
 */
export async function updateClass(id, data) {
  await delay(700);

  const index = classes.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    throw new Error('Class not found.');
  }

  const name = data.name?.trim();

  if (!name) {
    throw new Error('Class name is required.');
  }

  const duplicate = classes.some(
    (item) =>
      item.id !== id &&
      item.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    throw new Error('A class with this name already exists.');
  }

  classes[index] = {
    ...classes[index],
    name,
    status: data.status || 'Active',
  };

  saveClasses();

  return classes[index];
}

/**
 * Delete class
 */
export async function deleteClass(id) {
  await delay(600);

  const exists = classes.some(
    (item) => item.id === id
  );

  if (!exists) {
    throw new Error('Class not found.');
  }

  classes = classes.filter(
    (item) => item.id !== id
  );

  saveClasses();

  return { success: true };
}

/**
 * Change class status
 */
export async function updateClassStatus(id, status) {
  await delay(500);

  const index = classes.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    throw new Error('Class not found.');
  }

  classes[index] = {
    ...classes[index],
    status,
  };

  saveClasses();

  return classes[index];
}