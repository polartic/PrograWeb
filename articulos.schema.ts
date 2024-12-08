import {z} from "zod";

const caducidadRegex = new RegExp(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
)
//Validaciones
export const articuloSchema = z.object({
    descripcion: z.string().min(5,"Minimo 5 caracteres").max(200,"Maximo 200 caracteres"),
    precio: z.number().int().min(1,"Minimo 1 peso").max(9999999,"Maximo 9,999,999 pesos"),
    // telefono: z.string().min(10).max(15),
    cantidadA: z.number().int().min(0,"No Negativos").max(999,"Maximo 999 articulos en almacen"),
    caducidad: z.string().regex(caducidadRegex).min(8,"es dia/mes/año").max(10,"es dia/mes/año")
    
}).or(
    z.object({
     id: z.number().int().positive().min(1).max(9999)
        })
    )