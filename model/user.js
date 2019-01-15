const Sequelize = require('sequelize');
const user = module.exports = {
  username: Sequelize.STRING,
  password: Sequelize.STRING(24),
  birthday: Sequelize.DATE,
  phone: Sequelize.STRING,
  sex: Sequelize.STRING(10),
  email: Sequelize.STRING,
  amount: Sequelize.INTEGER,
  last_modified: Sequelize.DATE,
  origniztion: Sequelize.STRING(10),
  boss_id: Sequelize.INTEGER
}