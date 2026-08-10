import { useCallback, useEffect, useState } from 'react'

const recentlyViewedStorageKey = 'praksha:recently-viewed-course-ids'
const recentlyViewedChangedEvent = 'praksha:recently-viewed-changed'
const recentlyViewedLimit = 5

function readRecentlyViewedCourses() {
 if (typeof window === 'undefined') {
  return []
 }

 try {
  const savedValue = window.localStorage.getItem(recentlyViewedStorageKey)
  const parsedValue = savedValue ? JSON.parse(savedValue) : []

  return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : []
 } catch {
  return []
 }
}

function writeRecentlyViewedCourses(courseIds) {
 window.localStorage.setItem(recentlyViewedStorageKey, JSON.stringify(courseIds.slice(0, recentlyViewedLimit)))
 window.dispatchEvent(new Event(recentlyViewedChangedEvent))
}

function useRecentlyViewedCourses() {
 const [recentlyViewedIds, setRecentlyViewedIds] = useState(readRecentlyViewedCourses)

 useEffect(() => {
  const handleRecentlyViewedChange = () => {
   setRecentlyViewedIds(readRecentlyViewedCourses())
  }

  window.addEventListener('storage', handleRecentlyViewedChange)
  window.addEventListener(recentlyViewedChangedEvent, handleRecentlyViewedChange)

  return () => {
   window.removeEventListener('storage', handleRecentlyViewedChange)
   window.removeEventListener(recentlyViewedChangedEvent, handleRecentlyViewedChange)
  }
 }, [])

 const addRecentlyViewedCourse = useCallback((courseId) => {
  if (!courseId) {
   return
  }

  const nextCourseIds = [courseId, ...readRecentlyViewedCourses().filter((savedId) => savedId !== courseId)]

  writeRecentlyViewedCourses(nextCourseIds)
 }, [])

 return {
  recentlyViewedIds,
  addRecentlyViewedCourse,
 }
}

export default useRecentlyViewedCourses
