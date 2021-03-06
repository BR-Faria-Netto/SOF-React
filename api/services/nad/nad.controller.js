const Nad = require("./nad.model");
const Sequencial = require('../sequencial/sequencial.model');

module.exports = {

  // Defined listing route
  getAllTeste(req, res) {
    const pageNo = parseInt(req.params.page);
    const pageSize = 10;
    const skip = (pageNo - 1) * pageSize;
    const limit = (pageNo + pageSize) * pageSize;
      Nad.find(function(err,nad){
        if(err){
          console.log(err);
        }
        else {
          res.json(nad);
        }
      }).skip(skip).limit(limit);
  },

  // Defined listing route
  getAll(req, res) {
    Nad.find(function (err, nad) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(nad);
      }
    });
  },

  // Defined add store route
  add(req, res) { 
    Sequencial.findOne({ano : req.body.anonad , tabela : 'NAD' }, function (err, sequencial) {
      try {
        sequencia = sequencial.sequencia;
        for (let index = 0; index < req.body.copias; index++) {
          sequencia = sequencia+1;
          numero = '0'+sequencia+0;
          numero = ("000000"+numero).slice(-7,-1);
          nad = new Nad(req.body);
          nad.numnad = numero;
          nad.save();
        }
        sequencial.sequencia = sequencia;
        sequencial.save();
      } catch (err) {
          res.status(400).send("Unable to save to database");
      }
    })
  },
  // Defined edit route
  edit(req, res) {
    let id = req.params.id;
    Nad.findById(id, function (err, nad){
        res.json(nad);
    });
  },
  
  //  Defined update route
  update (req, res) {
      Nad.findById(req.params.id, function(err, nad) {
      if (!nad)
        res.status(404).send("Data is not found");
      else {
          nad.anonad = req.body.anonad;
          nad.numnad = req.body.numnad;
          nad.procnad = req.body.procnad;
          nad.datanad = req.body.datanad;
          nad.evenad  = req.body.evenad;
          nad.categoria = req.body.categoria;
          nad.catgast  = req.body.catgast;
          nad.adant  = req.body.adant;
          nad.secret  = req.body.secret;
          nad.unigest  = req.body.unigest;
          nad.uniorc  = req.body.uniorc;
          nad.progtrab = req.body.progtrab;
          nad.natdesp = req.body.natdesp;
          nad.fontrec = req.body.fontrec;
          nad.tipcre = req.body.tipcre;
          nad.banpag = req.body.banpag;
          nad.agepag = req.body.agepag;
          nad.ccpag = req.body.ccpag;
          nad.contapag = req.body.contapag;
          nad.nomefav = req.body.nomefav;
          nad.ender = req.body.ender;
          nad.bai = req.body.bai;
          nad.cid = req.body.cid;
          nad.cep = req.body.cep;
          nad.cnpj = req.body.cnpj;
          nad.uf = req.body.uf;
          nad.banrec = req.body.banrec;
          nad.agerec = req.body.agerec;
          nad.ccrec = req.body.ccrec;
          nad.contarec = req.body.contarec;
          nad.tipemp = req.body.tipemp;
          nad.valor = req.body.valor;
          nad.extenso = req.body.extenso;
          nad.descdesp = req.body.descdesp;
          nad.jan = req.body.jan;
          nad.fev = req.body.fev;
          nad.mar = req.body.mar;
          nad.abr = req.body.abr;
          nad.mai = req.body.mai;
          nad.jun = req.body.jun;
          nad.jul = req.body.jul;
          nad.ago = req.body.ago;
          nad.set = req.body.set;
          nad.out = req.body.out;
          nad.nov = req.body.nov;
          nad.dez = req.body.dez;
          nad.tiplic = req.body.tiplic;
          nad.dataabert = req.body.dataabert;
          nad.numerolic = req.body.numerolic;
          nad.baselegal = req.body.baselegal;
          nad.emissor = req.body.emissor;
          nad.cargoemissor = req.body.cargoemissor;
          nad.deleemi = req.body.deleemi;
          nad.matemi = req.body.matemi;
          nad.dataemi = req.body.dataemi;
          nad.ordenador = req.body.ordenador;
          nad.cargoordenador = req.body.cargoordenador;
          nad.deleord = req.body.deleord;
          nad.matord = req.body.matord;
          nad.dataord = req.body.dataord;
          nad.ratificador = req.body.ratificador;
          nad.cargoratificador = req.body.cargoratificador;
          nad.delerat = req.body.delerat;
          nad.matrat = req.body.matrat;
          nad.datarat = req.body.datarat;
          nad.login = req.body.login;
          nad.save().then(nad => {
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
      Nad.findByIdAndRemove({_id: req.params.id}, function(err, nad){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
  },
  
};