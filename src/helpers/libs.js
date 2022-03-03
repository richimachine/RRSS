const helpers = {};

randomNumber = () => {
    const code = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let len = code.length
    let randomNumber = 0
    for (let i = 0; i < 6; i++){
        let ran = Math.random()
        randomNumber = randomNumber + code.charAt(Math.floor(ran * len))
     }
     return randomNumber;
    }

    module.exports = helpers;