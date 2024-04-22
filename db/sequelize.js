const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    port: 5433,
    pool: {
      max: 30,
      min: 1,
      acquire: 60 * 1000,
      idle: 10 * 1000,
    },
  }
);

sequelize.query = function () {
  return Sequelize.prototype.query.apply(this, arguments).catch((err) => {
    console.log(err);
    throw err;
  });
};

module.exports = sequelize;
