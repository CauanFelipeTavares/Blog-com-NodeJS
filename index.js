//Módulos

    const express = require('express')
    const handlebars = require('express-handlebars')
    //const bodyParser = require('body-parser')
    const router = require('./routes/admin')
    //const mongoose = require('mongoose')
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')


//Configurações
    //app.use(bodyParser.urlencoded({extended = true}));
    //app.use(bodyParser.json());

    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    app.use(express.static(path.join(__dirname + '/public')))
//Rotas
    app.get('/', (req,res) => {
        res.send("Pagina principal, adicionar futuramente um layout")
    })

    app.use('/admin', admin)


//Outros
    const port = 8181
    app.listen(port,() => {
        console.log("Servidor rodando em localhost:" + port)
    })
/*
localhost:8081
*/