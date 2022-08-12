<template>
    <div>
        <h1>Edit Character</h1>
        <div class="py-4">
            <img v-if="!loading" :src="`${character.thumbnail?.path}/standard_fantastic.${character.thumbnail?.extension}`" class="rounded"  :alt="character.name" />
        </div>
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
                <button type="submit" class="btn btn-primary btn-lg" v-on:click="editCharacter">Edit</button>
            </div>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    import { public_key, hash_key } from "../keys";
    export  default {
        name: 'ABMcharacter',
        data(){
            return{
                character: {},
                loading: true

            }
        },
        methods: {
            getCharacter(){
                let characterId = this.$route.params.id
                axios
                    .get(
                    `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=1&apikey=${public_key}&hash=${hash_key}`
                    )
                    .then((res) => {
                        console.log(res);
                        this.character = res.data.data.results[0]
                        this.loading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.loading = false;
                    });
            },
            editCharacter(){
                this.$store.dispatch('editCharacter', {character: this.character})
                this.$router.push('/')
            }
        },
        mounted(){
            this.getCharacter()
        }
    }
</script>
<style>
</style>