const {BigQuery} = require('@google-cloud/bigquery');
module.exports = async (logged) => {
  const bigquery = new BigQuery({
    projectId: "suridatabase-251912",
    keyFilename: "./src/key.json",
  });

  await logged.forEach(session => {
    const { name } = session.user.dataValues;
    const { id, initial, final, date_log, user_id } = session;
    
    let verifyToken = `
    SELECT * 
    FROM ${process.env.BQ_TABLE} 
    where id = "${id}"`;
    
    let query = `
    INSERT INTO ${process.env.BQ_TABLE} (id, initial, final, date_log, user_id, user_name) 
    VALUES 
    ("'${id}","${initial}","${final}","${date_log}","${user_id}","${name}")`;
    
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