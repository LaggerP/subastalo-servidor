'use strict'
const dbConn = require('../database');
const bcrypt = require ('bcrypt');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO personas
  (documento, nombre, direccion, estado, foto)
  VALUES
  ('12345678', 'Empleado Gimenez', 'Avenida Siempre Viva 123', 'activo', convert(varbinary(max),'1111010101')),
  ('12312312', 'Comun Gimenez', 'Avenida Independencia 223', 'activo', convert(varbinary(max),'https://pbs.twimg.com/media/EK9KK43WsAE-2I8?format=jpg&name=small')),
  ('1111', 'Especial Mate', 'Avenida Amarga 123', 'activo', convert(varbinary(max),'https://media.gq.com.mx/photos/5de42fa1f428fa0008c8672c/16:9/w_1920,c_limit/baby-yoda-memes.jpg')),
  ('12212', 'Plata Mate', 'Avenida Amarga 123', 'activo', convert(varbinary(max),'https://i.redd.it/66axgk5t6n241.jpg')),
  ('222222', 'Oro Mate', 'Avenida Amarga 123', 'activo', convert(varbinary(max),'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFn4Wf9zmo2Lwvma730TVJuAHN_rwdNEI1aQ&usqp=CAU')),
  ('33333', 'Platino Mate', 'Avenida Amarga 123', 'activo', convert(varbinary(max),'https://http2.mlstatic.com/D_NQ_NP_620090-MLA44792331759_022021-O.jpg'))`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
