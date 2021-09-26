
const mongoose = require('mongoose');
  const AutorSchema = new mongoose.Schema({
    //Recibe el esquema con todos los atributos
    nombre: String,
    idBooks: String,
  }, {collection:"Autores", timestamps: true});

  //Para que los servicios no tengan acceso a todos los atributos
  AutorSchema.methods.publicData = () =>{
    //Regresará lo siguientes atributos
    return {
      id: this.id,
      nombre: this.nombre,
      idBooks: this.idBooks,
    };
  };

  //Asociamos el Modelo Autor con el esquema Autor
  mongoose.model("Autor", AutorSchema);