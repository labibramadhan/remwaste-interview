import { HeavyWastePercentage } from '../../../models/waste';

export const getHeavyWasteImage = (
  percentage: HeavyWastePercentage,
): string | undefined => {
  switch (percentage) {
    case 'No heavy waste':
      return undefined;
    case 'Up to 5%':
      return '/images/waste_percentage_optimized/heavywaste-up-to-5.webp';
    case '5-20%':
      return '/images/waste_percentage_optimized/heavywaste-5-to-20.webp';
    case 'Over 20%':
      return '/images/waste_percentage_optimized/heavywaste-over20.webp';
    default:
      return undefined;
  }
};

// Get helper text for percentage
export const getPercentageHelperText = (
  percentage: HeavyWastePercentage,
): string => {
  switch (percentage) {
    case 'No heavy waste':
      return 'Light garden and household waste only. No soil, concrete, etc.';
    case 'Up to 5%':
      return 'A small amount of heavy waste, such as a few bricks or tiles.';
    case '5-20%':
      return 'Moderate heavy waste content, mixed with other materials.';
    case 'Over 20%':
      return 'Significant heavy waste content - restricted skip sizes apply.';
    default:
      return '';
  }
};
