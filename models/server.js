const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //DATA-BASE-CONNECITON
        this.conectarDB();

        //MIDDLWARES
        this.middleware();
    
        //ROUTES
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
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