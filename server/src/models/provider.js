const db = require('../config/db');

const Provider = {
  async getAll() {
    const result = await db.query(`
      SELECT 
        sp.id,
        sp.business_name,
        sp.avg_rating,
        sp.total_reviews,
        u.name,
        u.avatar_url,
        bp.bio,
        bp.instagram_handle,
        bp.accepts_walkins
      FROM service_providers sp
      JOIN users u ON sp.user_id = u.id
      LEFT JOIN business_profiles bp ON bp.provider_id = sp.id
      WHERE sp.is_active = true
    `);
    return result.rows;
  },

  async getById(id) {
    const result = await db.query(`
      SELECT 
        sp.id,
        sp.business_name,
        sp.avg_rating,
        sp.total_reviews,
        u.name,
        u.avatar_url,
        bp.bio,
        bp.experience_years,
        bp.instagram_handle,
        bp.accepts_walkins
      FROM service_providers sp
      JOIN users u ON sp.user_id = u.id
      LEFT JOIN business_profiles bp ON bp.provider_id = sp.id
      WHERE sp.id = $1
    `, [id]);
    return result.rows[0];
  },

  async getServices(providerId) {
    const result = await db.query(`
      SELECT s.id, s.name, s.description, s.price, s.duration_minutes, c.name AS category
      FROM services s
      JOIN categories c ON s.category_id = c.id
      WHERE s.provider_id = $1 AND s.is_active = true
    `, [providerId]);
    return result.rows;
  }
};

module.exports = Provider;