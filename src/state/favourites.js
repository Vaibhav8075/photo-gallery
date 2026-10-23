const STORAGE_KEY = 'photo-gallery:favourites'

export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

// The favourites state is an array of photo ids.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    default:
      return state
  }
}

// useReducer's initialiser: reads the saved list once, before the first render.
export function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    // Missing or corrupted data: start with no favourites.
    return []
  }
}

export function saveFavourites(favourites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  } catch {
    // Storage can be blocked or full; favourites then last only until the page closes.
  }
}
