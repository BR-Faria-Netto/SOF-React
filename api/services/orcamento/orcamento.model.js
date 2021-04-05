const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Orcamento = new Schema(
  {
    anoorc: {
      type: String
    },
    secret: {
      type: String
    },
    uniorc: {
      type: String
    },
    progtrab: {
      type: String
    },
    natdesp: {
      type: String
    },
    fontrec: {
      type: String
    },
    dv: {
      type: String
    },
    valor: {
      type: String
    },
    total: {
      type: String
    },
    movorc: {
      type: [{ eveorc: String, valor: String, referente: String }]
    },
    login: {
      type: String
    },  
},
    {timestamps: true, collection: 'orcamento'}
);

module.exports = mongoose.model('Orcamento', Orcamento);
