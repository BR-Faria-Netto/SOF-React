const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Secretaria = new Schema(
  {
    nomesec: {
      type: String
    },
    ender: {
      type: String
    },
    bai: {
      type: String
    },
    cid: {
      type: String
    },
    cep: {
      type: String
    },
    uf: {
      type: String
    },
    cnpj: {
      type: String
    },
    banrec: {
      type: String
    },
    agerec: {
      type: String
    },
    ccrec: {
      type: String
    },
    contas: {
      type: [{banco:String,agencia:String,conta:String,referente:String}]
    },
    login: {
      type: String
    },  
},
    {timestamps: true,collection: 'secretaria'}
);
module.exports = mongoose.model('Secretaria', Secretaria);
