import { Coordinates, FuelStop, PointOfInterest } from "@/types";

export const airport = {
  name: "Hosea Kutako Airport (WDH)",
  coords: { lat: -22.4799, lng: 17.4709 },
  details: "International airport - vehicle pickup (Dec 24) & dropoff (Jan 6)",
};

export const fuelStations: FuelStop[] = [
  {
    name: "Solitaire",
    coords: { lat: -23.8925, lng: 15.9956 },
    notes: "Last fuel before Sossusvlei! Famous bakery. 82km from Kulala.",
    critical: true,
  },
  {
    name: "Walvis Bay",
    coords: { lat: -22.9575, lng: 14.5053 },
    notes: "Coastal town, full services. Fill up before heading north.",
    critical: false,
  },
  {
    name: "Uis",
    coords: { lat: -21.2167, lng: 14.8667 },
    notes: "CRITICAL - Last fuel for 200+ km into Damaraland!",
    critical: true,
  },
  {
    name: "Khorixas",
    coords: { lat: -20.3717, lng: 14.9625 },
    notes: "Alternative fuel if approaching from south.",
    critical: false,
  },
  {
    name: "Outjo",
    coords: { lat: -20.1167, lng: 16.15 },
    notes: "CRITICAL - Last fuel before Etosha! Fill completely.",
    critical: true,
  },
  {
    name: "Otjiwarongo",
    coords: { lat: -20.4636, lng: 16.6481 },
    notes: "Major town on return route. Good for lunch + fuel.",
    critical: false,
  },
  {
    name: "Okahandja",
    coords: { lat: -21.9833, lng: 16.9167 },
    notes: "Famous craft market. Last stop before Windhoek.",
    critical: false,
  },
];

export const pointsOfInterest: PointOfInterest[] = [
  {
    name: "Sossusvlei & Deadvlei",
    coords: { lat: -24.7394, lng: 15.2928 },
    type: "landmark",
    description: "Iconic dunes & white clay pan. Enter via Kulala private gate 5AM.",
  },
  {
    name: "Big Daddy Dune",
    coords: { lat: -24.7583, lng: 15.2917 },
    type: "activity",
    description: "Tallest dune at 325m. Climb at sunrise before heat.",
  },
  {
    name: "Kuiseb Canyon",
    coords: { lat: -23.3333, lng: 15.5 },
    type: "photo-stop",
    description: "Scenic canyon viewpoint. Brief stop on way to Swakopmund.",
  },
  {
    name: "Moonscape",
    coords: { lat: -22.9167, lng: 14.8333 },
    type: "photo-stop",
    description: "NASA Mars rover testing site. Otherworldly landscape.",
  },
  {
    name: "Cape Cross Seal Colony",
    coords: { lat: -21.7583, lng: 13.95 },
    type: "wildlife",
    description: "100,000+ Cape fur seals! Prepare for the smell!",
  },
  {
    name: "Twyfelfontein",
    coords: { lat: -20.5983, lng: 14.3731 },
    type: "unesco",
    description: "6,000-year-old rock engravings. UNESCO World Heritage Site.",
  },
  {
    name: "Burnt Mountain",
    coords: { lat: -20.55, lng: 14.4167 },
    type: "landmark",
    description: "Volcanic slag heap near Twyfelfontein.",
  },
  {
    name: "Okaukuejo Waterhole",
    coords: { lat: -19.1742, lng: 15.9172 },
    type: "wildlife",
    description: "Famous floodlit waterhole in western Etosha.",
  },
  {
    name: "Namutoni Waterhole",
    coords: { lat: -18.8, lng: 16.9333 },
    type: "wildlife",
    description: "Eastern Etosha. Good for leopard sightings.",
  },
];

export const routes = [
  {
    name: "Airport → Kulala",
    day: 1,
    distance: 350,
    duration: "5 hours",
    coords: [
      { lat: -22.4799, lng: 17.4709 },
      { lat: -22.55, lng: 17.0833 },
      { lat: -23.0833, lng: 16.5 },
      { lat: -23.8925, lng: 15.9956 },
      { lat: -24.7283, lng: 15.7917 },
    ],
    color: "#CC6600",
  },
  {
    name: "Kulala → Swakopmund",
    day: 4,
    distance: 350,
    duration: "4.5 hours",
    coords: [
      { lat: -24.7283, lng: 15.7917 },
      { lat: -23.8925, lng: 15.9956 },
      { lat: -23.3333, lng: 15.5 },
      { lat: -22.9167, lng: 14.8333 },
      { lat: -22.9575, lng: 14.5053 },
      { lat: -22.6792, lng: 14.5264 },
    ],
    color: "#E67300",
  },
  {
    name: "Swakopmund → Damaraland",
    day: 5,
    distance: 420,
    duration: "5-6 hours",
    coords: [
      { lat: -22.6792, lng: 14.5264 },
      { lat: -21.7583, lng: 13.95 },
      { lat: -21.2167, lng: 14.8667 },
      { lat: -20.4833, lng: 14.3667 },
    ],
    color: "#FF8C00",
  },
  {
    name: "Damaraland → Ongava",
    day: 8,
    distance: 250,
    duration: "4 hours",
    coords: [
      { lat: -20.4833, lng: 14.3667 },
      { lat: -20.3717, lng: 14.9625 },
      { lat: -20.1167, lng: 16.15 },
      { lat: -19.05, lng: 15.7833 },
    ],
    color: "#CC6600",
  },
  {
    name: "Ongava → Etosha East",
    day: 9,
    distance: 200,
    duration: "4-5 hours",
    coords: [
      { lat: -19.05, lng: 15.7833 },
      { lat: -19.1742, lng: 15.9172 },
      { lat: -19.0167, lng: 16.3333 },
      { lat: -18.8, lng: 16.9333 },
      { lat: -18.8167, lng: 17.05 },
    ],
    color: "#E67300",
  },
  {
    name: "Etosha → Omaanda",
    day: 12,
    distance: 430,
    duration: "5.5 hours",
    coords: [
      { lat: -18.8167, lng: 17.05 },
      { lat: -20.4636, lng: 16.6481 },
      { lat: -21.9833, lng: 16.9167 },
      { lat: -22.5833, lng: 17.3167 },
    ],
    color: "#FF8C00",
  },
  {
    name: "Omaanda → Airport",
    day: 14,
    distance: 45,
    duration: "45 min",
    coords: [
      { lat: -22.5833, lng: 17.3167 },
      { lat: -22.4799, lng: 17.4709 },
    ],
    color: "#CC6600",
  },
];
