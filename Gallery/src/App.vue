<template>
  <div id="app">
    <div >
      <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">
        <b-navbar-brand to="/">Web Gallery</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

           <b-navbar-nav>
              <b-nav-form>
                <b-form-input v-model="searchQuery" class="mr-sm-2 w-100 dugme" placeholder="Search photos"></b-form-input>
              </b-nav-form>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-button @click="search"  size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-navbar-nav>

          <b-navbar-nav class="ml-auto">

            <b-nav-item v-if="!token" to="/register">Sign Up</b-nav-item>
            <b-nav-item v-if="token" to="/profile">Profile</b-nav-item>
            <b-nav-item v-if="token" to="/Galleries">Galleries</b-nav-item>

            <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
            <b-nav-item v-else @click="logout()" to="/">Log Out</b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view class="stranica" />

  </div>
</template>

<script>
  import {  mapState, mapMutations } from 'vuex';

  export default {
    name: 'App',

    data() {
      return {
        searchQuery: '',
        refresh: 0,
      }
    },

    computed: {
      ...mapState([
        'token'
      ])
    },

    mounted() {
        
      if (localStorage.token) {
        this.setToken(localStorage.token);
      }
      
    },

    methods: {

      ...mapMutations([
        'removeToken',
        'setToken'
      ]),

      search(e) {

        if (this.refresh==1) {
            const sq = this.searchQuery;
            this.searchQuery = '';  
            this.$router.push({ name: 'Search', query: { q: sq } });
            localStorage.removeItem('reloaded');
            window.location.reload()
            return
        } else if(this.refresh==0) {
          this.refresh=1
          this.search()
        }

        e.preventDefault();
        const sq = this.searchQuery;
        this.searchQuery = '';     
        this.dugme=1   
        this.$router.push({ name: 'Search', query: { q: sq } });
        
      },

      logout() {
        this.removeToken();
      }
    }
  }
</script>

<style>
  body
  {
    background: url("../public/sun.jpg") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding-bottom: 10px;
    height: 100vh;
  }
  .stranica {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
  }
  .navbar.navbar-dark.bg-dark{
    background-color: rgba(0,0,0,0.2)!important;
  }

</style>
