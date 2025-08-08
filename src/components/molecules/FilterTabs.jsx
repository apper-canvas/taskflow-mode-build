import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FilterTabs = ({ 
  activeFilter, 
  onFilterChange, 
  taskCounts = {},
  className = ""
}) => {
  const filters = [
    { key: "all", label: "All Tasks", icon: "List", count: taskCounts.all || 0 },
    { key: "pending", label: "Pending", icon: "Clock", count: taskCounts.pending || 0 },
    { key: "completed", label: "Completed", icon: "CheckCircle", count: taskCounts.completed || 0 },
    { key: "high", label: "High Priority", icon: "AlertTriangle", count: taskCounts.high || 0 }
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeFilter === filter.key
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.02]"
          )}
        >
          <ApperIcon name={filter.icon} size={16} />
          <span>{filter.label}</span>
          <span className={cn(
            "px-1.5 py-0.5 rounded-full text-xs font-bold",
            activeFilter === filter.key
              ? "bg-white/20 text-white"
              : "bg-gray-300 text-gray-600"
          )}>
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;