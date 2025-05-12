export type HeavyWasteType =
  | 'Soil'
  | 'Concrete'
  | 'Bricks'
  | 'Tiles'
  | 'Sand'
  | 'Gravel'
  | 'Rubble';

export type HeavyWastePercentage =
  | 'No heavy waste'
  | 'Up to 5%'
  | '5-20%'
  | 'Over 20%';

export interface HeavyWasteInformation {
  types: HeavyWasteType[];
  percentage: HeavyWastePercentage;
}

export const HEAVY_WASTE_TYPES: HeavyWasteType[] = [
  'Soil',
  'Concrete',
  'Bricks',
  'Tiles',
  'Sand',
  'Gravel',
  'Rubble',
];

export const HEAVY_WASTE_PERCENTAGE_OPTIONS: HeavyWastePercentage[] = [
  'No heavy waste',
  'Up to 5%',
  '5-20%',
  'Over 20%',
];

export const WASTE_TYPE_DESCRIPTIONS: Record<HeavyWasteType, string> = {
  Soil: 'Including topsoil and subsoil',
  Concrete: 'Broken concrete and cement',
  Bricks: 'Building bricks and masonry',
  Tiles: 'Ceramic and porcelain tiles',
  Sand: 'Building and landscaping sand',
  Gravel: 'Loose stones and aggregate',
  Rubble: 'Mixed construction waste',
};
