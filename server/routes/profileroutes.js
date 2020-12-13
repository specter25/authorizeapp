const router = require('express').Router();
const authorize = require('../middleware/authentication');
const pool = require('../config/db');

router.get('/profile', authorize, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT user_name FROM users WHERE user_id = $1',
      [req.user.id],
    );
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'User does not exists' });
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

router.get('/allusers', async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users ', []);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'No user found , database empty' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
