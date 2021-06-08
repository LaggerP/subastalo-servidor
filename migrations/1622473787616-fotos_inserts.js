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
         (2, convert(varbinary(max),'https://dv4x1avoocs0.cloudfront.net/media/products/9d80255562b8f0cf2d1892a0bcfed371.jpg')),
         (3, convert(varbinary(max),'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/8db8df4f5ef343b89e19ab3e00bfbfda_9366/Botines_de_futbol_Predator_20.3_cesped_natural_seco_Blanco_EG0927_01_standard.jpg')),
         (3, convert(varbinary(max),'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/947ebb4ec5284d97bd3dab3e00bfd19f_9366/Botines_de_futbol_Predator_20.3_cesped_natural_seco_Blanco_EG0927_02_standard_hover.jpg')),
         (3, convert(varbinary(max),'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/06df5d79d3de49f88985ab3e00bfd97f_9366/Botines_de_futbol_Predator_20.3_cesped_natural_seco_Blanco_EG0927_03_standard.jpg')),
         (3, convert(varbinary(max),'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/2f58d46e9790405e8617ab3e00bfc8b5_9366/Botines_de_futbol_Predator_20.3_cesped_natural_seco_Blanco_EG0927_06_standard.jpg')),
         (4, convert(varbinary(max),'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/6d85036726614f5a9b69ab7d014920bf_9366/Camiseta_Titular_Seleccion_Argentina_Blanco_FS6565_01_laydown.jpg')),
         (4, convert(varbinary(max),'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/921a1e5a21494e538542ab7d01491c16_9366/Camiseta_Titular_Seleccion_Argentina_Blanco_FS6565_02_laydown_hover.jpg'))
`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
