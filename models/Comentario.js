//Modelo de Comentario

const mongoose = require("mongoose");

const ComentarioSchema = new mongoose.Schema({
  nombre: {type: String, required: true},
  email: {type: String, unique: true, required: [true, "Es requerido el email"], match: [/\S+@\S+.\S+/, "email invalido"], index: true},
  libro_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Libros'},
  texto: {type: String, required: true},
  fecha : Date,
}, {collection: "Comentarios", timestamps: true})

ComentarioSchema.methods.publicData = () => {  
  return{
    id: this.id,                 //Id -String
    nombre: this.nombre,         //Nombre de la persona que hace el comentario -String
    email: this.email,           //Su email -String
    libro_id: this.libro_id,     //Referencia al libro
    texto: this.texto,           //El comentario -String
    fecha: this.fecha
  }
}  

mongoose.model("Comentario", ComentarioSchema);
