import { ref } from "vue"
import type { Registro, RegistroAgregar } from "../interfaces/registros-interface"
import registrosAPI from "../api/registrosAPI"

export const useRegistro=() => {
    const registro= ref<Registro[]>([])
    let mensaje= ref(0);
    const traeRegistro = async () =>{
        const respuesta = await registrosAPI.get<Registro[]>('/')
        registro.value = respuesta.data
    }
    const traeRegistroId = async(id:number) =>{
        const respuesta = await registrosAPI.get<Registro[]>('/'+id)
        registro.value=respuesta.data
    }
    const agregarRegistro = async (registro: RegistroAgregar) => {
        const respuesta = await registrosAPI.post('/',registro)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value=1
        }
    }
    return {
        registro,
        mensaje,
        traeRegistro,
        traeRegistroId,
        agregarRegistro,
    }
}