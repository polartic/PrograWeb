//las promesas van, busacan un resultado, esperan, y retornan el resultado
import mysql from 'mysql2/promise';
import {Personal, PersonalNuevo} from '../typesPersonal'
import { personaSchema } from '../schema/personal.schema';

const conexion = mysql.createPool({
    host:"127.0.0.1",
    user: "root",
    password: "contra123",
    database: "pw2024",
    multipleStatements: false
});

export const obtienePersonal = async () => {
    try {
        // console.log("Intentando conectar...");
        const [results] = await conexion.query('SELECT * FROM personal');
        // console.log("Consulta exitosa:", results);
        return results;
    } catch (err) {
        // console.error("Error en el try-catch:", err);
        return { error: "no se puede obtener el personalas"};
    }
};

export const encuentraPersonal = async (id:number) =>{
    try{
        const identificador = {id:id}
        const validacion = personaSchema.safeParse(identificador);
        if(!validacion.success){
            return {error: validacion.error}
        }
        const [results] = await conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1',id)
        return results;
    }catch(err){
        return{error: "no se encuentra ese personal"}
    }
}

export const encuentraPersonalTelefono = async (telefono:string) =>{
    try{
        //forma incorrecta de hacer las consultas -- riesgo de inyección sql
        // const consulta = `SELECT * FROM personal WHERE telefono=${telefono} AND estatus = 1`;
        // const [results] = await conexion.query(consulta);
        const tel = {telefono:telefono}
        const validacion = personaSchema.safeParse(tel);
        if(!validacion.success){
            return {error:validacion.error}
        }
        const[results] = await conexion.query('SELECT * FROM personal WHERE telefono = ? AND estatus = 1',telefono)
        return results;
    }catch(err) {return{error: 'no se puede encontrar al personal con ese numero de telefono'}}
}

export const agregarPersona = async (nuevo:PersonalNuevo) => {
    try{
        const validacion = personaSchema.safeParse(nuevo);
        if(!validacion.success){
            return{error: validacion.error};
        }
        const [results] = await conexion.query('INSERT INTO personal (nombre, direccion, telefono, estatus) values(?,?,?,?)', [nuevo.nombre, nuevo.direccion,nuevo.telefono,nuevo.estatus]);
        return results;
    }catch(err){
        return {error: 'No se pudo agregar al personal'}
    }
}

export const modificarPersonal = async (modificado:Personal) => {
    try{
        const [results] = await conexion.query('UPDATE personal SET nombre = ?, direccion=?,telefono=?, estatus=? WHERE id=?',[modificado.nombre,modificado.direccion,modificado.telefono,modificado.estatus,modificado.id]);
        return results;
    }catch(err){
        return{error: 'no se puede modificar'}
    }
}

export const borrarPersonal = async(id:number) =>{
    try{
        const [ results] = await conexion.query('DELETE FROM personal WHERE id=?', [id]);
        return results;
    }catch(e){
        return{error:'no se puede borrar el personal'}
    }
}
