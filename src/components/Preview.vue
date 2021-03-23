<template>
  <div class="preview" v-on="updateHeight()">
    <div class="preview-item" v-for="(item, idx) in list.dataList" :key="idx">
      <div v-if="item.video">
        <video
          class="video"
          :autoplay="auto"
          controls
          :src="videoData(idx)"
        ></video>
      </div>

      <div class="data" v-else>
        <div class="preview-header">
          <div class="img"><img :src="imgData(idx)" /></div>
          <div class="name">{{ ru ? item.name.ru : item.name.en }}</div>
          <div @click="star(item.id)" class="star">
            <img src="/img/star.svg" />
          </div>
        </div>
        <div class="preview-body">
          <div class="age">{{ item.age }}</div>
          <div class="phone">{{ item.phone }}</div>
          <div class="phrase">{{ ru ? item.phrase.ru : item.phrase.en }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preview",
  data: () => ({
    auto: true,
    windowHeight: 0,
    videos: [],
  }),
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
  created() {
    window.addEventListener("resize", this.updateHeight);
  },
  watch: {
    windowHeight: function () {
      console.log(this.windowHeight);
    },
    active: function () {
      const itemId = document.querySelectorAll(".table-item .id");
      const starSvg = document.querySelectorAll(".star");
      itemId.forEach((item) => {
        this.active.forEach((i) => {
          if (
            parseInt(item.textContent) == i &&
            !starSvg[parseInt(item.textContent)].classList.contains("active")
          ) {
            console.log("hdf");
            starSvg[parseInt(item.textContent)].classList.add("active");
          }
        });
      });
    },
  },
  mounted() {},
  methods: {
    imgData(idx) {
      const img = this.list.dataList[idx].image;
      const src = `/img/${img}.svg`;
      return src;
    },
    videoData(idx) {
      const video = this.list.dataList[idx].video;
      const src = `/video/${video}.mp4`;
      return src;
    },
    star(id) {
      this.$emit("activeStar", id);
    },
    updateHeight() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>

<style src="../css/preview.css" scoped></style>
