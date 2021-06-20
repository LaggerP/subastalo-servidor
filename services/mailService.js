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

/**
 * @description se envía un email dando aviso que su cuenta fue verificada y aceptada. Se invita al usuario a
 * ingresar su contraseña.
 * @param userData - posee el email y nombre del usuario
 */
exports.sendSuccessfulVerificationEmail = async (userData) => {
  console.log(userData)
  await transporter.sendMail({
    from: `"Subastalo - Tu app de subastas" <${process.env.EMAIL_USER}>`, // sender address
    to: `${userData.email}`,
    subject: "¡Su cuenta fue verificada y aceptada, felicitaciones!", // Subject line
    html: `
    <h1 style="color: #5e9ca0; text-align: center;"><span style="color: #ff6600;">&iexcl;Felicitaciones ${userData.nombre} su cuenta fue aceptada!</span></h1>
    <p style="text-align: center;">Por favor copie el siguiente código de acceso.</p>
    <p style="text-align: center;">Una vez que ingrese el código podrá hacer uso completo de la aplicación una vez que ingrese su contraseña.</p>
    <div style="text-align: center;">
      <h5 style="	background-color:#ffae00;
        border-radius:6px;
        border:1px solid #ffffff;
        display:inline-block;
        color:#000000;
        font-size:13px;
        font-weight:bold;
        padding:15px 18px;
        text-decoration:none;">
          ${userData.codigo}
      </h5>
    </div>
  <blockquote>
    <p style="text-align: center; font-size: 10px;"><strong><em>--EMAIL GENERADO DE FORMA AUTOMATICA, NO CONTESTAR--</em></strong></p>
  </blockquote>
    `
  }, (err, info) => {
    console.log('Email Status', info || err);
  })
}

/**
 * @description se envía un email a la persona que olvidó su contraseña.
 * @param userData - data necesaria del usuario.
 */
exports.sendChangeForgottenPassword = async (userData) => {
  await transporter.sendMail({
    from: `"Subastalo - Tu app de subastas" <${process.env.EMAIL_USER}>`, // sender address
    to: `${userData.email}`,
    subject: "Usted solicito un cambio de contraseña", // Subject line
    html: `
      <p style="text-align: center;">Reingrese su contraseña para poder seguir usando Subastalo</p>
      <div style="text-align: center;">
        <button style="	background-color:#ffae00;
          border-radius:6px;
          border:1px solid #ffffff;
          display:inline-block;
          cursor:pointer;
          color:#000000;
          font-size:13px;
          font-weight:bold;
          padding:15px 18px;
          text-decoration:none;">
            <a href="https://google.com" style="text-decoration:none; color: black">RESTABLECER CONTRASEÑA</a> 
        </button>
      </div>
      <blockquote>
        <p style="text-align: center; font-size: 10px;"><strong><em>--EMAIL GENERADO DE FORMA AUTOMATICA, NO CONTESTAR--</em></strong></p>
      </blockquote>
    `
  }, (err, info) => {
    console.log('Email Status', info || err);
  })
}

/**
 * @description se devuelve toda la información asociada a un usuario correspondiente.
 * @param email - email del ganador de la subasta.
 */
exports.sendSuccessRegister = async (email) => {
  await transporter.sendMail({
    from: `"Subastalo - Tu app de subastas" <${process.env.EMAIL_USER}>`, // sender address
    to: `${email}`,
    subject: "¡Su cuenta fue creada, felicitaciones!", // Subject line
    html: `La fase uno de registro de Subastalo fue realizada con éxito! Debe esperar a que nuestros operadores verifiquen su identidad antes de poder continuar con el resto del registro y participar en la app Subastalo`
  }, (err, info) => {
    console.log('Email Status', info || err);
  })
}


/**
 * @description se envía un email al ganador de la subasta.
 * @param email - email del ganador de la subasta.
 */
exports.sendWinnerSubasta = async (email) => {
  await transporter.sendMail({
    from: `"Subastalo - Tu app de subastas" <${process.env.EMAIL_USER}>`, // sender address
    to: `${email}`,
    subject: "¡Ganó, felicitaciones!", // Subject line
    html: `Usted ganó la subasta! nos pondremos en contacto con usted para seguír con la entrega del item`
  }, (err, info) => {
    console.log('Email Status', info || err);
  })
}
