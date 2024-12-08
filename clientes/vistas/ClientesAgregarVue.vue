<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar cliente</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos agregados con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="ClientesSchema" @submit="onTodoBien">
                        <div class="mb-3">
                            Nombre
                            <Field name="nombre" type="text" class="form-control" v-model="cliente.nombre" />
                            <ErrorMessage name="nombre" class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            Direccion
                            <Field name="direccion"  type="text" class="form-control"v-model="cliente.direccion" />
                                <ErrorMessage name="direccion" class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            Telefono
                            <Field name="telefono"  type="text" class="form-control"v-model="cliente.telefono" />
                                <ErrorMessage name="telefono" class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            Correo
                            <Field name="correo"  type="text" class="form-control"v-model="cliente.correo" />
                            <ErrorMessage name="correo" class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            Ciudad
                            <Field name="ciudad"  type="text" class="form-control"v-model="cliente.ciudad" />
                            <ErrorMessage name="ciudad" class="errorValidacion" />
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
import type { ClienteAgregar } from '../interfaces/clientes-interface';
import { useCliente } from '../controladores/useClientes';
const {agregarCliente, mensaje} = useCliente()
import { ClientesSchema } from '../schemas/ClientesSchema';
import {Field,Form,ErrorMessage} from 'vee-validate'

let cliente = ref<ClienteAgregar>({
    nombre: '',
    direccion: '',
    telefono:'',
    correo:'',
    ciudad: ''
})

const onTodoBien=async () =>{
   await agregarCliente(cliente.value);
}
</script>

<style scoped>
.errorValidacion{
    color: red;
    font-weight: bold;
}
</style>