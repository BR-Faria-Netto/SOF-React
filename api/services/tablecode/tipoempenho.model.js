const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let TipoEmpenho = new Schema(
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
  {timestamps: true, collection: 'tipoEmpenho'}
);

module.exports = mongoose.model('TipoEmpenho', TipoEmpenho);

