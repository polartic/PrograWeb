export interface Cliente {
    id:number,
    nombre: String,
    direccion:String,
    telefono:String,
    correo:string,
    ciudad:string
}
export type ClienteAgregar = Omit<Cliente,'id'>