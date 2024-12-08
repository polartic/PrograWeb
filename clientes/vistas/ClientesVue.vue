<template>
    <section>
        <h3></h3>
        <!-- <h3>Clientes</h3> -->
    <div>
            <RouterLink :to="{path: '/clientes/agregar'}">
            <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus"></i>
            </button>
        </RouterLink>
        &nbsp;

        <button @click.prevent="imprimirClientesPDF" class="btn btn-sm btn-outline-primary" v-if="cliente.length > 0">
            Imprimir <i class="fa fa-print"></i>
        </button>
        &nbsp;
        <button  class="btn btn-sm btn-outline-primary" v-if="cliente.length > 0">
            <download-excel :data="cliente" type="xlsx" name="clientes.xlsx">
                Excel <i class="fa fa-file-excel-o"></i>
            </download-excel>
        </button>

    </div>

    </section>
    <table class="table table-striped" id="tablaCliente">
        <caption><h3>Cliente</h3></caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Ciudad</th>
                <th> </th>
            </tr>
        </thead>
        <tbody> 
            <tr v-if="cliente.length==0">
                <td class="centrado" colspan="6">Sin clientes registrados</td>
            </tr>                   
        <tr v-else v-for="(cliente,index) in cliente" :key="index">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.direccion }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>{{ cliente.correo }}</td>
            <td>{{ cliente.ciudad }}</td>
            <td class="centrado">
                <div class="btn-group" role="group" aria-label="Basic outliner example">
                    <button type="button" class="btn btn-small btn-outline-primary">
                        <RouterLink class="nav-link item" :to="{path: '/clientes/'+cliente.id+'/editar'}"> <i class="fa fa-pencil"></i> </RouterLink>
                    </button>
                    <button type="button" class="btn btn-small btn-outline-danger">
                        <RouterLink class="nav-link item" :to="{path: '/clientes/'+cliente.id+'/borrar'}"> <i class="fa fa-trash"></i> </RouterLink>
                    </button>
                </div>

            </td>
        </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import html2PDF from 'jspdf-html2canvas';
import { onMounted } from 'vue';
import {useCliente} from '../controladores/useClientes.ts'
    const {traeCliente,cliente} = useCliente()
    //Para cuando la pagina es visible y esta cargada
    onMounted(async() => {
      await traeCliente()
    })

    const imprimirClientesPDF = async () =>{
        let pagina = document.getElementById('tablaCliente');
        await html2PDF(pagina,{
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './reporte_clientes.pdf'
        });
    }
</script>

<style scoped>
    section{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin-top: 20px;
    }
    .centrado{
        text-align: center;
    }

    caption{
        caption-side: top;
        text-align: center;
        padding-bottom: 10px;
        font-weight: bold;
    }
</style>