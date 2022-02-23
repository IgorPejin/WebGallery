<template>
  <div class="footer">
    <p class="footertext">
        Photo by <a href="https://unsplash.com/@quinoal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Quino Al</a>
        on <a href="https://unsplash.com/s/photos/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Unsplash</a>
    </p>
  </div>
</template>

<script>

  export default {
    name: 'Footer'
  }

</script>

<style scoped>

  a
  {
    color: white;
  }a:hover {color: white;}
  
  .footertext {
    padding-top: 15px;
    margin-top: 1em;
    font-size: 0.8em;
    color: whitesmoke;
  }
</style>