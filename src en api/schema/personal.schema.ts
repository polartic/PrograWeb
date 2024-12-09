
import {z} from 'zod'
const telefonoRegEx = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const nombreRegEx = new RegExp(
    /^(A-Z|a-z)+$/
);
//validaciones con Zod - constuir esquema

export const personaSchema = z.object({
    // nombre: z.string().min(2, "Minimo 10 caracteres").max(200, "Maximo 200 caracteres"),
    nombre: z.string().regex(nombreRegEx),
    direccion: z.string().min(2).max(300),
    // telefono:z.string().min(10).max(15),
    telefono:z.string().regex(telefonoRegEx),
    estatus:z.number().int().positive()
    // estatus:z.number().int().positive().min(1).max(2, "Los valores válidos son 1 o 2")
}).refine(data => data.direccion == "TEC DE CULIACAN",{//El único valor válido para 'direccion' es la indicada
    message:'La direccion debe ser del tec de culiacan',
    path: ['direccion']
}).refine(data => data.estatus <= 2, {
    message: 'Los valores correctos son 1(vigente) o 2(de baja)',
    path:['estatus']
}).or(
    z.object({
        telefono: z.string().min(10).max(15)})
).or(
    z.object({
        id: z.number().int().positive().min(1).max(9999)
    })
)