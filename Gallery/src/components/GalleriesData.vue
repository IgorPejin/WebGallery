<template>
  <div class="slike">
    <b-container class="ctrans mt-5 mb-2" fluid="md">
         <b-container class="wrapper">
             <b-row class="b-flex">
                <input type="button" @click="galleryCreation()" class="mt-1 ml-3" value="New gallery" />
                <span class="ml-2 text-white">Total galleries: {{userGalleries.length}} </span>
            </b-row>
           <div class="deck">
            <b-card  @click="gotoGallery(gallery.id)" :title="gallery.name"  class="transparent cards mt-1 text-light" v-for="gallery in userGalleries" :key="gallery.id" >
              <ImageCard class="mb-2" :putanja="gallery.thumbnail_ref"/>
               <b-card-text >
                  Description: {{gallery.desc}}
                  <br>
                  Tags: {{gallery.tags}}
                  <br>
                  Media: {{gallery.media_type}}
               </b-card-text>
                  <input type="button" hidden value="Photos" v-on:click="gotoGallery(gallery.id)">
            </b-card>
           </div>
         </b-container>
    </b-container>
  </div>
</template>

<script>

  import ImageCard from '@/components/ImageCard.vue';
 
  export default {
    name: 'GalleryData',
    components: {
      ImageCard
    },
    props: {
      podaci:Array
    },

    data()
    {
      return{
        userGalleries: []
      }
    },
    watch:{
      userGalleries(nVal,oVal){

      }
    },

    mounted()
    {
      this.userGalleries=this.podaci
    },
    methods:
    {
      gotoGallery(id) {
        this.$router.push({ name: 'Gallery', params: { id: id } });
      },
      galleryCreation()
      {
        this.$router.push({name:'GalleryCreation'})
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