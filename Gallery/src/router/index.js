import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Search from '@/views/Search.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import Galleries from '@/views/Galleries.vue';
import SelectedGallery from '@/views/SelectedGallery.vue';
import GalleryCreation from '@/views/GalleryCreation.vue';
import SlikaView from '@/views/SlikaView.vue';
import NewImage from '@/views/NewImage.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gallery/:id',
    name: 'Gallery',
    component: SelectedGallery
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/Galleries',
    name: 'Galleries',
    component: Galleries
  },
  {
    path: '/GalleryCreation',
    name: 'GalleryCreation',
    component: GalleryCreation
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/image/:id',
    name: 'Slika',
    component: SlikaView
  },
  {
    path: '/newImage/:id',
    name: 'NewImage',
    component: NewImage
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
