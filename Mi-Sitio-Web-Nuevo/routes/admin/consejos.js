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


  module.exports = router;