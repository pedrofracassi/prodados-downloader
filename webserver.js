const path = require('path');
const express = require('express');

const staticPath = path.join(__dirname, '/public');
const port = process.env.PORT || 38;

const server = express().use(express.static(staticPath));

module.exports = {
  start: function() {
    server.listen(port, function() {
      console.log('Listening on port ' + port);
    });
  },
  stop: function() {
    server.close();
  }
}

module.exports.start();
