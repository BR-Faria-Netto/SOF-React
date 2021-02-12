const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let GrupoDespesa = new Schema(
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
  {timestamps: true, collection: 'grupoDespesa'}
);

module.exports = mongoose.model('GrupoDespesa', GrupoDespesa);

