const createBooking = async (userId, scheduleId, seatNumber) => {
  const query = `
    INSERT INTO railway.bookings 
    (user_id, schedule_id, seat_number) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
  return await pool.query(query, [userId, scheduleId, seatNumber]);
};