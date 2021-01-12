const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let FonteRecurso = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  }

},

{ collection: 'fonteRecurso'}

);

module.exports = mongoose.model('FonteRecurso', FonteRecurso);

