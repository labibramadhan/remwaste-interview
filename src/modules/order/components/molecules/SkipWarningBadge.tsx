import { LuTriangleAlert } from 'react-icons/lu';

interface SkipWarningBadgeProps {
  type: 'road' | 'heavy';
}

export function SkipWarningBadge({ type }: SkipWarningBadgeProps) {
  const config = {
    road: {
      color: 'text-yellow-500',
      text: 'Not Allowed On The Public Road',
    },
    heavy: {
      color: 'text-red-500',
      text: 'Not Suitable for Heavy Waste',
    },
  };

  const { color, text } = config[type];

  return (
    <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
      <LuTriangleAlert className={`w-4 h-4 ${color}`} />
      <span className={`text-xs font-medium ${color}`}>{text}</span>
    </div>
  );
}
