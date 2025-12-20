"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Car,
  Plane,
  Sun,
  Camera,
  Utensils,
  Bed,
  Eye,
  Footprints,
  Sparkles,
  Moon,
} from "lucide-react";
import { tripDays } from "@/data/itinerary";
import { notFound } from "next/navigation";
import { ActivityIcon } from "@/types";

const iconMap: Record<ActivityIcon, React.ElementType> = {
  plane: Plane,
  car: Car,
  balloon: Sparkles,
  sunrise: Sun,
  elephant: Eye,
  camera: Camera,
  dinner: Utensils,
  pool: Sparkles,
  stargazing: Moon,
  walk: Footprints,
  seal: Eye,
  bed: Bed,
  binoculars: Eye,
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DayDetailPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day: dayParam } = use(params);
  const dayNumber = parseInt(dayParam);
  const day = tripDays.find((d) => d.day === dayNumber);

  if (!day) {
    notFound();
  }

  const prevDay = tripDays.find((d) => d.day === dayNumber - 1);
  const nextDay = tripDays.find((d) => d.day === dayNumber + 1);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/itinerary"
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>All Days</span>
          </Link>
          <span className="text-sm text-[var(--muted-foreground)]">
            Day {day.day} of 14
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-72 md:h-96">
        <Image
          src={day.heroImage}
          alt={day.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#f6b87f] text-sm mb-1">Day {day.day}</p>
            <p className="text-white/80 mb-2">{day.date}</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">
              {day.title}
            </h1>
            <p className="text-xl text-white/90">{day.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Location & Route Info */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 text-[var(--foreground)]">
            <MapPin className="w-5 h-5 text-[#cc6600]" />
            <span className="font-medium">{day.location}</span>
          </div>
          {day.route && (
            <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
              <Car className="w-5 h-5" />
              <span>
                {day.route.distance} km • {day.route.duration}
              </span>
            </div>
          )}
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-3">
            Highlights
          </h2>
          <div className="flex flex-wrap gap-2">
            {day.highlights.map((highlight, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-[#cc6600]/10 text-[#cc6600] rounded-full text-sm"
              >
                {highlight}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mb-12"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-6">
            Schedule
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-[var(--border)]" />

            <div className="space-y-4">
              {day.activities.map((activity, i) => {
                const IconComponent = iconMap[activity.icon] || Sun;
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className={`relative flex gap-4 ${
                      activity.isHighlight
                        ? "bg-[#cc6600]/5 -mx-4 px-4 py-4 rounded-xl border border-[#cc6600]/20"
                        : ""
                    }`}
                  >
                    {/* Time & Icon */}
                    <div className="flex-shrink-0 flex items-start gap-3">
                      <span className="text-sm text-[var(--muted-foreground)] w-14 pt-0.5">
                        {activity.time}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          activity.isHighlight
                            ? "bg-[#cc6600] text-white"
                            : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        <IconComponent className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <h3
                        className={`font-medium ${
                          activity.isHighlight ? "text-[#cc6600]" : ""
                        }`}
                      >
                        {activity.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {activity.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Accommodation */}
        {day.accommodation && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
              Accommodation
            </h2>
            <div className="bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)]">
              <div className="relative h-48">
                <Image
                  src={day.accommodation.heroImage}
                  alt={day.accommodation.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-display font-bold">
                      {day.accommodation.name}
                    </h3>
                    <p className="text-[var(--muted-foreground)]">
                      {day.accommodation.location} • {day.accommodation.nights}{" "}
                      {day.accommodation.nights === 1 ? "night" : "nights"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      day.accommodation.status === "booked"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {day.accommodation.status === "booked" ? "Booked" : "TBD"}
                  </span>
                </div>
                {day.accommodation.bookingRef && (
                  <p className="text-sm text-[var(--muted-foreground)] mb-3">
                    Ref: {day.accommodation.bookingRef}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {day.accommodation.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-[var(--muted)] rounded-full text-[var(--muted-foreground)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Route Info */}
        {day.route && day.route.fuelStops.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
              Fuel Stops
            </h2>
            <div className="space-y-2">
              {day.route.fuelStops.map((stop, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    stop.critical
                      ? "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
                      : "border-[var(--border)] bg-[var(--card)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-lg ${
                        stop.critical ? "text-red-500" : ""
                      }`}
                    >
                      ⛽
                    </span>
                    <span
                      className={`font-medium ${
                        stop.critical ? "text-red-700 dark:text-red-400" : ""
                      }`}
                    >
                      {stop.name}
                    </span>
                    {stop.critical && (
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded-full">
                        CRITICAL
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">
                    {stop.notes}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[var(--border)]">
          {prevDay ? (
            <Link
              href={`/itinerary/${prevDay.day}`}
              className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#cc6600] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="text-left">
                <p className="text-xs uppercase">Previous</p>
                <p className="font-medium text-[var(--foreground)]">
                  Day {prevDay.day}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextDay ? (
            <Link
              href={`/itinerary/${nextDay.day}`}
              className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#cc6600] transition-colors"
            >
              <div className="text-right">
                <p className="text-xs uppercase">Next</p>
                <p className="font-medium text-[var(--foreground)]">
                  Day {nextDay.day}
                </p>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
