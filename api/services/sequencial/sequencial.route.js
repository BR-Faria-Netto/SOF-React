const express = require('express');
const sequencialRoute = express.Router();

// Require Business model in our routes module
let Sequencial = require('./sequencial.model');

sequencialRoute.route('/sequencia/:tabela').get(function (req, res) {
  let buscaTabela = req.params.tabela;
  Sequencial.find({ tabela: { $in:  [ 'NAD' ] } },function(err,sequencial){
      if (!sequencial)
         res.status(404).send("data is not found");
      else {
          sequencial.sequencia = 10; //sequencial.sequencia+1;
          sequencial.save().then(sequencial => {
            res.json(sequencial);
          })
          .catch(err => {
            res.status(400).send("unable to update the database");
          });
      }
    });
});

// Defined store route
sequencialRoute.route('/add').post(function (req, res) {
  let sequencial = new Sequencial(req.body);
  sequencial.save()
    .then(sequencial => {
      res.status(200).json({'Sequencial': 'business in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
sequencialRoute.route('/').get(function (req, res) {
  Sequencial.find(function(err,sequencial){
      if(err){
        res.json({
          success: false,
          error: 'Tivemos problemas no servidor de Dados... '
        })
      }
      else {
        res.json(sequencial);
      }
    });
});

// Defined edit route
sequencialRoute.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Sequencial.findById(id, function (err, sequencial){
      res.json(sequencial);
  });
});

//  Defined update route
sequencialRoute.route('/update/:id').post(function (req, res) {
  Sequencial.findById(req.params.id, function(err, sequencial) {
    if (!sequencial)
      res.status(404).send("data is not found");
    else {
        sequencial.tabela = req.body.tabela;
        sequencial.sequencia = req.body.sequencia;
        sequencial.save().then(sequencial => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
sequencialRoute.route('/delete/:id').get(function (req, res) {
  Sequencial.findByIdAndRemove({_id: req.params.id}, function(err, sequencial){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = sequencialRoute;