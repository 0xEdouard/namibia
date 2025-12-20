"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Car, Clock, ChevronRight } from "lucide-react";
import { tripDays } from "@/data/itinerary";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function ItineraryPage() {
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
          <h1 className="font-display font-bold text-xl">Itinerary</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-64 md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=80"
          alt="Namibia Safari"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
              14 Days of Adventure
            </h2>
            <p className="text-white/80">December 23, 2025 - January 6, 2026</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          className="relative"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

          {tripDays.map((day, index) => (
            <motion.div
              key={day.day}
              variants={fadeInUp}
              className="relative pl-16 pb-8 last:pb-0"
            >
              {/* Day number circle */}
              <div className="absolute left-0 w-12 h-12 rounded-full bg-[#cc6600] flex items-center justify-center text-white font-bold shadow-lg">
                {day.day}
              </div>

              {/* Card */}
              <Link href={`/itinerary/${day.day}`}>
                <div className="group relative bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[#cc6600]/50 transition-all hover:shadow-lg">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-48 h-40 md:h-auto flex-shrink-0">
                      <Image
                        src={day.heroImage}
                        alt={day.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-[#cc6600] font-medium mb-1">
                            {day.date}
                          </p>
                          <h3 className="text-xl font-display font-bold mb-1">
                            {day.title}
                          </h3>
                          <p className="text-[var(--muted-foreground)] text-sm mb-3">
                            {day.subtitle}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[#cc6600] transition-colors flex-shrink-0" />
                      </div>

                      {/* Quick info */}
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
                          <MapPin className="w-4 h-4" />
                          {day.location}
                        </span>
                        {day.route && (
                          <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
                            <Car className="w-4 h-4" />
                            {day.route.distance} km
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
                          <Clock className="w-4 h-4" />
                          {day.activities.length} activities
                        </span>
                      </div>

                      {/* Highlights */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {day.highlights.slice(0, 2).map((highlight, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-[#cc6600]/10 text-[#cc6600] rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
