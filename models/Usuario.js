/** Clase que representa a un usuario (Admin o Cliente) de la plataforma*/
const crypto = require("crypto");
const jwt = require('jsonwebtoken'); 
const secret = require('../config').secret; 
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const UsuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Username no puede estar vacío"],
      match: [/^[a-zA-Z0-9]+$/, "es inválido"],
      index: true,
    },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email no puede estar vacío"],
      match: [/\S+@\S+\.\S+/, "es inválido"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password no puede ir vacío"],
      index: true,
    },
    tipo: { type: String, enum: ["admin", "cliente"] },
    hash: String,
    salt: String,
  },
  { collection: "Usuarios", timestamps: true }
);

UsuarioSchema.plugin(uniqueValidator, { 
  message: "Ya existe" 
});

UsuarioSchema.methods.crearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex"); // generando una "sal" random para cada usuario
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"); // generando un hash utilizando la salt
};

UsuarioSchema.methods.validarPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UsuarioSchema.methods.generarJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60); // 60 días antes de expirar

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UsuarioSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generarJWT()
  };
};

UsuarioSchema.methods.publicData = function(){
  return {
    id: this.id,
    username: this.username,
    email: this.email,
    nombre: this.nombre,
    apellido: this.apellido,
  };
}
mongoose.model("Usuario", UsuarioSchema);
