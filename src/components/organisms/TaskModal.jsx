import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const TaskModal = ({ 
  isOpen, 
  onClose, 
  task = null, 
  categories = [], 
  onTaskUpdated 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(task);

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setFormData({
          title: task.title || "",
          description: task.description || "",
          categoryId: task.categoryId || "",
          priority: task.priority || "medium",
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""
        });
      } else {
        setFormData({
          title: "",
          description: "",
          categoryId: "",
          priority: "medium",
          dueDate: ""
        });
      }
      setErrors({});
    }
  }, [isOpen, task]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        categoryId: parseInt(formData.categoryId),
        priority: formData.priority,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      };

      if (isEditing) {
        await taskService.update(task.Id, taskData);
        toast.success("Task updated successfully");
      } else {
        await taskService.create(taskData);
        toast.success("Task created successfully");
      }

      onTaskUpdated?.();
      onClose();
      
    } catch (err) {
      toast.error(isEditing ? "Failed to update task" : "Failed to create task");
      console.error("Error saving task:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  if (!isOpen) return null;

  const categoryOptions = categories.map(cat => ({
    value: cat.Id,
    label: cat.name
  }));

  const priorityOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <ApperIcon 
                  name={isEditing ? "Edit2" : "Plus"} 
                  size={20} 
                  className="text-white" 
                />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-gray-900">
                  {isEditing ? "Edit Task" : "Create New Task"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEditing ? "Update task details" : "Add a new task to your list"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Task Title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter task title"
                  required
                  error={errors.title}
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Add more details about this task..."
                  rows={3}
                />
              </div>

              <div>
                <Select
                  label="Category"
                  value={formData.categoryId}
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                  options={categoryOptions}
                  placeholder="Select category"
                  required
                  error={errors.categoryId}
                />
              </div>

              <div>
                <Select
                  label="Priority"
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  options={priorityOptions}
                />
              </div>

              <div className="md:col-span-2">
                <Input
                  type="datetime-local"
                  label="Due Date (Optional)"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                icon={isEditing ? "Save" : "Plus"}
              >
                {isEditing ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskModal;