"use strict";
import {check, validationResult} from 'express-validator';



export const validacion = [
    check("nameCliente").exists().notEmpty().isLength({min:5, max:40}).withMessage("El nombre del cliente no debe estar vacio, debe tener entre 5 y 40 caracteres"),
    check("emailCliente").exists().notEmpty().isEmail().withMessage("El email debe estar relleno"),
    check("tlfnoCliente").exists().notEmpty().isLength({min:9, max:9}).withMessage("El telefono debe estar relleno"),
    check("empresaCliente").exists().notEmpty().matches(/^[A-Z][a-zñA-ZÑ0-9\s]{4,49}$/).withMessage("La empresa debe estar rellena"),
    (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.status(400).json({
                errors: errors.array()
            })
        } else {
            next();
        }
    }
];

