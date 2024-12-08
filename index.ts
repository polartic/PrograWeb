import { getAuth } from 'firebase/auth'
import SigninVue from '@/modulos/autentica/vistas/SigninVue.vue'
import SignupVue from '@/modulos/autentica/vistas/SignupVue.vue'
import PersonalAgregarVue from '@/modulos/personal/vistas/PersonalAgregarVue.vue'
import PersonalBorrarVue from '@/modulos/personal/vistas/PersonalBorrarVue.vue'
import PersonalEditarVue from '@/modulos/personal/vistas/PersonalEditarVue.vue'
import PersonalVue from '@/modulos/personal/vistas/PersonalVue.vue'
import BienvenidaVue from '@/modulos/principal/vistas/BienvenidaVue.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ClientesAgregarVue from '@/modulos/clientes/vistas/ClientesAgregarVue.vue'
import ClientesEditarVue from '@/modulos/clientes/vistas/ClientesEditarVue.vue'
import ClientesBorrarVue from '@/modulos/clientes/vistas/ClientesBorrarVue.vue'
import ArticulosAgregarVue from '@/modulos/articulos/vistas/ArticulosAgregarVue.vue'
import ArticulosEditarVue from '@/modulos/articulos/vistas/ArticulosEditarVue.vue'
import ArticulosBorrarVue from '@/modulos/articulos/vistas/ArticulosBorrarVue.vue'
import ClientesVue from '@/modulos/clientes/vistas/ClientesVue.vue'
import ArticulosVue from '@/modulos/articulos/vistas/ArticulosVue.vue'
import RegistrosVue from '@/modulos/registros/vistas/RegistrosVue.vue'
import RegistrosAgregarVue from '@/modulos/registros/vistas/RegistrosAgregarVue.vue'

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
    },{
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
      name: 'personalborrar',
      component: PersonalBorrarVue,
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
      component: SigninVue,
    },
  ],
})

export default router
