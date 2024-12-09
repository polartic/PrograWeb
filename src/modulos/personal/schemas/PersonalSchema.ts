import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const PersonalSchema = toTypedSchema(
    zod.object({
        id: zod.number({message: 'Requerido'}).int().positive({message: 'Debe ser un número positivo entero'}),
        nombre: zod.string().min(1,{message: 'Nombre Requerido'}).max(200,{message: 'Máximo 200 caracteres'}),
        direccion: zod.string().min(1,{message: 'Direccion Requerida'}).max(300,{message: 'Máximo 300 caracteres'}),
        telefono: zod.string().min(1,{message: 'Telefono Requerido'}).max(15,{message: 'Máximo 15 caracteres'}),
        estatus:zod.string({message: 'Estatus requerido'})
    }).or(
        zod.object({
            nombre: zod.string().min(1,{message: 'Nombre Requerido'}).max(200,{message: 'Máximo 200 caracteres'}),
            direccion: zod.string().min(1,{message: 'Direccion Requerida'}).max(300,{message: 'Máximo 300 caracteres'}),
            telefono: zod.string().min(1,{message: 'Telefono Requerido'}).max(15,{message: 'Máximo 15 caracteres'}),
            estatus:zod.string({message: 'Estatus requerido'})
    })
    )
)