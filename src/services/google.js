const { BigQuery } = require("@google-cloud/bigquery");

module.exports = async (logged) => {
  /**
   * Instancia BigQuery e passa um obj
   * como parametro contendo as configs de auth
   */
  const bigquery = new BigQuery({
    projectId: process.env.GG_ID_PROJECT,
    keyFilename: "./src/key.json",
  });
  // Percorre o array contendo os dados capturados do MySql
  await logged.forEach((session) => {
    let {
      id,
      initial,
      final,
      total,
      date_log,
      user_id,
      user_name,
      user_type,
      health_id,
      heath_name,
      company_id,
      company_name,
      company_nickname,
    } = session;
    // Valida se os usuários acessados são de empresas clientes ou corretoras
    if (user_type == 0 || user_type == 1 || user_type == 2) {
      company_id = health_id;
      company_name = heath_name;
    }
    // Substitui o valor numerico do MySql pelo texto
    switch (user_type) {
      case 0:
        user_type = "Suridata";
        break;
      case 1:
        user_type = "Corretor";
        break;
      case 2:
        user_type = "Funcionario";
        break;
      case 3:
        user_type = "Cliente";
        break;
      default:
        break;
    }
    // Query para validar se Id já foi cadastrado
    let verifyToken = `
      SELECT * 
      FROM ${process.env.BQ_TABLE} 
      where id = "${id}"`;
    // Query para inserir os dados no BigQuery
    let query = `
      INSERT INTO ${process.env.BQ_TABLE} (id, initial, final, total,date_log, user_id, user_name, user_type,health_id, health_name, company_id, company_name, company_nickname) 
      VALUES 
      ("${id}","${initial}","${final}","${total}","${date_log}", "${user_id}","${user_name}", "${user_type}", "${health_id}", "${heath_name}", "${company_id}", "${company_name}", "${company_nickname}")`;

    // Verifica se id ja foi cadastrado
    bigquery
      .query(verifyToken)
      .then(function (data) {
        // insere dados no BigQuery
        const rows = data[0];
        if (rows == false) {
          bigquery.query(query);
        }
      })
      .catch((err) => console.log(err));
  });
};
