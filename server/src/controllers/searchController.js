const Search = require('../models/search');

const searchController = {
  async searchProviders(req, res) {
    try {
      const { q, category } = req.query;
      const providers = await Search.searchProviders({
        query: q,
        categoryId: category,
      });
      res.json(providers);
    } catch (err) {
      console.error('Error searching providers:', err.message);
      res.status(500).json({ error: 'Search failed' });
    }
  }
};

module.exports = searchController;