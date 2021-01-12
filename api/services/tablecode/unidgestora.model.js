const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let UnidGestora = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  }

},

{ collection: 'unidGestora'}

);

module.exports = mongoose.model('UnidGestora', UnidGestora);

