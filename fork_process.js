const { json } = require('stream/consumers');
const fs = require('fs');

let rewdata = fs.readFileSync('data.json');
let user = JSON.parse(rewdata);

process.on('message', (message) => {
    if (message === 'NAME') {
        

        const showName = () => {
            console.log('Persons Name');
            user.map(data => {
                    console.log(`Name - ${data.name}; Secret identity - ${data.secretIdentity}`);
              })
              const message = `{"Response":${nameResult}}`;
              process.send(message);
        }

        const nameResult = setTimeout(showName, 5000);
    }

    if (message === 'AGE') {
        

        const showAge = () => {
            console.log('Persons Age');
            user.map(data => {
                    console.log(`Name - ${data.name}; Age - ${data.age};`);
              })
            const message = `{"Response":${ageResult}}`;
            process.send(message);
        }

        const ageResult = setTimeout(showAge, 15000);;  
    }

    if (message === 'POWERS') {
        

        const showPower = () => {
            console.log('Persons Powers');
            user.map(data => {
                    console.log(`Name - ${data.name}; Powers - ${data.powers};`);
              })
            const message = `{"Response":${powersResult}}`;
            process.send(message);
        }

        const powersResult = setTimeout(showPower, 10000); 
    }
});

