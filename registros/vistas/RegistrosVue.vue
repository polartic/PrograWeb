<template>
    <section>
        <h3></h3>
        <!-- <h3>Personal</h3> -->
    <div>
            <RouterLink :to="{path: '/registros/agregar'}">
            <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus"></i>
            </button>
        </RouterLink>
        &nbsp;

        <button @click.prevent="imprimirRegistroPDF" class="btn btn-sm btn-outline-primary" v-if="registro.length > 0">
            Imprimir <i class="fa fa-print"></i>
        </button>
        &nbsp;
        <button  class="btn btn-sm btn-outline-primary" v-if="registro.length > 0">
            <download-excel :data="registro" type="xlsx" name="registros.xlsx">
                Excel <i class="fa fa-file-excel-o"></i>
            </download-excel>
        </button>

    </div>

    </section>
    <table class="table table-striped" id="tablaRegistros">
        <caption><h3>Registros</h3></caption>
        <thead>
            <tr>
                <th>Id</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Movimiento</th>
            </tr>
        </thead>
        <tbody> 
            <tr v-if="registro.length==0">
                <td class="centrado" colspan="6">No hay registros aun</td>
            </tr>                   
        <tr v-else v-for="(registro,index) in registro" :key="index">
            <td>{{ registro.id_personal }}</td>
            <td>{{ registro.fecha }}</td>
            <td>{{ registro.hora }}</td>
            <td>{{ registro.movimiento }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import html2PDF from 'jspdf-html2canvas';
import { onMounted } from 'vue';
import {useRegistro} from '../controladores/useRegistros.ts'
    const {traeRegistro,registro} = useRegistro()
    //Para cuando la pagina es visible y esta cargada
    onMounted(async() => {
      await traeRegistro()
    })

    const imprimirRegistroPDF = async () =>{
        let pagina = document.getElementById('tablaRegistros');
        await html2PDF(pagina,{
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './reporte_registros.pdf'
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