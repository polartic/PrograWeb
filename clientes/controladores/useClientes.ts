import { ref } from "vue"
import type { Cliente, ClienteAgregar } from "../interfaces/clientes-interface"
import clientesAPI from "../api/clientesAPI"

export const useCliente=() => {
    const cliente= ref<Cliente[]>([])
    let mensaje= ref(0);
    const traeCliente = async () =>{
        const respuesta = await clientesAPI.get<Cliente[]>('/')
        cliente.value = respuesta.data
    }
    const traeClienteId = async(id:number) =>{
        const respuesta = await clientesAPI.get<Cliente[]>('/'+id)
        cliente.value=respuesta.data
    }
    const agregarCliente = async (cliente:ClienteAgregar) => {
        const respuesta = await clientesAPI.post('/',cliente)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value=1
        }
    }

    const borrarCliente = async(cliente:Cliente) =>{
        const respuesta = await clientesAPI.delete('/',{data: {id:cliente.id}})
        if (respuesta.data.fieldCount==0) {
            mensaje.value=1
        }
    }

    const actualizarCliente = async(cliente:Cliente) => {
        const respuesta = await clientesAPI.put('/',cliente)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value=1
        }
    }
    return {
        cliente,
        mensaje,
        traeCliente,
        traeClienteId,
        agregarCliente,
        actualizarCliente,
        borrarCliente
    }
}