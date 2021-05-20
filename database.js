require('dotenv').config()
const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    enableArithAbort: true
  }
};


module.exports.migrate = (_query, next) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    console.log('Connection to DB established');
    let request = new sql.Request();
    request.query(_query, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
      next();
    })
  });
};


module.exports.service = async (_query) => {
  try {
    await sql.connect(config)
    const result = await sql.query(_query);
    return result.recordset
  } catch (err) {
    return err
  }
}

module.exports.insertDb = (_query) => {
  console.log(_query);

  sql.connect(config, (err) => {
    if (err) return err;
    let request = new sql.Request();
    request.query(_query, (err, result) => {
      if (err) return err;
      else return result;
    })
  });

}