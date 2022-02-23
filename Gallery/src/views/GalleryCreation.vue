<template>
  <div id="app" class="slike">
      <b-container class="w-80">
      <b-row align-h="around">
            <Header 
            naslov="A new Gallery ..!"
            maliNaslov="Fill in the required info!"
             />
             <NewGallery/>
          </b-row>
        </b-container>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import NewGallery from '@/components/NewGallery.vue';
  export default {
    name: 'GalleryCreation',
    components: {
      Header,
      NewGallery
    }
  }

</script>

<style scoped>

</style>