import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(250);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      categoryId: taskData.categoryId,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;

    const updatedTask = {
      ...tasks[index],
      ...updateData,
      Id: parseInt(id)
    };

    if (updateData.completed && !tasks[index].completed) {
      updatedTask.completedAt = new Date().toISOString();
    } else if (!updateData.completed && tasks[index].completed) {
      updatedTask.completedAt = null;
    }

    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  async getByCategory(categoryId) {
    await delay(250);
    return tasks.filter(t => t.categoryId === parseInt(categoryId)).map(t => ({ ...t }));
  },

  async getCompleted() {
    await delay(250);
    return tasks.filter(t => t.completed).map(t => ({ ...t }));
  },

  async getPending() {
    await delay(250);
    return tasks.filter(t => !t.completed).map(t => ({ ...t }));
  },

  async searchTasks(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return tasks
      .filter(t => 
        t.title.toLowerCase().includes(searchTerm) || 
        t.description.toLowerCase().includes(searchTerm)
      )
      .map(t => ({ ...t }));
  }
};