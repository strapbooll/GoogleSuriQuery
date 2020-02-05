const modelLogged = require('../model/loggedins');
const googleBigquery = require('../services/google');

module.exports = {
    async index(req, res){
        const logged = await modelLogged.db.sync().then(function() {            
            return modelLogged.Logged.findAll({
              include:{
                association: 'user',
              }
            });
          });          
          
          if(logged) googleBigquery(logged);

        return res.json(logged);
    },
};