const Service = require('../models/service');

const serviceController = {
  async getAll(req, res) {
    try {
      const services = await Service.getAll();
      res.json(services);
    } catch (err) {
      console.error('Error fetching services:', err.message);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  },

  async getByCategory(req, res) {
    try {
      const services = await Service.getByCategory(req.params.categoryId);
      res.json(services);
    } catch (err) {
      console.error('Error fetching services:', err.message);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  }
};

module.exports = serviceController;