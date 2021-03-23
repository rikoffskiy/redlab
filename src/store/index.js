import Vue from "vue";
import Vuex from "vuex";
import dataStore from "./modules/db";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dataStore,
  },
});
