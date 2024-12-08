<template>
    <div class="container mt-5" v-if="articulo[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar articulo</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos editados con exito
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="articulo[0].id" disabled>
                </div>
                <div class="mb-3">
                    Descripcion
                    <input type="text" class="form-control" v-model="articulo[0].descripcion" >
                </div>
                <div class="mb-3">
                    precio
                    <input type="text" class="form-control"v-model="articulo[0].precio" >
                </div>
                <div class="mb-3">
                    Cantidad en Almacen
                    <input type="text" class="form-control"v-model="articulo[0].cantidadA" >
                </div>
                <div class="mb-3">
                    Fecha de Caducidad
                    <input type="text" class="form-control"v-model="articulo[0].caducidad" >
                </div>
                <div class="mb3">
                    <button class="btn btn-primary" @click="actualizarArticulo(articulo[0])">Editar</button>
                </div>

            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useArticulo } from '../controladores/useArticulos';
const {traeArticuloId,actualizarArticulo,mensaje, articulo} = useArticulo()
    let idArticulo = 0
    const route= useRoute()
    onMounted(async()=>{
        idArticulo= Number(route.params.id)
        await traeArticuloId(Number(idArticulo))
    })
</script>

<style scoped>

</style>