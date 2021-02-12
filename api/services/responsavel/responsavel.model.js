const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Responsavel = new Schema(
  {
    tipoResponsavel: {
      type: String
    },
    nome: {
      type: String
    },
    cargo: {
      type: String
    },
    idfuncional: {
      type: String
    },
    delegacao: {
      type: String
    },
    situacao: {
      type: String
    },
    login: {
      type: String
    },  
},
    {timestamps: true, collection: 'responsavel'}
);

module.exports = mongoose.model('Responsavel', Responsavel);
