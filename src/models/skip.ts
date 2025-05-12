export interface ISkip {
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

export class Skip implements ISkip {
  id: string;
  size: number;
  hire_period_days: number;
  transport_cost?: number;
  per_tonne_cost?: number;
  price_before_vat: number;
  original_price?: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  image_url: string;
  popular?: boolean;
  recommended?: boolean;

  constructor(skip: Partial<ISkip>) {
    this.id = skip.id ?? '';
    this.size = skip.size ?? 0;
    this.hire_period_days = skip.hire_period_days ?? 0;
    this.transport_cost = skip.transport_cost ?? 0;
    this.per_tonne_cost = skip.per_tonne_cost ?? 0;
    this.price_before_vat = skip.price_before_vat ?? 0;
    this.original_price = skip.original_price;
    this.vat = skip.vat ?? 0;
    this.postcode = skip.postcode ?? '';
    this.area = skip.area ?? '';
    this.forbidden = skip.forbidden ?? false;
    this.created_at = skip.created_at ?? '';
    this.updated_at = skip.updated_at ?? '';
    this.allowed_on_road = skip.allowed_on_road ?? false;
    this.allows_heavy_waste = skip.allows_heavy_waste ?? false;
    this.image_url = skip.image_url ?? '';
    this.popular = skip.popular ?? false;
    this.recommended = skip.recommended ?? false;
  }
}
