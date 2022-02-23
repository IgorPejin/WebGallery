<template>
  <div id="app">

  <b-container fluid="lg" class="kontejner h-50">
          <b-row align-h="center"> 
            <Header 
            naslov="Gallery on the web!"
            podnaslov="Share photos on the internet"
            />
          </b-row>
          <b-row align-h="center">
              <Footer/>
          </b-row>
  </b-container>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    name: 'Home',
    
    components: {
      Header,
      Footer
    }
  }
</script>
<style scoped>
</style>
