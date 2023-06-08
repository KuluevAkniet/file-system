const express = require('express');
const fileRoutes = require('./routes/file.route');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const dbo = require('./database/connect.db');

const app = express();
const PORT = process.env.PORT || 3000;



app.use(fileUpload({
  createParentPath: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('static'));



app.use('/file', fileRoutes);
app.get('/', (req, res) => {
  try {
    res.send("File Service");
  } catch(e) {
    res.sendStatus(500);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


dbo.connectToServer((err) => {
  if(err) {
    console.error(err);
    process.exit();
  }
  
  
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
})


