<template>
  <div class="home">
    <div class="d-flex justify-content-center mb-5">
      <img alt="Marvel Logo" src="../assets/logo.png" class="w-50 mt-5">
    </div>
    <router-link :to="{name: 'newCharacter'}">
      <button type="button" class="btn btn-danger mb-4">Add a new character</button>
    </router-link>
    <Characters></Characters> 
  </div>
</template>

<script>
// @ is an alias to /src
import Characters from '@/components/Characters.vue'

export default {
  name: 'HomeView',
  components: {
    Characters
  },
}
</script>
