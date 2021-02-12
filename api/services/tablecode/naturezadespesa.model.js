const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let NaturezaDespesa = new Schema(
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
  {timestamps: true, collection: 'naturezaDespesa'}
);

module.exports = mongoose.model('NaturezaDespesa', NaturezaDespesa);

