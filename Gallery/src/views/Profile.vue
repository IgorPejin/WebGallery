<template>
    <div id="app">
        <b-container class="w-80">
          <b-row align-h="between">
            <Header 
            :naslov=" 'Welcome ' + profileData[1] + ' !' "
            maliNaslov="You can edit your info anytime you want!"
             />
            <!-- Redosled kao u bazi za entitet User -->
            <ProfileData 
                :id=profileData[0]
                :username=profileData[1]
                :password=profileData[2]
                :email=profileData[4]
                :bio=profileData[5]
            />
          </b-row>
        </b-container>
    </div>
</template>

<script>
 import Header from '@/components/Header.vue';
 import ProfileData from '@/components/ProfileData.vue';
 import { mapActions,mapState } from 'vuex';
export default{
    name:'Profile',
    components: {
      Header,
      ProfileData
    },
    computed: {
      ...mapState([
        'profileData'
      ])
    },
    data()
    {
      return{
        
      }
    },
    mounted()
    {
        this.getProfile();
    },
    methods: {
      ...mapActions([
        'getProfile'
      ])
    }
}
</script>

<style scoped>

</style>