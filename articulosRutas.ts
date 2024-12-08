import express,{Request,Response} from 'express';
import * as articulosServices from '../services/articulosServices'
//Activa ruta
const router = express.Router();
//Llamada al http://localhost:3001/api/articulos
router.get('/',async (_req: Request,res: Response)=>{
    let articulo = await articulosServices.obtieneArticulos();
    res.send(articulo);

});
//Llamada al http://localhost:3001/api/articulos/1
router.get('/:id',async (req: Request,res: Response)=>{
  let articulo = await articulosServices.encuentraArticulo(Number(req.params.id));
  res.send(articulo);

});

// //Llamada al http://localhost:3001/api/cliente/telefono/6675012359
// router.get('/telefono/:telefono',async (req: Request,res: Response)=>{
//     let articulo = await personalServices.encuentraArticuloTelefono(String(req.params.telefono));
//     res.send(articulo);
  
//   });



//Insertar datos
router.post('/', async (req: Request,res: Response)=>{
    try {
        const {descripcion,precio,cantidadA,caducidad} = req.body;
        const nuevo = await articulosServices.agregarArticulo({
            descripcion,
            precio,
            cantidadA,
            caducidad,
        });
        res.send(nuevo);
    } catch (e) {
        res.send('No se pudo agregar el articulo');
        res.status(400).send('Error en los datos');
    }
});
//Modificar datos ya existentes
router.put('/', async (req: Request,res: Response)=>{
    try {
        const {id,descripcion,precio,cantidadA,caducidad} = req.body;
        const modificado = await articulosServices.modificarArticulo({
            id,
            descripcion,
            precio,
            cantidadA,
            caducidad,
        });
        res.send(modificado);
    } catch (e) {
        res.send('No se pudo modificar el articulo');
        res.status(400).send('Error en los datos');
    }
});
//Eliminar un articulo
router.delete('/', async (req: Request,res: Response)=>{
    try {
        const {id} = req.body;
        const eliminado = await articulosServices.borrarArticulo(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.send('No se pudo eliminar el articulo');
        res.status(400).send('Error en los datos');
    }
});
export default router;