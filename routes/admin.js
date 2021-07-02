const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const categoria = mongoose.model("categorias")

    router.get('/home', (req,res) => {
        res.send("Pagina principal do adm fml")
    })
    router.get('/', (req,res) => {
        res.render('admin/index')
    })

    router.get('/categorias', (req,res) => {
        categoria.find().sort({date:'desc'}).then((categorias) => {
            res.render('admin/categorias', {categorias: categorias.map(categoria =>
                categoria.toJSON()
            )})
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias")
            res.render('/admin')
        })
        
    })

    router.get('/categorias/add', (req,res) => {
        res.render('admin/addcategoria')
    })

    router.post('/categorias/nova', (req,res) => {

        var erros = []

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push({texto: "Nome Inválido"})
        }
        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
            erros.push({texto: "Slug Inválido"})
        }
        if(req.body.nome.length < 2){
            erros.push({texto: "Nome da categoria pequeno demais"})
        }
        if(req.body.slug.length < 3){
            erros.push({texto: "Slug da categoria pequeno demais"})
        }

        if(erros.length > 0){
            res.render('admin/addcategoria', {erros: erros})
        }else{
            const novaCategoria =  {
                nome: req.body.nome,
                slug: req.body.slug
            }
    
            new categoria(novaCategoria).save().then(() => {
                req.flash('success_msg', "Categoria criada com sucesso!")
                res.redirect('/admin/categorias')
            }).catch((erro) => {
                req.flash('error_msg', "Erro ao salvar a categoria. Tente novamente.")
                res.redirect('/admin')
            })
        }

    })


module.exports = router