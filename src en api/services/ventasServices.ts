import mysql from 'mysql2/promise';
import {AgregarVentas, ventas} from '../typesVentas'
import { ventaSchema } from '../schema/venta.schema';

const conexion = mysql.createPool({
    host:"127.0.0.1",
    user: "root",
    password: "contra123",
    database: "pw2024",
    multipleStatements: false
});

export const obtieneVentas = async () => {
    try {
        // console.log("Intentando conectar...");
        const [results] = await conexion.query('SELECT * FROM ventas');
        // console.log("Consulta exitosa:", results);
        return results;
    } catch (err) {
        // console.error("Error en el try-catch:", err);
        return { error: "no se puede obtener las ventas"};
    }
};

export const agregarVenta = async (nuevo:AgregarVentas) => {
    try{
        const validacion = ventaSchema.safeParse(nuevo);
        if(!validacion.success){
            return{error: validacion.error};
        }
        const [results] = await conexion.query('INSERT INTO ventas (id_articulo, id_cliente, cantidad, precio, IVA, subtotal, total, fechaVenta) values(?,?,?,?,?,?,?,?)', [nuevo.id_articulo, nuevo.id_cliente, nuevo.cantidad, nuevo.precio, nuevo.IVA, nuevo.subtotal, nuevo.total, nuevo.fechaVenta]);
        return results;
    }catch(err){
        return {error: 'No se pudo agregar la venta'}
    }
}

export const encuentraVenta = async (id:number) =>{
    try{
        const identificador = {id:id}
        const validacion = ventaSchema.safeParse(identificador);
        if(!validacion.success){
            return {error: validacion.error}
        }
        const [results] = await conexion.query('SELECT * FROM ventas WHERE id = ? LIMIT 1',id)
        return results;
    }catch(err){
        return{error: "no se encuentra esa venta"}
    }
}

export const encuentraValorArticulo = async (id:number) =>{
    try{
        const identificador = {id:id}
        const validacion = ventaSchema.safeParse(identificador);
        if(!validacion.success){
            return {error: validacion.error}
        }
        const [results] = await conexion.query('SELECT precio FROM ventas WHERE id = ? LIMIT 1',id)
        return results;
    }catch(err){
        return{error: "no se encuentra esa venta"}
    }
}

export const borrarVenta = async(id:number) =>{
    try{
        const [ results] = await conexion.query('DELETE FROM ventas WHERE id = ? ', [id]);
        return results;
    }catch(e){
        return{error:'no se puede borrar la centa'}
    }
}

export const modificarVenta = async (modificado:ventas) => {
    try{
        const [results] = await conexion.query('UPDATE ventas SET id_articulo = ?, id_cliente = ?, cantidad=?,precio=? WHERE id=?',[modificado.id_articulo.valueOf(),modificado.id_cliente.valueOf(),modificado.cantidad.valueOf(),modificado.precio.valueOf(), modificado.id.valueOf()]);
        return results;
    }catch(err){
        return{error: 'no se puede modificar'}
    }
}
