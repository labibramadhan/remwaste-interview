import { FaExclamationCircle } from 'react-icons/fa';

export function ErrorPage() {
  // Using a generic error message since we can't access the actual error from TanStack Router v5
  const errorMessage = 'Failed to load data. Please try again later.';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-4">
      <div className="bg-red-500/10 p-4 rounded-full mb-6">
        <FaExclamationCircle className="w-6 h-6 text-red-500" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-red-400 font-medium mb-4">{errorMessage}</p>
      <p className="text-gray-400 text-center max-w-md mb-6">
        We're sorry for the inconvenience. Please try refreshing the page or
        contact support if the issue persists.
      </p>
      <button
        onClick={() => (window.location.href = '/')}
        className="px-4 py-2 bg-[#0037C1] hover:bg-[#0037C1]/90 rounded-md text-white transition-colors"
      >
        Go to Home Page
      </button>
    </div>
  );
}
