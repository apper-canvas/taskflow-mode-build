import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(250);
    return [...categories];
  },

  async getById(id) {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  async create(categoryData) {
    await delay(300);
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
    const newCategory = {
      Id: maxId + 1,
      name: categoryData.name,
      color: categoryData.color,
      icon: categoryData.icon,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updateData) {
    await delay(200);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return null;

    const updatedCategory = {
      ...categories[index],
      ...updateData,
      Id: parseInt(id)
    };
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
  },

  async updateTaskCount(categoryId, count) {
    await delay(150);
    const index = categories.findIndex(c => c.Id === parseInt(categoryId));
    if (index !== -1) {
      categories[index].taskCount = count;
      return { ...categories[index] };
    }
    return null;
  }
};