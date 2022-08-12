<template>
<div>
    <h3 class="text-center">Marvel Characters List</h3>
    <div class="d-flex justify-content-center align-items-center">
        <div class="w-50">
            <input class="form-control form-control-lg" type="text" placeholder="Serch character" aria-label=".form-control-lg example" v-model="nameCharacter">
        </div>
        <div class="mx-4">
            <button type="submit" class="btn btn-primary" v-on:click="searchCharacter">Search</button>
        </div>
        <div v-if="isSearching">
            <button type="submit" class="btn btn-primary" v-on:click="clearSearch">Clear</button>
        </div>
    </div>

    <h4 class="mt-3">click the card to edit</h4>

    <div class="mt-5 d-flex flex-wrap justify-content-center">
  
      <div v-for="character in characters">
        <router-link :event="character.id ? 'click' : ''" :to="{name: 'character', params: {id:character.id}}">
        <div class="card mb-3 mx-3" style="width: 540px">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="`${character.thumbnail.path}${character.id? '/portrait_incredible' : ''}.${character.thumbnail.extension}`" class="img-fluid rounded-start" :alt="character.name" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{character.name}}</h5>
                <p class="card-text">
                  {{character.description}}
                </p>
                <p class="card-text">
                  <small class="text-muted">{{character.modified}}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        </router-link>
  
      </div>

      <!-- <div v-if="characters.length === 0">
      <p>No se encontraron personajes</p>
      </div> -->
    </div>

    <infinite-loading @infinite="getMoreCharacters" ref="infiniteLoading"></infinite-loading>

</div>
</template>

<script>
import { mapState } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading';


export default {
  name: "Characters",
  components: {
    InfiniteLoading,
  },
  data(){
    return {
        nameCharacter: '',
        isSearching: false
    }
  },
  methods: {
    getMoreCharacters($state){
        // console.log(this.nameCharacter)
        this.$store.dispatch('getCharacters', {infiniteLoaderContext: $state, nameCharacter: this.nameCharacter})
    },
    searchCharacter(){
        // console.log(this.$refs.infiniteLoading)
        this.isSearching = true;
        this.$store.dispatch('clearCharacters')
        this.$refs.infiniteLoading.$listeners.infinite()
    },
    clearSearch(){
        this.nameCharacter = ''
        this.$store.dispatch('clearCharacters')
        this.$refs.infiniteLoading.$listeners.infinite()
        this.isSearching = false;
    }
  },
  computed: {
    ...mapState({
        characters: state => state.characters
    })
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
    box-shadow: 4px 4px 4px #EA6C70;
    transition:.6s ease;
    color: black;
}
.card-body{
    /* background-color: #270607; */
    height: 100%;
}
.card:hover{
    box-shadow: 8px 8px 8px #EA6C70;
    transform:scale(1.02);
}

a{
    color: black;
    text-decoration: none;
}
</style>
