/**
 * Main composing hook for Heavy Waste Dialog
 *
 * This follows the atomic pattern by composing smaller, focused hooks
 */
import { useWasteSelection } from './useWasteSelection';
import { useWasteValidation } from './useWasteValidation';
import {
  HEAVY_WASTE_TYPES,
  HEAVY_WASTE_PERCENTAGE_OPTIONS,
  WASTE_TYPE_DESCRIPTIONS,
} from '../../../models/waste';
import {
  getHeavyWasteImage,
  getPercentageHelperText,
} from '../../waste/utils/wasteHelpers';

export const useHeavyWasteDialog = (isOpen: boolean) => {
  // Use atomic hooks for specific concerns
  const selection = useWasteSelection(isOpen);
  const validation = useWasteValidation(
    selection.selectedTypes,
    selection.selectedPercentage,
  );

  // Return a composed API that combines all pieces
  return {
    // State from selection hook
    selectedTypes: selection.selectedTypes,
    selectedPercentage: selection.selectedPercentage,

    // Actions from selection hook
    toggleWasteType: selection.toggleWasteType,
    setPercentage: selection.setPercentage,
    handleConfirm: selection.handleConfirm,

    // Static data from constants
    wasteTypes: HEAVY_WASTE_TYPES,
    percentageOptions: HEAVY_WASTE_PERCENTAGE_OPTIONS,
    wasteTypeDescriptions: WASTE_TYPE_DESCRIPTIONS,

    // Utility functions from constants
    getHeavyWasteImage,
    getPercentageHelperText,

    // Derived state from validation hook
    showWarning: validation.showWarning,
    showSkipSizeInfo: validation.showSkipSizeInfo,
    canSubmit: validation.canSubmit,
  };
};
