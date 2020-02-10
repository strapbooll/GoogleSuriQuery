const {BigQuery} = require('@google-cloud/bigquery');
module.exports = async (logged) => {
  const bigquery = new BigQuery({
    projectId: process.env.GG_ID_PROJECT,
    keyFilename: "./src/key.json",
  });

  await logged.forEach(session => {
      let { id, initial, final, total,date_log, user_id, user_name, user_type,health_id, heath_name, company_id, company_name } = session;
      
      if(user_type != 3){
        company_id = health_id;
        company_name = heath_name;
      }

      switch(user_type){
        case 0:          
          user_type = 'Suridata';
          break;
        case 1:
          user_type = 'Corretor';
          break;
        case 2:
          user_type = 'Funcionario';
          break;
        case 3:          
          user_type = 'Cliente';
          break;
        default:
          break;
      }

      let verifyToken = `
      SELECT * 
      FROM ${process.env.BQ_TABLE} 
      where id = "${id}"`;
      
      let query = `
      INSERT INTO ${process.env.BQ_TABLE} (id, initial, final, total,date_log, user_id, user_name, user_type,health_id, health_name, company_id, company_name) 
      VALUES 
      ("${id}","${initial}","${final}","${total}","${date_log}", "${user_id}","${user_name}", "${user_type}", "${health_id}", "${heath_name}", "${company_id}", "${company_name}")`;
      
      bigquery.query(verifyToken)
      .then(function(data) {        
        const rows = data[0];   
        if((rows) == false){     
          bigquery.query(query);
        }
      })
      .catch(err => console.log(err));
      });
}