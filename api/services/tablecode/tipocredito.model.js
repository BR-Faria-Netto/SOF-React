const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let tipocredito = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  }

},

{timestamps: true, collection: 'tipocredito'}

);

module.exports = mongoose.model('tipocredito', tipocredito);

