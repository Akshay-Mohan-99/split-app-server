const { Users, Groups, GroupMembers } = require('../db');
const { issueJWT } = require('../utils/passport-auth/utils');
const catchAsync = require('../utils/general/catchAsync');

const createNewGroup = catchAsync(async (req, res) => {
  const auth = req?.auth || {};
  const body = req?.body || {};
  console.log(`phone: ${auth}`);

  const group = await Groups.create({
    name: body?.name,
  });

  const groupMember = await GroupMembers.create({
    group_id: group?.id,
    member_id: auth?.id,
    role: 'Admin',
    added_at: Date.now(),
  });

  return res.json({
    data: {
      group,
      groupMembers: [groupMember],
    },
    success: true,
  });
});

const addNewMemberToGroup = catchAsync(async (req, res) => {
  const body = req?.body || {};

  const group = await Groups.findOne({
    where: {
      id: body?.group_id,
    },
    raw: true,
  });

  if (!group)
    return res.status(401).json({ message: `Group id doesn't exist` });

  await GroupMembers.create({
    group_id: group?.id,
    member_id: body?.member_id,
    role: 'member',
    added_at: Date.now(),
  });

  const groupMembers = await GroupMembers.findAll({
    where: {
      group_id: group?.id,
    },
  });

  return res.json({
    data: {
      group,
      groupMembers,
    },
    success: true,
  });
});

const getAllMemberGroups = catchAsync(async (req, res) => {
  const auth = req?.auth || {};

  const groups = await GroupMembers.findAll({
    where: {
      member_id: auth.id,
    },
    attributes: ['id', 'role'],
    include: [
      {
        model: Groups,
        attributes: ['name'],
        include: [
          {
            model: GroupMembers,
            attributes: ['role'],
            include: [
              {
                model: Users,
                attributes: ['name'],
              },
            ],
          },
        ],
      },
    ],
  });

  return res.json({
    data: {
      groups,
    },
    success: true,
  });
});

module.exports = {
  createNewGroup,
  addNewMemberToGroup,
  getAllMemberGroups,
};
