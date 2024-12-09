import {z} from "zod";

const movimientoRegex = new RegExp(
    /^(Entrada|Salida)$/
)
const fechaRegex = new RegExp(
    /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
);
const horaRegex = new RegExp(
    /^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/
);
//Validaciones
export const registroSchema = z.object({
    fecha: z.string().regex(fechaRegex),
    hora: z.string().regex(horaRegex),
    movimiento: z.string().regex(movimientoRegex).nonempty("Movimiento es obligatorio") 
    }
).or(
    z.object({
     id: z.number().int().positive().min(1).max(9999)
    })
)