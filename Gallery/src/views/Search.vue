<template>
  <div id="app">
     <b-container class="ctrans mt-5 mb-2" fluid="md">
         <b-container class="wrapper">
           <div class="deck">
            <b-card class="transparent cards mt-1 text-light" @click="gotoSlika(image.id)" :title="image.name" v-for="image in searchImages" :key="image.id" >
             <ImageCard class="mb-2" :putanja="image.thumbnail_ref"/>
             <b-card-text >
                  Tags: {{image.tags}}
                  <br>
                  Size: {{image.original_size}}
               </b-card-text>
            </b-card>
           </div>
         </b-container>
    </b-container>
  </div>
</template>

<script>

  import { mapActions,mapState } from 'vuex';
  import ImageCard from '@/components/ImageCard.vue';

  export default {
    name: 'Search',
    
    components: {
      ImageCard
    },
    computed: {
      ...mapState([
        'searchImages'
      ])
    },

    data() {
      return {
        images: []
      }
    },

    mounted() { 
        this.search(this.$route.query.q)
    },

    methods: {
      ...mapActions([
        'search'
      ]),
      gotoSlika(id)
      {
        this.$router.push({ name: 'Slika', params: { id: id } });
      }
    }
  }
</script>

<style scoped>
.transparent , .ctrans
{
  background-color: rgb(255, 255, 255,0.2);
}
.wrapper {
    width:100%;
    height: 100%;
    overflow: hidden;
}
.deck {
  
    height:450px;
    white-space:nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
}
.cards {
    display:inline-flex;
    width:300px;
    height:450px;
    transition: 0.3s;
}
.cards:hover
{
   background-color: rgba(255,255,255,0.5);
}

</style>
