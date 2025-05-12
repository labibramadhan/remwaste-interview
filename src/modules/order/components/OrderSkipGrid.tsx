import { useState, useEffect, useMemo } from 'react';
import { OrderSkipCard } from './OrderSkipCard';
import { Skip } from '../../../models/skip';
import { OrderHeavyWasteDialog } from './OrderHeavyWasteDialog';
import { OrderBottomNavigationTab } from './OrderBottomNavigationTab';
import { useOrderStore } from '../store/useOrderStore';
import { LuPackageCheck, LuPencil, LuX } from 'react-icons/lu';

interface OrderSkipGridProps {
  skips: Skip[];
  isLoading: boolean;
  isError: boolean;
  selectedSkipId: string | null;
  onSelect: (id: string | null) => void;
}

export function OrderSkipGrid({
  skips,
  isLoading,
  isError,
  selectedSkipId,
  onSelect,
}: OrderSkipGridProps) {
  const [showHeavyWasteDialog, setShowHeavyWasteDialog] = useState(false);

  // Memoize these values to avoid recalculations
  const displaySkips = useMemo(() => skips || [], [skips]);
  const selectedSkip = useMemo(
    () => displaySkips.find((skip) => skip.id === selectedSkipId),
    [displaySkips, selectedSkipId],
  );

  const heavyWaste = useOrderStore((state) => state.heavyWaste);
  const hasHeavyWaste = useOrderStore((state) =>
    state.selectors.hasHeavyWaste(),
  );

  useEffect(() => {
    if (selectedSkip) {
      document.body.style.paddingBottom = '80px';
    } else {
      document.body.style.paddingBottom = '0';
    }

    return () => {
      document.body.style.paddingBottom = '0';
    };
  }, [selectedSkip]);

  const handleOpenHeavyWasteDialog = () => {
    setShowHeavyWasteDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0037C1]"></div>
        <span className="ml-3 text-white">Loading skips...</span>
      </div>
    );
  }

  if (isError) {
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
        <p className="text-lg">Failed to load skips.</p>
        <p className="text-sm mt-2">Please try again later.</p>
      </div>
    );
  }

  if (!skips?.length) {
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
        <p className="text-lg">No skips available for this area.</p>
        <p className="text-sm mt-2">Try a different postcode or waste type.</p>
      </div>
    );
  }

  return (
    <>
      {/* Heavy Waste Selection Summary */}
      {heavyWaste && (
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
                  onClick={handleOpenHeavyWasteDialog}
                  className="cursor-pointer rounded px-2 py-1 space-x-2 bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] border border-[#0037C1]/30 flex items-center self-center text-sm my-auto"
                >
                  <LuPencil className="w-3.5 h-3.5 mr-1" />
                  Edit
                </button>
              </div>
              {hasHeavyWaste && (
                <div className="mt-1">
                  <p className="text-sm text-gray-300">
                    <span className="bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                      {heavyWaste.percentage}
                    </span>
                    {heavyWaste.types.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {displaySkips.map((skip) => (
          <OrderSkipCard
            key={skip.id}
            skip={skip}
            selected={selectedSkipId === skip.id}
            onSelect={(id) => {
              // If the same skip is clicked again, unselect it
              if (selectedSkipId === id) {
                onSelect(null);
              } else {
                onSelect(id);
              }
            }}
            onOpenHeavyWasteDialog={handleOpenHeavyWasteDialog}
          />
        ))}
      </div>

      {/* Heavy Waste Dialog at the grid level */}
      <OrderHeavyWasteDialog
        isOpen={showHeavyWasteDialog}
        onClose={() => setShowHeavyWasteDialog(false)}
      />

      {/* Bottom navigation bar - shown when a skip is selected */}
      {selectedSkip && <OrderBottomNavigationTab skip={selectedSkip} />}
    </>
  );
}
