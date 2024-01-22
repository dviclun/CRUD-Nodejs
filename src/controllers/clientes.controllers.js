
import conexion from "../mysql_connector.js"; //Conexion con la base de datos


export const getClientes = async (req, res) => {
    try {
        const [results] = await conexion.query("SELECT * FROM clientes");
        console.log(results);
        res.status(200).json(results);
    } catch (error) {
       res.status(500).json({message: "Error en el servidor"});
    }
}

export const getCliente = async (req, res) => {
    try {
        const [results] = await conexion.query("SELECT * FROM clientes WHERE id = ?", [req.params.id]);
        console.log(results);
        res.status(200).json(results[0]); 
    } catch (error) {
       res.status(500).json({message: "Error en el servidor"});
    }   
}

export const delCliente = async (req, res) => { 
    try {
        const [results] = await conexion.query("DELETE FROM clientes WHERE id = ?", [req.params.id]);
        console.log(results);
        if(results.affectedRows==0){
            return res.status(400).json({message:"No existe"});
        } else {
            res.status(200).json({message:"Cliente borrado"});
        }
    } catch (error) {
        res.status(500).json({message: "Error en el servidor"});
    }
    
}

export const addCliente = async(req,res)=> {
    try {
        console.log(req.body);
        const [results] = await conexion.query("INSERT INTO clientes VALUES(NULL, ?, ?, ?, ?)", [req.body.nameCliente, req.body.emailCliente, req.body.tlfnoCliente, req.body.empresaCliente]);
        console.log(results);
        res.status(201).json({id:results.insertId});
    } catch (error) {
        res.status(500).json({message: "Error en el servidor"});
    }
    
}

//Put y Patch funcionan de la misma manera, lo que cambia es la sentencia SQL

export const updateClientePut = async(req,res)=> {
    try {
        const {nameCliente, emailCliente, tlfnoCliente, empresaCliente} = req.body;
        const {id} = req.params;
        const [results] = await conexion.query("UPDATE clientes SET nameCliente = ?, emailCliente = ?, tlfnoCliente = ?, empresaCliente = ? WHERE id = ?", [nameCliente, emailCliente, tlfnoCliente, empresaCliente, id]);
        if(results.affectedRows==0){
            return res.status(400).json({message:"No existe"});
        } else {
            res.status(200).json({message:"Cliente actualizado"});
        }
    } catch (error) {
        res.status(500).json({message: "Error en el servidor"});
    }  
}

export const updateClientePatch = async (req, res)=> {
    try {
        const {nameCliente, emailCliente, tlfnoCliente, empresaCliente} = req.body;
        const {id} = req.params;
        const [results] = await conexion.query("UPDATE clientes SET nameCliente = IFNULL(?,nameCliente), emailCliente = IFNULL(?,emailCliente), tlfnoCliente = IFNULL(?,tlfnoCliente), empresaCliente = IFNULL(?,empresaCliente) WHERE id = ?", [nameCliente, emailCliente, tlfnoCliente, empresaCliente, id]);
        if(results.affectedRows==0){
            return res.status(400).json({message:"No existe"});
        } else {
            res.status(200).json({message:"Cliente actualizado"});
        }   
    } catch (error) {
        res.status(500).json({message: "Error en el servidor"});
    }
    
}