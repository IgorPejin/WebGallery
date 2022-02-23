<template>
  <div id="app" >
     
    <b-container class="ctrans mt-5" fluid="md">
        <b-row class="b-flex">
                <input type="button" @click="addNewImage(id)" class="mt-1 ml-3" value="New image" />
                <input type="button" @click="galleryDeletion()" class="mt-1 ml-3" value="Delete gallery" />
                <span class="ml-2 text-white">Total images: {{imagesData.length}} </span>
              </b-row>
           <div class="deck ">
            <b-card  @click="gotoSlika(image.id)"  
             class="transparent cards mt-3  text-light" 
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