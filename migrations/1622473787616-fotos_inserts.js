'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
  INSERT INTO fotos (producto, foto)
  VALUES (1, convert(varbinary(max), 'https://http2.mlstatic.com/D_NQ_NP_958351-MLA45688565400_042021-O.jpg')),
         (1, convert(varbinary(max), 'https://http2.mlstatic.com/D_NQ_NP_898613-MLA45688638014_042021-O.jpg')),
         (1, convert(varbinary(max), 'https://http2.mlstatic.com/D_NQ_NP_720116-MLA45688606214_042021-O.jpg')),
         (1, convert(varbinary(max), 'https://http2.mlstatic.com/D_NQ_NP_809149-MLA45688548453_042021-O.jpg')),
         (2, convert(varbinary(max), 'https://dv4x1avoocs0.cloudfront.net/media/products/0d8e7df4bf9ae964be488415457c824e.jpg')),
         (2, convert(varbinary(max), 'https://dv4x1avoocs0.cloudfront.net/media/products/3bf82356c24dc065ea2d7e09804bf2ff.jpg')),
         (2, convert(varbinary(max), 'https://dv4x1avoocs0.cloudfront.net/media/products/95155484ef7bf4cd57bb25bfb00f1af1.jpg')),
         (2, convert(varbinary(max),'https://dv4x1avoocs0.cloudfront.net/media/products/9d80255562b8f0cf2d1892a0bcfed371.jpg'))
`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
