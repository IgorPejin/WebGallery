<template>
  <div>
      <b-container>
        <b-col>
           <b-form-group  @submit.stop.prevent>
            <b-form-input v-model="form.username" required :placeholder="'Username: ' +username"  class="mt-1" id="username"></b-form-input>
            <b-form-input v-model="form.email" required :placeholder="'Email: ' +email"  class="mt-1" id="email"></b-form-input>
            <b-form-textarea
               id="bio"
               class="mt-1"
               v-model="form.bio"
               :placeholder="'Bio:\n' +bio"
               rows="2"
               required
              max-rows="2" no-resize></b-form-textarea>
            <input type="button" class="mt-2 btn btn-outline-primary btn-light" value="Update" @click="validation()">
            <input type="button" class="ml-3 mt-2 btn btn-outline-primary btn-light" value="Delete" @click="deleteButton()">
           </b-form-group>
        </b-col>
      </b-container>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
  export default {
    name: 'ProfileData',
    props: {
      id: Number,
      username: String,
      password: String,
      email: String,
      bio : String
    },
    data()
    {
      return{
        form:{
        username: '',
        email: '',
        bio : ''
        }
      }
    },
    methods: {
      ...mapActions([
        'updateUser',
        'deleteUser'
      ]),
      validation() {
        let username = this.form.username.length
        let email=this.form.email
        let flag=0;
        if(username<3)
          alert("Username should be at least 4 characters long!")
        else if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
          alert("Check your email!")
        else
        {
          console.log(this.id)
          this.updateUser(this.form);
        }
        console.log(flag)
      },
      deleteButton()
      {
        this.deleteUser(this.id)
      }
    }
  }

</script>

<style scoped>
  .header {
    color: whitesmoke;
    font-size: 4em;
  }
  .podnaslov
  {
    color: whitesmoke;
    font-size: 1.5em;
  }
</style>