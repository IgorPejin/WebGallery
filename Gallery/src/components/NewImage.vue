<template>
    <div>
        <div class="file">
          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
          <div class="fields">
            <label> Upload File</label><br/>
            <input type="file"
            ref="file"
            @change="onSelect"
            />
          </div>
          <div class="fields">
            <button class="btn btn-outline-primary btn-light" v-if="!message">Submit</button>
          </div>
          <div class="message">
            <h5>{{message}}</h5>
          </div>
          </form>
        </div>
    </div>
</template>

<script>

  import { mapActions } from 'vuex';
  import axios from 'axios'
  export default {
    name: 'Header',
     props: {
        id:Number
    },
    data()
    {
      return{
          file:"",
          message:""
      }
    },
      methods:{
        ...mapActions([
        'postToDb'
      ]),
        onSelect(){
          this.message=''
          const file=this.$refs.file.files[0]
          this.file=file;
          const allowedTyped=["image/jpg","image/png","image/jpeg"]
          if(!allowedTyped.includes(file.type))
          {
            this.message="Only images are required"
          }
          if(file.size>300000)
            this.message="Too large or unsported!"
        },
        async onSubmit()
        {
          const formData=new FormData()
          formData.append('file',this.file)
          let config = {
             headers: {
              Authorization: `Bearer ${localStorage.token}`,
              GalleryId:this.id
              }} 
          try{
            axios.post('http://localhost:7000/photos/upload/',formData,config)
            .then(podaci=>{
               this.postToDb(podaci)
               this.message='Uploaded'
               window.location.href='/gallery/'+this.id
            })
           
          }
          catch(err)
          {
            this.message='Something went wrong'
          }
        }
      }
     
      
  }

</script>

<style scoped>

</style>