"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";

interface PackingItem {
  id: string;
  name: string;
  quantity?: number;
  essential: boolean;
  notes?: string;
}

interface PackingCategory {
  name: string;
  icon: string;
  items: PackingItem[];
}

const packingData: PackingCategory[] = [
  {
    name: "Clothing",
    icon: "👕",
    items: [
      { id: "c1", name: "Convertible zip-off pants", quantity: 3, essential: true },
      { id: "c2", name: "Long-sleeve lightweight shirts", quantity: 3, essential: true },
      { id: "c3", name: "Short-sleeve shirts", quantity: 3, essential: false },
      { id: "c4", name: "Fleece or hoodie", essential: true, notes: "Essential for 5:30am game drives" },
      { id: "c5", name: "Light rain jacket", essential: true, notes: "Packable, waterproof" },
      { id: "c6", name: "Wide-brim sun hat", essential: true },
      { id: "c7", name: "Warm beanie", essential: false, notes: "For early morning drives" },
      { id: "c8", name: "Closed walking shoes", essential: true, notes: "Trail runners work well" },
      { id: "c9", name: "Sandals", essential: false, notes: "For lodge use" },
      { id: "c10", name: "Swimsuit", essential: true },
      { id: "c11", name: "Buff or scarf", essential: false, notes: "Dust protection" },
    ],
  },
  {
    name: "Electronics",
    icon: "📷",
    items: [
      { id: "e1", name: "Camera with telephoto lens", essential: false, notes: "200-400mm ideal" },
      { id: "e2", name: "Binoculars", quantity: 5, essential: true, notes: "Absolutely essential!" },
      { id: "e3", name: "Power bank", essential: true, notes: "10,000+ mAh" },
      { id: "e4", name: "Headlamp with red light", essential: true },
      { id: "e5", name: "Travel adapter", essential: true, notes: "Type D & M (SA 3-pin)" },
      { id: "e6", name: "Car charger with USB", essential: true },
      { id: "e7", name: "Extra memory cards", essential: false },
    ],
  },
  {
    name: "Sun Protection",
    icon: "☀️",
    items: [
      { id: "s1", name: "Sunscreen SPF 50+", essential: true, notes: "200ml minimum per person" },
      { id: "s2", name: "Lip balm with SPF", essential: true },
      { id: "s3", name: "Sunglasses (polarized)", quantity: 5, essential: true },
      { id: "s4", name: "After-sun lotion", essential: false },
    ],
  },
  {
    name: "Practical Items",
    icon: "🎒",
    items: [
      { id: "p1", name: "Reusable water bottles", quantity: 5, essential: true, notes: "1L per person minimum" },
      { id: "p2", name: "Day backpack", essential: true },
      { id: "p3", name: "Ziplock bags", essential: true, notes: "Dust-proof electronics" },
      { id: "p4", name: "First aid kit", essential: true },
      { id: "p5", name: "Insect repellent", essential: true, notes: "DEET 50%, buy in Windhoek" },
      { id: "p6", name: "Wet wipes/hand sanitizer", essential: true },
      { id: "p7", name: "Tissues/toilet paper", essential: true, notes: "Emergency roadside use" },
    ],
  },
  {
    name: "Documents",
    icon: "📄",
    items: [
      { id: "d1", name: "Passports", quantity: 5, essential: true, notes: "Valid 6+ months, 2 blank pages" },
      { id: "d2", name: "Driver's licenses", essential: true },
      { id: "d3", name: "International Driving Permit", essential: false, notes: "Recommended" },
      { id: "d4", name: "Travel insurance policy", essential: true },
      { id: "d5", name: "Accommodation confirmations", essential: true, notes: "Printed & digital" },
      { id: "d6", name: "Vehicle rental voucher", essential: true },
      { id: "d7", name: "Credit cards", essential: true, notes: "Visa/Mastercard" },
      { id: "d8", name: "Emergency cash", essential: true, notes: "€200-300 equivalent" },
    ],
  },
];

export default function PackingPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("namibia-packing-checked");
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(
      "namibia-packing-checked",
      JSON.stringify([...checkedItems])
    );
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const resetAll = () => {
    setCheckedItems(new Set());
  };

  const totalItems = packingData.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = checkedItems.size;
  const progress = Math.round((checkedCount / totalItems) * 100);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="font-display font-bold text-xl">Packing List</h1>
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[#cc6600] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--muted-foreground)]">
              Progress
            </span>
            <span className="text-sm font-medium">
              {checkedCount} / {totalItems} items
            </span>
          </div>
          <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#cc6600] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">
            {progress === 100
              ? "All packed! Ready for Namibia! 🎉"
              : `${progress}% complete`}
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {packingData.map((category, catIndex) => {
          const catChecked = category.items.filter((item) =>
            checkedItems.has(item.id)
          ).length;

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-display font-bold flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </h2>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {catChecked}/{category.items.length}
                </span>
              </div>

              <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] divide-y divide-[var(--border)]">
                {category.items.map((item) => {
                  const isChecked = checkedItems.has(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-[var(--muted)]/50 ${
                        isChecked ? "opacity-60" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-[#cc6600] border-[#cc6600]"
                            : "border-[var(--border)]"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${
                              isChecked ? "line-through" : ""
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.quantity && item.quantity > 1 && (
                            <span className="text-xs px-2 py-0.5 bg-[var(--muted)] rounded-full">
                              ×{item.quantity}
                            </span>
                          )}
                          {item.essential && !isChecked && (
                            <span className="text-xs px-2 py-0.5 bg-[#cc6600]/10 text-[#cc6600] rounded-full">
                              Essential
                            </span>
                          )}
                        </div>
                        {item.notes && (
                          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
