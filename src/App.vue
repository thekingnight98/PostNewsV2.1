<template>
   <v-app>
    <MainLayout/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import MainLayout from './components/MainLayout'
import store from "./store";
export default {
  name: 'App',
  store,
  components: {
    // HelloWorld,
    MainLayout,
  },

  data: () => ({
    //
  }),
};
</script>
