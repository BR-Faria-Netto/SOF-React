const express = require('express');
const sequencialRoute = express.Router();

// Require Business model in our routes module
let Sequencial = require('./sequencial.model');

sequencialRoute.route('/numero/:ano/:table').get(function (req, res) {

  let anoTable = req.params.ano;
  let nameTable = req.params.table;
  
  Sequencial.findOne({ano : anoTable , tabela : nameTable }, function (err, sequencial) {
    try {
      sequencial.sequencia = sequencial.sequencia+1;
      sequencial.save();
      res.json(sequencial)
    } catch (error) {
      res.json(error)
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
        sequencial.ano = req.body.ano;
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