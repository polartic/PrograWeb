<template>
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <!-- <RouterLink class="navbar-brand" to="/bienvenida">Tienda</RouterLink> -->
        <a class="navbar-brand" href="/bienvenida">Tienda</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item margin">
                    <RouterLink class="nav-link item" to="/clientes">Clientes</RouterLink>
                </li>
                <li class="nav-item margin">
                    <RouterLink class="nav-link item" to="/personal">Personal</RouterLink>
                </li>
                <li class="nav-item margin">
                    <RouterLink class="nav-link item" to="/articulos">Artículos</RouterLink>
                </li>
                <li class="nav-item margin">
                    <RouterLink class="nav-link item" to="/ventas">Ventas</RouterLink>
                </li>
                <li class="nav-item margin">
                    <RouterLink class="nav-link item" to="/registro">Registro</RouterLink>
                </li>
                <li class="nav-item margin">
                    <RouterLink class="nav-link item" to="/compras">Compras</RouterLink>
                </li>
                <li class="nav-item margin" v-if="usuarioAutenticado">
                    <button @click.prevent="cerrarSesion" class="nav-link item btn btn-link">
                        Salir
                    </button>
                </li>
            </ul>
        </div>
        </div>
    </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

    const usuarioAutenticado = ref(false);
    const auth = getAuth();
    const router = useRouter();
    onMounted(() => {
        onAuthStateChanged(auth, (user) =>{
            usuarioAutenticado.value = !!user
        })
    })
    const cerrarSesion = async () =>{
        try{
            await signOut(auth);
            router.push('/bienvenida');
        } catch(error){
            console.log('Error al cerrar sesión', error);
        }
    }

</script>

<style scoped>

</style>