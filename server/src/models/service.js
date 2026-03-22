const db = require('../config/db');

const Service = {
  async getAll() {
    const result = await db.query(`
      SELECT s.id, s.name, s.description, s.price, s.duration_minutes, s.is_active,
        c.name AS category, sp.business_name AS provider
      FROM services s
      JOIN categories c ON s.category_id = c.id
      JOIN service_providers sp ON s.provider_id = sp.id
      WHERE s.is_active = true
      ORDER BY s.name
    `);
    return result.rows;
  },

  async getByCategory(categoryId) {
    const result = await db.query(`
      SELECT s.id, s.name, s.description, s.price, s.duration_minutes,
        sp.business_name AS provider, sp.avg_rating
      FROM services s
      JOIN service_providers sp ON s.provider_id = sp.id
      WHERE s.category_id = $1 AND s.is_active = true
      ORDER BY sp.avg_rating DESC
    `, [categoryId]);
    return result.rows;
  }
};

module.exports = Service;