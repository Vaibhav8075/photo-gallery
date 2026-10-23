import { useEffect, useState } from 'react'

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30'

// Loads the photo list once, when the component that uses this hook mounts.
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Lets us cancel the request if the component unmounts before it finishes.
    const controller = new AbortController()

    async function loadPhotos() {
      try {
        const response = await fetch(PHOTOS_URL, { signal: controller.signal })

        // fetch only rejects on network failures, so HTTP errors (404, 500) are checked by hand.
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        // An abort is our own cleanup, not a real failure.
        if (err.name === 'AbortError') return
        setError('Could not load photos. Check your internet connection and refresh the page.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
