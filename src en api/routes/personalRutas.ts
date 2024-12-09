import express, {Request, Response} from 'express';
import * as personalServices from '../services/personalServices';

//con esto se activan las rutas
const router = express.Router();

//http:localhost:3001/api/personal/
router.get('/',async (_req:Request, res:Response)=>{
    let personal = await personalServices.obtienePersonal();
    res.send(personal);
});
//http:localhost:3001/api/personal/1 <-----numero de id del personal
router.get('/:id',async (req:Request, res:Response)=>{
    let personal = await personalServices.encuentraPersonal(Number(req.params.id));
    res.send(personal);
});

//http:localhost:3001/api/personal/telefono/123432523 <-----numero de telefono del personal
router.get('/telefono/:telefono',async (req:Request, res:Response)=>{
    let personal = await personalServices.encuentraPersonalTelefono(req.params.telefono);
    res.send(personal);
});

//insertar datos
router.post('/',async (req:Request, res:Response) =>{
    try{
        const {nombre, direccion, telefono, estatus} = req.body;
        const nuevoPersonal = await personalServices.agregarPersona({
            nombre, 
            direccion, 
            telefono,
            estatus
        });
        res.send(nuevoPersonal);
    }catch(e){
        res.send('no se puede agregar el personal');
        res.status(400).send('error en los datos')
    }
})

//modificar datos se usa put
router.put('/',async (req:Request, res:Response) => {
    try{
        const {id, nombre, direccion, telefono, estatus} = req.body;
        const modificado = await personalServices.modificarPersonal({
            id,
            nombre,
            direccion,
            telefono,
            estatus
        })
        res.send(modificado);
    }catch(e){
        res.status(400).send('Error en los datos');
    }
})

//Eliminar o borrar Personal se usa delete
router.delete('/', async (req:Request, res:Response) => {
    try{
        const {id} = req.body;
        const eliminado = await personalServices.borrarPersonal(Number(id));
        res.send(eliminado);
    }catch(e){
        res.status(400).send('error en los datos');
    }
})
export default router