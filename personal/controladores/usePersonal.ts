import { ref } from "vue"
import type { Personal, PersonalAgregar } from "../interfaces/personal-interface"
import personalAPI from "../api/personalAPI"

export const usePersonal=() => {
    const personal= ref<Personal[]>([])
    let mensaje= ref(0);
    const traePersonal = async () =>{
        const respuesta = await personalAPI.get<Personal[]>('/')
        personal.value = respuesta.data
    }
    const traePersonalId = async(id:number) =>{
        const respuesta = await personalAPI.get<Personal[]>('/'+id)
        personal.value=respuesta.data
    }
    const agregarPersonal = async (personal: PersonalAgregar) => {
        const respuesta = await personalAPI.post('/',personal)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value=1
        }
    }

    const borrarPersonal = async(personal: Personal) =>{
        const respuesta = await personalAPI.delete('/',{data: {id:personal.id}})
        if (respuesta.data.fieldCount==0) {
            mensaje.value=1
        }
    }

    const actualizarPersonal = async(personal:Personal) => {
        const respuesta = await personalAPI.put('/',personal)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value=1
        }
    }
    return {
        personal,
        mensaje,
        traePersonal,
        traePersonalId,
        agregarPersonal,
        actualizarPersonal,
        borrarPersonal
    }
}