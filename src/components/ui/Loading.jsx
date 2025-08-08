import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48"></div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
      </div>
      
      {/* Task cards skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-surface border border-gray-200 rounded-xl p-4 shadow-card">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20"></div>
                  </div>
                </div>
              </div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-6"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;