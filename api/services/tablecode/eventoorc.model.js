const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let EventoOrc = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  },
  operacao: {
    type: String
  },
  login: {
    type: String
  },  
},
  {timestamps: true, collection: 'eventoOrc'}
);

module.exports = mongoose.model('EventoOrc', EventoOrc);

