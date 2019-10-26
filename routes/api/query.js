const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/test', (req, res) => res.send('Hey!'));

router.post('/scan', (req, res) => {
  let data =req.body.image;
  //console.log(req.body);

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
