const express = require('express');
const secretariaRoute = express.Router();

// Require Business model in our routes module
let Secretaria = require('./secretaria.model');

// Defined store route
secretariaRoute.route('/add').post(function (req, res) {
  let secretaria = new Secretaria(req.body);
  secretaria.save()
    .then(secretaria => {
      res.status(200).json({'Secretaria': 'business in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
secretariaRoute.route('/').get(function (req, res) {
  Secretaria.find(function(err,secretaria){
      if(err){
        res.json({
          success: false,
          error: 'Tivemos problemas no servidor de Dados... '
        })
      }
      else {
        res.json(secretaria);
      }
    });
});

// Defined edit route
secretariaRoute.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Secretaria.findById(id, function (err, secretaria){
      res.json(secretaria);
  });
});

//  Defined update route
secretariaRoute.route('/update/:id').post(function (req, res) {
  Secretaria.findById(req.params.id, function(err, secretaria) {
    if (!secretaria)
      res.status(404).send("data is not found");
    else {
        secretaria.nomesec = req.body.nomesec;
        secretaria.ender = req.body.ender;
        secretaria.bai = req.body.bai;
        secretaria.cid = req.body.cid;
        secretaria.cep = req.body.cep;
        secretaria.cnpj = req.body.cnpj;
        secretaria.uf = req.body.uf;
        secretaria.banrec = req.body.banrec;
        secretaria.agerec = req.body.agerec;
        secretaria.ccrec = req.body.ccrec;
        secretaria.contas = req.body.contas;
        secretaria.save().then(secretaria => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
secretariaRoute.route('/delete/:id').get(function (req, res) {
  Secretaria.findByIdAndRemove({_id: req.params.id}, function(err, secretaria){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = secretariaRoute;