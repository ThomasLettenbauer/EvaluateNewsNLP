const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
var aylien = require("aylien_textapi");

// set aylien API credentials
// NOTICE that textapi is the name I used, but it is arbitrary.
// You could call it aylienapi, nlp, or anything else, 
//   just make sure to make that change universally!
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });


const app = express()

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { check, validationResult } = require('express-validator');

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

var apiResponse;

app.post('/tixapi', function (req, res) {

  const myISBN  = req.body.isbn; 
  const myUrl = 'https://www.vlbtix.de/user/search/Title.aspx?pr=' + myISBN;

  textapi.entities({
    url: myUrl
  }, function(error, response) {
    if (error === null) {
      Object.keys(response.entities).forEach(function(e) {
        console.log(e + ": " + response.entities[e].join(","));
      });
      returnResponse(response);
    } else { 
      res.send({status: 'ERROR'});
    }
  });

  function returnResponse(myResponse) {
    res.send(myResponse);
}

})

// POST API for URL, validate it
app.post('/isbn', [
    check('isbn').isISBN()
  ], (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
      const isbn  = req.body.isbn 
      res.send({ status: 'SUCCESS' });
  })
