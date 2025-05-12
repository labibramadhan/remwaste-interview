/**
 * Interface representing a skip for hire
 */
export interface Skip {
  id: string;
  size: number;
  hire_period_days: number;
  transport_cost?: number;
  per_tonne_cost?: number;
  price_before_vat: number;
  original_price?: number; // Original price before discount
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  image_url: string;
  popular?: boolean; // Indicates if this is a popular choice
  recommended?: boolean; // Indicates if this size is recommended for the user's waste type
}

/**
 * Function to create a new Skip with default values
 */
export const createSkip = (skipData: Partial<Skip>): Skip => ({
  id: '',
  size: 0,
  hire_period_days: 0,
  transport_cost: 0,
  per_tonne_cost: 0,
  price_before_vat: 0,
  vat: 0,
  postcode: '',
  area: '',
  forbidden: false,
  created_at: '',
  updated_at: '',
  allowed_on_road: false,
  allows_heavy_waste: false,
  image_url: '',
  popular: false,
  recommended: false,
  ...skipData,
});
