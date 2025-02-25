import React, { createContext, useContext, useState } from 'react';

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType; // Adjust based on your icon type
  isActive?: boolean;
  items?: NavItem[];
}

interface SidebarContextType {
  navMain: NavItem[];
  setNavMain: React.Dispatch<React.SetStateAction<NavItem[]>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navMain, setNavMain] = useState<NavItem[]>([
    // Initial sidebar items
  ]);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <SidebarContext.Provider value={{ navMain, setNavMain, darkMode, toggleDarkMode }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}; 