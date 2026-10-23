import { memo, useState } from 'react'

// Picsum resizes on request, so each card loads a small image instead of the multi-megabyte original.
function thumbnailUrl(id) {
  return `https://picsum.photos/id/${id}/600/400`
}

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // The image stays transparent over the grey box until it has downloaded, then fades in.
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[3/2] overflow-hidden bg-stone-200">
        <img
          src={thumbnailUrl(photo.id)}
          alt={`Photo by ${photo.author}`}
          width="600"
          height="400"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="truncate font-medium text-stone-800" title={photo.author}>
          {photo.author}
        </p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          className="shrink-0 rounded-full p-2 transition hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:scale-90"
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
    </article>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-6 w-6 transition-colors ${filled ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-stone-400'}`}
    >
      <path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.2 4.5 7 4.5c2.1 0 3.6 1.1 5 3 1.4-1.9 2.9-3 5-3 3.8 0 6 3.8 4.5 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

// memo: a card re-renders only when its own props change, not every time the gallery does.
export default memo(PhotoCard)
