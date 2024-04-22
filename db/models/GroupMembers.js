const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Groups = require('./Groups');
const Users = require('./Users');

const GroupMembers = sequelize.define(
  'group_members',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Groups,
        key: 'id',
      },
    },
    member_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id',
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    added_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'group_members',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  }
);

Groups.hasMany(GroupMembers, { foreignKey: 'group_id' });
GroupMembers.belongsTo(Groups, { foreignKey: 'group_id' });

Users.hasMany(GroupMembers, { foreignKey: 'member_id' });
GroupMembers.belongsTo(Users, { foreignKey: 'member_id' });

module.exports = GroupMembers;
