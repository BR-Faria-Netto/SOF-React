const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Sequencial = new Schema(
  {
    tabela: {
      type: String
    },
    sequencia: {
      type: Number
    }
},
    { collection: 'sequencial'}
);

module.exports = mongoose.model('Sequencial', Sequencial);
