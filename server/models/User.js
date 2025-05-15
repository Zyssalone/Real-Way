const pool = require('../config/db');

const User = {
  // Create a new user
  create: async (username, passwordHash, userType) => {
    const query = `
      INSERT INTO railway.users (username, password_hash, user_type)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [username, passwordHash, userType];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Find user by username
  findByUsername: async (username) => {
    const { rows } = await pool.query(
      'SELECT * FROM railway.users WHERE username = $1',
      [username]
    );
    return rows[0];
  }
};

module.exports = User;