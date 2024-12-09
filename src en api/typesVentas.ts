export interface ventas{
    id:number,
    id_articulo:number,
    id_cliente:number,
    cantidad:number,
    precio:number,
    IVA:number,
    subtotal:number,
    total:number,
    fechaVenta:string
}

export type AgregarVentas = Omit<ventas, 'id'>