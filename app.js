const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**CONFIGURACIÓN DE MONGOOSE */
const mongoose = require('mongoose');//Importamos
//Nos conectamos
mongoose.connect(
  process.env.MONGO_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
//Activamos opción de debuggeo para errores
mongoose.set("debug", true);
/**CONFIGURACIÓN DE MONGOOSE */

//Importamos los esquemas que utilizaremos
require('./models/Autor');
require('./models/Comentario');
require('./models/Libro');
require('./models/Usuario');
require('./config/passport');

//Configurando las rutas
app.use('/v1', require('./routes'));
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`)
})
