// Estructura del CRUD
const router = require('express').Router();
const {
  getAutor,
  postAutor,
  putAutor,
  deleteAutor
} = require('../controllers/autores')

router.get('/', getAutor);
router.get('/:id', getAutor);
router.post('/', postAutor);
router.put('/:id', putAutor);
router.delete('/:id', deleteAutor);

module.exports = router;