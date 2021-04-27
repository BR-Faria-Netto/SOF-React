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
      type: [{ codigo: String, descricao: String }]
    },

},
    {timestamps: true, collection: 'meta'}
);
module.exports = mongoose.model('Meta', Meta);
