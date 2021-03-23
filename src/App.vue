<template>
  <div id="app">
    <Header
      @changeLang="changeLang"
      @showPreview="showOrHide"
      @showTable="showOrHide"
      @sortId="sortDataId(dataList.dataList)"
      @sortName="
        ru
          ? dataList.dataList.sort(
              sortDataName('name', 'ru', dataList.dataList)
            )
          : dataList.dataList.sort(
              sortDataName('name', 'en', dataList.dataList)
            )
      "
      @sortAge="sortDataAge(dataList.dataList)"
      @sortUnReverse="reverseFalse(dataList.dataList)"
      @sortReverse="reverseTrue(dataList.dataList)"
    />
    <Table
      @activeStar="addActiveStar"
      :ru="ru"
      :list="dataList"
      :active="active"
      v-if="isTable"
    />
    <Preview
      @activeStar="addActiveStar"
      :ru="ru"
      :active="active"
      :list="dataList"
      v-else
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import Preview from "./components/Preview.vue";

export default {
  name: "App",
  components: {
    Header,
    Table,
    Preview,
  },
  data: () => ({
    ru: true,
    isTable: true,
    toggler: true,
    active: [],
  }),
  computed: {
    ...mapGetters("dataStore", ["dataList"]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    showOrHide(check) {
      this.isTable = check;
    },
    ...mapActions("dataStore", ["fetchData"]),
    sortDataId(arr) {
      arr.sort(function (a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
      });
      this.toggler = true;
    },
    sortDataName(objField, prop, arr) {
      arr.sort(function (a, b) {
        if (a[objField][prop] < b[objField][prop]) {
          return -1;
        } else if (b[objField][prop] > a[objField][prop]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.toggler = true;
    },
    sortDataAge(arr) {
      arr.sort(function (a, b) {
        return parseFloat(a.age) - parseFloat(b.age);
      });
      this.toggler = true;
    },
    reverseTrue(arr) {
      if (this.toggler === true) {
        arr.reverse();
        this.toggler = false;
      }
    },
    reverseFalse(arr) {
      if (this.toggler === false) {
        arr.reverse();
        this.toggler = true;
      }
    },
    changeLang() {
      if (this.ru) {
        this.ru = false;
      } else this.ru = true;
    },
    addActiveStar(id) {
      this.active.push(id);
    },
  },
};
</script>

<style src="./css/app.css"></style>
