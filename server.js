'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Quote = require('./model/quotes');

var app = express();
var router = express.Router();
var port = process.env.API_port || 3001;

var uristring =
    process.env.MONGOLAB_URI;
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connection to: ' + uristring);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( function(req, res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-Width, Content-Type, Access-Control-Allow-Methods, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'API initialized'});
});

router.route('/quotes')

  .get(function(req, res) {
    Quote.find(function(err, quotes) {
      if (err) {
        res.send(err);
      }
      res.json(quotes);
    });
  })

  .post(function(req, res) {
    var quote = new Quote();
    quote.author = req.body.author;
    quote.text = req.body.text;

    quote.save(function(err) {
      if (err) {
        res.send(err)
      }
      res.json({ message: 'Quote added successfully' });
    });
  });


router.route('/quotes/:quote_id')

  .put(function(req, res) {
    Quote.findById(req.params.quote_id, function(err, quote) {
      if (err) {
        res.send(err);
      }
      (req.body.author) ? quote.author = req.body.author : null;
      (req.body.text) ? quote.text = req.body.text : null;
      quote.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Quote updated' });
      });
    });
  })

  .delete(function(req, res) {
    Quote.remove({ _id: req.params.quote_id }, function(err, quote) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Quote deleted' })
    })
  });

app.use('/api', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`)
});
