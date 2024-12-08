import mysql from 'mysql2/promise';
import {RegistroNuevo} from '../typesRegistros';
import { registroSchema } from '../schema/registro.schema';

const conexion = mysql.createPool({
    host: "localhost",
    user: "INGRESA TU USUARIO",
    password: "INGRESA TU CONTRASENIA",
    database: "INGRESA EL NOMBRE DE TU BASE DE DATOS",
    port: 3306, //(Ingresa el puerto en el que la tienes)
    multipleStatements: false
});

export const obtieneRegistro = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM registro');
        return results;
    } catch (err) {
        return {error: "No se pudieron obtener registros"};
    }
}

export const encuentraRegistro = async (id:number) =>{
    try {
        const identificador = {id: id};
        const validacion = registroSchema.safeParse(identificador);
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('SELECT * FROM registro WHERE id_personal = ? LIMIT 1',id);
        return results;
    } catch (err) {
        return {error: "No se encontraron registros con ese ID"}
    }

}

export const agregarRegistro = async (nuevo:RegistroNuevo)=>{
    try {
        const validacion = registroSchema.safeParse(nuevo);
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('INSERT INTO registro(id_personal,fecha,hora,movimiento) values (?,?,?,?)',[nuevo.id_personal,nuevo.fecha,nuevo.hora,nuevo.movimiento]);
        return results;
    } catch (err) {
        return {error: "No se pudo agregar el registro"}
    }
};
