const EntityDb = require("./lancamento.model");

module.exports = {
  // Defined listing route
  getAll(req, res) {
    EntityDb.find(function (err, entityDb) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(entityDb);
      }
    });
  },
  // Defined add store route
  add(req, res) {
    let entityDb = new EntityDb(req.body);
    entityDb.save()
      .then(entityDb => {
        res.status(200).json('Added successfully');
      })
      .catch(err => {
        res.status(400).send("Unable to save to database");
      });
  },
  // Defined edit route
  edit(req, res) {
    let id = req.params.id;
    EntityDb.findById(id, function (err, entityDb){
      res.json(entityDb);
    });
  },
  //  Defined update route
  update (req, res) {
    EntityDb.findById(req.params.id, function (err, entityDb) {
      if (!entityDb)
        res.status(404).send("Data is not found");
      else {
        entityDb.classificador = req.body.classificador;
        entityDb.categoria = req.body.categoria;
        entityDb.descricao = req.body.descricao;
        entityDb.data = req.body.data;
        entityDb.operacao = req.body.operacao;
        entityDb.periodicidade = req.body.periodicidade;
        entityDb.repeticao = req.body.repeticao;
        entityDb.favorecido = req.body.favorecido;
        entityDb.documento = req.body.documento;
        entityDb.gestor = req.body.gestor;
        entityDb.valor = req.body.valor;
        entityDb.status = req.body.status;
        entityDb.login = req.body.login;
        entityDb.save().then(entityDb => {
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
    EntityDb.findByIdAndRemove({ _id: req.params.id }, function (err, entityDb){
      if(err) res.json(err);
      else res.json('Successfully removed');
    });
  },
  
};