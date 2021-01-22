const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let TipoLicitacao = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  }

},

{timestamps: true, collection: 'tipoLicitacao'}

);

module.exports = mongoose.model('TipoLicitacao', TipoLicitacao);

