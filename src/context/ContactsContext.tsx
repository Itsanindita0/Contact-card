"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Contact {
  _id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName?: string;
  name: string;
  city: string;
  state: string;
  location: string;
  emailStatus: string;
  status: {
    name: string;
  };
}

interface ContactsContextProps {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filteredContacts: Contact[];
}

const ContactsContext = createContext<ContactsContextProps | undefined>(undefined);

export const ContactsProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://test.icomm.ai/api/contacts/public/list");
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        if (data && data.success && Array.isArray(data.data)) {
          setContacts(data.data);
        } else {
          throw new Error("Invalid format received from API");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      contact.name?.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query) ||
      contact.location?.toLowerCase().includes(query);
      
    const matchesStatus = statusFilter === "all" || contact.emailStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        filteredContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
