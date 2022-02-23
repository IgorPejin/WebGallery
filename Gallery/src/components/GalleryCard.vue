<template>
    <div>
       <b-card-img v-if="image" :src="'data:image/png;base64,' + image"> </b-card-img>
       <b-card-img v-else src="/sun.jpg"></b-card-img>
    </div>
</template>
<script>
import { mapActions,mapState } from 'vuex';
export default {
    name: 'GalleryCard',
    props: {
     putanja:String
    },
    computed: {
      ...mapState([
        'thumbnail'
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
       this.getThumbnail(this.putanja).then(data=>{
          //  console.log(data)
           this.image=data
       });
    }
    ,
    methods: {
      ...mapActions([
        'getThumbnail'
      ])
    }
}
</script>


<style scoped>

.card-img
{
  height: 100%;
  width: 120px;
}

</style>