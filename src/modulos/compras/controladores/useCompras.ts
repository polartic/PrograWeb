import { ref } from "vue"
import type { compras, AgregarCompras } from '../interfaces/Compra-interface'
import comprasApi from "../api/comprasAPI"

export const usecompras = () => {
    const compras = ref<compras[]>([])
    let mensaje = ref(0);

    const traeCompras = async () => {
        const respuesta = await comprasApi.get<compras[]>('/');
        compras.value = respuesta.data
    }

    const traecomprasId = async (id:number) =>{
        const respuesta = await comprasApi.get<compras[]>('/'+id)
        compras.value = respuesta.data
    }

    const agregarcompras = async (compras:AgregarCompras) => {
        const respuesta = await comprasApi.post('/', compras)
        console.log(respuesta.data)
        if(respuesta.data.affectedRows >= 1){
            mensaje.value = 1;
        }
    }

    const eliminarcompras = async (compra: compras) => {
        try {
            const respuesta = await comprasApi.delete('/', { data: { id: compra.id } });
            if (respuesta.data.fieldCount == 0) {
                mensaje.value = 1;
            }
        } catch (error) {
            console.error('Error al eliminar la compra:', error);
        }
    };

    const actualizarcompras = async (compras:compras) =>{
        const respuesta = await comprasApi.put('/',compras)
        if(respuesta.data.affectedRows >= 1){
            mensaje.value = 1;
        }
    }

    return{
        compras,
        mensaje,
        traeCompras,
        agregarcompras,
        traecomprasId,
        actualizarcompras,
        eliminarcompras
    }
}