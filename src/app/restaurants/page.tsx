'use client';

import React from 'react';
import Header from './Header';
import SidebarFilters from './SidebarFilters';
import Home from './Home';




const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-20">
     

        <div className="flex flex-col lg:flex-row gap-8">
    
          <div className="w-full lg:w-1/4 sticky top-24 self-start">
            <SidebarFilters />
          </div>

 
          <div className="w-full lg:max-w-5xl">
          <Home />
          </div>
        </div>
      </div>

 
    </div>
  );
};

export default IndexPage;
