const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    //set our port

app.use((req, res, next)=>{
    res.locals.connection = mysql.createConnection({
        host: "localhost",
        user: "besCMS",
        password: "Wr3tch3d",
        database: "besCMS"
    });
    res.locals.connection.connect();
    next();
});

app.use('/', routes);

app.listen(port, ()=>{
    console.log(`Server now running on port: ${port}`);
});