import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(Vuetify);
Vue.use(VueSweetalert2);

export default new Vuetify({
    icons: {
        iconfont: 'md',
    },
});