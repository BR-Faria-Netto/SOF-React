const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Gestor = new Schema(
  {
    tipoGestor: {
      type: String
    },
    nomeGestor: {
      type: String
    },
    situacao: {
      type: String
    },
    login: {
      type: String
    },  
},
    {timestamps: true,collection: 'gestor'}
);
module.exports = mongoose.model('Gestor',Gestor);
