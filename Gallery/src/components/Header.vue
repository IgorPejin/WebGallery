<template>
  <div class="naslov">
    <h1 class="header">{{naslov}}</h1> 
    <h4 class="podnaslov">{{podnaslov}}</h4>
    <h5 class="maliNaslov">{{maliNaslov}}</h5>
  </div>
</template>

<script>

  export default {
    name: 'Header',
    props: {
      naslov: String,
      podnaslov: String,
      maliNaslov:String
    }
  }

</script>

<style scoped>

  .header,.podnaslov,.maliNaslov
  {
      color: whitesmoke;
  }
  .header {
    
    font-size: 4em;
  }
  .podnaslov
  {
    font-size: 1.5em;
  }
  .maliNaslov
  {
    font-size:1em; 
  }
</style>