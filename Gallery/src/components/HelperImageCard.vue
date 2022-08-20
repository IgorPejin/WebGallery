<template>
  <div class="pictureWrapper">
    <div id="slike">
      <b-container class="ctrans mt-5 mb-2 toLeft" fluid="md">
         <b-container class="wrapper">
             <b-card-img :src="'data:image/png;base64,' + image"></b-card-img>
         </b-container>
    </b-container>
    </div>
    </div>
</template>
<script>
import { mapActions,mapState } from 'vuex';
export default {
    name: 'ImageCard',
    props: {
     id:String
    },
    computed: {
      ...mapState([
        'imageThumbnail'
      ])
    },
    data()
    {
        return{
            image:null
        }
    },
    mounted()
    {
      {
        this.getImageOriginal(this.id).then(data=>{
           this.image=data
       });
      }
    }
    ,
    methods: {
      ...mapActions([
        'getImageOriginal'
      ])
    }
}
</script>


<style scoped>

.card-img
{
  height: 100%;
  width: 100%;
}
.wrapper {
    width:50%;
    height: 50%;
    overflow: hidden;
    margin-left: 3em;
}
.pictureWrapper
{
  height: 100vh;
}

</style>