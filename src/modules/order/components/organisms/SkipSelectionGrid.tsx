import { useState, useEffect, useMemo } from 'react';
import { Skip } from '../../../../types/skip';
import { useOrderStore } from '../../store/useOrderStore';
import { LoadingSpinner } from '../atoms/indicators/LoadingSpinner';
import { ErrorState } from '../atoms/indicators/ErrorState';
import { EmptyState } from '../atoms/indicators/EmptyState';
import { HeavyWasteSummary } from '../molecules/HeavyWasteSummary';
import { SkipCard } from '../molecules/SkipCard';
import { NavigationTab } from '../molecules/NavigationTab';
import { HeavyWasteDialog } from './HeavyWasteDialog';

interface SkipSelectionGridProps {
  skips: Skip[];
  isLoading: boolean;
  isError: boolean;
  selectedSkipId: string | null;
  onSelect: (id: string | null) => void;
}

export function SkipSelectionGrid({
  skips,
  isLoading,
  isError,
  selectedSkipId,
  onSelect,
}: SkipSelectionGridProps) {
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
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load skips."
        message="Please refresh the page or try again later."
      />
    );
  }

  if (!skips?.length) {
    return (
      <EmptyState
        title="No skips available for this area."
        message="Try a different postcode or waste type."
      />
    );
  }

  return (
    <>
      {/* Heavy Waste Selection Summary */}
      <HeavyWasteSummary
        heavyWaste={heavyWaste}
        hasHeavyWaste={hasHeavyWaste}
        onEdit={handleOpenHeavyWasteDialog}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {displaySkips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            selected={selectedSkipId === skip.id}
            disabled={hasHeavyWaste && !skip.allows_heavy_waste}
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
      <HeavyWasteDialog
        isOpen={showHeavyWasteDialog}
        onClose={() => setShowHeavyWasteDialog(false)}
      />

      {/* Bottom navigation bar - shown when a skip is selected */}
      {selectedSkip && <NavigationTab skip={selectedSkip} />}
    </>
  );
}
