<template>
  <div id="app">

    <b-container>
        <Header naslov="Log In" class="mb-5"/>
        <b-row align-h="center">
          <b-form  @submit="onSubmit">
            <b-form-input class="mb-3 w-100" id="name" v-model="form.username" placeholder="Username" required></b-form-input>
            <b-form-input class="mb-3 w-100" id="password" v-model="form.password" placeholder="Password" type="password" required></b-form-input>
            <b-button class="mb-2" type="submit" variant="primary">Log in</b-button>
          </b-form>
        </b-row>
        <Footer/>
    </b-container>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Footer from '../components/Footer.vue';

  import { mapActions } from 'vuex';

  export default {
    name: 'Login',
    
    components: {
      Header,
      Footer
    },

    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      onSubmit(e) {
        e.preventDefault();
        this.login(this.form);
        // this.$router.push({ name: 'Home' });
      }
    }
  }
</script>

<style scoped>

</style>
