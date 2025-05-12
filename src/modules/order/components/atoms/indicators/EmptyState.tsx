import { LuCircleAlert } from 'react-icons/lu';

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
      <LuCircleAlert className="w-6 h-6 text-red-500" />
      <p className="text-lg">{title}</p>
      <p className="text-sm mt-2">{message}</p>
    </div>
  );
}
