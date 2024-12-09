<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar registro</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Registro agregado con éxito
      </div>
      <div class="card-body">
        <Form :validation-schema="registroSchema" @submit="onTodoBien">
          <div class="mb-3">
            Selecciona un personal:
            <select id="id_personal" name="id_personal" v-model="registro.id_personal">
              <option v-for="persona in personal" :key="persona.id" :value="persona.id">
              {{ persona.nombre }}
              </option>
              <option v-if="personal.length === 0" disabled>Cargando personales...</option>
            </select>
            
          </div>

          <div class="mb-3">
            Fecha
            <Field name="fecha" type="text" class="form-control" v-model="registro.fecha" disabled/>
            <ErrorMessage name="fecha" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Hora
            <Field name="hora" type="text" class="form-control" v-model="registro.hora" disabled/>
            <ErrorMessage name="hora" class="errorValidacion" />
          </div>

          <div class="mb-3">
            Movimiento
          <Field name="movimiento" as="select" v-model="registro.movimiento" >
            <option value="Entrada">Entrada</option>
            <option value="Salida">Salida</option>
          </Field>
            <ErrorMessage name="movimiento" class="errorValidacion" />
          </div>

          <div class="mb3">
            <button class="btn btn-primary" type="submit">Agregar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { registroSchema } from '../schemas/RegistrosSchema';
import { useRegistro } from '../controladores/useRegistros';
const { agregarRegistro, mensaje } = useRegistro();

// Define el tipo de los datos
interface Persona {
  id: number;
  nombre: string;
}

// Datos
const personal = ref<Persona[]>([]);

// Registro inicial
let registro = ref({
  id_personal: 0, // ID del empleado seleccionado
  fecha: '',
  hora: '',
  movimiento: 'Entrada',
});
// Formatea la fecha y hora actuales
const obtenerFechayHora = () => {
  const ahora = new Date();
  const fecha = ahora.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const hora = ahora.toTimeString().split(' ')[0]; // Formato HH:MM:SS
  return { fecha, hora };
};

// Asigna la fecha y hora al cargar el componente
onMounted(() => {
  const { fecha, hora } = obtenerFechayHora();
  registro.value.fecha = fecha;
  registro.value.hora = hora;
});
// Cargar datos al montar el componente
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/personal');
    const data = await response.json();
    personal.value = data as Persona[]; // Garantiza que TypeScript sepa que estos datos son un array de 'Persona'
  } catch (error) {
    console.error('Error al cargar personal:', error);
  }
});

// Acción al enviar el formulario
const onTodoBien = async () => {
  await agregarRegistro(registro.value);
};
</script>

<style scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
