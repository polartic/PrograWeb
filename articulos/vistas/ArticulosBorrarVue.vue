<template>
    <div class="container mt-5" v-if="articulo[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar personal</h4>
            </div>
            <div class="alert alert-warning" role="alert">
                ¿Estas seguro que quieres borrar el personal?
                <i class="fa fa-warning"</i>
            </div>

            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="articulo[0].id" disabled>
                </div>
                <div class="mb-3">
                    Descripcion
                    <input type="text" class="form-control" v-model="articulo[0].descripcion" disabled>
                </div>
                <div class="mb-3">
                    precio
                    <input type="text" class="form-control"v-model="articulo[0].precio" disabled>
                </div>
                <div class="mb-3">
                    Cantidad en Almacen
                    <input type="text" class="form-control"v-model="articulo[0].cantidadA" disabled>
                </div>
                <div class="mb-3">
                    Fecha de Caducidad
                    <input type="text" class="form-control"v-model="articulo[0].caducidad" disabled>
                </div>
                <div class="mb3">
                    <button class="btn btn-danger" @click="borrarArticulo(articulo[0])">Borrar</button>
                </div>

            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArticulo } from '../controladores/useArticulos';
const {traeArticuloId,borrarArticulo,mensaje, articulo} = useArticulo()
    let idArticulo = 0
    //Para los parametros de la URL
    const route= useRoute()
    //Para moverme de URL
    const routeRedirect = useRouter()
    //Observador - Watch
    watch(
        () => mensaje.value, 
        newId =>{
            routeRedirect.push('/articulos')
        }
    )
    onMounted(async()=>{
        idArticulo= Number(route.params.id)
        await traeArticuloId(Number(idArticulo))
    })
</script>

<style scoped>

</style>