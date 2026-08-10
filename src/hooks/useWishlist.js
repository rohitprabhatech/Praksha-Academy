import { useCallback, useEffect, useState } from 'react'

const wishlistStorageKey = 'praksha:wishlist-course-ids'
const wishlistChangedEvent = 'praksha:wishlist-changed'

function readWishlist() {
 if (typeof window === 'undefined') {
  return []
 }

 try {
  const savedValue = window.localStorage.getItem(wishlistStorageKey)
  const parsedValue = savedValue ? JSON.parse(savedValue) : []

  return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : []
 } catch {
  return []
 }
}

function writeWishlist(courseIds) {
 window.localStorage.setItem(wishlistStorageKey, JSON.stringify(courseIds))
 window.dispatchEvent(new Event(wishlistChangedEvent))
}

function useWishlist() {
 const [wishlistIds, setWishlistIds] = useState(readWishlist)

 useEffect(() => {
  const handleWishlistChange = () => {
   setWishlistIds(readWishlist())
  }

  window.addEventListener('storage', handleWishlistChange)
  window.addEventListener(wishlistChangedEvent, handleWishlistChange)

  return () => {
   window.removeEventListener('storage', handleWishlistChange)
   window.removeEventListener(wishlistChangedEvent, handleWishlistChange)
  }
 }, [])

 const toggleWishlist = useCallback((courseId) => {
  if (!courseId) {
   return
  }

  const nextWishlistIds = readWishlist().includes(courseId)
   ? readWishlist().filter((savedId) => savedId !== courseId)
   : [courseId, ...readWishlist()]

  writeWishlist(nextWishlistIds)
 }, [])

 const isWishlisted = useCallback((courseId) => wishlistIds.includes(courseId), [wishlistIds])

 return {
  wishlistIds,
  isWishlisted,
  toggleWishlist,
 }
}

export default useWishlist
