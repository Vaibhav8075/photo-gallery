import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import {
  TOGGLE_FAVOURITE,
  favouritesReducer,
  loadFavourites,
  saveFavourites,
} from '../state/favourites'
import ErrorMessage from './ErrorMessage'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'
import Spinner from './Spinner'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  useEffect(() => {
    saveFavourites(favourites)
  }, [favourites])

  // Same function on every render, so the memoised SearchBar does not re-render when only favourites change.
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  // dispatch never changes, so this function stays the same and unchanged cards can skip re-rendering.
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, id })
  }, [])

  // Filters the already-fetched photos; runs again only when the photos or the search text change.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  let content
  if (loading) {
    content = <Spinner />
  } else if (error) {
    content = <ErrorMessage message={error} />
  } else if (filteredPhotos.length === 0) {
    content = <p className="py-24 text-center text-stone-500">No photos found for “{query}”.</p>
  } else {
    content = (
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <li key={photo.id}>
            <PhotoCard
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl tracking-tight text-stone-900">Photo Gallery</h1>
          <p className="mt-2 text-stone-500">Photos from Picsum. Tap the heart to keep your favourites.</p>
        </div>
        <SearchBar value={query} onChange={handleSearchChange} />
      </header>

      {content}
    </div>
  )
}

export default Gallery
