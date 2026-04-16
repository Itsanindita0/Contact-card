"use client";

import { useContacts } from "@/context/ContactsContext";

const STRATEGIES = [
  { id: "all", label: "All", textClass: "text-gray-900 dark:text-white" },
  { id: "safe", label: "Safe", textClass: "text-emerald-600 dark:text-emerald-400" },
  { id: "invalid", label: "Invalid", textClass: "text-red-600 dark:text-red-400" },
  { id: "unverified", label: "Verified", textClass: "text-blue-600 dark:text-blue-400" },
  { id: "bounced", label: "Bounced", textClass: "text-orange-600 dark:text-orange-400" },
  { id: "risky", label: "Risky", textClass: "text-amber-600 dark:text-amber-400" },
];

export default function FilterBar() {
  const { statusFilter, setStatusFilter } = useContacts();

  return (
    <div className="flex justify-center mb-8 w-full">
      <div className="inline-flex bg-gray-200/50 dark:bg-gray-800/50 p-1.5 rounded-full shadow-inner overflow-x-auto border border-gray-300/30 dark:border-white/10 backdrop-blur-md">
        {STRATEGIES.map((strategy) => {
          const isActive = statusFilter === strategy.id;
          return (
            <button
              key={strategy.id}
              onClick={() => setStatusFilter(strategy.id)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                isActive 
                  ? `bg-white dark:bg-[#1e293b] shadow-md transform scale-105 ${strategy.textClass}`
                  : `text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50`
              }`}
            >
              {strategy.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
