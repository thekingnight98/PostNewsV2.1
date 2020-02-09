<template>
  <div id="app">
    <v-container>
      <v-row align="center" justify="center">
        <v-col>
          <h1>Facebook login</h1>
          <h2>กรุณา Login ก่อนเข้าใช้งาน</h2>
          <facebook-login
            class="button"
            appId="183951052962860"
            @login="onLogin"
            @logout="onLogout"
            @sdk-loaded="sdkLoaded"
          >
          </facebook-login>
          <img v-if="!isConnected" :src="loginImage" class="login" />
          <div v-if="isConnected" class="information">
            <div class="well">
              <div class="list-item">
                <img :src="loginImage" />
                <i>{{ name }}</i>
              </div>
              <div class="list-item">
                <img :src="mailImage" />
                <i>{{ email }}</i>
              </div>
              <div class="list-item">
                <img :src="faceImage" />
                <i>{{ personalID }}</i>
              </div>
              <h2>ยินดีต้อนรับคุณ : {{ $store.getters.personalid }}</h2>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import facebookLogin from "facebook-login-vuejs";

export default {
  components: {
    facebookLogin
  },
  data() {
    return {
      idImage: "",
      loginImage: "",
      mailImage: "",
      faceImage: "",
      isConnected: false,
      name: "",
      email: "",
      personalID: "",
      FB: undefined
    };
  },
  methods: {
    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email" },
        userInformation => {
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
          //commit ค่า ส่งไป mutations update ค่า personalID ให้ แสดงชื่อผู้ใช้แทน ID
          this.$store.commit("setPersonal", this.name);

          //   console.log(this.personalID);
          //   console.log(this.email);
          // console.log(this.name);
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
      this.$store.state.personalid = null;
    },
    assignToStore() {}
  }
};
</script>

<style scoped>
/* #app {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
} */
.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
  /* display:inline-block; */
}
.login {
  width: 200px;
  margin: auto;
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>
