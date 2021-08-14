var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/musallah',{useUnifiedTopology: true,useNewUrlParser: true});
const mongo = mongoose.connection;
// export mongo constant
module.exports = mongo;