"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Car,
  Building2,
  Users,
  ChevronDown,
  Map,
  CheckSquare,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "next-themes";
import { tripStats } from "@/data/itinerary";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#cc6600]" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#cc6600] top-3 left-3" />
    </button>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
          alt="Sossusvlei dunes at sunrise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.p
          className="text-[#f6b87f] uppercase tracking-[0.3em] text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Family Safari Adventure
        </motion.p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
          Namibia
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
          December 2025 — January 2026
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/itinerary"
            className="inline-flex items-center gap-2 bg-[#cc6600] hover:bg-[#b85c00] text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 shadow-lg"
          >
            View Itinerary
            <ChevronDown className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { icon: Calendar, value: tripStats.days, label: "Days" },
    { icon: Car, value: `${(tripStats.totalDistance / 1000).toFixed(1)}k`, label: "Kilometers" },
    { icon: Building2, value: tripStats.lodges, label: "Lodges" },
    { icon: Users, value: tripStats.travelers, label: "Travelers" },
  ];

  return (
    <section className="py-20 bg-[var(--muted)]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              variants={fadeInUp}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#cc6600]" />
              <div className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)]">
                {stat.value}
              </div>
              <div className="text-[var(--muted-foreground)] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  const destinations = [
    { name: "Sossusvlei", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80", days: "3 nights" },
    { name: "Swakopmund", image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80", days: "1 night" },
    { name: "Damaraland", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", days: "3 nights" },
    { name: "Etosha", image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80", days: "4 nights" },
    { name: "Omaanda", image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80", days: "2 nights" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Destinations
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-display font-bold">{dest.name}</h3>
                <p className="text-sm text-white/80">{dest.days}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function QuickLinksSection() {
  const links = [
    {
      title: "Day-by-Day",
      description: "14 days of adventure",
      href: "/itinerary",
      icon: Calendar,
      color: "from-[#cc6600] to-[#994d00]"
    },
    {
      title: "Interactive Map",
      description: "Explore our route",
      href: "/map",
      icon: Map,
      color: "from-[#336699] to-[#254c73]"
    },
    {
      title: "Accommodations",
      description: "7 unique lodges",
      href: "/accommodations",
      icon: Building2,
      color: "from-[#008000] to-[#006600]"
    },
    {
      title: "Packing List",
      description: "Everything you need",
      href: "/packing",
      icon: CheckSquare,
      color: "from-[#7a3e00] to-[#5c2f00]"
    },
  ];

  return (
    <section className="py-20 bg-[var(--muted)]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {links.map((link, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Link href={link.href}>
                <div className={`group relative p-6 rounded-2xl bg-gradient-to-br ${link.color} text-white overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl`}>
                  <link.icon className="w-10 h-10 mb-4 opacity-80" />
                  <h3 className="text-xl font-display font-bold mb-1">{link.title}</h3>
                  <p className="text-white/80 text-sm">{link.description}</p>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function UpcomingHighlights() {
  const highlights = [
    { day: 2, title: "Christmas at Deadvlei", description: "Sunrise among ancient trees" },
    { day: 3, title: "Hot Air Balloon", description: "Soaring over the Namib dunes" },
    { day: 5, title: "Cape Cross Seals", description: "100,000+ Cape fur seals" },
    { day: 6, title: "Desert Elephants", description: "Tracking giants in Damaraland" },
    { day: 8, title: "New Year's Eve", description: "Champagne at Etosha waterhole" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trip Highlights
        </motion.h2>

        <motion.div
          className="space-y-4"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[#cc6600]/50 transition-colors"
              variants={fadeInUp}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#cc6600]/10 flex items-center justify-center">
                <span className="text-[#cc6600] font-bold">D{item.day}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">{item.title}</h3>
                <p className="text-[var(--muted-foreground)] text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-[var(--card)] border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-[var(--muted-foreground)]">
          Namibia Family Safari • December 2025 - January 2026
        </p>
        <p className="text-sm text-[var(--muted-foreground)] mt-2">
          5 travelers • 14 days • 2,200 km • 7 lodges
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />
      <HeroSection />
      <StatsSection />
      <DestinationsSection />
      <QuickLinksSection />
      <UpcomingHighlights />
      <Footer />
    </main>
  );
}
