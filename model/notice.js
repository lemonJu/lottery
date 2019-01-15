const Sequelize = require('sequelize');
const notice = module.exports = {
  last_modified: Sequelize.DATE,
  content: Sequelize.TEXT
}