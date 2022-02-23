import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    profileData: [],
    userGalleriesData: [],
    imagesData:[],
    stop:0,
    stop2:0,
    stop3:0,
    stop4:0,
    thumbnail: null,
    imageThumbnail: null,
    searchImages: [],
    query:''
  },

  mutations: {
    addProfileData(state,item)
    {
      state.profileData.push(item);
    },
    UserGalleriesData(state,item)
    {
      if(item!=0 && state.stop==0)
      {
        state.userGalleriesData.push(item);
      }
      else
        state.stop=1
    },
    fillGalleryImages(state,item)
    {
      if(item!=0 && state.stop2==0)
        state.imagesData.push(item);
      else
      {
        state.stop2=1
      }
    },
    delete(state)
    {
      console.log("briseem")
      state.imagesData=[]
    }
    ,
    delete2(state)
    {
      console.log("briseem2")
      state.searchImages=[]
    }
    ,
    thumbnail(state,thumbnail)
    {
      state.thumbnail=thumbnail
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
    searchResults(state,image)
    {
      if(image!=0 && state.stop4==0)
        state.searchImages.push(image)
      else
        state.stop4=1
    }
  },

  actions: {
    search({ commit ,state}, q) {
      return new Promise( (resolve, reject) => {
        fetch(`http://localhost:7000/searchApi`,{
          method: 'GET',
          headers: {
          'Authorization': `Bearer ${localStorage.token}`,
          'Query': `${q}`
        }
        })
          .then( obj => obj.json() )
          .then( res => {
            if(state.stop4==1)
            {
              commit('delete2')
              state.stop4=0
            }
            res.forEach(objekat=>{
              commit('searchResults',objekat)
            });
            commit('searchResults',0)
          });
      });
    },
    getThumbnail({commit,state},putanja)
    {
      return new Promise( (resolve, reject) => {
      fetch('http://localhost:7000/gallery/getThumbnail',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
          'Putanja': `${putanja}`
        }
      })
      .then(res=>res.json())
      .then(data=>{
          function _arrayBufferToBase64( data ) {
            var binary = '';
            var bytes = new Uint8Array( data.data );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
              binary += String.fromCharCode( bytes[ i ] );
            }
            return window.btoa( binary );
          }
          const converted=_arrayBufferToBase64(data)
          commit('thumbnail',converted)
          resolve(converted)
      });
    });
    },
    getImageThumbnail({commit,state},putanja)
    {
      return new Promise( (resolve, reject) => {
      fetch('http://localhost:7000/gallery/getImageThumbnail',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
          'Putanja': `${putanja}`
        }
      })
      .then(res=>res.json())
      .then(data=>{
          function _arrayBufferToBase64( data ) {
            var binary = '';
            var bytes = new Uint8Array( data.data );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
              binary += String.fromCharCode( bytes[ i ] );
            }
            return window.btoa( binary );
          }
          const converted=_arrayBufferToBase64(data)
          commit('thumbnail',converted)
          resolve(converted)
      });
    });
    },
    getImageOriginal({commit,state},id)
    {
      console.log("hello")
      return new Promise( (resolve, reject) => {
      fetch('http://localhost:7000/gallery/getOriginal',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
          'ShowId': `${id}`
        }
      })
      .then(res=>res.json())
      .then(data=>{
          function _arrayBufferToBase64( data ) {
            var binary = '';
            var bytes = new Uint8Array( data.data );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
              binary += String.fromCharCode( bytes[ i ] );
            }
            return window.btoa( binary );
          }
          const converted=_arrayBufferToBase64(data)
          commit('thumbnail',converted)
          resolve(converted)
      });
    });
    },
    getProfile({commit,state})
    {
      fetch('http://localhost:7000/profile',{
        method: 'GET',
        headers: {'Authorization': `Bearer ${localStorage.token}`}
      })
      .then(res=>res.json())
      .then(data=>{

        console.log(data)
        data.forEach(element => {
            Object.values(element).forEach(val => commit('addProfileData',val));
        });
      });
    },
    getUserGalleries({commit,state})
    {
      fetch('http://localhost:7000/userGalleries',{
        method: 'GET',
        headers: {'Authorization': `Bearer ${localStorage.token}`}
      })
      .then(res=>res.json())
      .then(data=>{
        data.forEach(element => {
             commit('UserGalleriesData',element);
        });
        commit('UserGalleriesData',0);
      });
    },
    getGalleryImages({commit,state},id)
    {
      fetch('http://localhost:7000/getGalleryImages/'+id,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
          'GalleryId': `${id}`}
      })
      .then(res=>res.json())
      .then(data=>{
        if(state.stop2==1 )
        {
          commit('delete')
          state.stop2=0
        }
        data.forEach(element => {
             commit('fillGalleryImages',element);
        });
        commit('fillGalleryImages',0)
      });
    },
    register({ commit }, obj) {
      fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res =>res.json() )
        .then( tkn =>
          { 
            if(tkn.msg)
              alert("Check your email and password field.\nPassword should be at least 4 characters long.")  
            else
            {
            if(tkn.token)
              commit('setToken', tkn.token)
            else
              alert("Acces denied!")       
            }
          }
          );
    },
    login({ commit }, obj) {
      fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          commit('setToken', tkn.token)
           window.location.href="/"
        }
      });
    },
    updateUser({commit,state},form)
    {
      const obj={
        username:form.username,
        email:form.email,
        bio:form.bio
      }
      fetch('http://localhost:7000/user/update/', {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res =>res.json() )
        .then( rows =>
          { 
            if(rows)
            {
              alert("Succesfuly updated!")
              window.location.href="/profile"
            }
            else
              alert("Validation error!")
          }
          );
    },
    deleteUser({commit,state},id)
    {
      fetch('http://localhost:7000/user/delete/', {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Deletion_id':`${id}`,
        'Content-Type': 'application/json' },
      }).then( res =>res.json() )
        .then( rows =>
          { 
            if(rows)
            {
              alert("Succesfuly deleted!")
              commit('removeToken')
              window.location.href="/"
            }
            else
              alert("Error!")
          }
          );
    },
    createGallery({commit,state},form)
    {
      fetch('http://localhost:7000/gallery/create/', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json' },
        body: JSON.stringify(form)
        
      }).then( res =>res.json() )
        .then( rows =>
          { 
            if(rows)
            {
              alert("Succesfully created a gallery!")
              window.location.href="/galleries"
            }
            else
            {
              alert("Error!")
            }
          }
          );
    },
    deleteGallery({commit,state},id)
    {
      fetch('http://localhost:7000/gallery/delete/'+id, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Deletion_id':`${id}`,
        'Content-Type': 'application/json' },
      }).then( res =>res.json() )
        .then( rows =>
          { 
            if(rows)
            {
              alert("Succesfuly deleted gallery!")
              window.location.href="/galleries"
            }
            else
              alert("Error!")
          }
          );
    },
    addNewImage({commit,state},form)
    {
      console.log(form)
      fetch('http://localhost:7000/photos/upload/photoPath', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type': 'multipart/form-data',
        'GalleryId': `${form.galleryId}`
        },
        body: form.formData
      }).then( res =>res.json() )
        .then( rows =>
          { 
            if(rows)
            {
              alert("Succesfully created a gallery!")
              window.location.href="/galleries"
            }
            else
            {
              alert("Error!")
            }
          }
          );
    },
    postToDb({commit,state},podaci)
    {
      console.log(podaci.data)
      fetch('http://localhost:7000/photos/uploadPhoto', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(podaci.data)
      }).then( res =>res.json() )
        .then( rows =>
          { 
            fetch('http://localhost:7000/resizePhoto2', {
              method: 'POST',
              headers: {
              'Authorization': `Bearer ${localStorage.token}`,
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(rows)
            }).then( res =>res.json() )
            .then()
            {
              console.log("uspesno")
            }
          }
        );
    }
  }
})
