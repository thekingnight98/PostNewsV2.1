<template>
  <div id="main">
    <v-container>
      <div class="indigo lighten-1 white--text title pd-title">
        รายการข่าววันนี้
        <v-row>
          <v-col>
            <h2 class="white--text">
              ยินดีต้อนรับคุณ : {{ $store.getters.personalid }}
            </h2>
          </v-col>
        </v-row>
      </div>
      <br />
      <!-- Card -->
      <v-card
        v-for="(news, index) in NewsObj"
        :key="index"
        class="mx-auto mg-card"
        max-width="700"
      >
        <v-row >
          <v-container>
            <v-col>
              <img :src="news.profileImg"/>
            </v-col>
          </v-container>
        </v-row>

        <v-card-title>
          <!-- Top western road trips -->
          {{ news.title }}
        </v-card-title>

        <v-card-subtitle class="red--text">
          #Tag : {{ news.tags.map(tag => tag) }}
        </v-card-subtitle>
        <v-card-subtitle>
          <div>ประเภท : {{ news.category }}</div>
        </v-card-subtitle>

        <v-card-actions>
          <v-card-text class="caption">
            โพสเมื่อวันที่ : {{ news.createdAt.substring(0, 10) }}
          </v-card-text>
          <v-spacer></v-spacer>
          <v-btn id="more" text small @click="show = !show">Full view..</v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              {{ news.detail }}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <!-- End Card -->
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mainpage",
  components: {},
  data() {
    return {
      show: false,
      NewsObj: null
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/news")
      .then(data => {
        // var base64Flag = 'data:image/jpeg;base64,';
        // var imageStr = this.arrayBufferToBase64(data.profileImg.data);

        this.NewsObj = data.data;
        console.log(this.NewsObj);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.mg-card {
  margin: 20px;
}
.pd-title {
  padding: 10px;
}

img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 400px;
  height: 300px;
}
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
} 
</style>
