const http = require('http');
const { fork } = require('child_process');

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    const child = fork(__dirname + '/fork_process');

    child.on('message', (message) => {
        console.log('Returning results');
        res.writeHead(200);
        res.end(message);
    });

    child.send('NAME');
    child.send('AGE');
    child.send('POWERS');

};

const server = http.createServer(requestListener);


server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
