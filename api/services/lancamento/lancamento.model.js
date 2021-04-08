const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Lancamento = new Schema(
  {
    tipoLancamento: {
      type: String
    },
    descricao: {
      type: String
    },
    data: {
      type: String
    },
    tipoOperacao: {
      type: String
    },
    contaProprietaria: {
      type: String
    },
    classificador: {
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
