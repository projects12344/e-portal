import React from 'react';
import { LucideIndianRupee, LucideShield } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Government of India" }) => {
  return (
    <header className="bg-blue-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center p-1 bg-orange-500 rounded-full">
            <LucideShield className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
            <p className="text-xs sm:text-sm text-blue-100">Digital Services Portal</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-sm">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
      </div>
    </header>
  );
};

export default Header;