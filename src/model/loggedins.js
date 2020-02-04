const db = require('../config/db');
const type = db.Sequelize;


var Logged = db.define('logged_ins', {
  initial: type.STRING,
  final: type.STRING,
  date_log: type.DATE,
  user_id: type.INTEGER,  
}, {timestamps:false});

module.exports = {db, Logged};

