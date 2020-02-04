const modelLogged = require('../model/loggedins');
const { Parser } = require('json2csv');
const fs = require('fs');

module.exports = {
    async index(req, res){
        const logged = await modelLogged.db.sync().then(function() {            
            return modelLogged.Logged.findAll();
          });          
 
          const fields = ['id', 'initial', 'final', 'date_log', 'user_id'];    
          try {
            const json2csvParser = new Parser({ fields, quote: '', delimiter: ';' });
            const csv = json2csvParser.parse(logged);
            fs.writeFile('./BaseLoggedIn.csv', csv, (err) => console.log(err));
          } catch (err) {
            console.error(err);
          }

        return res.json(logged);
    },
};