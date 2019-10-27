const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/test', (req, res) => res.send('Hey!'));
router.post('/compute', (req, res) => {
  console.log(req.body.Products);
  var options = {
    uri: "http://18.217.33.249:8444",
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    json: {
    	"Products":req.body.Products
        }
    };

  request(options, (err, resp, body) => {
    console.log(resp);
    console.log(err);
    res.send(resp);
  });

  //res.send("Test");
});
router.post('/scan', (req, res) => {

  var options = {
    uri: "https://vaeip452tl.execute-api.us-east-2.amazonaws.com/OptiEatOCR",
    method: "POST",
    json: {
      "image": req.body.image
    }
  };
  request(options, (err, resp, body) => {
    console.log(resp);
    console.log(err);
    res.send(resp);
  });

});


module.exports = router;
