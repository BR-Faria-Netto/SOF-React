const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let EventoNad = new Schema(
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
  {timestamps: true, collection: 'eventoNad'}
);

module.exports = mongoose.model('EventoNad', EventoNad);

