import { useCallback, useReducer } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import { TOGGLE_FAVOURITE, favouritesReducer } from '../state/favourites'
import ErrorMessage from './ErrorMessage'
import PhotoCard from './PhotoCard'
import Spinner from './Spinner'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [favourites, dispatch] = useReducer(favouritesReducer, [])

  // dispatch never changes, so this function stays the same and unchanged cards can skip re-rendering.
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, id })
  }, [])

  let content
  if (loading) {
    content = <Spinner />
  } else if (error) {
    content = <ErrorMessage message={error} />
  } else {
    content = (
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {photos.map((photo) => (
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
      <header className="mb-10">
        <h1 className="font-serif text-4xl tracking-tight text-stone-900">Photo Gallery</h1>
        <p className="mt-2 text-stone-500">Photos from Picsum. Tap the heart to keep your favourites.</p>
      </header>

      {content}
    </div>
  )
}

export default Gallery
