import { getAuth } from 'firebase/auth'
import SigningVue from '@/modulos/autentica/vistas/SigningVue.vue'
import SignupVue from '@/modulos/autentica/vistas/SignupVue.vue'
import PersonalAgregarVue from '@/modulos/personal/vistas/PersonalAgregarVue.vue'
import PersonalEditarVue from '@/modulos/personal/vistas/PersonalEditarVue.vue'
import PersonalEliminarVue from '@/modulos/personal/vistas/PersonalEliminarVue.vue'
import PersonalVue from '@/modulos/personal/vistas/PersonalVue.vue'
import BienvenidaVue from '@/modulos/principal/vistas/BienvenidaVue.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ComprasVue from '@/modulos/compras/vistas/ComprasVue.vue'
import ComprasAgregarVue from '@/modulos/compras/vistas/ComprasAgregarVue.vue'
import ComprasEliminarVue from '@/modulos/compras/vistas/ComprasEliminarVue.vue'
import ComprasEditarVue from '@/modulos/compras/vistas/ComprasEditarVue.vue'
import VentasVue from '@/modulos/ventas/vistas/VentasVue.vue'
import VentasAgregarVue from '@/modulos/ventas/vistas/VentasAgregarVue.vue'
import ClientesVue from '@/modulos/clientes/vistas/ClientesVue.vue'
import ArticulosVue from '@/modulos/articulos/vistas/ArticulosVue.vue'
import RegistrosVue from '@/modulos/registros/vistas/RegistrosVue.vue'
import ClientesAgregarVue from '@/modulos/clientes/vistas/ClientesAgregarVue.vue'
import ClientesEditarVue from '@/modulos/clientes/vistas/ClientesEditarVue.vue'
import ClientesBorrarVue from '@/modulos/clientes/vistas/ClientesBorrarVue.vue'
import ArticulosAgregarVue from '@/modulos/articulos/vistas/ArticulosAgregarVue.vue'
import ArticulosEditarVue from '@/modulos/articulos/vistas/ArticulosEditarVue.vue'
import ArticulosBorrarVue from '@/modulos/articulos/vistas/ArticulosBorrarVue.vue'
import RegistrosAgregarVue from '@/modulos/registros/vistas/RegistrosAgregarVue.vue'
import VentasEliminarVue from '@/modulos/ventas/vistas/VentasEliminarVue.vue'
import VentasEditarVue from '@/modulos/ventas/vistas/VentasEditarVue.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth();
        const usuario = auth.currentUser; //pregunta si hay un usuario logueado
        if(usuario){
          next();
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/personal/agregar',
      name: 'personalagregar',
      component: PersonalAgregarVue,
    },
    {
    path: '/personal/:id/editar',
    name: 'personaleditar',
    component: PersonalEditarVue,
  },
  {
    path: '/personal/:id/borrar',
    name: 'personaleliminar',
    component: PersonalEliminarVue,
  },
  {
    path: '/bienvenida',
    name: 'bienvenida',
    component: BienvenidaVue,
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: SignupVue,
  },
  {
    path: '/validacion',
    name: 'validacion',
    component: SigningVue,
  },
  {
    path: '/compras',
    name: 'compras',
    component: ComprasVue,
    beforeEnter: (to, from, next) => {
      const auth = getAuth();
      const usuario = auth.currentUser; //pregunta si hay un usuario logueado
      if(usuario){
        next();
      } else {
        next('/validacion')
      }
    }
  },
  {
    path: '/compras/agregar',
    name: 'comprasagregar',
    component: ComprasAgregarVue,
  },
  {
    path: '/compras/:id/borrar',
    name: 'compraseliminar',
    component: ComprasEliminarVue,
  },
  {
    path: '/compras/:id/editar',
    name: 'compraseditar',
    component: ComprasEditarVue,
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ClientesVue,
    beforeEnter:(to,from,next)=>{
      const auth= getAuth();
      const usuario = auth.currentUser  //Hay un usuario?
      if (usuario) {
        next();
      } else{
        next('/validacion');
      }
    }
  },
  {
    path: '/articulos',
    name: 'articulos',
    component: ArticulosVue,
    beforeEnter:(to,from,next)=>{
      const auth= getAuth();
      const usuario = auth.currentUser  //Hay un usuario?
      if (usuario) {
        next();
      } else{
        next('/validacion');
      }
    }
  },
  {
    path: '/registros',
    name: 'registros',
    component: RegistrosVue,
    beforeEnter:(to,from,next)=>{
      const auth= getAuth();
      const usuario = auth.currentUser  //Hay un usuario?
      if (usuario) {
        next();
      } else{
        next('/validacion');
      }
    }
  },
  {
    path: '/clientes/agregar',
    name: 'clientesagregar',
    component: ClientesAgregarVue,
  },
  {
    path: '/clientes/:id/editar',
    name: 'clienteseditar',
    component: ClientesEditarVue,
  },
  {
    path: '/clientes/:id/borrar',
    name: 'clientesborrar',
    component: ClientesBorrarVue,
  },
  {
    path: '/articulos/agregar',
    name: 'articulosagregar',
    component: ArticulosAgregarVue,
  },
  {
    path: '/articulos/:id/editar',
    name: 'articuloseditar',
    component: ArticulosEditarVue,
  },
  {
    path: '/articulos/:id/borrar',
    name: 'articulosborrar',
    component: ArticulosBorrarVue,
  },
  {
    path: '/registros/agregar',
    name: 'registrosagregar',
    component: RegistrosAgregarVue,
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: SignupVue,
  },
  {
    path: '/ventas',
    name: 'ventas',
    component: VentasVue,
    beforeEnter: (to, from, next) => {
      const auth = getAuth();
      const usuario = auth.currentUser; //pregunta si hay un usuario logueado
      if(usuario){
        next();
      } else {
        next('/validacion')
      }
    }
  },
  {
    path: '/ventas/:id/borrar',
    name: 'ventaseliminar',
    component: VentasEliminarVue,
  },
  {
    path: '/ventas/agregar',
    name: 'ventasagregar',
    component: VentasAgregarVue,
  },
  {
    path: '/ventas/:id/editar',
    name: 'ventaseditar',
    component: VentasEditarVue,
  },
  
  ],
})

export default router
