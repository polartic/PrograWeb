import mysql from 'mysql2/promise';
import {Cliente,ClienteNuevo} from '../typesClientes';
import { clienteSchema } from '../schema/clientes.schema';

const conexion = mysql.createPool({
    host: "localhost",
    user: "INGRESA TU USUARIO",
    password: "INGRESA TU CONTRASENIA",
    database: "INGRESA EL NOMBRE DE TU BASE DE DATOS",
    port: 3306, //(Ingresa el puerto en el que la tienes)
    multipleStatements: false
});

export const obtieneClientes = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM clientes');
        return results;
    } catch (err) {
        return {error: "No se pueden obtenern los clientes"};
    }
}

export const encuentraCliente = async (id:number) =>{
    try {
        const identificador = {id: id};
        const validacion = clienteSchema.safeParse(identificador);
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('SELECT * FROM clientes WHERE id = ? LIMIT 1',id);
        return results;
    } catch (err) {
        return {error: "No se encontro un cliente con ese ID"}
    }

}

// export const encuentraClienteTelefono = async (telefono:string)=>{
//     try {
//         const tel = {telefono: telefono};
//         const validacion = clienteSchema.safeParse(tel);
//         if (!validacion.success) {
//             return {error: validacion.error};
//         }
//         const [results] = await conexion.query(`SELECT * FROM personal WHERE telefono = ? AND estatus = 1`,telefono);
//         return results;
//     } catch (err) {
//         return {error: "No se encontro un personal con ese telefono"}
//     }
// }

export const agregarCliente = async (nuevo:ClienteNuevo)=>{
    try {
        const validacion = clienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('INSERT INTO clientes(nombre,direccion,telefono,correo,ciudad) values (?,?,?,?,?)',[nuevo.nombre,nuevo.direccion,nuevo.telefono,nuevo.correo,nuevo.ciudad]);
        return results;
    } catch (err) {
        return {error: "No se pudo agregar al cliente"}
    }
};
export const modificarCliente = async (modificado:Cliente)=>{
    try {
        // const validacion = personaSchema.safeParse(nuevo);
        // if (!validacion.success) {
        //     return {error: validacion.error};
        // }
        const [results] = await conexion.query('UPDATE clientes SET nombre=?,direccion=?,telefono=?,correo=?,ciudad=? WHERE id=?',[modificado.nombre,modificado.direccion,modificado.telefono,modificado.correo,modificado.ciudad,modificado.id]);
        return results;
    } catch (err) {
        return {error: "No se pudo modificar al cliente"}
    }
};

export const borrarCliente = async (id:number)=>{
    try {
        const [results] = await conexion.query('DELETE FROM clientes WHERE id=?',[id]);
        return results;
    } catch (err) {
        return {error: "No se pudo eliminar al cliente"}
    }
};