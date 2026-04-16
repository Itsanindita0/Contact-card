"use client";

import { Contact } from "@/context/ContactsContext";
import Link from "next/link";

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard({ contact }: ContactCardProps) {
  const isSafe = contact.emailStatus === "safe";
  
  return (
    <Link 
      href={`/contact/${contact._id}`} 
      className="group relative flex flex-col justify-between bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-3xl p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-purple-500/20 overflow-hidden cursor-pointer shadow-sm h-full"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-purple-500/10 dark:to-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-indigo-500/10 dark:group-hover:bg-purple-500/30"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-white dark:ring-white/10 shrink-0">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${isSafe ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'}`}>
            {contact.status?.name || 'Unknown'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight truncate">{contact.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 truncate">{contact.email}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <svg className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="truncate">{contact.location || `${contact.city}, ${contact.state}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
