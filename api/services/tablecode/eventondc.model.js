const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let EventoNdc = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  }

},

{ collection: 'eventoNdc'}

);

module.exports = mongoose.model('EventoNdc', EventoNdc);

