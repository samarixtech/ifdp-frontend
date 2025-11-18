import React from 'react';

const Header: React.FC = () => {
  return (
       <header className="fixed top-0 left-0 w-full z-50 pb-10">
   <div className="flex justify-between items-center py-4 px-6 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="flex items-center">
                <span className="text-2xl font-bold p-1 bg-blue-600 text-white rounded-md">
          IFDP
        </span>
        <span className="text-2xl font-bold text-blue-600 ml-1">
          partner
        </span>
      </div>
      <nav className="flex items-center space-x-4">
        <a 
          href="/partner/resources" 
          className="text-gray-700 hover:text-blue-600 font-medium hidden md:block"
          aria-label="View Resources"
        >
          Resources
        </a>
        
        {/* Login Button */}
        <button 
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </nav>
    </div>
</header>
  );
};

export default Header;