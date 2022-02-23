<template>
    <div>
        <b-form-group>
            <b-form-input v-model="form.name" required :placeholder="'Name: '"  class="mt-1" id="Name"></b-form-input>
            <b-form-input v-model="form.desc" required :placeholder="'Description: '"  class="mt-1" id="desc"></b-form-input>
            <b-form-input v-model="form.tags" required :placeholder="'Tags: '"  class="mt-1" id="tags"></b-form-input>
            <b-form-select v-model="form.media_type" :options="options" class="mt-1"></b-form-select>
            <input type="button" class="mt-2" value="Create" @click="validation()">
        </b-form-group>
    </div>
</template>

<script>

  import { mapActions } from 'vuex';
  export default {
    name: 'Header',
     props: {
        id:Number
    },
    data()
    {
      return{

         options: [
          {value:null,text:'Select media type'},
          { value: 'Wallpapers', text: 'Wallpapers' },
          { value: 'Images', text: 'Images' },
          { value: 'Icons', text: 'Icons' }
        ],
        form:{
        media_type:null,
        name: '',
        desc: '',
        tags : ''
        }
      }
    },
      methods:{
          ...mapActions([
        'createGallery'
      ]),
      validation() {
        let name = this.form.name.length
        let desc=this.form.desc.length
        let selected=this.form.media_type
        let tags=this.form.tags
        if(name<3)
          alert("Gallery should be at least 4 characters long!")
        else if(desc<3)
          alert("Description should be at least 4 characters long!")
          else if(tags<1)
          alert("Add some tags!")
          else if(selected==null)
            alert("Please select what kind of media will u store with us!")
        else
        {
          this.createGallery(this.form);
        }
      },
      }
  }

</script>

<style scoped>

</style>