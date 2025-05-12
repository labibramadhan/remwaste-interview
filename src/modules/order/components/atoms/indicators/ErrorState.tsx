import { FaExclamationCircle } from 'react-icons/fa';

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
      <FaExclamationCircle className="w-6 h-6 text-red-500" />
      <p className="text-lg">{title}</p>
      <p className="text-sm mt-2">{message}</p>
    </div>
  );
}
