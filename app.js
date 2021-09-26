const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**CONFIGURACIÓN DE MONGOOSE */
const mongoose = require('mongoose');//Importamos
//Nos conectamos
mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster0.0l8wy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`);
//Activamos opción de debuggeo para errores
mongoose.set("debug", true);
/**CONFIGURACIÓN DE MONGOOSE */

//Importamos los esquemas que utilizaremos
require('./models/Autor');
require('./models/Comentario');
require('./models/Libro');
require('./models/Usuario');
require('./config/passport')

//Configurando las rutas
app.use('/v1', require('./routes'));
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
