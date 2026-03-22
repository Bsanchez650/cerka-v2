const db = require('../config/db');

const Category = {
  async getAll() {
    const result = await db.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
  },

  async getById(id) {
    const result = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = Category;