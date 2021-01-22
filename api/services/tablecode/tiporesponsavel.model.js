const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let TipoResponsavel = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  }

},

{timestamps: true, collection: 'tipoResponsavel'}

);

module.exports = mongoose.model('tipoResponsavel', TipoResponsavel);

