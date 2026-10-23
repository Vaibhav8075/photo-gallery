# Photo Gallery

A small React app that loads 30 photos from the [Picsum Photos API](https://picsum.photos/), shows them in a responsive grid, filters them by author as you type, and lets you mark favourites that survive a page refresh.

Built with React 19, Vite and Tailwind CSS v4. No component libraries.

## Run it locally

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

Other scripts: `npm run build` (production build into `dist/`), `npm run preview` (serve that build) and `npm run lint`.

## How it is organised

```
src/
  App.jsx                   page shell
  hooks/useFetchPhotos.js   fetches the photo list; returns { photos, loading, error }
  state/favourites.js       favourites reducer + localStorage load/save helpers
  components/
    Gallery.jsx             uses the hook, holds search text and favourites, renders the grid
    SearchBar.jsx           search input (memoised)
    PhotoCard.jsx           photo, author name and heart button (memoised)
    Spinner.jsx             loading state
    ErrorMessage.jsx        error state
```

## Notes on the main pieces

- **Fetching (`useFetchPhotos`)**: runs once on mount. `loading` starts as `true` and turns `false` when the request settles. A network failure or a non-2xx response sets `error`, which the gallery shows instead of the grid. The request is cancelled with an `AbortController` if the component unmounts first.
- **Responsive grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, so 1 column on phones, 2 on tablets and 4 on desktops. Cards load a 600×400 version of each photo from Picsum rather than the full-size original.
- **Search**: filters the photos already in memory by author name (case-insensitive). No extra request is made.
- **Favourites (`useReducer`)**: the state is an array of photo ids and the reducer handles a `TOGGLE_FAVOURITE` action. The saved list is read through `useReducer`'s lazy initialiser, so it is ready on the first render, and an effect writes the list back to `localStorage` whenever it changes.
- **`useCallback` / `useMemo`**: the search handler is wrapped in `useCallback` so `SearchBar` (wrapped in `memo`) receives the same function each render and does not re-render when only a favourite changes. The filtered list is computed in `useMemo`, so it is recalculated only when the photos or the search text change. The heart handler is also a `useCallback` (it only calls `dispatch`, which never changes), so a memoised `PhotoCard` re-renders only when its own favourite flag changes.
