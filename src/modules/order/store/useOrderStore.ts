import { create } from 'zustand';
import { HeavyWasteInformation } from '../../../models/waste';

interface OrderState {
  selectedSkipId: string | null;
  heavyWaste: HeavyWasteInformation | null;

  actions: {
    selectSkip: (id: string | null) => void;
    setHeavyWaste: (heavyWaste: HeavyWasteInformation | null) => void;
  };

  selectors: {
    hasHeavyWaste: () => boolean;
  };
}

export const useOrderStore = create<OrderState>((set, get) => ({
  selectedSkipId: null,
  heavyWaste: {
    // make default selected heavy waste to simulate heavy waste dialog
    types: ['Bricks', 'Sand', 'Tiles'],
    percentage: '5-20%',
  },

  actions: {
    selectSkip: (id: string | null) => set({ selectedSkipId: id }),
    setHeavyWaste: (heavyWaste: HeavyWasteInformation | null) =>
      set({ heavyWaste }),
  },

  selectors: {
    hasHeavyWaste: () => {
      const { heavyWaste } = get();
      return (
        heavyWaste !== null &&
        heavyWaste.percentage !== 'No heavy waste' &&
        heavyWaste.types.length > 0
      );
    },
  },
}));
