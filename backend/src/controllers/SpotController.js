const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
  async index (req, res) {
    const { tech: techs } = req.query;
    const spots = await Spot.find({ techs });

    return res.json(spots);
  },

  async store (req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id: userID } = req.headers;
    const user = User.findById(userID);

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const spot = await Spot.create({
      user: userID,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price
    });

    return res.json(spot);
  }
};
