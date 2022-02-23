<template>
  <div id="app" class="slike">
      <b-container class="w-80">
      <b-row align-h="around">
            <Header 
            naslov="A new Image ..!"
            maliNaslov="Fill in the required info!"
             />
             <NewImage :id=this.$route.params.id />
          </b-row>
        </b-container>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import NewImage from '@/components/NewImage.vue';
  export default {
    name: 'GalleryCreation',
    components: {
      Header,
      NewImage
    }
  }

</script>

<style scoped>

</style>