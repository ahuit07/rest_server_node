const { promises } = require('dns');
const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECORPUBKEY,{
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No fue posible generar el token')
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generarJWT
}