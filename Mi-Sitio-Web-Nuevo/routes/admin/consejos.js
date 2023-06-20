var express = require('express');
var router = express.Router();
var consejosModel = require('../../models/consejosModel')
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/*Para listar los consejos */
router.get('/', async function (req, res, next) {
    var consejos = await consejosModel.getConsejos();
    
    consejos = consejos.map(consejo => {
      if (consejo.img_id) {
          const imagen = cloudinary.image(consejo.img_id, {
              width: 80,
              height: 80,
              crop: 'fill'
          });
          return {
              ...consejo, // va a traer titulo, subt y cuerpo
              imagen //imagen
          }
      } else { //si no se da esa condicion...
          return {
              ...consejo, //titulo, subt y cuerpo
              imagen: '' //nada
          }
      }
  });
    
    res.render('admin/consejos', {
        layout:'admin/layout',
        persona: req.session.nombre, consejos
    });
  });

  /*Para eliminar un consejo */
  router.get('/eliminar/:id', async(req, res, next) => {
    var id = req.params.id;

    let consejo = await consejosModel.getConsejoById(id);
    if (consejo.img_id) {
        await (destroy(consejo.img_id));
    }
    
    await consejosModel.deleteConsejoById(id);
    res.redirect('/admin/consejos')
  }); //cierra get de eliminar



  /*Para que aparezca el formulario de agregar*/
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  }); //cierra render
}); //cierra Get

/*agregar metodo post> insert*/
router.post('/agregar', async (req, res, next) => {
  try {

    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }


    if (req.body.titulo != "" && req.body.subtitulo != "" 
    && req.body.cuerpo != "") {

      await consejosModel.insertConsejo({
        ...req.body, //spread
        img_id
      });


      res.redirect('/admin/consejos')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
   } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
    layout: 'admin/layout',
    error: true,
    message: 'No se cargó el consejo'
   });
}
});

/* Para que me muestre el diseño del modificar con los datos de un solo consejo*/
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var consejo = await consejosModel.getConsejoById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    consejo
  });
}); //cierro get modificar

/*modificar el consejo */
router.post('/modificar', async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
        let borrar_img_vieja = false;
        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

    //console.log(req.body.id); //para ver si trae id
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id
    }
    console.log(obj) //para ver si trae los datos
    await consejosModel.modificarConsejoById(obj, req.body.id);
    res.redirect('/admin/consejos');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó el consejo'
    })
  } //cierro catch
}); //cierro el post


  module.exports = router;