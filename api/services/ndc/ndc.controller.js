const Ndc = require("./ndc.model");
const Sequencial = require('../sequencial/sequencial.model');
const util = require('../../helpers/utils');
const { unlink } = require("fs");

module.exports = {

  // Defined listing route
  getAll(req, res) {
      Ndc.find(function(err,ndc){
        if(err){
          console.log(err);
        }
        else {
          res.json(ndc);
        }
      });
  },
  // Defined add store route
  add(req, res) {
      Sequencial.findOne({ano : req.body.anondc , tabela : 'NDC' }, function (err, sequencial) {
        try {
          let sequencia = sequencial.sequencia;
          for (let index = 0; index < req.body.copias; index++) {
            sequencia = sequencia+1;
            let numero = '0'+sequencia+0;
            numero = ("000000"+numero).slice(-7,-1);
            let ndc = new Ndc(req.body);
            ndc.numndc = numero;
            ndc.save();
            Sequencial.findById(sequencial.id, function(err, sequencial) {
                sequencial.sequencia = sequencia;
                sequencial.save();
            })
          }
        } catch (err) {
            res.status(400).send("Unable to save to database");
        }
      })
  },
  // Defined edit route
  edit(req, res) {
    let id = req.params.id;
    Ndc.findById(id, function (err, ndc){
        res.json(ndc);
    });
  },
  //  Defined update route
  update (req, res) {
      Ndc.findById(req.params.id, function(err, ndc) {
      if (!ndc)
        res.status(404).send("Data is not found");
      else {
        ndc.anondc = req.body.anondc;
        ndc.numndc = req.body.numndc;
        ndc.procndc = req.body.procndc;
        ndc.datandc = req.body.datandc;
        ndc.evendc  = req.body.evendc;
        ndc.secret  = req.body.secret;
        ndc.uniorc  = req.body.uniorc;
        ndc.progtrab = req.body.progtrab;
        ndc.natdesp = req.body.natdesp;
        ndc.fontrec = req.body.fontrec;
        ndc.nomefav = req.body.nomefav;
        ndc.ender = req.body.ender;
        ndc.bai = req.body.bai;
        ndc.cid = req.body.cid;
        ndc.cep = req.body.cep;
        ndc.cnpj = req.body.cnpj;
        ndc.uf = req.body.uf;
        ndc.valor = req.body.valor;
        ndc.extenso = req.body.extenso;
        ndc.descdesp = req.body.descdesp;
        ndc.jan = req.body.jan;
        ndc.fev = req.body.fev;
        ndc.mar = req.body.mar;
        ndc.abr = req.body.abr;
        ndc.mai = req.body.mai;
        ndc.jun = req.body.jun;
        ndc.jul = req.body.jul;
        ndc.ago = req.body.ago;
        ndc.set = req.body.set;
        ndc.out = req.body.out;
        ndc.nov = req.body.nov;
        ndc.dez = req.body.dez;
        ndc.baselegal = req.body.baselegal;
        ndc.emissor = req.body.emissor;
        ndc.deleemi = req.body.deleemi;
        ndc.matemi = req.body.matemi;
        ndc.cargoemissor = req.body.cargoemissor;
        ndc.dataemi = req.body.dataemi;
        ndc.ordenador = req.body.ordenador;
        ndc.cargoordenador = req.body.cargoordenador;
        ndc.deleord = req.body.deleord;
        ndc.matord = req.body.matord;
        ndc.dataord = req.body.dataord;
        ndc.ratificador = req.body.ratificador;
        ndc.cargoratificador = req.body.cargoratificador;
        ndc.delerat = req.body.delerat;
        ndc.matrat = req.body.matrat;
        ndc.datarat = req.body.datarat;
        ndc.login = req.body.login;
        ndc.save().then(ndc => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
      }
    });
  },
  
  // Defined delete | remove | destroy route
  delete (req, res) {
      Ndc.findByIdAndRemove({_id: req.params.id}, function(err, ndc){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
  },

  
};

