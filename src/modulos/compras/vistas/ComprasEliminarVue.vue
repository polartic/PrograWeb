<template>
    <div class="container mt-5" v-if="compras[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar compra</h4>
            </div>
            <div class="alert alert-warning" role="alert">
                ¿Estás seguro de borrar esta compra? <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id del articulo
                    <input type="text" class="form-control" v-model="compras[0].id_articulo" disabled>
                </div>
                <div class="mb-3">
                    Cantidad
                    <input type="text" class="form-control" v-model="compras[0].cantidad" disabled>
                </div>
                <div class="mb-3">
                    Precio
                    <input type="text" class="form-control" v-model="compras[0].precio" disabled>
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
                    <button class="btn btn-danger" @click="eliminarcompras(compras[0])">Borrar </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
// import { useRoute } from 'vue-router'; //para jalar parametros
import { useRoute, useRouter } from 'vue-router';
import { usecompras } from '../controladores/useCompras';
const { eliminarcompras, traecomprasId, mensaje, compras } = usecompras();
let idCompra = 0;
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
        routeRedirect.push('/compras');
    }
)

onMounted(async() => {
    idCompra = Number(route.params.id);
    await traecomprasId(Number(idCompra))
})
</script>

<style scoped>
</style>