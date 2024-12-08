import { toTypedSchema } from "@vee-validate/zod";
import zod from 'zod';

export const PersonalSchema = toTypedSchema(
    zod.object({
        id: zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
        nombre: zod.string().min(1,{message: 'Nombre Requerido'}).max(200,{message:'Maximo 200 caracteres'}),
        direccion: zod.string().min(1,{message: 'Direccion Requerida'}).max(300,{message:'Maximo 300 caracteres'}),
        telefono: zod.string().min(10,{message: 'Minimo 10 numeros'}).max(15,{message:'Maximo 15 numeros'}),
        estatus: zod.string({message: 'Estatus Requerido'})
    }).or(
        zod.object({
            nombre: zod.string().min(1,{message: 'Nombre Requerido'}).max(200,{message:'Maximo 200 caracteres'}),
            direccion: zod.string().min(1,{message: 'Direccion Requerida'}).max(300,{message:'Maximo 300 caracteres'}),
            telefono: zod.string().min(10,{message: 'Minimo 10 numeros'}).max(15,{message:'Maximo 15 numeros'}),
            estatus: zod.string({message: 'Estatus Requerido'})
        })
    )
)