export interface Property {
  id?: number;
  type: string;
  rooms: number;
  bedrooms: number;
  surface: number;
  city: string;
  quartier: string;
  price: number;
  title: string;
  description: string;
  highlights?: string[];
  url?: string;
  image_url?: string;
  images?: string[];
  gradient: string;
  prestige: boolean;
  features?: string[];
  composition?: {label: string, value: string}[];
  copro?: {label: string, value: string}[];
  financial?: {label: string, value: string}[];
  dpe_image?: string;
  ges_image?: string;
}

export interface SiteSetting {
  id?: number;
  key: string;
  value: string;
  updated_at?: string;
}

export type SiteSettingsMap = {
  [key: string]: string;
};
