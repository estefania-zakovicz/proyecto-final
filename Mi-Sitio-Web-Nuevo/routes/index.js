var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var consejosModel = require('../models/consejosModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  consejos = await consejosModel.getConsejos();

  consejos = consejos.splice(0,5); //seleccionamos los primeros 5 elementos del array
  consejos = consejos.map(consejo => {
  if (consejo.img_id) {
    const imagen = cloudinary.url(consejo.img_id, {
      width: 460,
      crop: 'fill'
    });

    return {
      ...consejo,
      imagen
    }
  } else {
    return{
      ...consejo,
      imagen: '/images/noimage.jpg'
    }
  }
});
  
  
  res.render('index',{ 
    consejos
});
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'estefaniazakovicz43@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + " se contactó a través de la web y quiere más información a este correo : " + email + ". Además, hizo este comentario: "+ mensaje + ". Su tel es:  " + telefono}

  var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
  });
  
  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });
});

    module.exports = router;
