import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className,
  label,
  error,
  placeholder = "Select an option",
  required = false,
  options = [],
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 appearance-none pr-10";
  const errorStyles = "border-error focus:ring-error focus:border-error";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            baseStyles,
            error && errorStyles,
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon 
            name="ChevronDown" 
            size={16} 
            className={cn(
              "text-gray-400",
              error && "text-error"
            )} 
          />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <ApperIcon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;