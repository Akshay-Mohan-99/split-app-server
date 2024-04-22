const express = require('express');
const { syncTables } = require('../controllers/internal');
const router = express.Router();

// sequelize sync
router.post('/sync', syncTables);

module.exports = router;
