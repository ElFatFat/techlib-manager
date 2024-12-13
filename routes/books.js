var express = require('express');
var router = express.Router();
var Livre = require('../models/Livre');

// ✨ Création : Formulaire d'ajout d'un nouveau livre
router.get('/new', function(req, res, next) {
  const categorieValues = Livre.schema.path('categorie').enumValues;
  const statutLectureValues = Livre.schema.path('statutLecture').enumValues;
  res.render('addBook', { 
    title: 'Ajouter un nouveau livre',
    categorieValues,
    statutLectureValues
  });});
  
router.post('/new', async function(req, res, next) {
  try {
    const newLivre = new Livre(req.body);
    await newLivre.save();
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

// 👀 Lecture : Liste paginée de tous les livres
router.get('/', async function(req, res, next) {
  try {
    const livres = await Livre.find();
    res.render('bookList', { title: 'Liste des livres', livres });
  } catch (error) {
    next(error);
  }
});

// 👀 Lecture : Vue détaillée d'un livre
router.get('/:id', async function(req, res, next) {
  try {
    const livre = await Livre.findById(req.params.id);
    res.render('bookDetail', { title: 'Détails du livre', livre });
  } catch (error) {
    next(error);
  }
});

// ✏️ Modification : Formulaire d'édition d'un livre existant
router.get('/:id/edit', async function(req, res, next) {
  try {
    const livre = await Livre.findById(req.params.id);
    res.render('editBook', { title: 'Modifier le livre', livre });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/edit', async function(req, res, next) {
  try {
    await Livre.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/books/' + req.params.id);
  } catch (error) {
    next(error);
  }
});

// 🗑️ Suppression : Possibilité de retirer un livre de la liste
router.post('/:id/delete', async function(req, res, next) {
  try {
    await Livre.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

module.exports = router;