import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/organisms/Header";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import TaskList from "@/components/organisms/TaskList";
import QuickAddBar from "@/components/organisms/QuickAddBar";
import TaskModal from "@/components/organisms/TaskModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { categoryService } from "@/services/api/categoryService";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const categoriesData = await categoryService.getAll();
      setCategories(categoriesData);
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

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleTaskUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
    loadCategories(); // Refresh categories to update task counts
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowMobileSidebar(false);
  };

  const handleToggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6">
          <Error message={error} onRetry={loadCategories} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onAddTask={handleAddTask}
        onToggleMobileSidebar={handleToggleMobileSidebar}
      />

      <div className="flex h-[calc(100vh-73px)]">
        {/* Desktop Sidebar */}
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          className="hidden lg:flex w-80 flex-shrink-0"
        />

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {showMobileSidebar && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setShowMobileSidebar(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-y-0 left-0 z-50 lg:hidden"
              >
                <CategorySidebar
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                  className="w-80 h-full"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="max-w-5xl mx-auto p-6 space-y-6">
              {/* Quick Add Bar */}
              <QuickAddBar
                categories={categories}
                selectedCategory={selectedCategory}
                onTaskAdded={handleTaskUpdated}
              />

              {/* Task List */}
              <TaskList
                categories={categories}
                selectedCategory={selectedCategory}
                onTaskEdit={handleEditTask}
                onTaskAdd={handleAddTask}
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <AnimatePresence>
        {showTaskModal && (
          <TaskModal
            isOpen={showTaskModal}
            onClose={() => {
              setShowTaskModal(false);
              setEditingTask(null);
            }}
            task={editingTask}
            categories={categories}
            onTaskUpdated={handleTaskUpdated}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;