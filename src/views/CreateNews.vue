<template>
  <div id="createnews">
    <v-container>
      <h3>สร้างรายการข่าว</h3>
      <template>
        <v-form
          ref="form"
          @submit.prevent="submit"
          enctype="multipart/form-data"
          lazy-validation
        >
          <v-text-field
            v-model="title"
            :counter="100"
            :rules="titleRules"
            label="Title"
            required
          ></v-text-field>
          <br />

          <!-- <div class="fields">
            <label>Upload File</label><br />
            <input type="file" ref="file" @change="onSelect" />
          </div>
          <div class="fields">
            <button>Submit</button>
          </div> -->
          <div class="message">
            <h5>{{ message }}</h5>
          </div>

          <br />
          <v-textarea
            solo
            class="mt-6"
            name="detail"
            v-model="detail"
            :counter="10000"
            :rules="detailRules"
            label="กรอกรายละเอียดที่นี่.."
            rows="15"
            required
          ></v-textarea>

          <v-select
            v-model="category"
            :items="items"
            :rules="[v => !!v || 'โปรดเลือกประเภทของข่าว']"
            label="Category"
            required
          ></v-select>
          <v-row>
            <v-col md="10" sm="12">
              <vue-tags-input
                v-model="tag"
                :tags="tags"
                :validation="validation"
                @tags-changed="newTags => (tags = newTags)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12">
              <v-btn color="warning" class="mr-4 mt-2" @click="validate">
                ตรวจเช็ค
              </v-btn>

              <v-btn color="error" class="mr-4 mt-2" @click="reset">
                Reset ฟอร์ม
              </v-btn>

              <v-btn type="submit" class="mr-4 mt-2" color="success">
                สร้างรายการข่าว
              </v-btn>

              <!-- Modal -->
              <v-dialog v-model="dialog" persistent max-width="600">
                <template v-slot:activator="{ on }">
                  <v-btn class="mr-4 mt-2" color="primary" dark v-on="on"
                    >Preview</v-btn
                  >
                </template>
                <v-card>
                  <!-- Card -->
                  <v-card class="mx-auto mg-card" max-width="700">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="200px"
                    ></v-img>

                    <v-card-title class="title">
                      <!-- Top western road trips -->
                      {{ title }}
                    </v-card-title>

                    <v-card-subtitle class="red--text">
                      #Tag : {{ tags.map(tag => tag.text) }}
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn
                        @click="onSubmit"
                        type="submit"
                        class="mr-4 mt-2"
                        color="success"
                      >
                        สร้างรายการข่าว
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn id="more" text small @click="show = !show"
                        >Full view..</v-btn
                      >
                      <v-btn color="red darken-1" text @click="dialog = false"
                        >Close</v-btn
                      >
                    </v-card-actions>

                    <v-expand-transition>
                      <div v-show="show">
                        <v-divider></v-divider>

                        <v-card-text>
                          {{ detail }}
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-card>
                  <!-- End Card -->
                </v-card>
              </v-dialog>
              <!-- End Modal -->
            </v-col>
          </v-row>
        </v-form>
      </template>
    </v-container>
  </div>
</template>

<script>
// import Taginput from "@/components/Taginput.vue";
// import Taglist from "@/components/Taglist.vue";
import axios from "axios";
import VueTagsInput from "@johmun/vue-tags-input";
import Swal from "sweetalert2";

export default {
  name: "createnews",
  components: {
    VueTagsInput
  },
  data() {
    return {
      valid: true,
      title: "",
      titleRules: [
        v => !!v || "ต้องการหัวข้อข่าว..",
        v => (v && v.length <= 100) || "Title must be less than 20 characters"
      ],
      detail: "",
      detailRules: [
        v => !!v || "ต้องการรายละเอียดข่าว..",
        v =>
          (v && v.length <= 10000) ||
          "detail must be less than 10000 characters"
      ],
      tag: "",
      tags: [],
      category: null,
      items: ["ข่าวการเมือง", "ข่าวสังคม", "ข่าวเศรษฐกิจ", "ข่าวอาชญากรรม"],
      dialog: false,
      show: false,
      validation: [
        {
          classes: "min-length",
          rule: tag => tag.text.length < 2
        },
        {
          classes: "avoid-item",
          rule: /^(?!Cannot).*$/,
          disableAdd: true
        },
        {
          classes: "no-braces",
          rule: ({ text }) =>
            text.indexOf("{") !== -1 || text.indexOf("}") !== -1
        }
      ],
      selectFile: null,
      coverImageName: "",
      file: "",
      message: ""
    };
  },
  methods: {
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
      }
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("file", this.file);
      const postnews = {
        title: this.title,
        detail: this.detail,
        category: this.category,
        file: formData,
        tags: this.tags
      };
      console.log(postnews);
      try {
        await axios.post("http://localhost:5000/news/add", postnews);
        // this.message = 'Uploaded!!'
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
      }
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      const postnews = {
        title: this.title,
        detail: this.detail,
        category: this.category,
        file: this.file,
        tags: this.tags
      };
      console.log(postnews);
      axios
        .post("http://localhost:5000/news/add", postnews)
        .then(res => {
          if (res.data) {
            // alert("Create News Success");
            Swal.fire({
              icon: "success",
              title: "Create success",
              showConfirmButton: false,
              timer: 1500
            });
          }
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "โปรดกรอกข้อมูลให้ครบถ้วน!"
          });
        });
    }
  }
};
</script>

<style></style>
