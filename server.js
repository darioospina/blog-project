// https://www.youtube.com/watch?v=Lr9WUkeYSA8&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=6

const fs = require('fs');
const http = require('http');
const _ = require('lodash');

const server = http.createServer((req, res) => {

    //lodash
    const num = _.random(0, 20); // Random numbers 
    console.log(num)

    // Set header content-type
    res.setHeader('Content-type', 'text/html')

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // Send an HTML file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000');
});
