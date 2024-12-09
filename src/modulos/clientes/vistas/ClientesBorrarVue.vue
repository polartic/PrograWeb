<template>
    <div class="container mt-5" v-if="cliente[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar cliente</h4>
            </div>
            <div class="alert alert-warning" role="alert">
                ¿Estas seguro que quieres borrar a este cliente?
                <i class="fa fa-warning"</i>
            </div>

            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="cliente[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="cliente[0].nombre" disabled>
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control"v-model="cliente[0].direccion" disabled>
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control"v-model="cliente[0].telefono" disabled>
                </div>
                <div class="mb-3">
                    Correo
                    <input type="text" class="form-control"v-model="cliente[0].correo" disabled>
                </div>
                <div class="mb-3">
                    Ciudad
                    <input type="text" class="form-control"v-model="cliente[0].ciudad" disabled>
                </div>
                <div class="mb3">
                    <button class="btn btn-danger" @click="borrarCliente(cliente[0])">Borrar</button>
                </div>

            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCliente } from '../controladores/useClientes';
const {traeClienteId,borrarCliente,mensaje, cliente} = useCliente()
    let idCliente = 0
    //Para los parametros de la URL
    const route= useRoute()
    //Para moverme de URL
    const routeRedirect = useRouter()
    //Observador - Watch
    watch(
        () => mensaje.value, 
        newId =>{
            routeRedirect.push('/clientes')
        }
    )
    onMounted(async()=>{
        idCliente= Number(route.params.id)
        await traeClienteId(Number(idCliente))
    })
</script>

<style scoped>

</style>