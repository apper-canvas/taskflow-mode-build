import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className,
  label,
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <label className={cn(
      "flex items-center cursor-pointer select-none",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}>
      <div className="checkbox-container">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="checkbox-input"
          {...props}
        />
        <div className="checkbox-custom">
          {checked && (
            <svg
              className="checkmark"
              viewBox="0 0 24 24"
            >
              <polyline points="20,6 9,17 4,12" />
            </svg>
          )}
        </div>
      </div>
      
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;