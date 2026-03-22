const Provider = require('../models/provider');

const providerController = {
  async getAll(req, res) {
    try {
      const providers = await Provider.getAll();
      res.json(providers);
    } catch (err) {
      console.error('Error fetching providers:', err.message);
      res.status(500).json({ error: 'Failed to fetch providers' });
    }
  },

  async getById(req, res) {
    try {
      const provider = await Provider.getById(req.params.id);
      if (!provider) {
        return res.status(404).json({ error: 'Provider not found' });
      }
      res.json(provider);
    } catch (err) {
      console.error('Error fetching provider:', err.message);
      res.status(500).json({ error: 'Failed to fetch provider' });
    }
  },

  async getServices(req, res) {
    try {
      const services = await Provider.getServices(req.params.id);
      res.json(services);
    } catch (err) {
      console.error('Error fetching services:', err.message);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  }
};

module.exports = providerController;