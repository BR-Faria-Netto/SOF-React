const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let TipoClassificador = new Schema(
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
  { timestamps: true, collection: 'tipoClassificador'}
);

module.exports = mongoose.model('tipoClassificador', TipoClassificador);

