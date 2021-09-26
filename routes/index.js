const router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('Bienvenidos a su API de Libros');
});

//Anidación de las rutas por entidades
router.use('/autores', require('./autores'));
router.use('/libros', require('./libros'));
router.use('/usuarios', require('./usuarios'));
router.use('/comentarios', require('./comentarios'));

// exportamos nuestro router
module.exports = router;
