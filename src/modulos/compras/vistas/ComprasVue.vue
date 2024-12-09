<template>
    <section>
        <h3></h3>
        <!-- <h3>ComprastraeCompras</h3> -->
        <div>
            <RouterLink :to="{path: '/compras/agregar'}"> 
                <button class = "btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus"></i>
                </button>
            </RouterLink>
            &nbsp;
            <button @click.prevent="imprimirComprasPDF" class="btn btn-sm btn-outline-primary" v-if="compras.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-primary" v-if="compras.length > 0">
                <download-excel :data="traeCompras" type="xlsx" name="Compras.xlsx">
                    Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
</section>
<table class="table table-stripped" id="tablaCompras"> 
    <caption><h3>Compras</h3></caption>
    <thead>
        <tr>
            <th>Clave</th>
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
        <tr v-if="compras.length == 0">
            <td class="centrado" colspan="6">Sin Compras registrado</td>
        </tr>
        <tr v-else v-for="(compras, index) in compras" :key="index">
            <td>{{ compras.id}}</td>
            <td>{{ compras.id_articulo}}</td>
            <td>{{ compras.cantidad}}</td>
            <td>{{ compras.precio}}</td>
            <td>{{ compras.IVA}}</td>
            <td>{{ compras.subtotal}}</td>
            <td>{{ compras.total}}</td>
            <td>{{ formatDate(compras.fechaCompra) }}</td>
            <td class="centrado">
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-sm btn-outline-primary">
                        <RouterLink class="nav-link item" :to="{path: '/compras/' + compras.id + '/editar'}"> <i class="fa fa-pencil"></i> </RouterLink>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger">
                        <RouterLink class="nav-link item" :to="{path: '/compras/' + compras.id + '/borrar'}"> <i class="fa fa-trash"></i> </RouterLink>
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
    import { usecompras } from '../controladores/useCompras';
    const {traeCompras, compras} = usecompras();
    
    //cuando la pagina es visible y esta cargada
    onMounted( async () => {
        await traeCompras();
    })

    const imprimirComprasPDF = async () => {
        let pagina = document.getElementById('tablaCompras');
        await html2PDF(pagina, {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './reporte_Compras.pdf'
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