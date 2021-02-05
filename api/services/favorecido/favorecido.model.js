const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Favorecido = new Schema(
  {
    nomefav: {
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
  
  {timestamps: true, collection: 'favorecido'}

);
module.exports = mongoose.model('Favorecido', Favorecido);
