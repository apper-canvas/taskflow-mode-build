import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = forwardRef(({ 
  className,
  type = "text",
  label,
  error,
  icon,
  iconPosition = "left",
  placeholder,
  required = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200";
  const errorStyles = "border-error focus:ring-error focus:border-error";
  const iconLeftStyles = "pl-10";
  const iconRightStyles = "pr-10";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              size={16} 
              className={cn(
                "text-gray-400",
                error && "text-error"
              )} 
            />
          </div>
        )}
        
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={cn(
            baseStyles,
            error && errorStyles,
            icon && iconPosition === "left" && iconLeftStyles,
            icon && iconPosition === "right" && iconRightStyles,
            className
          )}
          {...props}
        />
        
        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              size={16} 
              className={cn(
                "text-gray-400",
                error && "text-error"
              )} 
            />
          </div>
        )}
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

Input.displayName = "Input";

export default Input;