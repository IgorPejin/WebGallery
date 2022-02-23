<template>
    <div id="slike">

      <b-container class="ctrans mt-5 mb-2" fluid="md">
         <b-container class="wrapper">
             <b-card-img :src="'data:image/png;base64,' + image"></b-card-img>
         </b-container>
    </b-container>
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
    width:100%;
    height: 100%;
    overflow: hidden;
    margin-top: 20px;
}


</style>