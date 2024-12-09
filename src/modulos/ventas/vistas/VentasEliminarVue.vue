<template>
    <div class="container mt-5" v-if="ventas[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar compra</h4>
            </div>
            <div class="alert alert-warning" role="alert">
                ¿Estás seguro de borrar esta venta? <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id del articulo
                    <input type="text" class="form-control" v-model="ventas[0].id_articulo" disabled>
                </div>
                <div class="mb-3">
                    Id del cliente
                    <input type="text" class="form-control" v-model="ventas[0].id_cliente" disabled>
                </div> 
                <div class="mb-3">
                    Cantidad
                    <input type="text" class="form-control" v-model="ventas[0].cantidad" disabled>
                </div>
                <div class="mb-3">
                    Precio
                    <input type="text" class="form-control" v-model="ventas[0].precio" disabled>
                </div>
                <div class="mb-3">
                    IVA
                    <input type="text" class="form-control" v-model="ventas[0].IVA" disabled>
                </div>
                <div class="mb-3">
                    Subtotal
                    <input type="text" class="form-control" v-model="ventas[0].subtotal" disabled>
                </div>
                <div class="mb-3">
                    Total
                    <input type="text" class="form-control" v-model="ventas[0].total" disabled>
                </div>
                <div class="mb-3">
                    Fecha de la compra
                    <input type="text" class="form-control" :value="formatDate(ventas[0].fechaVenta)" disabled>
                </div>
                <div class="mb-3">
                    <button class="btn btn-danger" @click="eliminarVenta(ventas[0])">Borrar </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
// import { useRoute } from 'vue-router'; //para jalar parametros
import { useRoute, useRouter } from 'vue-router';
import { useVentas } from '../controladores/useVentas';
const { eliminarVenta, traeVentasId, mensaje, ventas } = useVentas();
let idVenta = 0;
const route = useRoute();   // para los parámetros
const routeRedirect = useRouter(); //para moverme de url

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

//observador - watch
watch(
    () => mensaje.value,
    newId =>{
        routeRedirect.push('/ventas');
    }
)

onMounted(async() => {
    idVenta = Number(route.params.id);
    await traeVentasId(Number(idVenta));
    console.log(idVenta);
})
</script>

<style scoped>
</style>