/** Clase que representa un Libro */
const mongoose = require('mongoose');
const LibroSchema = new mongoose.Schema({
    //Recibe el esquema con todos los atributos
    title: { 
        type: String, 
        required: [true, "El Título no puede ir vacío"], 
        index: true},
    idAuthors: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Libros',
        required: [true, "Ingrese por lo menos un Id de un Autor"]},
    isbn: { 
        type: String, 
        required: [true, "Ingrese el número identificador ISBN"]},
    isbn13: String,
    publication_year: String,
    language: String,
    publisher: String,
    pages: Number,
    price: Number,
    image_url: String,
    small_image_url: String,
}, { collection: "Libros", timestamps: true });

//Para que los servicios no tengan acceso a todos los atributos
LibroSchema.methods.publicData = () => {
    //Regresará lo siguientes atributos
    return {
        id: this.id,
        title: this.title,
        idAuthors: this.idAuthors,
        isbn: this.isbn,
        isbn13: this.isbn13,
        publication_year: this.publication_year,
        language: this.language,
        publisher: this.publisher,
        pages: this.pages,
        price: this.price,
        image_url: this.image_url,
        small_image_url: this.small_image_url
    };
};

//Asociamos el Modelo Libro con el esquema Libro
mongoose.model("Libro", LibroSchema);