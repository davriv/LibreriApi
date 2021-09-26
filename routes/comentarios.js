// Estructura del CRUD
const router = require('express').Router();
const {
  getComentario,
  postComentario,
  putComentario,
  deleteComentario
} = require('../controllers/comentarios')

router.get('/', getComentario)
router.get('/:id', getComentario)
router.post('/', postComentario)
router.put('/:id', putComentario)
router.delete('/:id', deleteComentario)

module.exports = router;
