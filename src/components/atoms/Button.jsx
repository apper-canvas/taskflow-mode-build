import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon, 
  iconPosition = "left",
  loading = false,
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-ring disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-[1.02]",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.02]",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:scale-[1.02]",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg hover:scale-[1.02]",
    warning: "bg-gradient-to-r from-warning to-orange-600 text-white hover:shadow-lg hover:scale-[1.02]",
    error: "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg hover:scale-[1.02]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl"
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSizes[size]} 
          className="animate-spin mr-2" 
        />
      )}
      
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="mr-2" 
        />
      )}
      
      {children}
      
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="ml-2" 
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;