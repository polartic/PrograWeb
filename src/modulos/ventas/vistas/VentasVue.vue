<template>
    <section>
        <h3></h3>
        <!-- <h3>ComprastraeCompras</h3> -->
        <div>
            <RouterLink :to="{path: '/ventas/agregar'}"> 
                <button class = "btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus"></i>
                </button>
            </RouterLink>
            &nbsp;
            <button @click.prevent="imprimirVentasPDF" class="btn btn-sm btn-outline-primary" v-if="ventas.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-primary" v-if="ventas.length > 0">
                <download-excel :data="traeVentas" type="xlsx" name="Ventas.xlsx">
                    Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
</section>
<table class="table table-stripped" id="tablaVentas"> 
    <caption><h3>Ventas</h3></caption>
    <thead>
        <tr>
            <th>Clave</th>
            <th>Cliente</th> 
            <th>Artículo</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>IVA</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th>Fecha de compra</th>
            
        </tr>
    </thead>
    <tbody>
        <tr v-if="ventas.length == 0">
            <td class="centrado" colspan="6">Sin Compras registrado</td>
        </tr>
        <tr v-else v-for="(ventas, index) in ventas" :key="index">
            <td>{{ ventas.id}}</td>
            <td>{{ ventas.id_cliente}}</td>
            <td>{{ ventas.id_articulo}}</td>
            <td>{{ ventas.cantidad}}</td>
            <td>{{ ventas.precio}}</td>
            <td>{{ ventas.IVA}}</td>
            <td>{{ ventas.subtotal}}</td>
            <td>{{ ventas.total}}</td>
            <td>{{ formatDate(ventas.fechaVenta) }}</td>
            <td class="centrado">
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-sm btn-outline-primary">
                        <RouterLink class="nav-link item" :to="{path: '/ventas/' + ventas.id + '/editar'}"> <i class="fa fa-pencil"></i> </RouterLink>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger">
                        <RouterLink class="nav-link item" :to="{path: '/ventas/' + ventas.id + '/borrar'}"> <i class="fa fa-trash"></i> </RouterLink>
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
    import { useVentas } from '../controladores/useVentas';
    const {traeVentas, ventas} = useVentas();
    
    //cuando la pagina es visible y esta cargada
    onMounted( async () => {
        await traeVentas();
    })

    const imprimirVentasPDF = async () => {
        let pagina = document.getElementById('tablaVentas');
        await html2PDF(pagina, { 
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './reporte_Ventas.pdf'
        });
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    // load <-- Carga en memoria
    // mounted <-- cargada y se ve en pantalla
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