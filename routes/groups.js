const express = require('express');
const {
  createNewGroup,
  getAllMemberGroups,
  addNewMemberToGroup,
} = require('../controllers/groups');
const { mwCheckLogin } = require('../middlewares');

const router = express.Router();

router.post('/create-new-group', mwCheckLogin, createNewGroup);
router.post('/add-new-to-group', mwCheckLogin, addNewMemberToGroup);
router.get('/get-all-groups', mwCheckLogin, getAllMemberGroups);

module.exports = router;
