const db = require('../config/db');

const Search = {
  async searchProviders({ query, categoryId }) {
    let sql = `
      SELECT DISTINCT
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
      LEFT JOIN services s ON s.provider_id = sp.id
      LEFT JOIN categories c ON s.category_id = c.id
      WHERE sp.is_active = true
    `;

    const params = [];
    let paramIndex = 1;

    if (categoryId) {
      sql += ` AND s.category_id = $${paramIndex}`;
      params.push(categoryId);
      paramIndex++;
    }

    if (query) {
      sql += ` AND (
        LOWER(sp.business_name) LIKE $${paramIndex}
        OR LOWER(u.name) LIKE $${paramIndex}
        OR LOWER(s.name) LIKE $${paramIndex}
        OR LOWER(c.name) LIKE $${paramIndex}
      )`;
      params.push(`%${query.toLowerCase()}%`);
      paramIndex++;
    }

    sql += ' ORDER BY sp.avg_rating DESC';

    const result = await db.query(sql, params);
    return result.rows;
  }
};

module.exports = Search;