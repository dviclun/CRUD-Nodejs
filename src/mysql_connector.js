"use strict";

//Importar el paquete de mysql

import {createPool} from "mysql2/promise"; //para trabajar con promesas
import {DB_HOST , DB_DATABASE , DB_PORT , DB_PASSWORD , DB_USER} from "./config.js";

const conexion = createPool({//Establecer caracteristicas de la conexion
    "host": DB_HOST,
    "user": DB_USER,
    "password": DB_PASSWORD,
    "database":DB_DATABASE,
    "port":DB_PORT
});

export default conexion;



