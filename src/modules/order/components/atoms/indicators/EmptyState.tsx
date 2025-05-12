interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = 'No data available',
  message = 'Try a different search or filter.',
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 text-white/70">
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
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
      <p className="text-lg">{title}</p>
      <p className="text-sm mt-2">{message}</p>
    </div>
  );
}
