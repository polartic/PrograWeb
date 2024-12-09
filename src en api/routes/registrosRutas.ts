import express,{Request,Response} from 'express';
import * as registrosServices from '../services/registrosServices';
//Activa ruta
const router = express.Router();
//Llamada al http://localhost:3001/api/registro
router.get('/',async (_req: Request,res: Response)=>{
    let registro = await registrosServices.obtieneRegistro();
    res.send(registro);

});
//Llamada al http://localhost:3001/api/registro/1
router.get('/:id',async (req: Request,res: Response)=>{
  let registro = await registrosServices.encuentraRegistro(Number(req.params.id));
  res.send(registro);

});

// //Llamada al http://localhost:3001/api/personal/telefono/6672681477
// router.get('/telefono/:telefono',async (req: Request,res: Response)=>{
//     let personal = await personalServices.encuentraPersonalTelefono(String(req.params.telefono));
//     res.send(personal);
  
//   });



//Insertar datos
router.post('/', async (req: Request,res: Response)=>{
    try {
        const {id_personal,fecha,hora,movimiento} = req.body;
        const nuevo = await registrosServices.agregarRegistro({
            id_personal,
            fecha,
            hora,
            movimiento
        });
        res.send(nuevo);
    } catch (e) {
        res.send('No se pudo agregar el registro');
        res.status(400).send('Error en los datos');
    }
});


export default router;