import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Get started by creating your first task",
  actionText = "Add Task",
  onAction,
  icon = "CheckSquare",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-8 mb-8 shadow-lg">
        <ApperIcon 
          name={icon} 
          size={64} 
          className="text-primary"
        />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-800 mb-3 text-center">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md text-lg leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="btn-primary flex items-center space-x-2 text-lg px-6 py-3 shadow-xl"
        >
          <ApperIcon name="Plus" size={20} />
          <span>{actionText}</span>
        </button>
      )}
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
        <div className="text-center p-4">
          <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-lg p-3 mb-3 inline-block">
            <ApperIcon name="Target" size={24} className="text-success" />
          </div>
          <h4 className="font-semibold text-gray-700 mb-1">Stay Organized</h4>
          <p className="text-sm text-gray-500">Keep track of all your tasks in one place</p>
        </div>
        
        <div className="text-center p-4">
          <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg p-3 mb-3 inline-block">
            <ApperIcon name="Clock" size={24} className="text-warning" />
          </div>
          <h4 className="font-semibold text-gray-700 mb-1">Set Priorities</h4>
          <p className="text-sm text-gray-500">Focus on what matters most</p>
        </div>
        
        <div className="text-center p-4">
          <div className="bg-gradient-to-br from-info/10 to-info/5 rounded-lg p-3 mb-3 inline-block">
            <ApperIcon name="TrendingUp" size={24} className="text-info" />
          </div>
          <h4 className="font-semibold text-gray-700 mb-1">Track Progress</h4>
          <p className="text-sm text-gray-500">See your productivity improve</p>
        </div>
      </div>
    </div>
  );
};

export default Empty;