import React from 'react';

const HorizontalScroller: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex overflow-x-auto space-x-6 pb-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-600 -mx-4 px-4">
    {children}
  </div>
);

export default HorizontalScroller;
