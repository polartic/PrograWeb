import express, {Request, Response} from 'express';
import * as comprasServices from '../services/comprasServices';

const router = express.Router();

//http:localhost:3001/api/compras/
router.get('/',async (_req:Request, res:Response)=>{
    let compras = await comprasServices.obtieneCompras();
    res.send(compras);
});

//http:localhost:3001/api/compras/1 <-----numero de id de la compra
router.get('/:id',async (req:Request, res:Response)=>{
    let compras = await comprasServices.encuentraCompra(Number(req.params.id));
    res.send(compras);
});



//insertar datos
router.post('/',async (req:Request, res:Response) =>{
    try{
        const {id_articulo, cantidad, precio, IVA, subtotal, total, fechaCompra} = req.body;
        const nuevaCompra = await comprasServices.agregarCompra({
            id_articulo,
            cantidad,
            precio,
            IVA,
            subtotal,
            total,
            fechaCompra
        });
        res.send(nuevaCompra);
    }catch(e){
        res.send('no se puede agregar la compra');
        res.status(400).send('error en los datos')
    }
})

//borrar compra
router.delete('/', async (req:Request, res:Response) => {
    try{
        const {id} = req.body;
        const eliminado = await comprasServices.borrarCompra(Number(id));
        res.send(eliminado);
    }catch(e){
        res.status(400).send('error en los datos');
    }
})

//modificar datos se usa put
router.put('/',async (req:Request, res:Response) => {
    try{
        const {id,id_articulo, cantidad, precio, IVA, subtotal, total, fechaCompra} = req.body;
        const modificado = await comprasServices.modificarCompra({
            id,
            id_articulo,
            cantidad,
            precio,
            IVA,
            subtotal,
            total,
            fechaCompra
        })
        res.send(modificado);
    }catch(e){
        res.status(400).send('Error en los datos');
    }
})
export default router;