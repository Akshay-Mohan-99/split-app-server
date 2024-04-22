const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roles: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    user_metadata: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'users',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ['roles', 'user_metadata', 'last_name', 'email'] },
    },
  }
);

module.exports = Users;
