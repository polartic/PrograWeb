export interface Articulo{
    id: number,
    descripcion: string,
    precio: number,
    cantidadA:number,
    caducidad:string
}

export type ArticuloAgregar = Omit<Articulo,'id'>