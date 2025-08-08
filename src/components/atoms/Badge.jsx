import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  variant = "default", 
  size = "sm",
  className,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20",
    secondary: "bg-gradient-to-r from-secondary/10 to-primary/10 text-secondary border border-secondary/20",
    success: "bg-gradient-to-r from-success/10 to-green-100 text-success border border-success/20",
    warning: "bg-gradient-to-r from-warning/10 to-yellow-100 text-warning border border-warning/20",
    error: "bg-gradient-to-r from-error/10 to-red-100 text-error border border-error/20",
    info: "bg-gradient-to-r from-info/10 to-blue-100 text-info border border-info/20",
    outline: "border-2 border-gray-300 text-gray-700 bg-transparent"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-sm"
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;