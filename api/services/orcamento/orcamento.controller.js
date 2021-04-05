const TabelaBanco = require("./orcamento.model");
const util = require('../../helpers/utils');

module.exports = {

  // Defined listing route
  getAll(req, res) {
    TabelaBanco.find(function (err, tabelaBanco){
        if(err){
          console.log(err);
        }
        else {
          res.json(tabelaBanco);
        }
      });
  },
  // Defined add store route
  add(req, res) {
    let tabelaBanco = new TabelaBanco(req.body);
    tabelaBanco.save()
      .then(tabelaBanco => {
        res.status(200).json({'Orçamento': 'Added successfully'});
      })
      .catch(err => {
        res.status(400).send("Unable to save to database");
      });
  },
 
  // Defined edit route
  edit(req, res) {
    let id = req.params.id;
    TabelaBanco.findById(id, function (err, tabelaBanco){
      res.json(tabelaBanco);
    });
  },
  
  //  Defined update route
  update (req, res) {
    TabelaBanco.findById(req.params.id, function (err, tabelaBanco) {
      if (!tabelaBanco)
        res.status(404).send("Data is not found");
      else {
        tabelaBanco.anoorc = req.body.anoorc;
        tabelaBanco.secret = req.body.secret;
        tabelaBanco.uniorc = req.body.uniorc;
        tabelaBanco.progtrab = req.body.progtrab;
        tabelaBanco.natdesp = req.body.natdesp;
        tabelaBanco.fontrec = req.body.fontrec;
        tabelaBanco.dv = req.body.dv;
        tabelaBanco.valor = req.body.valor;
        tabelaBanco.total = req.body.total;
        tabelaBanco.movorc = req.body.movorc;
        tabelaBanco.login = req.body.login;
        tabelaBanco.save().then(tabelaBanco => {
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
    TabelaBanco.findByIdAndRemove({ _id: req.params.id }, function (err, tabelaBanco){
      if(err) res.json(err);
      else res.json('Successfully removed');
    });
  },
  
};