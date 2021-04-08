const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Conta = new Schema(
  {
    tipoConta: {
      type: String
    },
    nomeConta: {
      type: String
    },
    situacao: {
      type: String
    },
    login: {
      type: String
    },  
},
    {timestamps: true,collection: 'conta'}
);
module.exports = mongoose.model('Conta', Conta);
