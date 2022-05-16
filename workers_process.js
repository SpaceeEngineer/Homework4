const { parentPort } = require("worker_threads");

parentPort.on("message", ({ money, year }) => {
    money.forEach(nMoney => {
        year.forEach(nYear => {
            parentPort.postMessage({ nMoney, nYear, fib: getFib(nMoney, nYear) });
        })  
    });
})

function getFib(nMoney, nYear) {
    // for (let i = 0; i < nYear; i++){
        
    nMoney = nMoney * Math.pow(1.1, nYear);
    return nMoney.toFixed(2);
}