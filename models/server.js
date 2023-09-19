const express = require('express')
var cors = require('cors')

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        //MIDDLWARES
        this.middleware();

        this.routes();
    }

    middleware() {
        this.app.use(cors());
        this.app.use( express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listener() {
        this.app.listen(this.port, () => {
            console.log('Escuchando');
        })
    }
}

module.exports = Server;
