<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar articulo</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos agregados con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="ArticuloSchema" @submit="onTodoBien">
                        <div class="mb-3">
                            Descripcion
                            <Field name="descripcion" type="text" class="form-control" v-model="articulo.descripcion" />
                            <ErrorMessage name="descripcion" class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            Precio
                            <Field name="precio"  type="number" class="form-control"v-model="articulo.precio" />
                                <ErrorMessage name="precio" class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            Cantidad en Almacen
                            <Field name="cantidadA"  type="number" class="form-control"v-model="articulo.cantidadA" />
                                <ErrorMessage name="cantidadA" class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            Fecha de Caducidad
                            <Field name="caducidad"  type="text" class="form-control"v-model="articulo.caducidad" />
                            <ErrorMessage name="caducidad" class="errorValidacion" />
                        </div>
                        <div class="mb3">
                            <!-- <button class="btn btn-primary" @click="agregarPersonal(personal)">Agregar</button> -->
                            <button class="btn btn-primary" type="submit">Agregar</button>

                        </div>
                    </Form>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ArticuloAgregar } from '../interfaces/articulos-interface';
import { useArticulo } from '../controladores/useArticulos';
const {agregarArticulo, mensaje} = useArticulo()
import { ArticuloSchema } from '../schemas/ArticulosSchema';
import {Field,Form,ErrorMessage} from 'vee-validate'

let articulo = ref<ArticuloAgregar>({
    descripcion: '',
    precio: 0,
    cantidadA:0,
    caducidad:''
})

const onTodoBien=async () =>{
   await agregarArticulo(articulo.value);
}
</script>

<style scoped>
.errorValidacion{
    color: red;
    font-weight: bold;
}
</style>