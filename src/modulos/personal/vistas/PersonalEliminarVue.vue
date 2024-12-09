<template>
    <div class="container mt-5" v-if="personal[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar personal</h4>
            </div>
            <div class="alert alert-warning" role="alert">
                ¿Estás seguro de borrar este personal? <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="personal[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="personal[0].nombre" disabled>
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="personal[0].direccion" disabled>
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="personal[0].telefono" disabled>
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="personal[0].estatus" disabled>
                </div>
                <div class="mb-3">
                    <button class="btn btn-danger" @click="eliminarPersonal(personal[0])">Borrar </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
// import { useRoute } from 'vue-router'; //para jalar parametros
import { useRoute, useRouter } from 'vue-router';
import { usePersonal } from '../controladores/usePersonal';
const {eliminarPersonal, traePersonalId, mensaje, personal} = usePersonal();
let idPersona = 0;
const route = useRoute();   // para los parámetros
const routeRedirect = useRouter(); //para moverme de url

//observador - watch
watch(
    () => mensaje.value,
    newId =>{
        routeRedirect.push('/personal');
    }
)

onMounted(async() => {
    idPersona = Number(route.params.id);
    await traePersonalId(Number(idPersona));
})
</script>

<style scoped>
</style>