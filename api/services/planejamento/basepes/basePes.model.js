const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let BasePes = new Schema(
  {
    anoInicio: {
      type: String
    },
    anoFim: {
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
},
    {timestamps: true, collection: 'basePes'}
);
module.exports = mongoose.model('BasePes', BasePes);
