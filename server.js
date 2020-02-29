const express = require('express');
const bodyParser = require('body-parser');

const functionController = require('./utils/function-list');


const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));


app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/',functionController.router);



let port = process.env.PORT;;
if (port == null || port == "") {
    port = 2525;
  }

app.listen(port,(err)=>{
  console.log('server listen');
});

