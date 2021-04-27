const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Classificador = new Schema(
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
  categorias: {
    type: [{ codigo: String, descricao: String }]
  },
},
  { timestamps: true, collection: 'classificador'}
);

module.exports = mongoose.model('Classificador', Classificador);

