const Responsavel = require("./responsavel.model");
const util = require('../../helpers/utils');

module.exports = {

  // Defined listing route
  getAll(req, res) {
    Responsavel.find(function(err,responsavel){
        if(err){
          console.log(err);
        }
        else {
          res.json(responsavel);
        }
      }).sort({tipoResponsavel:1}) ;
  },
  getEmissor(req, res) {
    Responsavel.find({ tipoResponsavel: { $in: [ "1 - Emissor" ] }, situacao: { $in: [ "Ativo" ] } },function(err,responsavel){
        if(err){
          console.log(err);
        }
        else {
          res.json(responsavel);
        }
      });
  },
  getOrdenador(req, res) {
    Responsavel.find({ tipoResponsavel: { $in: [ "2 - Ordenador" ] }, situacao: { $in: [ "Ativo" ] } },function(err,responsavel){
        if(err){
          console.log(err);
        }
        else {
          res.json(responsavel);
        }
      });
  },
  getRatificador(req, res) {
    Responsavel.find({ tipoResponsavel: { $in: [ "3 - Ratificador" ] }, situacao: { $in: [ "Ativo" ] } },function(err,responsavel){
        if(err){
          console.log(err);
        }
        else {
          res.json(responsavel);
        }
      });
  },
  // Defined add store route
  add(req, res) {
    let responsavel = new Responsavel(req.body);
    responsavel.save()
      .then(responsavel => {
        res.status(200).json({'responsavel': 'Added successfully'});
      })
      .catch(err => {
        res.status(400).send("Unable to save to database");
      });
  },
 
  // Defined edit route
  edit(req, res) {
    let id = req.params.id;
    Responsavel.findById(id, function (err, responsavel){
        res.json(responsavel);
    });
  },
  
  //  Defined update route
  update (req, res) {
      Responsavel.findById(req.params.id, function(err, responsavel) {
      if (!responsavel)
        res.status(404).send("Data is not found");
      else {
        responsavel.tipoResponsavel = req.body.tipoResponsavel;
        responsavel.nome = req.body.nome;
        responsavel.cargo = req.body.cargo;
        responsavel.idfuncional = req.body.idfuncional;
        responsavel.delegacao = req.body.delegacao;
        responsavel.situacao = req.body.situacao;
        responsavel.save().then(responsavel => {
            res.json('Update complete');
        })
        .catch(err => {
           res.status(400).send("Update the database");
        });
      }
    });
  },
  
  // Defined delete | remove | destroy route
  delete (req, res) {
    Responsavel.findByIdAndRemove({_id: req.params.id}, function(err, responsavel){
      if(err) res.json(err);
      else res.json('Successfully removed');
    });
  },
  
};