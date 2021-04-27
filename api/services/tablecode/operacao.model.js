const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Operacao = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  },
  login: {
    type: String
  },  
},
  { timestamps: true, collection: 'operacao'}
);

module.exports = mongoose.model('Operacao', Operacao);

