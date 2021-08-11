const express = require('express');

const path = require('path');
const { clog } = require('./middleware/clog');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3001;
const app = express();
const { readFromFile,readAndAppend,writeToFile,} = require('./helpers/fsUtils');

// * Express middleware
app.use(clog)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static route for public site
app.use(express.static(path.join(__dirname,'public')));
// static route for internal folder
app.use(express.static(path.join(__dirname,'internal')));



// * GET ROUTES
app.get('/',(req,res) =>
  res.sendFile(path.join(__dirname,'/public/pages/index.html'))
);


app.get('*',(req,res) =>
  res.sendFile(path.join(__dirname,'/public/pages/404.html'))
);

// * OPEN PORT
app.listen(PORT,() =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
