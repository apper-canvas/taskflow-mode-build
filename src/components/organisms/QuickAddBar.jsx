import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const QuickAddBar = ({ 
  categories = [], 
  selectedCategory,
  onTaskAdded,
  className = ""
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(selectedCategory || "");
  const [priority, setPriority] = useState("medium");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setIsAdding(true);
      
      const taskData = {
        title: title.trim(),
        categoryId: parseInt(category),
        priority: priority
      };

      await taskService.create(taskData);
      
      // Reset form
      setTitle("");
      setCategory(selectedCategory || "");
      setPriority("medium");
      
      toast.success("Task added successfully! 🎉");
      onTaskAdded?.();
      
    } catch (err) {
      toast.error("Failed to add task");
      console.error("Error adding task:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  const categoryOptions = categories.map(cat => ({
    value: cat.Id,
    label: cat.name
  }));

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];

  return (
    <div className={`bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 rounded-xl p-4 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
            <ApperIcon name="Plus" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-gray-800">
              Quick Add Task
            </h3>
            <p className="text-sm text-gray-600">
              Press Ctrl+Enter to add quickly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              required
              className="h-11"
            />
          </div>
          
          <div className="md:col-span-3">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
              placeholder="Category"
              required
              className="h-11"
            />
          </div>
          
          <div className="md:col-span-2">
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={priorityOptions}
              className="h-11"
            />
          </div>
          
          <div className="md:col-span-2">
            <Button
              type="submit"
              loading={isAdding}
              className="w-full h-11"
              icon="Plus"
            >
              Add Task
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuickAddBar;