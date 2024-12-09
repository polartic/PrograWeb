import express, {Request, Response} from 'express';
import * as ventasServices from '../services/ventasServices';

const router = express.Router();

//http:localhost:3001/api/compras/
router.get('/',async (_req:Request, res:Response)=>{
    let compras = await ventasServices.obtieneVentas();
    res.send(compras);
});

//http:localhost:3001/api/ventas/1 <-----numero de id de la venta
router.get('/:id',async (req:Request, res:Response)=>{
    let compras = await ventasServices.encuentraVenta(Number(req.params.id));
    res.send(compras);
});

router.get('/ventas/:id/precio', async (req, res) => {
    const { id } = req.params;
    console.log('holaolaol');
    try {
        const precio = await ventasServices.encuentraValorArticulo(Number(id));
        res.json({ precio });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el precio del artículo' });
    }
});

//insertar datos
router.post('/',async (req:Request, res:Response) =>{
    try{
        const {id_articulo,id_cliente, cantidad, precio, IVA, subtotal, total, fechaVenta} = req.body;
        const nuevaCompra = await ventasServices.agregarVenta({
            id_articulo,
            id_cliente,
            cantidad,
            precio,
            IVA,
            subtotal,
            total,
            fechaVenta
        });
        res.send(nuevaCompra);
    }catch(e){
        res.send('no se puede agregar la venta');
        res.status(400).send('error en los datos')
    }
})

//borrar compra
router.delete('/', async (req:Request, res:Response) => {
    try{
        const {id} = req.body;
        const eliminado = await ventasServices.borrarVenta(Number(id));
        res.send(eliminado);
    }catch(e){
        res.status(400).send('error en los datos');
    }
})

//modificar datos se usa put
router.put('/',async (req:Request, res:Response) => {
    try{
        const {id,id_articulo,id_cliente, cantidad, precio, IVA, subtotal, total, fechaVenta} = req.body;
        const modificado = await ventasServices.modificarVenta({
            id,
            id_articulo,
            id_cliente,
            cantidad,
            precio,
            IVA,
            subtotal,
            total,
            fechaVenta
        })
        res.send(modificado);
    }catch(e){
        res.status(400).send('Error en los datos');
    }
})
export default router;