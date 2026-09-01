/**
 * notificationService.js
 * Frontend mock service for Sprint 13 - Owner Content & Reports Hardening.
 *
 * Shared Notifications CRUD using localStorage.
 * Replace with real API calls when backend is available.
 */

const STORAGE_KEY = 'praksha_academy_notifications';

const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () =>
    `notification-${Math.random().toString(36).substring(2, 9)}`;

const defaultNotifications = [
    {
        id: 'notification-1',
        title: 'New Course Available: Python for Beginners',
        message: 'A new Python course is now available for students.',
        type: 'Info',
        audience: 'All Users',
        scheduled: '2025-08-10',
        scheduledDate: '2025-08-10',
        status: 'Sent',
    },
    {
        id: 'notification-2',
        title: 'System Maintenance Tonight',
        message: 'Scheduled system maintenance will take place tonight.',
        type: 'Warning',
        audience: 'All Users',
        scheduled: '2025-08-12',
        scheduledDate: '2025-08-12',
        status: 'Sent',
    },
    {
        id: 'notification-3',
        title: 'Congratulations to Batch 2025 Graduates!',
        message: 'Congratulations to all students who completed Batch 2025.',
        type: 'Success',
        audience: 'Students',
        scheduled: '2025-08-14',
        scheduledDate: '2025-08-14',
        status: 'Scheduled',
    },
    {
        id: 'notification-4',
        title: 'Payment Gateway Downtime',
        message: 'Payment services may be temporarily unavailable.',
        type: 'Alert',
        audience: 'All Users',
        scheduled: '2025-08-15',
        scheduledDate: '2025-08-15',
        status: 'Draft',
    },
    {
        id: 'notification-5',
        title: 'New Feature: Live Classes Now Available',
        message: 'Live classes are now available for enrolled students.',
        type: 'Info',
        audience: 'Students',
        scheduled: '2025-08-18',
        scheduledDate: '2025-08-18',
        status: 'Scheduled',
    },
];

const loadNotifications = () => {
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
            JSON.stringify(defaultNotifications)
        );

        return [...defaultNotifications];
    } catch (error) {
        console.error('Failed to load notifications:', error);

        return [...defaultNotifications];
    }
};

let notifications = loadNotifications();

const saveNotifications = () => {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(notifications)
        );
    } catch (error) {
        console.error('Failed to save notifications:', error);
    }
};

export async function getNotifications() {
    await delay(500);

    notifications = loadNotifications();

    return [...notifications];
}

export async function getNotificationById(id) {
    await delay(400);

    notifications = loadNotifications();

    return (
        notifications.find(
            (notification) =>
                String(notification.id) === String(id)
        ) || null
    );
}

export async function createNotification(data) {
    await delay(700);

    const title = data.title?.trim();
    const message = data.message?.trim();

    if (!title) {
        throw new Error('Notification title is required.');
    }

    if (!message) {
        throw new Error('Notification message is required.');
    }

    if (!data.type) {
        throw new Error('Notification type is required.');
    }

    if (!data.audience) {
        throw new Error('Notification audience is required.');
    }

    const duplicate = notifications.some(
        (notification) =>
            notification.title.toLowerCase() ===
            title.toLowerCase()
    );

    if (duplicate) {
        throw new Error(
            'A notification with this title already exists.'
        );
    }

    let status = data.status || 'Draft';

    // "Send Now" becomes "Sent"
    if (status === 'Send Now') {
        status = 'Sent';
    }

    /*
     * Date handling:
     *
     * Draft + no date      -> null
     * Draft + date         -> selected date
     * Scheduled + date     -> selected date
     * Send Now + no date   -> today's date
     */
    let scheduledDate = data.scheduledDate?.trim() || null;

    if (status === 'Sent' && !scheduledDate) {
        scheduledDate = new Date()
            .toISOString()
            .slice(0, 10);
    }

    const newNotification = {
        id: generateId(),
        title,
        message,
        type: data.type,
        audience: data.audience,
        scheduledDate,
        scheduled: scheduledDate
            ? scheduledDate.slice(0, 10)
            : null,
        status,
    };

    notifications = [
        newNotification,
        ...notifications,
    ];

    saveNotifications();

    return newNotification;
}

export async function updateNotification(id, data) {
    await delay(700);

    const index = notifications.findIndex(
        (notification) =>
            String(notification.id) === String(id)
    );

    if (index === -1) {
        throw new Error('Notification not found.');
    }

    const title = data.title?.trim();
    const message = data.message?.trim();

    if (!title) {
        throw new Error('Notification title is required.');
    }

    if (!message) {
        throw new Error('Notification message is required.');
    }

    const duplicate = notifications.some(
        (notification) =>
            String(notification.id) !== String(id) &&
            notification.title.toLowerCase() ===
            title.toLowerCase()
    );

    if (duplicate) {
        throw new Error(
            'A notification with this title already exists.'
        );
    }

    let status =
        data.status || notifications[index].status;

    if (status === 'Send Now') {
        status = 'Sent';
    }

    let scheduledDate =
        data.scheduledDate?.trim() ||
        notifications[index].scheduledDate ||
        null;

    // If sending immediately and there is no date,
    // use today's date.
    if (status === 'Sent' && !scheduledDate) {
        scheduledDate = new Date()
            .toISOString()
            .slice(0, 10);
    }

    notifications[index] = {
        ...notifications[index],
        ...data,
        title,
        message,
        status,
        scheduledDate,
        scheduled: scheduledDate
            ? scheduledDate.slice(0, 10)
            : null,
    };

    saveNotifications();

    return notifications[index];
}

export async function deleteNotification(id) {
    await delay(600);

    const exists = notifications.some(
        (notification) =>
            String(notification.id) === String(id)
    );

    if (!exists) {
        throw new Error('Notification not found.');
    }

    notifications = notifications.filter(
        (notification) =>
            String(notification.id) !== String(id)
    );

    saveNotifications();

    return {
        success: true,
    };
}