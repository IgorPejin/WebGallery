<template>
  <div id="app">
    <b-container>
        <Header naslov="Sign up" class="mb-4 mt-3"/>
        <b-row align-h="center">
          <b-form  @submit="onSubmit">
            <b-form-input class="mb-3 w-100" id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
            <b-form-textarea class="mb-3 w-100" 
              id="bio" v-model="form.bio" 
              placeholder="Tell us about yourself"
              rows="2"
              max-rows="2"
              no-resize
            >
            </b-form-textarea>
            <b-form-input class="mb-3 w-100" id="username" v-model="form.username" placeholder="Username" required></b-form-input>
            <b-form-input class="mb-3 w-100" id="password" v-model="form.password" placeholder="Password" type="password" required></b-form-input>
            <b-button class="mb-2" type="submit" variant="primary">Sign up</b-button>
          </b-form>
        </b-row>
        <Footer/>
    </b-container>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue'
  import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    
    components: {
      Header,
      Footer
    },

    data() {
      return {
        form: {
          email: '',
          bio:'',
          username: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      onSubmit(e) {
        e.preventDefault();
        this.register(this.form);

        if(this.form.password.length < 4)
          this.$router.push({name:'Register'})
        else
          this.$router.push({ name: 'Home' });
      }
    }
  }
</script>

<style scoped>

</style>
