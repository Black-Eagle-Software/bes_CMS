const app_routes = require('express').Router();

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');
const App = require('../app/app').default;

app_routes.get('/', (req, res)=>{
    //var html = "<h1>I hate this at times.</h1>";
    //console.log(App);
    const html = ReactDOMServer.renderToString(
    <ReactRouterDOM.StaticRouter location={req.url} context={{}}>
        <App />
    </ReactRouterDOM.StaticRouter>
    );
    //console.log(html);
    res.status(200).send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Black Eagle Software CMS</title>
            <link rel="shortcut icon" href="favicon-16x16.png">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="stylesheet" href="global.css">
            <script src="/bundle.js" defer></script>            
        </head>
        <body>
            <div id="app">${html}</div>            
        </body>
    </html>
    `);
});

module.exports = app_routes;