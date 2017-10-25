const request = require('request');
const fs = require('fs');
const path = require('path');
const URL = require('url');

var photoUrl = "https://prodados1.websiteseguro.com/Aplicacoes/ProWeb/Oficina/Fotos/%index%.jpg";

const current = require('./last.json');

downloadNext();

function downloadNext() {
  fs.writeFileSync("last.json", JSON.stringify(current));
  current.index++;
  var url = photoUrl.replace('%index%', current.index);
  uri = URL.parse(url);
  filename = path.basename(uri.path);
  request(url, {encoding: 'binary'} , function (error, response, body) {
    if (response && response.statusCode == '200') {
      console.log(current.index + ' - Found.');
      if (!fs.existsSync('fotos/' + current.index + '.jpg')) {
        fs.writeFile('fotos/' + current.index + '.jpg', body, 'binary', function (err) {
          if (err) {
            console.log(current.index + ' - Download failed.');
            console.log(err);
          } else {
            console.log(current.index + ' - Downloaded.');
          }
          downloadNext();
        });
      } else {
        console.log(current.index + ' - Already downloaded.');
        downloadNext();
      }
    } else {
      console.log(current.index + ' - Failed.');
      downloadNext();
    }
  });
}
