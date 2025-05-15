const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(username, hashedPassword, userType);
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.user_id, userType: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.user_id, userType: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    logger.error(`Login failed: ${err.stack}`);
    res.status(500).json({ error: 'Authentication error' });
  }
};

