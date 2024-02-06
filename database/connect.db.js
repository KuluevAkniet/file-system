const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectionString = "mongodb+srv://kuluev877:7RdHkxzd368EccP6@cluster0.dcgtj7y.mongodb.net/"

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(async function(err, db) {
      if(err || !db) {
        return callback(err);
      }
      dbConnection = db.db("FILE");
      console.log("Successfully connected to MongoDB.");
      return callback();
    });
  },
  
  getDb: function() {
    return dbConnection;
  }
}
