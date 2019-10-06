const User = require('../models/User');
const Spot = require('../models/Spot');
const Booking = require('../models/Booking');

module.exports = {
  async store (req, res) {
    const { user_id: user } = req.headers;
    const { spot_id: spot } = req.params;
    const { date } = req.body;
    const hasUser = User.findById(user);
    const hasSpot = Spot.findById(spot);

    if (!hasUser) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    if (!hasSpot) {
      return res.status(400).json({ error: 'Spot does not exists' });
    }

    const booking = await Booking.create({
      user,
      spot,
      date
    });

    await booking.populate('spot').populate('user').execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];
    if (ownerSocket) {
      req.io.to(ownerSocket).emit('booking_request', booking);
    }

    return res.json(booking);
  }
};
