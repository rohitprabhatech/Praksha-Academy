/**
 * contactMessageService.js
 * Frontend mock service for Sprint 13 - Owner Content & Reports Hardening.
 *
 * Shared Contact Messages CRUD using localStorage.
 * Replace with real API calls when backend is available.
 */

const STORAGE_KEY = 'praksha_academy_contact_messages';

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () =>
  `contact-${Math.random().toString(36).substring(2, 9)}`;

const defaultMessages = [
  {
    id: 'contact-1',
    name: 'Ananya Rao',
    email: 'ananya@email.com',
    phone: '',
    program: 'Data Science',
    subject: 'Inquiry about Data Science course',
    message:
      'Hello, I would like to know more about the Data Science course duration and prerequisites. Could you please provide more details?',
    date: '2025-08-13',
    status: 'New',
  },
  {
    id: 'contact-2',
    name: 'Dev Patel',
    email: 'dev@email.com',
    phone: '',
    program: 'React & Modern JS',
    subject: 'Payment issue with enrollment',
    message:
      'I tried enrolling in the React course but the payment failed. Please help.',
    date: '2025-08-12',
    status: 'Replied',
  },
  {
    id: 'contact-3',
    name: 'Meera Iyer',
    email: 'meera@email.com',
    phone: '',
    program: 'Python',
    subject: 'Certificate request',
    message:
      'I completed the Python course last month but have not received my certificate yet.',
    date: '2025-08-11',
    status: 'Read',
  },
  {
    id: 'contact-4',
    name: 'Arjun Nair',
    email: 'arjun@email.com',
    phone: '',
    program: '',
    subject: 'Scholarship information',
    message:
      'Are there any scholarship programs available for students from lower income backgrounds?',
    date: '2025-08-10',
    status: 'New',
  },
  {
    id: 'contact-5',
    name: 'Kavya Reddy',
    email: 'kavya@email.com',
    phone: '',
    program: '',
    subject: 'Live class rescheduling',
    message:
      'Can the Friday live class be rescheduled? I have a conflict at that time.',
    date: '2025-08-09',
    status: 'Replied',
  },
];

const loadMessages = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultMessages)
    );

    return [...defaultMessages];
  } catch (error) {
    console.error('Failed to load contact messages:', error);

    return [...defaultMessages];
  }
};

let messages = loadMessages();

const saveMessages = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    );
  } catch (error) {
    console.error('Failed to save contact messages:', error);
  }
};

/**
 * Get all contact messages.
 */
export async function getContactMessages() {
  await delay(500);

  return [...messages];
}

/**
 * Get one contact message by ID.
 */
export async function getContactMessageById(id) {
  await delay(400);

  return (
    messages.find(
      (message) => String(message.id) === String(id)
    ) || null
  );
}

/**
 * Create a new contact message.
 * Used by the public Contact form.
 */
export async function createContactMessage(data) {
  await delay(900);

  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name) {
    throw new Error('Name is required.');
  }

  if (!email) {
    throw new Error('Email is required.');
  }

  if (!message) {
    throw new Error('Message is required.');
  }

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const newMessage = {
    id: generateId(),
    name,
    email,
    phone: data.phone?.trim() || '',
    program: data.program?.trim() || '',
    subject:
      data.subject?.trim() ||
      data.program?.trim() ||
      'General Contact Inquiry',
    message,
    date: today,
    status: 'New',
  };

  messages = [
    newMessage,
    ...messages,
  ];

  saveMessages();

  return newMessage;
}

/**
 * Update message status/details.
 */
export async function updateContactMessage(id, data) {
  await delay(500);

  const index = messages.findIndex(
    (message) =>
      String(message.id) === String(id)
  );

  if (index === -1) {
    throw new Error('Contact message not found.');
  }

  messages[index] = {
    ...messages[index],
    ...data,
  };

  saveMessages();

  return messages[index];
}

/**
 * Delete a contact message.
 */
export async function deleteContactMessage(id) {
  await delay(500);

  const exists = messages.some(
    (message) =>
      String(message.id) === String(id)
  );

  if (!exists) {
    throw new Error('Contact message not found.');
  }

  messages = messages.filter(
    (message) =>
      String(message.id) !== String(id)
  );

  saveMessages();

  return {
    success: true,
  };
}