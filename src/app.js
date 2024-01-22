"use strict";

//Instalar el paquete express
/**
 * El paquete Express es el framework de back-end mas popular de Node
 * Proporciona un conjunto de herramientas para aplicaciones web, peticiones y respuestas http,
 * enrutamiento y middleware para construir y desplegar aplicaciones a gran escala 
 */

//Importar Express

import express from "express";

import routerCliente from "./routes/clientes.routes.js";

import routerLogin from "./routes/login.routes.js";

import {PORT} from './config.js';

import cors from "cors";
// import "./config.js";

const app = express(); //Creado objeto de express

//Habilitar las cors
app.use(cors());

//middleware
app.use(express.json());
app.use(routerCliente);
app.use(routerLogin);

//Middleware para controlar si no existe la ruta
app.use((req,res)=> {
    res.status(400).json({message: "Endpoint no encontrado"});
})

//Configurar el puerto
// const PORT = 3000;

//Servidor a la escucha por el puerto 3000
app.listen(PORT, ()=>{
    console.log("Escuchando solicitudes");
});

