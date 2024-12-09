export interface compras{
    id:number,
    id_articulo:number,
    cantidad:number,
    precio:number,
    IVA:number,
    subtotal:number,
    total:number,
    fechaCompra:string
}
export type AgregarCompras = Omit<compras, 'id'>
