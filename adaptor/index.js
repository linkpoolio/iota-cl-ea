const app = require('./server');

var listener = app.listen(8081, function() {
    console.log("IOTA External Adaptor Listening on: ", listener.address().address + listener.address().port);
});