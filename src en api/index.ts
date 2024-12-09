import express from 'express';
// cramos la aplicacion a traves del paquete express
// y llamamos a su constructor 
const app = express();
//configurar rutas para acceso a personal
import personalRutas from './routes/personalRutas';
import comprasRutas from './routes/comprasRutas'; //<=====agregado
import ventasRutas from './routes/ventasRutas'; //<=====agregado
import articulosRutas from './routes/articulosRutas';
import clientesRutas from './routes/clientesRutas';
import registrosRutas from './routes/registrosRutas';

import cors from 'cors';

//Todo lo que regresa al usuario será JSON
app.use(express.json());
//puerto para escuchar las peticiones del frontend
const PUERTO = 3001;

app.use(cors());

//Activar la ruta base
app.use('/api/articulos',articulosRutas)
app.use('/api/clientes',clientesRutas)
app.use('/api/registros',registrosRutas)
app.use('/api/personal',personalRutas)
app.use('/api/compras',comprasRutas) //<=====agregado
app.use('/api/ventas',ventasRutas) //<=====agregado


// app.get('/hola',(_req,res) => {
//     let fecha = new Date().toLocaleDateString();
//     res.send('mundo con la fecha ' + fecha + ' con typescript');
// })

//Encendemos el servidor y lo ponemos en escucha
app.listen(PUERTO, () => {
    console.log(`Servidor en ejecución y escuchando en el puerto ${PUERTO}`);
})