const config = {
  server: process.env.DB_SERVER || "localhost",
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "rootSubastalo0*",
  database: process.env.DB_NAME || "subastalo",
  port: process.env.DB_PORT || 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    enableArithAbort: true
  }
};



module.exports = config;