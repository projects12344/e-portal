import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Government of India. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 text-xs">
            <a href="#" className="hover:text-blue-700">Privacy Policy</a>
            <a href="#" className="hover:text-blue-700">Terms of Service</a>
            <a href="#" className="hover:text-blue-700">Accessibility</a>
            <a href="#" className="hover:text-blue-700">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;