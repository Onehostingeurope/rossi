export interface Property {
  id?: number;
  type: string;
  title: string;
  price: number;
  city: string;
  quartier: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  url: string;
  description: string;
  highlights: string[];
  prestige: boolean;
  gradient: string;
  image_url?: string;
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
