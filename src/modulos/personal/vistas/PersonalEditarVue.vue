<template>
    <div class="container mt-5" v-if="personal[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar personal</h4>
            </div>
            <div v-if="mensaje==1" class="alert alert-succes" role="alert">
                Datos actualizados con éxito
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="personal[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="personal[0].nombre">
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="personal[0].direccion">
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="personal[0].telefono">
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="personal[0].estatus">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="actualizarPersonal(personal[0])">Actualizar </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePersonal } from '../controladores/usePersonal';
import { RefSymbol } from '@vue/reactivity';
const {actualizarPersonal, traePersonalId, mensaje, personal} = usePersonal();
let idPersona = 0;
const route = useRoute();

onMounted(async() => {
    idPersona = Number(route.params.id);
    await traePersonalId(Number(idPersona));
})
</script>

<style scoped>
</style>