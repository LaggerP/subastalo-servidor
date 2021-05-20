require('dotenv').config()
const dbConn = require('../database')

/**
 * @description permite crear una nueva cuenta bancaria.
 * @param ItemCatalogoId - id del item catalogo necesario para traer las pujas
 */
exports.getPujasByItemCatalogoId = (ItemCatalogoId) => {
  const sql = `
    SELECT pujos.identificador idPujo, p.nombre nombrePujador, importe, pujos.ganador
    from pujos
             join asistentes a on pujos.asistente = a.identificador
             join clientes c on c.identificador = a.cliente
             JOIN personas p on p.identificador = c.identificador
    WHERE item = '${ItemCatalogoId}'
    ORDER BY importe DESC`;

  return dbConn.service(sql);
}

/**
 * @description registra al cliente en una subasta.
 * @param dataAsistente - posee el numero del postor, el id del cliente y la subasta en la que participa
 */
exports.registerAsistente = (dataAsistente) => {
  const {idSubasta, idCliente, numeroPostor} = dataAsistente

  const sql = `
      INSERT INTO asistentes (numeroPostor, cliente, subasta)
        SELECT ${numeroPostor}, ${idCliente}, ${idSubasta}
            WHERE NOT EXISTS(SELECT 1 FROM asistentes WHERE cliente = ${idCliente})
        SELECT SCOPE_IDENTITY() AS asistente
  `;

  return dbConn.service(sql);

}

/**
 * @description registra una nueva puja en la subasta.
 * @param dataPuja - posee el numero del postor, el id del cliente y la subasta en la que participa
 */
exports.registerPuja = (dataPuja) => {
  const {asistente, idItem, importe} = dataPuja
  const sql = `INSERT INTO pujos (asistente, item, importe) values (${asistente}, ${idItem}, ${importe})`;
  return dbConn.service(sql);
}