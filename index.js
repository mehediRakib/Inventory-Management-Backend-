const app = require('./app.js');

const port = process.env.PORT || 7050;

app.listen(port, function() {
    console.log("Server creation Successful");
});
