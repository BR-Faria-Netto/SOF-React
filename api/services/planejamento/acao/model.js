const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Acao = new Schema(
  {
    basePes: {
      type: String
    },
    diretriz: {
      type: String
    },
    objetivo: {
      type: String
    },
    meta: {
      type: String
    },
    numero: {
      type: String
    },
    descricao: {
      type: String
    },
    indicador: {
      type: String
    },
    status: {
      type: String
    },
    login: {
      type: String
    },  
},
    {timestamps: true, collection: 'acao'}
);
module.exports = mongoose.model('Acao', Acao);
