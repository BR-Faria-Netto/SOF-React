const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let TipoConta = new Schema(
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
  { timestamps: true, collection: 'tipoConta'}
);

module.exports = mongoose.model('TipoConta', TipoConta);

