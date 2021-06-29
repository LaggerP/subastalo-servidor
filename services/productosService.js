require('dotenv').config();
const dbConn = require('../database');

exports.createProducto = (disponible, descripcionCatalogo, descripcionCompleta, revisor, duenio) => {
  const sql = `
    INSERT INTO productos (fecha, disponible, descripcionCatalogo, descripcionCompleta, revisor, duenio)
    VALUES (GETDATE(), '${disponible}', '${descripcionCatalogo}', '${descripcionCompleta}', ${revisor}, ${duenio}) SELECT SCOPE_IDENTITY() AS idProducto;`;

  return dbConn.service(sql)
};

exports.registerEstadoProducto = ({idProducto, estado}) => {
  const sql = `
  INSERT INTO productoSeguimiento (producto, estado)
  VALUES (${idProducto}, '${estado}')`;
  return dbConn.service(sql)
};

exports.registerCategoriaProducto = ({idProducto, categoria}) => {
  const sql = `
  INSERT INTO productoCategorias (producto, categoria)
  VALUES (${idProducto}, ${categoria})`;
  return dbConn.service(sql)
};

exports.registerFotosProducto = ({idProducto, imageUrl}) => {
  const sql = `INSERT INTO fotos (producto, foto) 
  VALUES (${idProducto}, CONVERT(varbinary(max), '${imageUrl}'))`;
  return dbConn.service(sql)
}

/**
 * @description obtiene todos los productos por cliente
 * @param idCliente - id del cliente
 */
exports.getAllProductsByIdClient = (idCliente) => {
  const sql = `
  SELECT
    p.identificador         idProducto,
	  pc.categoria            idCategoria,
	  c.categoria,
	  ic.precioBase,
    p.fecha,
    p.descripcionCatalogo,
    p.descripcionCompleta,
    p.revisor,
	  per.nombre              nombreRevisor,
    p.duenio, 
    ps.estado
  FROM productoSeguimiento ps
	  JOIN productos p ON p.identificador = ps.producto
	  JOIN personas per ON per.identificador = p.revisor
	  LEFT JOIN productoCategorias pc ON pc.producto = p.identificador
	  LEFT JOIN categorias c ON c.identificador = pc.categoria
	  LEFT JOIN itemsCatalogo ic ON ic.producto = p.identificador
  WHERE p.duenio = ${idCliente};
  `

  return dbConn.service(sql);
}

