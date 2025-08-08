import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";

const CategorySidebar = ({ 
  selectedCategory, 
  onCategorySelect,
  className = ""
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [taskCounts, setTaskCounts] = useState({});

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ]);
      
      // Calculate task counts for each category
      const counts = {};
      categoriesData.forEach(category => {
        counts[category.Id] = tasksData.filter(task => 
          task.categoryId === category.Id && !task.completed
        ).length;
      });
      
      setCategories(categoriesData);
      setTaskCounts(counts);
    } catch (err) {
      setError("Failed to load categories");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className={`bg-surface border-r border-gray-200 ${className}`}>
        <div className="p-6">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3">
                <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-surface border-r border-gray-200 ${className}`}>
        <div className="p-6">
          <Error message={error} onRetry={loadCategories} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-surface border-r border-gray-200 flex flex-col",
      className
    )}>
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-display font-semibold text-gray-800 mb-1">
          Categories
        </h2>
        <p className="text-sm text-gray-600">
          Organize your tasks
        </p>
      </div>
      
      <div className="flex-1 p-4 space-y-2">
        {/* All Tasks */}
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 group",
            selectedCategory === null
              ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20"
              : "text-gray-700 hover:bg-gray-50 hover:scale-[1.02]"
          )}
        >
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-2 h-2 rounded-full",
              selectedCategory === null ? "bg-primary" : "bg-gray-400"
            )}></div>
            <span className="font-medium">All Tasks</span>
          </div>
          <Badge variant={selectedCategory === null ? "primary" : "default"} size="xs">
            {Object.values(taskCounts).reduce((sum, count) => sum + count, 0)}
          </Badge>
        </button>

        {/* Category List */}
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.Id}
              onClick={() => onCategorySelect(category.Id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 group",
                selectedCategory === category.Id
                  ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20"
                  : "text-gray-700 hover:bg-gray-50 hover:scale-[1.02]"
              )}
              style={selectedCategory === category.Id ? {
                borderColor: category.color + "40",
                backgroundColor: category.color + "10",
                color: category.color
              } : {}}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <ApperIcon name={category.icon} size={16} />
                <span className="font-medium">{category.name}</span>
              </div>
              
              {taskCounts[category.Id] > 0 && (
                <Badge 
                  variant="default" 
                  size="xs"
                  style={selectedCategory === category.Id ? {
                    backgroundColor: category.color + "20",
                    color: category.color
                  } : {}}
                >
                  {taskCounts[category.Id]}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Tasks pending
          </p>
          <p className="text-2xl font-display font-bold text-primary">
            {Object.values(taskCounts).reduce((sum, count) => sum + count, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;