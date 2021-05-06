require('dotenv').config()
const dbConn = require('../database')
const bcrypt = require('bcrypt')

/**
 * @description obtiene todas las tarjetas asociadas a un cliente.
 * @param idCliente - es el id del cliente correspondiente
 * @param callback - es el error o resultado exitoso.
 */
exports.getTarjetas = (idCliente, callback) => {
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


/**
 * @description permite crear una nueva tarjeta.
 * @param tarjeta - posee toda la información correspondiente para la creacion de la tarjeta
 * @param callback - es el error o resultado exitoso.
 */
exports.createTarjeta = (tarjeta, callback) => {
  const {
    nombreTitular,
    entidad,
    numero,
    vencimiento,
    idCliente,
    codigo,
    lastNumbers
  } = tarjeta

  let _codigo = bcrypt.hashSync(codigo, parseInt(process.env.BCRYPT_ROUNDS, 10));
  let _numero = bcrypt.hashSync(numero, parseInt(process.env.BCRYPT_ROUNDS, 10));

  const sql = ` 
    INSERT INTO tarjeta (cliente, nombreTitular, entidad, numero, vencimiento, codigo, lastNumbers)
    VALUES 
    (${idCliente}, '${nombreTitular}', '${entidad}', '${_numero}', '${vencimiento}', '${_codigo}', '${lastNumbers}');
 `
  dbConn.service(sql, callback)
}


/**
 * @description permite crear una nueva cuenta bancaria.
 * @param cuentaBancaria - posee toda la información correspondiente para la creacion de cuenta bancaria
 * @param callback - es el error o resultado exitoso.
 */
exports.createCuentaBancaria = (cuentaBancaria, callback) => {
  const {
    idCliente,
    nombreTitular,
    entidad,
    cbu_alias,
  } = cuentaBancaria

  let _cbu_alias = bcrypt.hashSync(cbu_alias, parseInt(process.env.BCRYPT_ROUNDS, 10));

  const sql = ` 
    INSERT INTO cuentaBancaria (cliente, cbu_alias, nombreTitular, entidad)
    VALUES (${idCliente}, '${_cbu_alias}', '${nombreTitular}', '${entidad}');
 `
  dbConn.service(sql, callback)
}