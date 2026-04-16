"use client";

import { useState, useEffect } from "react";
import { useContacts } from "@/context/ContactsContext";
import ContactCard from "./ContactCard";

export default function ContactsGrid() {
  const { filteredContacts, loading, error, searchQuery, statusFilter } = useContacts();
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-3xl p-6 h-48 animate-pulse flex flex-col justify-between shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-white/10"></div>
              <div className="w-16 h-6 rounded-full bg-gray-200 dark:bg-white/10"></div>
            </div>
            <div className="w-3/4 h-6 rounded-md bg-gray-200 dark:bg-white/10 mb-2"></div>
            <div className="w-1/2 h-4 rounded-md bg-gray-200 dark:bg-white/10"></div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 w-full">
              <div className="w-2/3 h-4 rounded-md bg-gray-200 dark:bg-white/10"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-8 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-3xl backdrop-blur-xl">
        <svg className="w-16 h-16 text-red-500 dark:text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Error Loading Contacts</h3>
        <p className="text-red-500 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (filteredContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 mt-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl backdrop-blur-xl transition-all duration-500 shadow-sm">
        <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 ring-4 ring-gray-100 dark:ring-white/5">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No contacts found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">We couldn't find any contacts matching your search criteria. Try adjusting your filter or search query.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + contactsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col space-y-8 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
        {paginatedContacts.map((contact) => (
          <ContactCard key={contact._id} contact={contact} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm
              ${currentPage === 1 
                ? 'bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow dark:bg-white/10 dark:text-white dark:hover:bg-white/20 border border-gray-200 dark:border-white/10'
              }`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Prev
          </button>
          
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-white/5 px-5 py-2.5 rounded-full border border-gray-100 dark:border-white/10 backdrop-blur-sm">
            Page <span className="text-gray-900 dark:text-white font-bold">{currentPage}</span> of <span className="text-gray-900 dark:text-white font-bold">{totalPages}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm
              ${currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow dark:bg-white/10 dark:text-white dark:hover:bg-white/20 border border-gray-200 dark:border-white/10'
              }`}
          >
            Next
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
}
