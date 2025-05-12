import { HeavyWasteType, HeavyWastePercentage } from '../types/waste';

/**
 * Array of all available heavy waste types
 */
export const HEAVY_WASTE_TYPES: HeavyWasteType[] = [
  'Soil',
  'Concrete',
  'Bricks',
  'Tiles',
  'Sand',
  'Gravel',
  'Rubble',
];

/**
 * Array of heavy waste percentage options
 */
export const HEAVY_WASTE_PERCENTAGE_OPTIONS: HeavyWastePercentage[] = [
  'No heavy waste',
  'Up to 5%',
  '5-20%',
  'Over 20%',
];

/**
 * Detailed descriptions for each heavy waste type
 */
export const WASTE_TYPE_DESCRIPTIONS: Record<HeavyWasteType, string> = {
  Soil: 'Including topsoil and subsoil',
  Concrete: 'Broken concrete and cement',
  Bricks: 'Building bricks and masonry',
  Tiles: 'Ceramic and porcelain tiles',
  Sand: 'Building and landscaping sand',
  Gravel: 'Loose stones and aggregate',
  Rubble: 'Mixed construction waste',
};
