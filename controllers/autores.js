// const Autor = require("../models/Autor");
// const Libro = require("../models/Libro");

const mongoose = require('mongoose');
const Autor = mongoose.model('Autor');

// router.get('/', getAutor)
function getAutor(req, res, next) {
  //Obtener-Leer
  if (req.params.id) {//Si solo pasan el ID
    Autor.findById(req.params.id)
      .then(uno => { res.send(uno) })
      .catch(next)
  } else { //Se pide toda la lista
    Autor.find()
      .then(todos => { res.send(todos) })
      .catch(next)
  }
}

// router.post('/', postAutor)
function postAutor(req, res, next) {
  var autor = new Autor(req.body)
	autor.save().then(autor => {
		res.status(200).send(autor)
	}).catch(next)
}

// router.put('/:id', putAutor)
function putAutor(req, res, next) {
  //Modificar-Actualizar
  Autor.findById(req.params.id)
		.then(autor => {
			if (!autor) { return res.sendStatus(404); }
			let nuevaInfo = req.body
			if (typeof nuevaInfo.nombre !== 'undefined')
				autor.nombre = nuevaInfo.nombre

			autor.save().then(updated => {
				res.status(201).json(updated.publicData())
			}).catch(next)
		}).catch(next)
}

// router.delete('/:id', deleteAutor)
function deleteAutor(req, res, next) {
  //Borrar
  Autor.findOneAndDelete({_id:req.params.id})
  .then(r => {res.status(200).send("El autor se ha eliminado...")})
  .catch(next)
}

//Exportamos las funciones definidas
module.exports = {
  getAutor,
  postAutor,
  putAutor,
  deleteAutor,
};
