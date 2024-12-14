import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-md w-full animate-pulse"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
          <div className="flex justify-center space-x-2">
            <div className="h-6 bg-gray-200 rounded w-16" />
            <div className="h-6 bg-gray-200 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;