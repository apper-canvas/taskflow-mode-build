import React, { useState } from "react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className = ""
}) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    if (isCompleting) return;
    
    setIsCompleting(true);
    try {
      await onToggleComplete(task.Id, !task.completed);
    } finally {
      setTimeout(() => setIsCompleting(false), 400);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "error";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    return isPast(date) || isToday(date) || isTomorrow(date);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className={`task-card ${task.priority ? `priority-${task.priority}` : ""} ${
        task.completed ? "task-completed" : ""
      } ${isCompleting ? "animate-task-complete" : ""} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0 mt-0.5">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={isCompleting}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-gray-800 leading-tight ${
              task.completed ? "line-through text-gray-500" : ""
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm text-gray-600 mt-1 leading-relaxed ${
                task.completed ? "line-through" : ""
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-2 mt-3">
              {category && (
                <Badge 
                  variant="outline" 
                  size="xs"
                  style={{ 
                    borderColor: category.color + "40",
                    backgroundColor: category.color + "10",
                    color: category.color 
                  }}
                  className="flex items-center space-x-1"
                >
                  <ApperIcon name={category.icon} size={12} />
                  <span>{category.name}</span>
                </Badge>
              )}
              
              <Badge variant={getPriorityColor(task.priority)} size="xs">
                {task.priority?.toUpperCase() || "MEDIUM"}
              </Badge>
              
              {task.dueDate && (
                <Badge 
                  variant={isDueSoon(task.dueDate) && !task.completed ? "error" : "default"} 
                  size="xs"
                  className="flex items-center space-x-1"
                >
                  <ApperIcon name="Calendar" size={12} />
                  <span>{formatDueDate(task.dueDate)}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 ml-3">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
            title="Edit task"
          >
            <ApperIcon name="Edit2" size={16} />
          </button>
          
          <button
            onClick={() => onDelete(task.Id)}
            className="p-1.5 text-gray-400 hover:text-error hover:bg-error/10 rounded-md transition-colors"
            title="Delete task"
          >
            <ApperIcon name="Trash2" size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;