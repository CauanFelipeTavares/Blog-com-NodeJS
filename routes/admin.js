const express = require('express')
const router = express.Router()

    router.get('/home', (req,res) => {
        res.send("Pagina principal do adm fml")
    })
    router.get('/', (req,res) => {
        res.render('admin/index')
    })

    router.get('/categorias', (req,res) => {
        res.render('admin/categorias')
    })

    router.get('/categorias/add', (req,res) => {
        res.render('admin/addcategoria')
    })

module.exports = router