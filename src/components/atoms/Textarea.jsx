import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Textarea = forwardRef(({ 
  className,
  label,
  error,
  placeholder,
  required = false,
  rows = 3,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-vertical";
  const errorStyles = "border-error focus:ring-error focus:border-error";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        className={cn(
          baseStyles,
          error && errorStyles,
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <ApperIcon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;