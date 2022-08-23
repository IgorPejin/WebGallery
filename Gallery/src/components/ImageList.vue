<template>
  <div>
       <b-container class="ctrans mt-5 mb-2" fluid="md">
         <b-container class="wrapper">
           <div class="deck">
            <b-card class="transparent cards mt-1 text-light" :title="image.name" v-for="image in images" :key="image.id" >
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

  export default {
    name: 'ImageList',
     props: {
      images:Array
    },
     components: {
      ImageCard
    }
  }

</script>

<style scoped>
.transparent , .ctrans
{
  background-color: rgba(161, 159, 159, 0.441);
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
   background-color: rgba(161, 159, 159, 0.441);
}
</style>