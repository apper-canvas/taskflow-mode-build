import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskCard from "@/components/molecules/TaskCard";
import FilterTabs from "@/components/molecules/FilterTabs";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";

const TaskList = ({ 
  categories = [], 
  selectedCategory,
  onTaskEdit,
  onTaskAdd,
  refreshTrigger 
}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      
      let tasksData;
      if (selectedCategory) {
        tasksData = await taskService.getByCategory(selectedCategory);
      } else {
        tasksData = await taskService.getAll();
      }
      
      setTasks(tasksData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [selectedCategory, refreshTrigger]);

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await taskService.update(taskId, { completed });
      setTasks(tasks.map(task => 
        task.Id === taskId 
          ? { ...task, completed, completedAt: completed ? new Date().toISOString() : null }
          : task
      ));
      
      toast.success(completed ? "Task completed! 🎉" : "Task marked as pending");
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(tasks.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
      );
    }

    // Apply status filter
    switch (activeFilter) {
      case "pending":
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case "completed":
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      case "high":
        filteredTasks = filteredTasks.filter(task => task.priority === "high");
        break;
      default:
        break;
    }

    // Sort tasks: incomplete first, then by priority, then by due date
    filteredTasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 2;
      const bPriority = priorityOrder[b.priority] || 2;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filteredTasks;
  };

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      pending: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length,
      high: tasks.filter(t => t.priority === "high").length
    };
  };

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === categoryId);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />;
  }

  const filteredTasks = getFilteredTasks();

  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks yet"
        description="Get started by creating your first task to stay organized and productive."
        actionText="Add Your First Task"
        onAction={onTaskAdd}
        icon="CheckSquare"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={getTaskCounts()}
          className="order-2 lg:order-1"
        />
        
        <div className="order-1 lg:order-2 lg:w-80">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search tasks..."
            className="w-full"
          />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <Empty
          title="No tasks found"
          description={searchTerm 
            ? `No tasks match "${searchTerm}". Try adjusting your search.`
            : "No tasks match the current filter. Try selecting a different filter."
          }
          actionText="Add New Task"
          onAction={onTaskAdd}
          icon="Search"
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.Id}
                task={task}
                category={getCategoryById(task.categoryId)}
                onToggleComplete={handleToggleComplete}
                onEdit={onTaskEdit}
                onDelete={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;