const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let UnidOrcamentaria = new Schema(
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
  {timestamps: true, collection: 'unidOrcamentaria'}
);

module.exports = mongoose.model('UnidOrcamentaria', UnidOrcamentaria);

