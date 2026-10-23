function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      className="mx-auto my-16 max-w-md rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center"
    >
      <p className="font-medium text-red-700">Something went wrong</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>
    </div>
  )
}

export default ErrorMessage
