/**
 * blogService.js
 * Frontend mock service for Sprint 13 - Owner Content & Reports Hardening.
 *
 * Shared mock Blog CRUD using localStorage.
 * Admin Blog and public Blog can consume the same records.
 */

const STORAGE_KEY = 'praksha_academy_blogs'

const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () =>
    `blog-${Math.random().toString(36).substring(2, 9)}`

const defaultBlogs = [
    {
        id: 'blog-1',
        title: 'How to Choose the Right Program for Your Goals',
        excerpt:
            'Learn how Praksha Academy combines coaching, coding, and exam readiness so every student can progress with purpose.',
        category: 'Guides',
        author: 'Ananya Bhatt',
        date: 'July 10, 2026',
        readTime: '6 min',
        tags: ['Programs', 'Planning'],
        content:
            'Choosing the right academic or skill-building program is one of the most critical decisions a student can make. It sets the foundation for future career paths and personal confidence.',
        seoTitle: 'How to Choose the Right Program for Your Goals',
        seoDescription:
            'Learn how to choose the right academic or skill-building program.',
        status: 'Published',
        thumbnail: null,
    },
    {
        id: 'blog-2',
        title: 'Building Confidence in Spoken English with Daily Practice',
        excerpt:
            'Practical habits, classroom strategies, and communication exercises to help you speak more naturally and clearly.',
        category: 'English',
        author: 'Rahul Mehta',
        date: 'June 28, 2026',
        readTime: '5 min',
        tags: ['Fluency', 'Speaking'],
        content:
            'Fluency in Spoken English is built through consistent daily verbal practice.',
        seoTitle: 'Building Confidence in Spoken English',
        seoDescription:
            'Practical habits for improving spoken English confidence.',
        status: 'Published',
        thumbnail: null,
    },
    {
        id: 'blog-3',
        title: 'Why Project-Based Learning Makes Skills Stick',
        excerpt:
            'Explore how hands-on coding and academic projects help students retain concepts and build confidence faster.',
        category: 'Programming',
        author: 'Priya Sharma',
        date: 'June 12, 2026',
        readTime: '7 min',
        tags: ['Coding', 'Projects'],
        content:
            'Project-based learning helps students apply concepts to real problems and build practical skills.',
        seoTitle: 'Why Project-Based Learning Makes Skills Stick',
        seoDescription:
            'Discover the benefits of project-based learning.',
        status: 'Published',
        thumbnail: null,
    },
    {
        id: 'blog-4',
        title: 'Exam Strategy for School and Competitive Tests',
        excerpt:
            'A concise guide to building revision routines, managing time, and staying calm on test day.',
        category: 'Exam Prep',
        author: 'Sneha Gupta',
        date: 'May 30, 2026',
        readTime: '4 min',
        tags: ['Revision', 'Success'],
        content:
            'Success in exams comes down to structured revision, mock tests, and effective stress management.',
        seoTitle: 'Exam Strategy for School and Competitive Tests',
        seoDescription:
            'A practical guide to exam preparation and revision.',
        status: 'Published',
        thumbnail: null,
    },
    {
        id: 'blog-5',
        title: 'How to Turn Homework into Better Results',
        excerpt:
            'Small changes to daily study habits that can improve retention, understanding, and grades across subjects.',
        category: 'Study Skills',
        author: 'Karan Joshi',
        date: 'May 15, 2026',
        readTime: '5 min',
        tags: ['Habits', 'Learning'],
        content:
            'Homework can be used as a diagnostic tool to identify weak areas and improve academic performance.',
        seoTitle: 'How to Turn Homework into Better Results',
        seoDescription:
            'Improve academic results by changing how you approach homework.',
        status: 'Published',
        thumbnail: null,
    },
]

const loadBlogs = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)

        if (saved) {
            return JSON.parse(saved)
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultBlogs)
        )

        return [...defaultBlogs]
    } catch (error) {
        console.error('Failed to load blogs:', error)
        return [...defaultBlogs]
    }
}

let blogs = loadBlogs()

const saveBlogs = () => {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(blogs)
        )
    } catch (error) {
        console.error('Failed to save blogs:', error)
    }
}

export async function getBlogs() {
    await delay(500)

    return [...blogs]
}

export async function getBlogById(id) {
    await delay(400)

    return blogs.find((blog) => String(blog.id) === String(id)) || null
}

export async function createBlog(data) {
    await delay(700)

    const title = data.title?.trim()

    if (!title) {
        throw new Error('Blog title is required.')
    }

    const duplicate = blogs.some(
        (blog) =>
            blog.title.toLowerCase() === title.toLowerCase()
    )

    if (duplicate) {
        throw new Error(
            'A blog post with this title already exists.'
        )
    }

    const now = new Date()

    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const newBlog = {
        id: generateId(),
        ...data,
        title,
        status: data.status || 'Draft',
        tags: Array.isArray(data.tags) ? data.tags : [],
        thumbnail: data.thumbnail || null,

        // Date for Blog List / Details / Public Blog
        date: formattedDate,
        createdAt: formattedDate,
    }

    blogs = [newBlog, ...blogs]

    saveBlogs()

    return newBlog
}

export async function updateBlog(id, data) {
    await delay(700)

    const index = blogs.findIndex(
        (blog) => String(blog.id) === String(id)
    )

    if (index === -1) {
        throw new Error('Blog post not found.')
    }

    const title = data.title?.trim()

    if (!title) {
        throw new Error('Blog title is required.')
    }

    const duplicate = blogs.some(
        (blog) =>
            String(blog.id) !== String(id) &&
            blog.title.toLowerCase() === title.toLowerCase()
    )

    if (duplicate) {
        throw new Error(
            'A blog post with this title already exists.'
        )
    }

    blogs[index] = {
        ...blogs[index],
        ...data,
        title,
        date: blogs[index].date || blogs[index].createdAt,
        createdAt:
            blogs[index].createdAt ||
            blogs[index].date,
        tags: Array.isArray(data.tags)
            ? data.tags
            : blogs[index].tags || [],
        thumbnail:
            data.thumbnail !== undefined
                ? data.thumbnail
                : blogs[index].thumbnail || null,
    }

    saveBlogs()

    return blogs[index]
}

export async function deleteBlog(id) {
    await delay(600)

    const exists = blogs.some(
        (blog) => String(blog.id) === String(id)
    )

    if (!exists) {
        throw new Error('Blog post not found.')
    }

    blogs = blogs.filter(
        (blog) => String(blog.id) !== String(id)
    )

    saveBlogs()

    return { success: true }
}