const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let TipoOperacao = new Schema(
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
  { timestamps: true, collection: 'tipoOperacao'}
);

module.exports = mongoose.model('TipoOperacao', TipoOperacao);

