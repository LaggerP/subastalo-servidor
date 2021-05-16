"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


exports.sendFirstLoginPasswordEmail = async (userData) => {
  await transporter.sendMail({
    from: `"Subastalo - Tu app de subastas" <${process.env.EMAIL_USER}>`, // sender address
    to: `${userData.email}`,
    subject: "¡Su cuenta fue verificada y aceptada, felicitaciones!", // Subject line
    html: `
      <h1 style="color: #5e9ca0; text-align: center;"><span style="color: #ff6600;">&iexcl;Felicitaciones {userName} su cuenta fue aceptada!</span></h1>
        <p>Por favor ingrese al siguiente link para continuar con la segunda fase del registro: ${linkDeRedireccionApp}</p>
        <p>Una vez que ingrese su contraseña podrá hacer uso completo de la aplicación <span style="background-color: #2b2301; color: #fff; display: inline-block; padding: 3px 10px; font-weight: bold; border-radius: 5px;">Subastalo</span></p>
         <p>&nbsp;</p>
      <blockquote>
        <p style="text-align: center; font-size: 10px;"><strong><em>--EMAIL GENERADO DE FORMA AUTOMATICA, NO CONTESTAR--</em></strong></p>
      </blockquote>
    `
  }, (err, info) => {
    console.log('Email Status', info || err);
  })
}


exports.sendChangeForgottenPasswordEmail = async (userData) => {
  await transporter.sendMail({
    from: `"Subastalo - Tu app de subastas" <${process.env.EMAIL_USER}>`, // sender address
    to: `${userData.email}`,
    subject: "¡Su cuenta fue aceptada, felicitaciones!", // Subject line
    html: `
     Usted solicito cambio de contraseña
    `
  }, (err, info) => {
    console.log('Email Status', info || err);
  })
}


exports.sendSuccessRegister = async (email) => {
  await transporter.sendMail({
    from: `"Subastalo - Tu app de subastas" <${process.env.EMAIL_USER}>`, // sender address
    to: `${email}`,
    subject: "¡Su cuenta fue creada, felicitaciones!", // Subject line
    html: `La fase uno de registro de Subastalo fue realizada con éxito! Debe esperar a que nuestros operadores verifiquen su identidad antes de poder continuar con el resto del registro y participar en la app Subastalo`
  },  (err, info) => {
    console.log('Email Status', info || err);
  })
}
