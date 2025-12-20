export interface TripDay {
  day: number;
  date: string;
  title: string;
  subtitle: string;
  heroImage: string;
  location: string;
  highlights: string[];
  activities: Activity[];
  route?: Route;
  accommodation?: Accommodation;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  isHighlight?: boolean;
  icon: ActivityIcon;
}

export type ActivityIcon =
  | "plane"
  | "car"
  | "balloon"
  | "sunrise"
  | "elephant"
  | "camera"
  | "dinner"
  | "pool"
  | "stargazing"
  | "walk"
  | "seal"
  | "bed"
  | "binoculars";

export interface Accommodation {
  name: string;
  location: string;
  dates: string;
  nights: number;
  bookingRef?: string;
  phone?: string;
  address?: string;
  coords?: Coordinates;
  status: "booked" | "tbd";
  features: string[];
  heroImage: string;
  inclusions: string[];
}

export interface Route {
  from: string;
  to: string;
  distance: number;
  duration: string;
  roadType: string;
  fuelStops: FuelStop[];
  waypoints: Coordinates[];
}

export interface FuelStop {
  name: string;
  coords: Coordinates;
  critical: boolean;
  notes: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PointOfInterest {
  name: string;
  coords: Coordinates;
  type: "landmark" | "activity" | "photo-stop" | "unesco" | "wildlife" | "gate";
  description: string;
}

export interface PackingItem {
  id: string;
  name: string;
  quantity?: number;
  essential: boolean;
  category: PackingCategory;
  notes?: string;
}

export type PackingCategory =
  | "clothing"
  | "electronics"
  | "sun-protection"
  | "practical"
  | "documents";
