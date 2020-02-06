const googleBigquery = require('../services/google');
const db = require('../config/db');

module.exports = {
    async index(req, res){
        const logged = await db.query(`
            SELECT
            logged_ins.id,
            logged_ins.initial,
            logged_ins.final,
            logged_ins.total,
            logged_ins.date_log,
            logged_ins.user_id,
            users.name AS user_name,
            users.access AS user_type,
            logged_ins.health_id,
            health_brokerages.nome AS heath_name,
            logged_ins.company_id,
            companies.nome AS company_name
        FROM
            logged_ins
        LEFT OUTER JOIN users ON logged_ins.user_id = users.id
        LEFT OUTER JOIN companies ON logged_ins.company_id = companies.id
        LEFT OUTER JOIN health_brokerages ON logged_ins.health_id = health_brokerages.id`);     
        
          if(logged) googleBigquery(logged[0]);

        return res.json(logged[0]);
    },
};