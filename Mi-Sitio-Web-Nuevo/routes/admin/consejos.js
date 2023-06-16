var express = require('express');
var router = express.Router();
var consejosModel = require('../../models/consejosModel')

router.get('/', async function (req, res, next) {
  
    var consejos = await consejosModel.getConsejos();

    res.render('admin/consejos', {
        layout:'admin/layout',
        persona: req.session.nombre, consejos
    });
  });

  /*Para eliminar un consejo */
  router.get('/eliminar/:id', async(req, res, next) => {
    const id = req.params.id;
    await consejosModel.deleteConsejosById(id);
    res.redirect('/admin/consejos')
  }); //cierra get de eliminar



  /*Para que aparezca el formulario de agregar*/
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  }) //cierra render
}); //cierra Get

/*agregar metodo post> insert*/
router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await consejosModel.insertConsejo(req.body);
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
   })
}
})

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
    //console.log(req.body.id); //para ver si trae id
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
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