const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Objetivo = new Schema(
  {
    basePes: {
      type: String
    },
    diretriz: {
      type: String
    },
    numero: {
      type: String
    },
    descricao: {
      type: String
    },
    status: {
      type: String
    },
    login: {
      type: String
    },  
},
    {timestamps: true, collection: 'objetivo'}
);
module.exports = mongoose.model('Objetivo', Objetivo);
