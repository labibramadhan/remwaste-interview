import { useState, useEffect } from 'react';
import { useOrderStore } from '../store/useOrderStore';
import { HeavyWasteType, HeavyWastePercentage } from '../../../types/waste';

/**
 * Hook for managing heavy waste type and percentage selection
 */
export const useWasteSelection = (isOpen: boolean) => {
  const setHeavyWaste = useOrderStore((state) => state.actions.setHeavyWaste);
  const currentHeavyWaste = useOrderStore((state) => state.heavyWaste);

  // Initialize state from store or with defaults
  const [selectedTypes, setSelectedTypes] = useState<HeavyWasteType[]>(
    currentHeavyWaste?.types || [],
  );
  const [selectedPercentage, setSelectedPercentage] =
    useState<HeavyWastePercentage>(
      currentHeavyWaste?.percentage || 'No heavy waste',
    );

  // Update local state when store changes
  useEffect(() => {
    if (currentHeavyWaste) {
      setSelectedTypes(currentHeavyWaste.types);
      setSelectedPercentage(currentHeavyWaste.percentage);
    }
  }, [currentHeavyWaste]);

  // Reset dialog when it opens
  useEffect(() => {
    if (isOpen && !currentHeavyWaste) {
      setSelectedTypes([]);
      setSelectedPercentage('No heavy waste');
    }
  }, [isOpen, currentHeavyWaste]);

  // Toggle waste type selection with smart behavior
  const toggleWasteType = (type: HeavyWasteType) => {
    const isAlreadySelected = selectedTypes.includes(type);
    const updatedTypes = isAlreadySelected
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    // Update waste types
    setSelectedTypes(updatedTypes);

    // Update percentage based on the new types
    if (updatedTypes.length === 0) {
      // If all types are removed, set to "No heavy waste"
      setSelectedPercentage('No heavy waste');
    } else if (updatedTypes.length > 0 && selectedTypes.length === 0) {
      // If adding first type and current percentage is "No heavy waste", update to "Up to 5%"
      if (selectedPercentage === 'No heavy waste') {
        setSelectedPercentage('Up to 5%');
      }
    }
  };

  // Set percentage with smart behavior
  const setPercentage = (percentage: HeavyWastePercentage) => {
    setSelectedPercentage(percentage);

    // If setting to 'No heavy waste', clear selected waste types
    if (percentage === 'No heavy waste' && selectedTypes.length > 0) {
      setSelectedTypes([]);
    }
  };

  // Save selections to store
  const handleConfirm = () => {
    setHeavyWaste({
      types: selectedTypes,
      percentage: selectedPercentage,
    });
  };

  return {
    selectedTypes,
    selectedPercentage,
    toggleWasteType,
    setPercentage,
    handleConfirm,
  };
};
