"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Calendar, Check } from "lucide-react";
import { accommodations } from "@/data/accommodations";

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

export default function AccommodationsPage() {
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
          <h1 className="font-display font-bold text-xl">Accommodations</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
          7 Unique Lodges
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-lg mx-auto">
          From desert lodges to luxury safari camps, each accommodation offers a
          unique Namibian experience.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {accommodations.map((acc, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={acc.heroImage}
                  alt={acc.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      acc.status === "booked"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {acc.status === "booked" ? "Booked" : "TBD"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold mb-1">
                      {acc.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{acc.location}</span>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-sm mb-4">
                  <Calendar className="w-4 h-4 text-[#cc6600]" />
                  <span>
                    {acc.dates} •{" "}
                    {acc.nights === 1 ? "1 night" : `${acc.nights} nights`}
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {acc.features.slice(0, 3).map((feature, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-1 bg-[var(--muted)] rounded-full text-[var(--muted-foreground)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Inclusions */}
                <div className="border-t border-[var(--border)] pt-4">
                  <p className="text-xs uppercase text-[var(--muted-foreground)] mb-2">
                    Included
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {acc.inclusions.slice(0, 4).map((inc, j) => (
                      <span
                        key={j}
                        className="flex items-center gap-1 text-sm text-[var(--foreground)]"
                      >
                        <Check className="w-3 h-3 text-green-500" />
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                {acc.phone && (
                  <div className="border-t border-[var(--border)] pt-4 mt-4">
                    <a
                      href={`tel:${acc.phone}`}
                      className="flex items-center gap-2 text-sm text-[#cc6600] hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {acc.phone}
                    </a>
                  </div>
                )}

                {/* Booking Ref */}
                {acc.bookingRef && (
                  <p className="text-xs text-[var(--muted-foreground)] mt-3">
                    Booking Ref: {acc.bookingRef}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
