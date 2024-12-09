<template>
    <div class="container mt-5" v-if="cliente[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar cliente</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos editados con exito
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="cliente[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="cliente[0].nombre">
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control"v-model="cliente[0].direccion">
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control"v-model="cliente[0].telefono">
                </div>
                <div class="mb-3">
                    Correo
                    <input type="text" class="form-control"v-model="cliente[0].correo">
                </div>
                <div class="mb-3">
                    Ciudad
                    <input type="text" class="form-control"v-model="cliente[0].ciudad">
                </div>
                <div class="mb3">
                    <button class="btn btn-primary" @click="actualizarCliente(cliente[0])">Editar</button>
                </div>

            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCliente } from '../controladores/useClientes';
const {traeClienteId, actualizarCliente,mensaje, cliente} = useCliente()
    let idCliente = 0
    const route= useRoute()
    onMounted(async()=>{
        idCliente= Number(route.params.id)
        await traeClienteId(Number(idCliente))
    })
</script>

<style scoped>

</style>