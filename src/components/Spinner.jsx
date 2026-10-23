function Spinner() {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-24 text-stone-500">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-rose-500" />
      <p className="text-sm">Loading photos…</p>
    </div>
  )
}

export default Spinner
