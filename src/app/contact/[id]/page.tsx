"use client";

import { useContacts } from "@/context/ContactsContext";
import { useParams, useRouter } from "next/navigation";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useEffect } from "react";

export default function ContactDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { contacts, loading, error } = useContacts();
  
  // Use 'as string' to safely extract the parameter
  const id = params?.id as string | undefined;

  const selectedContact = contacts.find(c => c._id === id);

  useEffect(() => {
    // If we've finished loading and cannot find the contact in our state, return to home
    if (!loading && !selectedContact && contacts.length > 0) {
      router.push("/");
    }
  }, [loading, selectedContact, contacts, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="h-14 w-14 rounded-full border-b-2 border-indigo-500 animate-spin"></div>
        <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium">Fetching profile details...</p>
      </main>
    );
  }

  if (error || (!loading && !selectedContact)) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="text-2xl font-bold text-red-500 mb-4">Contact Profile Not Found</div>
        <button 
          onClick={() => router.push("/")} 
          className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:scale-105 transition-transform"
        >
          Return to Dashboard
        </button>
      </main>
    );
  }

  if (!selectedContact) return null;

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden flex flex-col items-center py-16 px-6 sm:px-12 transition-colors duration-500">
      {/* Background Gradients */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-purple-600/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-indigo-600/20 blur-[150px] pointer-events-none" />
      
      {/* Tools */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-50">
        <ThemeToggle />
      </div>

      <div className="z-10 w-full max-w-3xl mx-auto flex flex-col pt-8">
        {/* Back Button */}
        <button 
          onClick={() => router.push("/")}
          className="group flex flex-row items-center space-x-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 w-fit transition-all duration-300 bg-white/50 dark:bg-white/5 py-2 px-4 rounded-full border border-gray-200 dark:border-white/10"
        >
          <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back to Dashboard</span>
        </button>

        {/* Profile Card */}
        <div className="relative w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12 transition-all duration-500">
          {/* Card Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 dark:from-purple-500/20 dark:to-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none transition-all duration-500 delay-150"></div>
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-8 mb-12 relative z-10">
            <div className="h-28 w-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-5xl shadow-lg ring-4 ring-white dark:ring-white/10 shrink-0 mb-6 sm:mb-0 transform transition-transform hover:rotate-3">
              {selectedContact.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="text-center sm:text-left flex-1 mt-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                {selectedContact.name}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <span className={`px-4 py-1.5 text-sm font-semibold rounded-full border shadow-sm ${selectedContact.emailStatus === 'safe' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'}`}>
                  {selectedContact.status?.name || 'Unknown'} - {selectedContact.emailStatus === 'safe' ? 'Safe Email' : 'Risky Email'}
                </span>
                <span className="px-4 py-1.5 text-sm font-semibold rounded-full border shadow-sm bg-gray-50 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10">
                  {selectedContact.emailStatus.charAt(0).toUpperCase() + selectedContact.emailStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-gray-50/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5 transition-colors hover:border-gray-200 dark:hover:border-white/10">
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <h3 className="text-sm font-medium">Email Address</h3>
              </div>
              <p className="text-xl font-medium text-gray-900 dark:text-white break-all">{selectedContact.email}</p>
            </div>
            
            <div className="bg-gray-50/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5 transition-colors hover:border-gray-200 dark:hover:border-white/10">
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <h3 className="text-sm font-medium">Phone Number</h3>
              </div>
              <p className="text-xl font-medium text-gray-900 dark:text-white">{selectedContact.phone || 'Not provided'}</p>
            </div>

            <div className="bg-gray-50/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5 transition-colors hover:border-gray-200 dark:hover:border-white/10">
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                <h3 className="text-sm font-medium">City</h3>
              </div>
              <p className="text-xl font-medium text-gray-900 dark:text-white">{selectedContact.city || 'N/A'}</p>
            </div>

            <div className="bg-gray-50/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5 transition-colors hover:border-gray-200 dark:hover:border-white/10">
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m22 4v-4m-9-4h.01M12 20h.01M16 20h.01M21 16v-2a2 2 0 00-2-2m-1-1v-4a2 2 0 00-2-2H8a2 2 0 00-2 2v4m0 0a2 2 0 00-2 2v2M8 11h.01M12 11h.01"></path></svg>
                <h3 className="text-sm font-medium">State</h3>
              </div>
              <p className="text-xl font-medium text-gray-900 dark:text-white">{selectedContact.state || 'N/A'}</p>
            </div>

            <div className="md:col-span-2 bg-gray-50/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5 transition-colors hover:border-gray-200 dark:hover:border-white/10">
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <h3 className="text-sm font-medium">Location Region</h3>
              </div>
              <p className="text-xl font-medium text-gray-900 dark:text-white">{selectedContact.location || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
