// Controlador de Comentarios

const mongoose = require('mongoose');
const Comentario = mongoose.model('Comentario');

function postComentario(req, res, next) {
  let comentario = new Comentario(req.body);
  comentario.save().then(com => {
    res.status(200).send(com)
  }).catch(next)  
}

function getComentario(req, res, next){
  if (req.params.id){
    Comentario.findById(req.params.id)
    .then(com => {res.send(com)})
    .catch(next)
  } else{
    Comentario.find()
    .then(comentario => {res.send(comentario)})
    .catch(next)
  }
}

function putComentario(req, res, next){
	Comentario.findById(req.params.id)
  .then(comentario => {
    if(!comentario){
      return res.sendStatus(404)
    }
    let nuevaInfo = req.body;
    if (typeof nuevaInfo.nombre !== "undefined"){
      comentario.nombre = nuevaInfo.nombre;
    }
    if (typeof nuevaInfo.categoria !== 'undefined'){
      comentario.categoria = nuevaInfo.categoria
    }
    if (typeof nuevaInfo.fotos !== 'undefined'){
      comentario.fotos = nuevaInfo.fotos
    }
    if (typeof nuevaInfo.descripcion !== 'undefined'){
      comentario.descripcion = nuevaInfo.descripcion
    }
    if (typeof nuevaInfo.anunciante !== 'undefined'){
      comentario.anunciante = nuevaInfo.anunciante
    }
    if (typeof nuevaInfo.ubicacion !== 'undefined'){
      comentario.ubicacion = nuevaInfo.ubicacion
    }
    comentario.save()
    .then(updatedComment => {res.status(200).json(updatedComment.publicData())})
    .catch()
  })
  .catch(next)
}

function deleteComentario(req, res, next){
  Comentario.findOneAndDelete({_id:req.params.id})
  .then(r => {res.status(200).send("El comentario se ha eliminado...")})
  .catch(next)
}

function count(req,res,next) {
  var idComentario = req.params.id
  Comentario.aggregate([
    {'$match': { 'idComentario': idComentario}}, 
    {'$count': 'total'}
  ]).then(r => {
    res.status(200).send(r)
  })
  .catch(next)
}

//Exportamos las funciones definidas
module.exports = {
  getComentario,
  postComentario,
  putComentario,
  deleteComentario,
  count
}
