import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="bg-gradient-to-br from-error/10 to-error/5 rounded-full p-6 mb-6">
        <ApperIcon 
          name="AlertTriangle" 
          size={48} 
          className="text-error"
        />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-gray-800 mb-2 text-center">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary flex items-center space-x-2 shadow-lg"
        >
          <ApperIcon name="RefreshCw" size={18} />
          <span>Try Again</span>
        </button>
      )}
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          If the problem persists, please check your connection and try again.
        </p>
      </div>
    </div>
  );
};

export default Error;