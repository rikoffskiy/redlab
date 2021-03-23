<template>
  <div class="table">
    <div class="table-item" v-for="(item, idx) in list.dataList" :key="idx">
      <div class="img"><img :src="imgData(idx)" /></div>
      <div class="name">{{ ru ? item.name.ru : item.name.en }}</div>
      <div class="age">{{ item.age }}</div>
      <div class="phone">{{ item.phone }}</div>
      <div @click="star(item.id)" class="star">
        <img src="/img/star.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
    ru: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    active: function () {
      const itemId = document.querySelectorAll(".table-item .id");
      const starSvg = document.querySelectorAll(".star");
      itemId.forEach((item) => {
        this.active.forEach((i) => {
          if (
            parseInt(item.textContent) == i &&
            !starSvg[parseInt(item.textContent)].classList.contains("active")
          ) {
            starSvg[parseInt(item.textContent)].classList.add("active");
          }
        });
      });
    },
  },

  methods: {
    imgData(idx) {
      const img = this.list.dataList[idx].image;
      const src = `/img/${img}.svg`;
      return src;
    },
    star(id) {
      this.$emit("activeStar", id);
    },
  },
};
</script>

<style src="../css/table.css" scoped></style>
