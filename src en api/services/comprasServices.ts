import mysql from 'mysql2/promise';
import {AgregarCompras, compras} from '../typesCompras'
import { compraSchema } from '../schema/compra.schema';

const conexion = mysql.createPool({
    host:"127.0.0.1",
    user: "root",
    password: "contra123",
    database: "pw2024",
    multipleStatements: false
});

export const obtieneCompras = async () => {
    try {
        // console.log("Intentando conectar...");
        const [results] = await conexion.query('SELECT * FROM compras');
        // console.log("Consulta exitosa:", results);
        return results;
    } catch (err) {
        // console.error("Error en el try-catch:", err);
        return { error: "no se puede obtener el personalas"};
    }
};

export const agregarCompra = async (nuevo:AgregarCompras) => {
    try{
        const validacion = compraSchema.safeParse(nuevo);
        if(!validacion.success){
            return{error: validacion.error};
        }
        console.log('errores detectads')
        const [results] = await conexion.query('INSERT INTO compras (id_articulo, cantidad, precio, IVA, subtotal, total, fechaCompra) values(?,?,?,?,?,?,?)', [nuevo.id_articulo, nuevo.cantidad, nuevo.precio, nuevo.IVA, nuevo.subtotal, nuevo.total, nuevo.fechaCompra]);
        return results;
    }catch(err){
        return {error: 'No se pudo agregar la compra'}
    }
}

export const encuentraCompra = async (id:number) =>{
    try{
        const identificador = {id:id}
        const validacion = compraSchema.safeParse(identificador);
        if(!validacion.success){
            return {error: validacion.error}
        }
        const [results] = await conexion.query('SELECT * FROM compras WHERE id = ? LIMIT 1',id)
        return results;
    }catch(err){
        return{error: "no se encuentra esa compra"}
    }
}

export const borrarCompra = async(id:number) =>{
    try{
        const [ results] = await conexion.query('DELETE FROM compras WHERE id = ? ', [id]);
        return results;
    }catch(e){
        return{error:'no se puede borrar la compra'}
    }
}

export const modificarCompra = async (modificado:compras) => {
    try{
        const [results] = await conexion.query('UPDATE compras SET id_articulo = ?, cantidad=?,precio=? WHERE id=?',[modificado.id_articulo.valueOf(),modificado.cantidad.valueOf(),modificado.precio.valueOf(), modificado.id.valueOf()]);
        return results;
    }catch(err){
        return{error: 'no se puede modificar'}
    }
}
