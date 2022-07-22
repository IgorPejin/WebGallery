<template>
  <div id="app" >
     
    <b-container class="ctrans mt-5 mb-2" fluid="md">
      <b-container class="wrapper">
        <b-row class="b-flex">
            <div class="options">
                <b-card @click="addNewImage(id)" class="ml-4 mr-1 cardCreateOption transparent text-light" value="New image">New Image</b-card>
                <b-card @click="galleryDeletion()" class="cardCreateOption transparent text-light" value="Delete gallery">Delete Gallery</b-card>
                <span class="ml-2 text-white">Total images: {{imagesData.length}} </span>
            </div>
              </b-row>
           <div class="deck ">
            <b-card  @click="gotoSlika(image.id)"  
             class="transparent cards mt-1 mr-1 text-light" 
             v-for="image in imagesData" :key="image.id" :title="image.name">
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

  import ImageCard from '@/components/ImageCard.vue';
  import { mapActions,mapState } from 'vuex';
  export default {
    name: 'SelectedGallery',
    components: {
      ImageCard
    },
    computed: {
      ...mapState([
        'imagesData'
      ])
    },
   data() {
      return {
        id:0
      }
    },
      mounted()
    {
        this.getGalleryImages(this.$route.params.id);
        this.id=this.$route.params.id
    },
    methods: {
        ...mapActions([
        'getGalleryImages',
        'deleteGallery'
      ]),
      galleryDeletion()
      {
        this.deleteGallery(this.$route.params.id);
      },
      addNewImage(id)
      {
        this.$router.push({ name: 'NewImage', params: { id: id } });
      },
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
.options
{
  display: inline-flex;
  flex-direction: row;
  margin-right: 10px;
  white-space:nowrap;
}
.cardCreateOption
{
   width:200px;
   height:4em;
} 
.cards {
    display:inline-flex;
    width:300px;
    height:450px;
    transition: 0.3s;
}
.cards:hover,.cardCreateOption:hover
{
   background-color: rgba(255,255,255,0.5);
}

</style>