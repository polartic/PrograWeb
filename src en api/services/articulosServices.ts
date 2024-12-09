import mysql from 'mysql2/promise';
import {Articulo,ArticuloNuevo} from '../typesArticulos';
import { articuloSchema } from '../schema/articulos.schema';

const conexion = mysql.createPool({
    host:"127.0.0.1",
    user: "root",
    password: "contra123",
    database: "pw2024",
    multipleStatements: false
});

export const obtieneArticulos = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM articulos');
        return results;
    } catch (err) {
        return {error: "No se pueden obtener los articulos"};
    }
}

export const encuentraArticulo = async (id:number) =>{
    try {
        const identificador = {id: id};
        const validacion = articuloSchema.safeParse(identificador);
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('SELECT * FROM articulos WHERE id = ? LIMIT 1',id);
        return results;
    } catch (err) {
        return {error: "No se encontro un articulo con ese ID"}
    }
}


// export const encuentraPersonalTelefono = async (telefono:string)=>{
//     try {
//         const tel = {telefono: telefono};
//         const validacion = articuloSchema.safeParse(tel);
//         if (!validacion.success) {
//             return {error: validacion.error};
//         }
//         const [results] = await conexion.query(`SELECT * FROM personal WHERE telefono = ? AND estatus = 1`,telefono);
//         return results;
//     } catch (err) {
//         return {error: "No se encontro un personal con ese telefono"}
//     }
// }

export const agregarArticulo = async (nuevo:ArticuloNuevo)=>{
    try {
        const validacion = articuloSchema.safeParse(nuevo);
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('INSERT INTO articulos(descripcion,precio,cantidadA,caducidad) values (?,?,?,?)',[nuevo.descripcion,nuevo.precio,nuevo.cantidadA,nuevo.caducidad]);
        return results;
    } catch (err) {
        return {error: "No se pudo agregar el articulo"}
    }
};
export const modificarArticulo = async (modificado:Articulo)=>{
    try {
        // const validacion = personaSchema.safeParse(nuevo);
        // if (!validacion.success) {
        //     return {error: validacion.error};
        // }
        const [results] = await conexion.query('UPDATE articulos SET descripcion=?,precio=?,cantidadA=?,caducidad=? WHERE id=?',[modificado.descripcion,modificado.precio,modificado.cantidadA,modificado.caducidad,modificado.id]);
        return results;
    } catch (err) {
        return {error: "No se pudo modificar al articulo"}
    }
};

export const borrarArticulo = async (id:number)=>{
    try {
        const [results] = await conexion.query('DELETE FROM articulos WHERE id=?',[id]);
        return results;
    } catch (err) {
        return {error: "No se pudo eliminar el articulo"}
    }
};
