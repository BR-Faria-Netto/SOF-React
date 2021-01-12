const express = require('express');
const tablecodeRoute = express.Router();

// Defined get data(index or listing) route
tablecodeRoute.route('/:dbTable').get(function (req, res) {
  const baseServer = require('./'+req.params.dbTable+'.model');
  baseServer.find(function(err, baseLocal){
    if(err){
      console.log(err);
    }
    else {
      res.json(baseLocal);
    }
  });
});

// Defined store route
tablecodeRoute.route('/add/:dbTable').post(function (req, res) {
  const baseServer = require('./'+req.params.dbTable+'.model');
  const baseLocal = new baseServer(req.body);
  baseLocal.save()
    .then(baseLocal => {
      res.status(200).json({'tipo': 'in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});

// Defined edit route
tablecodeRoute.route('/edit/:dbTable/:id').get(function (req, res) {
  const baseServer = require('./'+req.params.dbTable+'.model');
  const id = req.params.id;
  baseServer.findById(id, function (err, baseLocal){
      res.json(baseLocal);
  });
});

//  Defined update route
tablecodeRoute.route('/update/:dbTable/:id').post(function (req, res) {
  const baseServer = require('./'+req.params.dbTable+'.model');
  baseServer.findById(req.params.id, function(err, baseLocal) {
    if (!baseLocal)
      res.status(404).send("Data is not found");
    else {
        baseLocal.codigo = req.body.codigo;
        baseLocal.descricao = req.body.descricao;
        baseLocal.save().then(baseLocal => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
tablecodeRoute.route('/delete/:dbTable/:id').get(function (req, res) {
  const baseServer = require('./'+req.params.dbTable+'.model');
  baseServer.findByIdAndRemove({_id: req.params.id}, function(err, baseLocal){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = tablecodeRoute;
