'use strict'
const dbConn = require('../database');
const bcrypt = require ('bcrypt');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO personas
  (documento, nombre, direccion, estado, foto)
  VALUES
  ('12345678', 'Empleado Gimenez', 'Avenida Siempre Viva 123', 'activo', convert(varbinary(max),'1111010101')),
  ('12312312', 'Baby Yoda Choripanero', 'Avenida Independencia 223', 'activo', convert(varbinary(max),'https://pbs.twimg.com/media/EK9KK43WsAE-2I8?format=jpg&name=small')),
  ('1111', 'Baby Yoda Matero', 'Avenida Amarga 123', 'activo', convert(varbinary(max),'https://pbs.twimg.com/media/EKqTwMSXsAEHvPb.jpg')),
  ('12212', 'Baby Yoda Cordobés', 'Avenida Amarga 123', 'activo', convert(varbinary(max),'https://i.redd.it/66axgk5t6n241.jpg')),
  ('222222', 'Baby Yoda Taquero', 'Avenida Amarga 123', 'activo', convert(varbinary(max),'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrOKG-6z6AWJ6I3kWFwV9LV1I6HYDB25p1OGxVhVbby6ldZceEeDRmKAptE9roBNVsEM&usqp=CAU')),
  ('33333', 'Baby Yoda Inglés', 'Avenida Amarga 123', 'activo', convert(varbinary(max),'https://i.pinimg.com/736x/5c/58/71/5c5871ea67a569a072fe019960f152f6.jpg'))`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
