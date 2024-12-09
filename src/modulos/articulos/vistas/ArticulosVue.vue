<template>
    <h3></h3>
    <section>
        <div>
            <RouterLink :to="{ path: '/articulos/agregar' }">
                <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus"></i>
                </button>
            </RouterLink>
            &nbsp;

            <button @click.prevent="imprimirArticulosPDF" class="btn btn-sm btn-outline-primary" v-if="articulo && articulo.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-primary" v-if="articulo && articulo.length > 0">
                <download-excel :data="articulo" type="xlsx" name="articulos.xlsx">
                    Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
    </section>
    <table class="table table-striped" id="tablaArticulos">
        <caption><h3>Articulos</h3></caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Cantidad en Almacen</th>
                <th>Fecha de Caducidad</th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="articulo.length == 0">
                <td class="centrado" colspan="6">Sin articulos registrados</td>
            </tr>
            <tr v-else v-for="(articulo, index) in articulo" :key="index">
                <td>{{ articulo.id }}</td>
                <td>{{ articulo.descripcion }}</td>
                <td>{{ articulo.precio }}</td>
                <td>{{ articulo.cantidadA }}</td>
                <td>{{ articulo.caducidad }}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outliner example">
                        <button type="button" class="btn btn-small btn-outline-primary">
                            <RouterLink class="nav-link item" :to="{ path: '/articulos/' + articulo.id + '/editar' }"> <i class="fa fa-pencil"></i> </RouterLink>
                        </button>
                        <button type="button" class="btn btn-small btn-outline-danger">
                            <RouterLink class="nav-link item" :to="{ path: '/articulos/' + articulo.id + '/borrar' }"> <i class="fa fa-trash"></i> </RouterLink>
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
import { useArticulo } from '../controladores/useArticulos';
const { traeArticulo, articulo } = useArticulo(); // Asegúrate de usar 'articulos' en plural

// Para cuando la página es visible y está cargada
onMounted(async () => {
    await traeArticulo();
});

const imprimirArticulosPDF = async () => {
    let pagina = document.getElementById('tablaArticulos');
    await html2PDF(pagina, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: './reporte_articulos.pdf'
    });
};
</script>

<style scoped>
section {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin-top: 20px;
}
.centrado {
    text-align: center;
}
caption {
    caption-side: top;
    text-align: center;
    padding-bottom: 10px;
    font-weight: bold;
}
</style>