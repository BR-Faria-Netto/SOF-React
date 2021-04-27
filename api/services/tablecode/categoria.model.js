const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Categoria = new Schema(
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
  { timestamps: true, collection: 'categoria'}
);

module.exports = mongoose.model('Categoria', Categoria);

