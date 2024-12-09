
import {z} from 'zod'
// const telefonoRegEx = new RegExp(
//     /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
// );
// const nombreRegEx = new RegExp(
//     /^(A-Z|a-z)+$/
// );
//validaciones con Zod - constuir esquema

export const compraSchema = z.object({
    // nombre: z.string().min(2, "Minimo 10 caracteres").max(200, "Maximo 200 caracteres"),
    id: z.number(),
    id_articulo: z.number().int().positive().min(0),
    cantidad: z.number().int().positive().min(0),
    precio: z.number().positive().min(1),
    IVA: z.number().positive().min(0),
    subtotal: z.number().positive().min(0),
    total: z.number().positive().min(1),
    fechaCompra: z.string().min(0)
}).or(
    z.object({
        id_articulo: z.number().int().positive({message: 'Debe ser un número positivo entero'}),
        cantidad: z.number().int().positive({message: 'Debe ser un número positivo'}),
        precio: z.number().positive({message: 'Debe ser un número positivo'})
}).or(
    z.object({
        id: z.number().int().positive().min(0)
    })
)
)