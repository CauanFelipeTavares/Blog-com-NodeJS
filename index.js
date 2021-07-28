//Módulos

    const express = require('express')
    const app = express()
    const handlebars = require('express-handlebars')
    const router = require('./routes/admin')
    const mongoose = require('mongoose')
    const admin = require('./routes/admin')
    const path = require('path')
    const session = require('express-session')
    const flash = require('connect-flash')

//Configurações

//Session & Flash
    app.use(session({
        secret: 'senha',
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    app.use((req,res,next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

//Body Parser
    app.use(express.json()) 
    app.use(express.urlencoded({extended: true}))

    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

//Banco de Dados
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://localhost/blogapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conectado com o MongoDb")
    }).catch((erro) => {
        console.log("Erro ao conectar com o banco de dados MongoDb. " + erro)
    })


//Arquivos Estáticos (HTML,CSS)
    app.use(express.static(path.join(__dirname + '/public')))

//Rotas

//Rota Principal
    app.get('/', (req,res) => {
        res.render('user/index')
    })

//Rotas Admin
    app.use('/admin', admin)

//Outros

//Rodar em LocalHost
    const port = 8181
    app.listen(port,() => {
        console.log("Servidor rodando em localhost:" + port)
    })
