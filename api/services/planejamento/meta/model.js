const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Meta = new Schema(
  {
    basePes: {
      type: String
    },
    diretriz: {
      type: String
    },
    objetivo: {
      type: String
    },
    numero: {
      type: String
    },
    descricao: {
      type: String
    },
    status: {
      type: String
    },
    login: {
      type: String
    },  
    estrategias: {
      type: [{ codigo: String, descricao: String, indicador: String, meta1: String, meta2: String, meta3: String, meta4: String}]
    },

},
    {timestamps: true, collection: 'meta'}
);
module.exports = mongoose.model('Meta', Meta);
