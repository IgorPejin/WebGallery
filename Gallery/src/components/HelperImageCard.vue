<template>
  <div class="pictureWrapper">
    <div id="slika">
      <b-container class="ctrans mt-5 mb-2" fluid="md">
         <div class="wrapper">
             <b-card-img :src="'data:image/png;base64,' + image"></b-card-img>
         </div>
            <div class="data">
              {{imageDataRet[0]}}
            </div>
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
        'imageThumbnail',
        'imageDataRet'
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
.ctrans
{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card-img
{
  max-width: 60%;
  max-height: 60%;
  margin-top: 2em;
}
.wrapper {
    width:50%;
    height: 50%;
    margin-left: 0.1em;
}
.pictureWrapper
{
  height: 100vh;
}

</style>