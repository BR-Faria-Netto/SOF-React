const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Sequencial = new Schema(
  {
    ano: {
      type: String
    },
    tabela: {
      type: String
    },
    sequencia: {
      type: Number
    }
},
    {timestamps: true, collection: 'sequencial'}
);

module.exports = mongoose.model('Sequencial', Sequencial);
