<template>
     <HelperImageCard  :id="this.$route.params.id"/>
</template>

<script>

  import { mapActions,mapState } from 'vuex';
  import HelperImageCard from '@/components/HelperImageCard.vue';
  export default {
    name: 'SelectedGallery',
    components: {
        HelperImageCard
    }
  }

</script>

<style scoped>

</style>
