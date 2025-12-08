
import Image from 'next/image';
import React from 'react';
import image from "./../../../public/logo.png";
import Link from 'next/link';
const Header: React.FC = () => {
  return (
       <header className="fixed top-0 left-0 w-full z-50 pb-10">
   <div className="flex justify-between items-center py-1 md:px-10 px-3 bg-[#E8F4F1] border-b border-[#FFF9EE] shadow-sm sticky top-0 z-50">
      <div className="flex items-center">
               <Link href={"/"}>
                    <Image src={image} alt="Logo" width={170} />
                  </Link>
                {/* <span className="text-2xl font-bold p-1 bg-[#0B5D4E] text-[#E8F4F1] rounded-md">
          JAHAK HUB
        </span> */}
        {/* <span className="text-2xl font-bold text-[#0B5D4E] ml-1">
          partner
        </span> */}
      </div>
      <nav className="flex items-center space-x-4">
        <Link
          href="/partner/resources" 
          className="text-gray-700 hover:text-[#B6932F] font-medium hidden md:block"
          aria-label="View Resources"
        >
          Resources
        </Link>
        
        {/* Login Button */}
        <button 
          className="px-6 py-2 bg-[#0B5D4E] text-[#E8F4F1] font-semibold rounded-lg shadow-md hover:bg-[#0B5D4E] transition duration-300"
        >
          Login
        </button>
      </nav>
    </div>
</header>
  );
};

export default Header;