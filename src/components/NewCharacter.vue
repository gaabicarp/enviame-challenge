<template>
    <div>
        <h1>Create Character</h1>
        <!-- <div class="py-4">
            <img :src="`${character?.thumbnail.path}/standard_fantastic.${character?.thumbnail.extension}`" class="rounded"  :alt="character.name" />
        </div> -->
        <div class="container">
            <input class="form-control form-control-lg my-3" type="text" placeholder="Serch character" aria-label=".form-control-lg example" v-model="character.name">
            <input class="form-control form-control-lg my-3" type="text" placeholder="Serch character" aria-label=".form-control-lg example" v-model="character.description">
            <input class="form-control form-control-lg my-3" type="text" placeholder="Serch character" aria-label=".form-control-lg example" v-model="character.thumbnail.path">
        </div>

        <div class="row">
            <div class="col">
                <router-link :to="{name: 'home'}">
                    <button type="submit" class="btn btn-secondary btn-lg">Back</button>
                </router-link>
            </div>
            <div class="col">
                <button type="submit" class="btn btn-primary btn-lg" v-on:click="createCharacter">Create</button>
            </div>
        </div>

    </div>
</template>
<script>
    export  default {
        name: 'NewCharacter',
        data(){
            return{
                character: {
                    name: '',
                    description: '',
                    thumbnail:{
                        path: '',
                        extension: 'jpg'
                    }
                },

            }
        },
        methods: {
            createCharacter(){
                this.$store.dispatch('createCharacter', {character: this.character})
                this.$router.push('/')
            }
        },
    }
</script>
<style>
</style>