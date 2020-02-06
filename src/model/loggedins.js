const db = require('../config/db');
const sequelize = db.Sequelize;


var Logged = db.define('logged_ins', {
  initial: {
    type: sequelize.STRING,
  },
  final: {
    type: sequelize.STRING,
  },
  total: {
    type: sequelize.STRING,
  },
  date_log: {
    type: sequelize.DATE,
  },
  user_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references:{
      model: 'user',
      referenceKey: 'user_id',
    },
  },
  company_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references:{
      model: 'company',
      referenceKey: 'company_id',
    },
  },
}, {
  underscored: true,
  sequelize,
  timestamps:false
}); 
module.exports = {db, Logged};



