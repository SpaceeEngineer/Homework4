const { parentPort } = require("worker_threads");
const fs = require('fs');

let rewdata = fs.readFileSync('data.json');
let user = JSON.parse(rewdata);
let finish;

parentPort.on("message", ({ name }) => {
    parentPort.postMessage({ name, fib: getPerson(name) });
});

function getPerson(name) {
    user.map(data => {
        if (data.name === name){
            finish = `Age = ${data.age}; Secret identity = ${data.secretIdentity}`;
        } else {
            finish = `Person with name ${name} is not exist`;
        }
    })
    return finish;
}
