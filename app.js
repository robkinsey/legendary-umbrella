const express = require('express');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const fs = require('fs');
var count = 0;

fs.readFile('./public/index.html', (err, html) => {
    if (err) {
      throw err;
    }

    var myLogger = function(req, res, next) {
      count++;
      console.log("myLog:: request:%s, host:%s, method:%s, time:%s",
        count, req.hostname, req.method, Date.now());
      next();
    };

    app.use(express.static('public'));
    app.use(myLogger);

    app.get('/bodytest', (req,res) => {
      res.send("Oh hello " + req.hostname + ", using " + req.method + "!");
    });

    app.listen(port, () => {
      console.log('Server started on %s : %s', hostname, port);
    });

});
