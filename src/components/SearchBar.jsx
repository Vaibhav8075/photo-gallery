import { memo } from 'react'

function SearchBar({ value, onChange }) {
  return (
    <label className="relative block w-full sm:w-80">
      <span className="sr-only">Search photos by author</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 stroke-stone-400"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M16.5 16.5 21 21" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by author…"
        className="w-full rounded-full border border-stone-300 bg-white py-2.5 pr-4 pl-11 text-sm shadow-sm transition outline-none placeholder:text-stone-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
      />
    </label>
  )
}

// memo: skips re-rendering while value and onChange stay the same (e.g. when a heart is toggled).
export default memo(SearchBar)
