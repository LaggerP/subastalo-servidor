require('dotenv').config()
const dbConn = require('../database')

/**
 * @description obtiene todas las tarjetas asociadas a un cliente.
 * @param idCliente - es el id del cliente correspondiente
 * @param callback - es el error o resultado exitoso.
 */
exports.getTarjetas = (idCliente, callback) => {
  console.log(idCliente)
  const sql = `
  SELECT t.identificador, t.cliente as idCliente, t.entidad, t.nombreTitular, t.numero, t.vencimiento
  FROM tarjeta t
  WHERE cliente = '${idCliente}'`
  dbConn.service(sql, callback)
}

/**
 * @description obtiene todas las cuentas bancarias asociadas a un cliente.
 * @param idCliente - es el id del cliente correspondiente
 * @param callback - es el error o resultado exitoso.
 */
exports.getCuentasBancarias = (idCliente, callback) => {
  const sql = `SELECT cB.cliente as idCliente, cB.* FROM cuentaBancaria cB WHERE cliente = '${idCliente}'`
  dbConn.service(sql, callback)
}