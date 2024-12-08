import {z} from "zod";

const telefonoRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
const correoRegex = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
)
//Validaciones
export const clienteSchema = z.object({
    nombre: z.string().min(2,"Minimo 2 caracteres").max(200,"Maximo 200 caracteres"),
    direccion: z.string().min(2).max(300),
    // telefono: z.string().min(10).max(15),
    telefono: z.string().regex(telefonoRegex),
    correo: z.string().regex(correoRegex),
    //Investigue y hay ciudades en Noruega de 1 letra como la ciudad de: Å
    //y la ciudad con el nombre mas largo es: Taumatawhakatangihangakoauauotamateapokaiwhenuakitanatahu
    //con 85 letras
    ciudad: z.string().min(1,"Minimo 1 caracter").max(85,"Maximo 85 caracteres")
    
}).or(
    z.object({
     telefono: z.string().min(10).max(15)
    })
).or(
    z.object({
     correo: z.string().min(3).max(100)
    })
).or(
    z.object({
     id: z.number().int().positive().min(1).max(9999)
    })
)