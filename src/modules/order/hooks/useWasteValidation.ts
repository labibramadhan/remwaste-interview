import { HeavyWasteType, HeavyWastePercentage } from '../../../models/waste';

/**
 * Hook for heavy waste validation logic
 */
export const useWasteValidation = (
  selectedTypes: HeavyWasteType[],
  selectedPercentage: HeavyWastePercentage,
) => {
  // Check if a warning should be shown
  const showWarning =
    selectedPercentage !== 'No heavy waste' && selectedTypes.length === 0;

  // Check if skip size restrictions notice should be shown
  const showSkipSizeInfo = selectedPercentage !== 'No heavy waste';

  // Check if form submission is allowed
  const canSubmit = !(
    selectedPercentage !== 'No heavy waste' && selectedTypes.length === 0
  );

  return {
    showWarning,
    showSkipSizeInfo,
    canSubmit,
  };
};
