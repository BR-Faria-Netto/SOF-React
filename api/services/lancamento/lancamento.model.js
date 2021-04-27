const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Lancamento = new Schema(
  {
    classificador: {
      type: String
    },
    categoria: {
      type: String
    },
    descricao: {
      type: String
    },
    data: {
      type: String
    },
    operacao: {
      type: String
    },
    periodicidade: {
      type: String
    },
    repeticao: {
      type: String
    },
    favorecido: {
      type: String
    },
    documento: {
      type: String
    },
    gestor: {
      type: String
    },
    valor: {
      type: String
    },
    status: {
      type: String
    },
    login: {
      type: String
    },  
},
  { timestamps: true, collection: 'lancamento'}
);
module.exports = mongoose.model('Lancamento', Lancamento);
