const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let MacroAcao = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  },
  unidMedida: {
    type: String
  },
  login: {
    type: String
  },  
  acoesOrcamentarias: {
    type: [{ codigo: String, acaoOrcamentaria: String }]
  },
},
  { timestamps: true, collection: 'macroAcao'}
);

module.exports = mongoose.model('MacroAcao', MacroAcao);

