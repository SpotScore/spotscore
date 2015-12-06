var pg = require('pg');

var conString = "postgres://spotscore:notsecret@localhost/gis";

var errorCount = 0;
var maxRetries = 10;
var delay      = 2000;

var client = new pg.Client(conString);

process.on('uncaughtException', function (err) {
  //Keep Calm And Carry On
});

(function try_connection() {

  client.connect(function(err) {
    if(err) {
      errorCount++;
      if(errorCount < maxRetries) {
        setTimeout(function() {
          console.log("Attempt #" + (errorCount) + "/" + maxRetries +  " failed. Could not connect to database (yet). Retrying in " + delay/1000 + " seconds...");
          client.end();
          try_connection();
        }, delay);
      } else { 
        console.log("Connection not established after 10 tries. Giving up.");
      }
    } else {
      console.log("Connection to database established!");
      client.end();
    }
  });
})();
