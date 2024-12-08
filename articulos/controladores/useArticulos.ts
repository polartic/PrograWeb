import { ref } from "vue"
import type { Articulo,ArticuloAgregar } from "../interfaces/articulos-interface"
import articulosAPI from "../api/articulosAPI"

export const useArticulo=() => {
    const articulo= ref<Articulo[]>([])
    let mensaje= ref(0);
    const traeArticulo = async () =>{
        const respuesta = await articulosAPI.get<Articulo[]>('/')
        articulo.value = respuesta.data
    }
    const traeArticuloId = async(id:number) =>{
        const respuesta = await articulosAPI.get<Articulo[]>('/'+id)
        articulo.value=respuesta.data
    }
    const agregarArticulo = async (articulo: ArticuloAgregar) => {
        const respuesta = await articulosAPI.post('/',articulo)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value=1
        }
    }

    const borrarArticulo = async(articulo: Articulo) =>{
        const respuesta = await articulosAPI.delete('/',{data: {id:articulo.id}})
        if (respuesta.data.fieldCount==0) {
            mensaje.value=1
        }
    }

    const actualizarArticulo = async(articulo:Articulo) => {
        const respuesta = await articulosAPI.put('/',articulo)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value=1
        }
    }
    return {
        articulo,
        mensaje,
        traeArticulo,
        traeArticuloId,
        agregarArticulo,
        actualizarArticulo,
        borrarArticulo
    }
}