const db = require('../config/db');
const sequelize = db.Sequelize;


var Logged = db.define('logged_ins', {
  initial: {
    type: sequelize.STRING,
  },
  final: {
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
}, {
  underscored: true,
  sequelize,
  timestamps:false
}); 
var Users = db.define('users', {
  name: {
    type: sequelize.STRING,
  },
},{
  underscored: true,
  sequelize,
  modelName: 'user',
  timestamps:false
});

Logged.belongsTo(Users);
module.exports = {db, Logged};



