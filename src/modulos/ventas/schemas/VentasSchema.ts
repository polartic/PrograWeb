import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ventasSchema = toTypedSchema(
    zod.object({
        id: zod.number({message: 'Requerido'}).int().positive({message: 'Debe ser un número positivo entero'}),
        id_articulo: zod.number().int().positive({message: 'Debe ser un número positivo entero'}),
        id_cliente: zod.number().int().positive({message: 'Debe ser un número positivo entero'}),
        cantidad: zod.number().int().positive({message: 'Debe ser un número positivo'}),
        precio: zod.number().positive({message: 'Debe ser un número positivo'}),
        IVA: zod.number({message: 'Requerido'}).positive({message: 'Debe ser un número positivo'}),
        subtotal: zod.number().positive({message: 'Debe ser un número positivo'}),
        total: zod.number().positive({message: 'Debe ser un número positivo'}),
        fechaVenta: zod.date()
    }).or(
        zod.object({
            id_articulo: zod.number().int().positive({message: 'Debe ser un número positivo entero'}),
            id_cliente: zod.number().int().positive({message: 'Debe ser un número positivo entero'}),
            cantidad: zod.number().int().positive({message: 'Debe ser un número positivo'}),
            precio: zod.number().positive({message: 'Debe ser un número positivo'})
    }).or(
        zod.object({
            id_articulo: zod.number().int().positive({message: 'Debe ser un número positivo entero'}),
            id_cliente: zod.number().int().positive({message: 'Debe ser un número positivo entero'}),
            cantidad: zod.number().int().positive({message: 'Debe ser un número positivo'}),
    })
)
))