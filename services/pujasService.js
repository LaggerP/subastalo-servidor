require('dotenv').config()
const dbConn = require('../database')

/**
 * @description permite crear una nueva cuenta bancaria.
 * @param ItemCatalogoId - id del item catalogo necesario para traer las pujas
 */
exports.getPujasByItemCatalogoId = (ItemCatalogoId) => {
  const sql = `
    SELECT pujos.identificador idPujo, p.nombre nombrePujador, importe, pujos.ganador, horario, CONVERT(varchar(max), p.foto, 0) as foto, c.identificador as idCliente
    FROM pujos
             JOIN asistentes a on pujos.asistente = a.identificador
             JOIN clientes c on c.identificador = a.cliente
             JOIN personas p on p.identificador = c.identificador
             JOIN horarioItemPuja hIP on pujos.identificador = hIP.puja
    WHERE item = '${ItemCatalogoId}'
    ORDER BY importe DESC`;

  return dbConn.service(sql);
}

/**
 * @description registra al cliente en una subasta.
 * @param dataAsistente - posee el numero del postor, el id del cliente y la subasta en la que participa
 */
exports.registerAsistente = ({idSubasta, idCliente, numeroPostor}) => {
  const sql = `
      INSERT INTO asistentes (numeroPostor, cliente, subasta) VALUES (${numeroPostor}, ${idCliente}, ${idSubasta})
      SELECT SCOPE_IDENTITY() AS idAsistente
  `;
  return dbConn.service(sql);
}

/**
 * @description nos permite obtener el idAsistente de un asistente ya registrado.
 * @param idSubasta - id de la subasta
 * @param idCliente- id del cliente
 */
exports.getAsistenteBySubastaAndCliente = ({idSubasta, idCliente}) => {
  const sql = `SELECT identificador as idAsistente from asistentes WHERE subasta = ${idSubasta} AND cliente = ${idCliente}`;
  return dbConn.service(sql);
}

/**
 * @description registra una nueva puja en la subasta.
 * @param asistente - id del asistente
 * @param idItem - id del item
 * @param importe - importe ofertado
 */
exports.registerPuja = ({asistente, idItem, importe}) => {
  const sql = `INSERT INTO pujos (asistente, item, importe) values (${asistente}, ${idItem}, ${importe}) SELECT SCOPE_IDENTITY() AS idPuja`;
  return dbConn.service(sql);
}

/**
 * @description registra el horario en la que fue realizada la puja.
 * @param puja - id de la puja
 * @param horario - horario en la fue fue realizada la puja
 */
exports.registerHorarioPuja = ({idPuja, horario}) => {
  const sql = `INSERT INTO horarioItemPuja (puja, horario) values (${idPuja}, '${horario}')`;
  return dbConn.service(sql);
}




