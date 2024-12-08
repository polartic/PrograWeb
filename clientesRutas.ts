import express,{Request,Response} from 'express';
import * as clientesServices from '../services/clientesServices'
//Activa ruta
const router = express.Router();
//Llamada al http://localhost:3001/api/cliente
router.get('/',async (_req: Request,res: Response)=>{
    let cliente = await clientesServices.obtieneClientes();
    res.send(cliente);

});
//Llamada al http://localhost:3001/api/cliente/1
router.get('/:id',async (req: Request,res: Response)=>{
  let cliente = await clientesServices.encuentraCliente(Number(req.params.id));
  res.send(cliente);

});

// //Llamada al http://localhost:3001/api/cliente/telefono/6675012359
// router.get('/telefono/:telefono',async (req: Request,res: Response)=>{
//     let cliente = await personalServices.encuentraClienteTelefono(String(req.params.telefono));
//     res.send(cliente);
  
//   });



//Insertar datos
router.post('/', async (req: Request,res: Response)=>{
    try {
        const {nombre,direccion,telefono,correo,ciudad} = req.body;
        const nuevo = await clientesServices.agregarCliente({
            nombre,
            direccion,
            telefono,
            correo,
            ciudad
        });
        res.send(nuevo);
    } catch (e) {
        res.send('No se pudo agregar al cliente');
        res.status(400).send('Error en los datos');
    }
});
//Modificar datos ya existentes
router.put('/', async (req: Request,res: Response)=>{
    try {
        const {id,nombre,direccion,telefono,correo,ciudad} = req.body;
        const modificado = await clientesServices.modificarCliente({
            id,
            nombre,
            direccion,
            telefono,
            correo,
            ciudad
        });
        res.send(modificado);
    } catch (e) {
        res.send('No se pudo modificar al cliente');
        res.status(400).send('Error en los datos');
    }
});
//Eliminar un cliente
router.delete('/', async (req: Request,res: Response)=>{
    try {
        const {id} = req.body;
        const eliminado = await clientesServices.borrarCliente(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.send('No se pudo eliminar al cliente');
        res.status(400).send('Error en los datos');
    }
});
export default router;