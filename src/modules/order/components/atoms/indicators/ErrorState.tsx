interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({
  title = 'Failed to load data',
  message = 'Please try again later.',
}: ErrorStateProps) {
  return (
    <div className="text-center py-12 text-red-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto mb-3 w-10 h-10"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p className="text-lg">{title}</p>
      <p className="text-sm mt-2">{message}</p>
    </div>
  );
}
