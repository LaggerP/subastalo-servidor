require('dotenv').config()
const dbConn = require('../database')

/**
 * @description permite traer las pujas con información.
 * @param CalienteId - id del cliente.
 */
 exports.getPujasByIdCliente = (ClienteId) => {
    const sql = `
    SELECT pujos.identificador idPujo, pujos.item, p.nombre nombrePujador, pujos.ganador, c.identificador as idCliente
    FROM pujos
             JOIN asistentes a on pujos.asistente = a.identificador
             JOIN clientes c on c.identificador = a.cliente
             JOIN personas p on p.identificador = c.identificador
             JOIN itemsCatalogo ic on pujos.item = ic.producto
	WHERE cliente = ${ClienteId}`;
  
    return dbConn.service(sql);
  }