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
  }

},

{ collection: 'naturezaDespesa'}

);

module.exports = mongoose.model('NaturezaDespesa', NaturezaDespesa);

