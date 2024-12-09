<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar venta</h4>
            </div>
            <div v-if="mensaje==1" class="alert alert-succes" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="ventasSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id del articulo
                        <Field name="id_articulo" type="number" class="form-control" v-model="venta.id_articulo"/>
                        <ErrorMessage name="id_articulo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Id del cliente
                        <Field name="id_cliente" type="number" class="form-control" v-model="venta.id_cliente"/>
                        <ErrorMessage name="id_articulo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Cantidad
                        <Field name="cantidad" type="number" class="form-control" v-model="venta.cantidad"/>
                        <ErrorMessage name="cantidad" class="errorValidacion"/>
                    </div>
                    <!-- <div class="mb-3">
                        Precio
                        <Field name="precio" type="number" class="form-control" v-model="venta.precio"/>
                        <ErrorMessage name="precio" class="errorValidacion"/>
                    </div> -->
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Agregar</button>
                        <!-- <button class="btn btn-primary" @click="agregarPersonal(personal)">Agregar </button> -->
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { AgregarVentas } from '../interfaces/Venta-interface';
import { useVentas } from '../controladores/useVentas';
import { useArticulo } from '../../articulos/controladores/useArticulos';
const {traeVentas,agregarVenta, mensaje, ventas} = useVentas();
const {traeArticuloId , articulo} = useArticulo();
import { ventasSchema } from '../schemas/VentasSchema';
import {Field, Form, ErrorMessage} from 'vee-validate';
//define el tipo de datos
interface Articulos {
    id: number,
    descripcion: string,
    precio: number,
    cantidadA:number,
    caducidad: string,
}
// Datos
    const articulos = ref<Articulos[]>([]);

    let venta = ref<AgregarVentas>({
        id_articulo: 0,
        id_cliente: 0,
        cantidad: 0,
        precio: 0,
        IVA: 0,
        subtotal: 0,
        total: 0,
        fechaVenta: ''
    })
    onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3001/api/articulos');
        const data = await response.json();
        articulo.value = data as Articulos[]; // Garantiza que TypeScript sepa que estos datos son un array de 'Persona'
    } catch (error) {
        console.error('Error al cargar articulos:', error);
    }
    
});

const onTodoBien = async () => {
    if(venta.value.id_articulo != 0){
        articulo.value.forEach((articulo: Articulos) => {
            if(articulo.id == venta.value.id_articulo){
                venta.value.precio = articulo.precio * venta.value.cantidad;
            }
            if(venta.value.precio != 0){
                console.log('Precio encontrado:', venta.value.precio);
            } else {
                console.log('No se encontró el precio del artículo con id:', venta.value.id_articulo);
            }
        });
    }
        venta.value.IVA = venta.value.precio * 0.16;
        venta.value.subtotal = venta.value.precio * venta.value.cantidad;
        venta.value.total = venta.value.subtotal + venta.value.IVA;
        
        const fechaActual = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
        venta.value.fechaVenta = fechaActual;
        await agregarVenta(venta.value);
}
</script>

<style scoped>

    .errorValidacion {
        color: red;
    }
</style>