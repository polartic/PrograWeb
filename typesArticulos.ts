export interface Articulo {
    id:number,
    descripcion: String,
    precio:number,
    cantidadA:number,
    caducidad:string
}
export type ArticuloNuevo = Omit<Articulo,'id'>