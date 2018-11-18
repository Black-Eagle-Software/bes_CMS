var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    //set our port

var router = express.Router();

router.get('/', (req, res)=>{
    res.json({ message: "Hooray! Welcome to our api!" });
});

app.use('/api', router);

app.listen(port);
console.log(`Server now running on port: ${port}`);