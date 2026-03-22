const Category = require('../models/category');

const categoryController = {
  async getAll(req, res) {
    try {
      const categories = await Category.getAll();
      res.json(categories);
    } catch (err) {
      console.error('Error fetching categories:', err.message);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  },

  async getById(req, res) {
    try {
      const category = await Category.getById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (err) {
      console.error('Error fetching category:', err.message);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  }
};

module.exports = categoryController;