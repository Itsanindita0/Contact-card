import SearchBar from "@/components/common/SearchBar";
import ContactsGrid from "@/components/contacts/ContactsGrid";
import FilterBar from "@/components/contacts/FilterBar";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center pt-24 pb-20 px-6 sm:px-12 transition-colors duration-500">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-purple-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-indigo-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] rounded-full bg-pink-500/5 dark:bg-fuchsia-600/10 blur-[100px] pointer-events-none" />
      
      {/* Theme Toggle in absolute top right */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-50">
        <ThemeToggle />
      </div>

      {/* Overlay noise pattern (optional, mostly via CSS) */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay"></div>

      <div className="z-10 w-full max-w-7xl mx-auto flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-4 text-xs font-medium text-indigo-700 dark:text-purple-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 dark:bg-purple-400"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500 dark:bg-purple-500"></span>
            </span>
            <span>Live Contact Feed Active</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 pb-2">
            Contacts Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg mt-2 font-light">
            Manage, discover, and organize your network instantly with real-time fetching and dynamic search filtering.
          </p>
        </div>

        {/* Search */}
        <SearchBar />

        {/* Status Filters */}
        <FilterBar />

        {/* Content Section */}
        <div className="mt-4 flex-1">
          <ContactsGrid />
        </div>
      </div>
    </main>
  );
}
