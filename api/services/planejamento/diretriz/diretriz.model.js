const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Diretriz = new Schema(
  {
    basePes: {
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
    {timestamps: true, collection: 'diretriz'}
);
module.exports = mongoose.model('Diretriz', Diretriz);
