const { Worker } = require("worker_threads");

const worker = new Worker("./worker_process.js");

worker.on("message", result => {
    console.log(`${result.name} Info: ${result.fib}`);
});

worker.on("error", error => {
    console.log(error);
});

worker.on("exit", exitCode => {
    console.log("Finished with code", exitCode);
})
console.log("Executed in the parent thread");

worker.postMessage({name: "Molecule Man"});
worker.postMessage({name: "Jane Wilson"});
worker.postMessage({name: "Eternal Flame"});
worker.postMessage({name: 12});
