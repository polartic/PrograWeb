import { toTypedSchema } from "@vee-validate/zod";
import zod from 'zod';

export const ArticuloSchema = toTypedSchema(
    zod.object({
        id: zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
        descripcion: zod.string().min(5,{message: 'Minimo 5 caracteres'}).max(200,{message:'Maximo 200 caracteres'}),
        precio: zod.number({ message: 'Debe ser un número' }).min(1,{message:'Minimo 1 peso'}).max(9999999,{message:'Maximo 9,999,999 pesos'})
        .refine(value => typeof value === 'number', { message: 'El valor debe ser un número' }),
        cantidadA: zod.number({ message: 'Debe ser un número' }).int({ message: 'Debe ser un número entero' }).min(0,{message:'No Negativos'}).max(999,{message:'Maximo 999 articulos en almacen'})
        .refine(value => typeof value === 'number', { message: 'El valor debe ser un número' }),
        caducidad: zod.string().min(8,{message: 'Minimo un dia, mes y año'}).max(10,{message: 'Minimo un dia, mes y año'})
    })
    .or(
        zod.object({
            descripcion: zod.string().min(5,{message: 'Minimo 5 caracteres'}).max(200,{message:'Maximo 200 caracteres'}),
            precio: zod.number().int().min(1,{message:'Minimo 1 peso'}).max(9999999,{message:'Maximo 9,999,999 pesos'}),
            cantidadA: zod.number().int().min(0,{message:'No Negativos'}).max(999,{message:'Maximo 999 articulos en almacen'}),
            caducidad: zod.string().min(8,{message: 'Minimo un dia, mes y año'}).max(10,{message: 'Minimo un dia, mes y año'})
        })
    )
)