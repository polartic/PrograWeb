<template>
    <div class="container mt-5" v-if="compras[0]">
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
                    <input type="text" class="form-control" v-model="compras[0].id" disabled>
                </div>
                <div class="mb-3">
                    Id articulo
                    <input type="text" class="form-control" v-model="compras[0].id_articulo">
                </div>
                <div class="mb-3">
                    Cantidad
                    <input type="text" class="form-control" v-model="compras[0].cantidad">
                </div>
                <div class="mb-3">
                    Precio
                    <input type="text" class="form-control" v-model="compras[0].precio">
                </div>
                <div class="mb-3">
                    IVA
                    <input type="text" class="form-control" v-model="compras[0].IVA" disabled>
                </div>
                <div class="mb-3">
                    Subtotal
                    <input type="text" class="form-control" v-model="compras[0].subtotal" disabled>
                </div>
                <div class="mb-3">
                    Total
                    <input type="text" class="form-control" v-model="compras[0].total" disabled>
                </div>
                <div class="mb-3">
                    Fecha de la compra
                    <input type="text" class="form-control" :value="formatDate(compras[0].fechaCompra)" disabled>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="actualizarcompras(compras[0])">Actualizar </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usecompras } from '../controladores/useCompras';
const {actualizarcompras, traecomprasId, mensaje, compras} = usecompras();
let idCompra = 0;
const route = useRoute();

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(async() => {
    idCompra = Number(route.params.id);
    await traecomprasId(Number(idCompra));
})
</script>

<style scoped>
</style>