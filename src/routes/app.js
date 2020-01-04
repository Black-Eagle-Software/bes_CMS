const app_routes = require('express').Router();

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');
const App = require('../app/app').default;

const ServerConsole = require('../helpers/serverConsole');

const routes = [
    {
        path: '/',
        exact: 'true',
        req_authorization: false
    },
    {
        path: '/home',
        req_authorization: true
    },
    {
        path: '/admin',
        req_authorization: true
    },
    {
        path: '/upload',
        req_authorization: true
    },
    {
        path: '/users',
        req_authorization: true
    },
    {
        path: '/media',
        req_authorization: true
    },
    {
        path: '/media_details',
        req_authorization: true //shut it down!
    },
    {
        path: '/search',
        req_authorization: true
    },
    {
        path: '/tags',
        req_authorization: true
    },
    {
        path: '/album_details',
        req_authorization: true
    },
    {
        path: '/new_album',
        req_authorization: true
    }
];

app_routes.get('*', (req, res, next)=>{
    let url = req.url;
    //special handling for search url since it has query embedded
    if(url.includes('?') && url.includes('=')){
        url = url.substr(0, url.indexOf('?'));
    }
    const activeRoute = routes.find((route)=>ReactRouterDOM.matchPath(url, route)) || {};

    ServerConsole.debug(`Attempting to go to URL: ${url}`);
    ServerConsole.debug(`Route requires authorization: ${activeRoute.req_authorization}`);
    let can_proceed = true;
    let is_authorized = false;
    if(activeRoute.req_authorization){
        can_proceed = false;
        if(req.isAuthenticated()){
            //need to handle requiring administrator user role
            can_proceed = true;
            is_authorized = true;
        }else{
            res.status(304).redirect('/');
            return next();
        }
    }

    //special case for when we're going to / but we're already authenticated
    if(req.url === '/' && req.isAuthenticated()){
        res.status(200).redirect('/home');
        return next();
    }

    if(can_proceed) {
        const context = {};
        context.data = {
            ok: can_proceed,
            needs_auth: activeRoute.req_authorization,
            is_authorized: is_authorized,
            username: req.user ? JSON.parse(req.user).email : "",
            user_id: req.user ? JSON.parse(req.user).id : ""
        };
        const html = ReactDOMServer.renderToString(
            <ReactRouterDOM.StaticRouter location={req.url} context={context}>
                <App />
            </ReactRouterDOM.StaticRouter>
        );
        ServerConsole.debug(`App route context data: ${JSON.stringify(context)}`);
        res.status(200).send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Black Eagle Software CMS</title>
                <link rel="shortcut icon" href="/favicon-16x16.png">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <!--<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />-->
                <link rel="stylesheet" type="text/css" href="/css/styles.css">
                <link rel="stylesheet" type="text/css" href="/css/codicon.css">
                <link rel="stylesheet" href="/global.css">
                <link rel="stylesheet" href="/buttons.css">
                <link rel="stylesheet" href="/header.css">
                <link rel="stylesheet" href="/media.css">
                <link rel="stylesheet" href="/tags.css">
                <script src="/bundle.js" defer></script>
                <script>window.__INITIAL_DATA__ = ${JSON.stringify(context.data)}</script>
                <script src="/socket.io/socket.io.js"></script>                            
            </head>
            <body>
                <div id="app">${html}</div>            
            </body>
        </html>
        `);
    }
    return next();
});

module.exports = app_routes;