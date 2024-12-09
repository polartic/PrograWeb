import { toTypedSchema } from "@vee-validate/zod";
import zod from 'zod';

// Expresiones regulares
const movimientoRegex = new RegExp(/^(Entrada|Salida)$/);
const fechaRegex = new RegExp(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
const horaRegex = new RegExp(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/);

// Esquema con .or() que permite dos estructuras diferentes
export const registroSchema = toTypedSchema(
    zod.object({
        id: zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
        fecha: zod.string().regex(fechaRegex, { message: 'Fecha inválida, formato esperado YYYY-MM-DD' }),
        hora: zod.string().regex(horaRegex, { message: 'Hora inválida, formato esperado HH:MM:SS' }),
        movimiento: zod.string().regex(movimientoRegex, { message: 'Movimiento debe ser "Entrada" o "Salida"' }).min(1,{ message: 'Movimiento es obligatorio' })
    }).or( // Permite que se pase un objeto sin los campos adicionales
        zod.object({
            fecha: zod.string().regex(fechaRegex, { message: 'Fecha inválida, formato esperado YYYY-MM-DD' }),
            hora: zod.string().regex(horaRegex, { message: 'Hora inválida, formato esperado HH:MM:SS' }),
            movimiento: zod.string().regex(movimientoRegex, { message: 'Movimiento debe ser "Entrada" o "Salida"' }).min(1,{ message: 'Movimiento es obligatorio' })
        })
    )
);