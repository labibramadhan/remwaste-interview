/**
 * Type definitions for heavy waste types
 */
export type HeavyWasteType =
  | 'Soil'
  | 'Concrete'
  | 'Bricks'
  | 'Tiles'
  | 'Sand'
  | 'Gravel'
  | 'Rubble';

/**
 * Type definitions for heavy waste percentage options
 */
export type HeavyWastePercentage =
  | 'No heavy waste'
  | 'Up to 5%'
  | '5-20%'
  | 'Over 20%';

/**
 * Interface for heavy waste information
 */
export interface HeavyWasteInformation {
  types: HeavyWasteType[];
  percentage: HeavyWastePercentage;
}
