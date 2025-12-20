"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Fuel, Building2, Compass } from "lucide-react";
import { accommodations } from "@/data/accommodations";
import { fuelStations, pointsOfInterest, routes } from "@/data/locations";

export default function MapPage() {
  const totalDistance = routes.reduce((sum, r) => sum + r.distance, 0);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="font-display font-bold text-xl">Route Map</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
            <Compass className="w-6 h-6 text-[#cc6600] mb-2" />
            <p className="text-2xl font-bold">{totalDistance.toLocaleString()} km</p>
            <p className="text-sm text-[var(--muted-foreground)]">Total Distance</p>
          </div>
          <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
            <Building2 className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-2xl font-bold">{accommodations.length}</p>
            <p className="text-sm text-[var(--muted-foreground)]">Accommodations</p>
          </div>
          <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
            <Fuel className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-2xl font-bold">{fuelStations.length}</p>
            <p className="text-sm text-[var(--muted-foreground)]">Fuel Stops</p>
          </div>
          <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
            <MapPin className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{pointsOfInterest.length}</p>
            <p className="text-sm text-[var(--muted-foreground)]">Points of Interest</p>
          </div>
        </div>

        {/* Map Placeholder / iframe to existing map */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="aspect-[16/10] bg-[var(--muted)] flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="w-16 h-16 text-[#cc6600] mx-auto mb-4" />
              <h2 className="text-xl font-display font-bold mb-2">Interactive Map</h2>
              <p className="text-[var(--muted-foreground)] mb-4 max-w-md">
                View our complete route through Namibia with all accommodations, fuel stops, and points of interest.
              </p>
              <a
                href="/route_map.html"
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#cc6600] hover:bg-[#b85c00] text-white px-6 py-3 rounded-full transition-colors"
              >
                <Compass className="w-5 h-5" />
                Open Full Map
              </a>
            </div>
          </div>
        </div>

        {/* Route Segments */}
        <div className="mt-8">
          <h2 className="text-xl font-display font-bold mb-4">Route Segments</h2>
          <div className="space-y-3">
            {routes.map((route, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: route.color }}
                />
                <div className="flex-1">
                  <p className="font-medium">{route.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Day {route.day} • {route.duration}
                  </p>
                </div>
                <span className="text-sm font-medium text-[#cc6600]">
                  {route.distance} km
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Critical Fuel Stops */}
        <div className="mt-8">
          <h2 className="text-xl font-display font-bold mb-4">
            <span className="text-red-500">⚠️</span> Critical Fuel Stops
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {fuelStations
              .filter((f) => f.critical)
              .map((fuel, i) => (
                <div
                  key={i}
                  className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl"
                >
                  <p className="font-bold text-red-700 dark:text-red-400">
                    ⛽ {fuel.name}
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                    {fuel.notes}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Points of Interest */}
        <div className="mt-8">
          <h2 className="text-xl font-display font-bold mb-4">Points of Interest</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pointsOfInterest.map((poi, i) => (
              <div
                key={i}
                className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl"
              >
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#336699] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{poi.name}</p>
                    <p className="text-xs text-[#cc6600] capitalize">{poi.type.replace("-", " ")}</p>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                      {poi.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
