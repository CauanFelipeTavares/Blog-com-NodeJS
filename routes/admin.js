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

    router.get('/categorias/edit/:id', (req,res) => {
        categoria.findOne({_id:req.params.id}).lean().then((categoria) => {
            res.render('admin/editcategorias', {categoria: categoria})
        }).catch((erro) => {
            req.flash('error_msg', 'Esta categoria não existe')
            res.redirect('/admin/categorias')
        })

        
    })

    router.post('/categorias/edit', (req,res) => {
        categoria.findOne({_id: req.body.id}).then((categoria) => {

            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria editada com sucesso')
                res.redirect('/admin/categorias')
            }).catch((erro) => {
                req.flash('error_msg', 'Houve um erro ao editar a categoria')
                res.redirect('/admin/categorias')
            })

        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao editar a categoria')
            res.redirect('/admin/categorias')
        })
    })

    router.post('/categorias/delete', (req,res) => {
        categoria.deleteOne({_id: req.body.id}).then(() => {
            req.flash('success_msg', 'Categoria deletada com sucesso')
            res.redirect('/admin/categorias')
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao deletar a categoria')
            res.redirect('/admin/categorias')
        })
    })

    router.get('/postagens', (req,res) => {
        res.render('admin/postagens')
    })

    router.get('/postagens/add', (req,res) => {
        categoria.find().lean().then((categorias) => {
            res.render('admin/addpostagem', {categorias:categorias})
        }).catch((erro) => {
            req.flash('erros_msg', 'Houve um erro ao carregar o formulário de postagem')
            res.redirect('/admin')
        })
    })

module.exports = router