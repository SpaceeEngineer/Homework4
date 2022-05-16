const cluster = require('cluster');
const http = require('http');
const os = require('os');
const fs = require('fs');

let rewdata = fs.readFileSync('data.json');
let user = JSON.parse(rewdata);

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;

    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < cpusCount; i++) {
        const worker = cluster.fork();

        worker.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
            console.log(`Worker was replase`);
        });
    }

    console.log(cluster.workers);
} else {
    http.createServer((req, res) => {
        console.log(`Worker ${process.pid}: WORKED`);

        res.writeHead(200);
        res.end(`Worker ${process.pid}: END WORK`);
        const showJSON = () => {
            console.log('Persons Name');
            user.map(data => {
                    console.log(`Name - ${data.name}; Secret identity - ${data.secretIdentity}; Age - ${data.age}; Powers - ${data.powers} `);
              })
              
        }

        const nameResult = setTimeout(showJSON, 5000);

    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}
