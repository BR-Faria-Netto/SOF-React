const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let TipoLancamento = new Schema(
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
  classificadores: {
    type: [{ codigo: String, descricao: String }]
  },
},
  { timestamps: true, collection: 'tipoLancamento'}
);

module.exports = mongoose.model('TipoLancamento', TipoLancamento);

