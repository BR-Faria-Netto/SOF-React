const express = require('express');
const favorecidoRoute = express.Router();

// Require Business model in our routes module
let Favorecido = require('./favorecido.model');

// Defined store route
favorecidoRoute.route('/add').post(function (req, res) {
  let favorecido = new Favorecido(req.body);
  favorecido.save()
    .then(favorecido => {
      res.status(200).json({'Favorecidos': 'business in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
favorecidoRoute.route('/').get(function (req, res) {
    Favorecido.find(function(err,favorecido){
      if(err){
        res.json({
          success: false,
          error: 'Tivemos problemas no servidor de Dados... '
        })
      }
      else {
        res.json(favorecido);
      }
    });
});

// Defined edit route
favorecidoRoute.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Favorecido.findById(id, function (err, favorecido){
      res.json(favorecido);
  });
});

//  Defined update route
favorecidoRoute.route('/update/:id').post(function (req, res) {
  Favorecido.findById(req.params.id, function(err, favorecido) {
    if (!favorecido)
      res.status(404).send("data is not found");
    else {
        favorecido.nomefav = req.body.nomefav;
        favorecido.ender = req.body.ender;
        favorecido.bai = req.body.bai;
        favorecido.cid = req.body.cid;
        favorecido.cep = req.body.cep;
        favorecido.cnpj = req.body.cnpj;
        favorecido.uf = req.body.uf;
        favorecido.banrec = req.body.banrec;
        favorecido.agerec = req.body.agerec;
        favorecido.ccrec = req.body.ccrec;
        favorecido.contas = req.body.contas;
        favorecido.save().then(favorecido => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
favorecidoRoute.route('/delete/:id').get(function (req, res) {
    Favorecido.findByIdAndRemove({_id: req.params.id}, function(err, favorecido){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = favorecidoRoute;


