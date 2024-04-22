const sequelize = require('../db/sequelize');
const catchAsync = require('../utils/general/catchAsync');

const syncTables = catchAsync(async (req, res) => {
  const password = req.body?.password || '';

  if (password === process.env.SYNC_PASSWORD) {
    await sequelize.sync();
    return res.json({
      success: true,
      message: 'Sync Completed',
    });
  } else {
    return res.status(401).send({ success: false, error: 'Invalid Password' });
  }
});

module.exports = {
  syncTables,
};
