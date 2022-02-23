<template>
    <div id="app">

        <GalleriesData :podaci=userGalleriesData />
       
    </div>
</template>

<script>

import GalleriesData from '@/components/GalleriesData.vue';
import { mapActions,mapState } from 'vuex';

export default {
    name:'Galleries',
    components: {
      GalleriesData
    },
    computed: {
      ...mapState([
        'userGalleriesData'
      ])
    },
    
    mounted()
    {
        this.getUserGalleries();
    },
    methods: {
        ...mapActions([
        'getUserGalleries'
      ]),
    }
}
</script>

<style scoped>

</style>