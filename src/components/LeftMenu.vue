<template>
  <div>
    <v-navigation-drawer
      v-if="this.$store.state.personalid"
      class="green lighten-4"
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item
          :to="item.link"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import menu from "..//const/menu";
export default {
  props: {
    source: String
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set() {}
    }
  },
  data: () => ({
    dialog: false,
    items: menu
  })
};
</script>

<style scoped>
.v-list .v-list-item--active {
  color: blue;
}
</style>
