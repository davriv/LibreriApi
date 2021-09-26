// Estructura del CRUD
const router = require('express').Router();
const {
  getLibro,
  postLibro,
  putLibro,
  deleteLibro,
  getByTitle,
  getMoreComments
} = require('../controllers/libros')

router.get('/', getLibro)
router.get('/MasComentados', getMoreComments)
router.get('/Titulo/:title', getByTitle)
router.get('/:id', getLibro)

router.post('/', postLibro)
router.put('/:id', putLibro)
router.delete('/:id', deleteLibro)

module.exports = router;