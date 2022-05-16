const { Worker } = require("worker_threads");
const fs = require('fs');

let rewdata = fs.readFileSync('data.json');
let user = JSON.parse(rewdata);

let money = [1500, 15000, 150000];
let year = [5, 25, 50];

const sizeMoney = Int32Array.BYTES_PER_ELEMENT * money.length;
console.log(`buffer size for money: ${sizeMoney} \n`)

const sizeYear = Int32Array.BYTES_PER_ELEMENT * year.length;
console.log(`buffer size for money: ${sizeYear} \n`)

const sharedBufferMoney = new SharedArrayBuffer(sizeMoney);
const sharedArrayMoney = new Int32Array(sharedBufferMoney);

const sharedBufferYear = new SharedArrayBuffer(sizeYear);
const sharedArrayYear = new Int32Array(sharedBufferYear);

console.log(`Shared array money size, before data: ${sharedArrayMoney} \n`);
console.log(`Shared array year size, before data: ${sharedArrayYear} \n`);


money.forEach((number, index) => {
    Atomics.store(sharedArrayMoney, index, number);
})

year.forEach((number, index) => {
    Atomics.store(sharedArrayYear, index, number);
})

console.log(`Shared array money: ${sharedArrayMoney} \n`);
console.log(`Shared array year: ${sharedArrayYear} \n`);

const worker = new Worker("./workers_process.js");

worker.on("message", result => {
    console.log(`${result.nMoney} at 10% per annum on ${result.nYear} = ${result.fib}`);
});

worker.on("error", error => {
    console.log(error);
});

worker.postMessage({ money: sharedArrayMoney, year: sharedArrayYear });
