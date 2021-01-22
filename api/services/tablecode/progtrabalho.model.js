const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let ProgTrabalho = new Schema(
{
  codigo: {
    type: String
  },
  descricao: {
    type: String
  }

},

{timestamps: true, collection: 'progTrabalho'}

);

module.exports = mongoose.model('ProgTrabalho', ProgTrabalho);

