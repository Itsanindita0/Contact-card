"use client";

import { useContacts } from "@/context/ContactsContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useContacts();

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6 group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-15 group-hover:opacity-30 dark:opacity-25 dark:group-hover:opacity-50 transition duration-500"></div>
      <div className="relative flex items-center w-full h-14 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl transition-all duration-300">
        <div className="grid place-items-center h-full w-14 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          className="peer h-full w-full outline-none text-sm text-gray-800 dark:text-gray-100 bg-transparent pr-4 placeholder-gray-400 dark:placeholder-gray-500"
          type="text"
          id="search"
          placeholder="Search contacts by name, email, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
