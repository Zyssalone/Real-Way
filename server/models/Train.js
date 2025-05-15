const pool = require('../config/db');

const Train = {
  // Get all active trains
  getAll: async () => {
    const { rows } = await pool.query(
      `SELECT * FROM railway.trains WHERE status = 'active'`
    );
    return rows;
  },

  // Get schedules for a train
  getSchedules: async (trainId) => {
    const { rows } = await pool.query(
      `SELECT * FROM railway.schedules WHERE train_id = $1`,
      [trainId]
    );
    return rows;
  }
};

module.exports = Train;