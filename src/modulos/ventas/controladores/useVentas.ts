import { ref } from "vue"
import type { ventas, AgregarVentas } from '../interfaces/Venta-interface'
import ventasApi from "../api/ventasAPI"

export const useVentas = () => {
    const ventas = ref<ventas[]>([])
    let mensaje = ref(0);

    const traeVentas = async () => {
        const respuesta = await ventasApi.get<ventas[]>('/');
        ventas.value = respuesta.data
    }

    const traeVentasId = async (id:number) =>{
        const respuesta = await ventasApi.get<ventas[]>('/'+id)
        ventas.value = respuesta.data
    }

    const agregarVenta = async (ventas:AgregarVentas) => {
        const respuesta = await ventasApi.post('/', ventas)
        console.log(respuesta.data)
        if(respuesta.data.affectedRows >= 1){
            mensaje.value = 1;
        }
    }

    const eliminarVenta = async (ventas: ventas) => {
        try {
            const respuesta = await ventasApi.delete('/', { data: { id: ventas.id } });
            if (respuesta.data.fieldCount == 0) {
                mensaje.value = 1;
            }
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
        }
    };

    const actualizarVenta = async (ventas:ventas) =>{
        const respuesta = await ventasApi.put('/',ventas)
        if(respuesta.data.affectedRows >= 1){
            mensaje.value = 1;
        }
    }

    return{
        ventas,
        mensaje,
        traeVentas,
        agregarVenta,
        traeVentasId,
        actualizarVenta,
        eliminarVenta
    }
}