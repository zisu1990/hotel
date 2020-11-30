
<template>
  <div id="app"  style="min-width:1600px">
    <router-view />
  </div>
</template>
 <script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.isNavActive(this.$route);
  },
  methods: {
    isNavActive(v) {
      let that = this;
      try {
        if (v.matched[1].path == "/room") {
          this.$store.commit("updateNavIsActive", true);
        } else {
          this.$store.commit("updateNavIsActive", false);
        }
      } catch (err) {
        return err;
      }
    },
  },
  watch: {
    $route(v) {
      this.isNavActive(v);
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}
.el-main{
  background: #fff;
}
</style>
