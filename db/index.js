const { Umzug, SequelizeStorage } = require('umzug');
const Users = require('./models/Users');
const GroupMembers = require('./models/GroupMembers');
const Groups = require('./models/Groups');
const sequelize = require('./sequelize');

async function connectToDB() {
  console.log('Connecting to DB...');
  await sequelize.authenticate();

  const umzug = new Umzug({
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    migrations: { glob: ['migrations/*.js', { cwd: __dirname }] },
    logger: console,
  });

  try {
    const migrations = await umzug.up();
    console.log(':rocket: Migrations:', migrations);
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

module.exports = {
  connectToDB,
  Users,
  Groups,
  GroupMembers,
};
