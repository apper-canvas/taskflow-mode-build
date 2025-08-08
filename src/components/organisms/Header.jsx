import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ onAddTask, onToggleMobileSidebar, className = "" }) => {
  const today = new Date();
  const greeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className={`bg-surface border-b border-gray-200 ${className}`}>
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <ApperIcon name="Menu" size={20} />
            </button>

            {/* Branding and greeting */}
            <div>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl shadow-lg">
                  <ApperIcon name="CheckSquare" size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    TaskFlow
                  </h1>
                  <p className="text-sm text-gray-600">
                    {greeting()}, let's get things done!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Date display */}
            <div className="hidden sm:flex items-center space-x-2 text-gray-600">
              <ApperIcon name="Calendar" size={16} />
              <span className="text-sm font-medium">
                {format(today, "EEEE, MMMM d")}
              </span>
            </div>

            {/* Add task button */}
            <Button
              onClick={onAddTask}
              icon="Plus"
              className="shadow-lg"
            >
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;