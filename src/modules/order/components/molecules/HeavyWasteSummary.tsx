import { LuPackageCheck, LuPencil, LuX } from 'react-icons/lu';
import { HeavyWasteInformation } from '../../../../models/waste';
import { StatusBadge } from '../atoms/badges/StatusBadge';

interface HeavyWasteSummaryProps {
  heavyWaste: HeavyWasteInformation | null;
  hasHeavyWaste: boolean;
  onEdit: () => void;
}

export function HeavyWasteSummary({
  heavyWaste,
  hasHeavyWaste,
  onEdit,
}: HeavyWasteSummaryProps) {
  if (!heavyWaste) return null;

  return (
    <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        {hasHeavyWaste ? (
          <LuPackageCheck className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
        ) : (
          <LuX className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
        )}
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <p className="text-white font-medium">
              {hasHeavyWaste ? 'Heavy Waste Selected' : 'No Heavy Waste'}
            </p>
            <button
              onClick={onEdit}
              className="cursor-pointer rounded px-2 py-1 space-x-2 bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] border border-[#0037C1]/30 flex items-center self-center text-sm my-auto"
            >
              <LuPencil className="w-3.5 h-3.5 mr-1" />
              Edit
            </button>
          </div>
          {hasHeavyWaste && (
            <div className="mt-1">
              <p className="text-sm text-gray-300">
                <StatusBadge variant="blue">
                  {heavyWaste.percentage}
                </StatusBadge>
                <span className="ml-2">{heavyWaste.types.join(', ')}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
