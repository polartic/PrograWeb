<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar compra</h4>
            </div>
            <div v-if="mensaje==1" class="alert alert-succes" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="comprasSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id del articulo
                        <Field name="id_articulo" type="number" class="form-control" v-model="compra.id_articulo"/>
                        <ErrorMessage name="id_articulo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Cantidad
                        <Field name="cantidad" type="number" class="form-control" v-model="compra.cantidad"/>
                        <ErrorMessage name="cantidad" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Precio
                        <Field name="precio" type="number" class="form-control" v-model="compra.precio"/>
                        <ErrorMessage name="precio" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Agregar</button>
                        <!-- <button class="btn btn-primary" @click="comra(compra)">Agregar </button> -->
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AgregarCompras } from '../interfaces/Compra-interface';
import { usecompras } from '../controladores/useCompras';
const {agregarcompras, mensaje} = usecompras();
import { comprasSchema } from '../schemas/ComprasSchema';
import {Field, Form, ErrorMessage} from 'vee-validate';

    let compra = ref<AgregarCompras>({
        id_articulo: 0,
        cantidad: 0,
        precio: 0,
        IVA: 0,
        subtotal: 0,
        total: 0,
        fechaCompra: ''
    })
    
    
    const onTodoBien = async () => {
        compra.value.IVA = compra.value.precio * 0.16;
        compra.value.subtotal = compra.value.precio * compra.value.cantidad;
        compra.value.total = compra.value.subtotal + compra.value.IVA;
        const fechaActual = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
        compra.value.fechaCompra = fechaActual;
        await agregarcompras(compra.value);
    }
</script>

<style scoped>

    .errorValidacion {
        color: red;
    }
</style>