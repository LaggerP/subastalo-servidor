require('dotenv').config()
const dbConn = require('../database')

/**
 * @description obtiene toda las subastas activas y futuras.
 */
exports.getAllSubastas = () => {
  const sql = `
   SELECT s.identificador idSubasta,
   s.fecha         fechaSubasta,
   s.hora          horaSubasta,
   s.estado        estadoSubasta,
   s.ubicacion     ubicacionSubasta,
   s.capacidadAsistentes,
   s.categoria     categoriaSubasta,
   s2.matricula    matriculaSubastador,
   p.nombre        nombreSubastador
FROM subastas s
     JOIN subastadores s2 on s2.identificador = s.subastador
     JOIN personas p on s2.identificador = p.identificador
WHERE s.fecha >= GETDATE();`
  return dbConn.service(sql);
}

/**
 * @description obtiene el catalogo de una subasta en particular a partir de su idSubasta.
 * @param idSubasta - id correspondiente a la subasta. Necesario para traer el catalogo
 */
exports.getCatalogo = (idSubasta) => {
  const sql = `
    SELECT c.identificador       idCatalogo,
           p.identificador       idProducto,
           c.descripcion,
           iC.precioBase         precioBase,
           p.descripcionCompleta descripcionCompleta,
           p.descripcionCatalogo descripcionCatalogo,
           c2.categoria          categoriaProducto,
           p2.nombre             duenioProducto,
           p.disponible
    FROM catalogos c
             JOIN itemsCatalogo iC on c.identificador = iC.catalogo
             JOIN productos p on p.identificador = iC.producto
             JOIN duenios d on d.identificador = p.duenio
             JOIN personas p2 on p2.identificador = d.identificador
             JOIN productoCategorias pC on p.identificador = pC.producto
             JOIN productoCategorias pC2 on p.identificador = pC2.producto
             JOIN categorias c2 on c2.identificador = pC.categoria
      WHERE subasta = '${idSubasta}'`;
  return dbConn.service(sql);
}


/**
 * @description obtiene el item que se encuentra subastándose.
 * @param idSubasta - id de la subasta necesaria para buscar el item
 */
exports.getItemSubastandose = (idSubasta) => {
  const sql = `
    SELECT TOP 1 subasta          idSubasta,
                 iC.identificador idItemCatalogo,
                 iC.catalogo      idCatalogo,
                 p.identificador  idProducto,
                 c.categoria      categoriaCatalogo,
                 precioBase,
                 comision,
                 descripcionCatalogo,
                 descripcionCompleta
    FROM catalogos
             JOIN itemsCatalogo iC on catalogos.identificador = iC.catalogo
             JOIN productos p on p.identificador = iC.producto
             JOIN productoCategorias pC on p.identificador = pC.producto
             JOIN categorias c on c.identificador = pC.categoria
    WHERE iC.subastado = 'no'
      AND p.disponible = 'si'
      AND subasta = '${idSubasta}';`
  return dbConn.service(sql);
}

/**
 * @description obtiene todas las imágenes de un producto en particular.
 * @param idProducto - id del producto necesario para buscar las imágenes
 */
exports.getImagesByProductoId = (idProducto) => {
  const sql = `SELECT CONVERT(varchar(max), foto, 0) as foto from fotos WHERE producto = ${idProducto};`
  return dbConn.service(sql);
}

/**
 * @description cambia el estado de disponibilidad del producto a 'no'.
 * @param idProducto
 */
exports.changeEstadoProducto = (idProducto) => {
  const sql = `UPDATE productos SET disponible = 'no' WHERE identificador = ${idProducto};`
  return dbConn.service(sql);
}

/**
 * @description cambia el estado de subastado del itemCatalogo a 'si'.
 * @param idItemCatalogo
 */
exports.changeEstadoItemCatalogo = (idItemCatalogo) => {
  const sql = `UPDATE itemsCatalogo SET subastado = 'si' WHERE identificador = ${idItemCatalogo};`
  return dbConn.service(sql);
}