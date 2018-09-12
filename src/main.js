import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import VueApollo from 'vue-apollo'
import { apolloClient } from './apollo-client'

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false;

Vue.filter('fromNow', function (date) {
  return moment(date).fromNow();
});

new Vue({
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')
