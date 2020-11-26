<template>
  <div class="homeContainer">
    <vHeader></vHeader>

    <div class="headContainer">
      <vAside></vAside>
      <div class="tagContainer">
        <vTag></vTag>
        <div class="mainContainer">
          <div class="main">
            <router-view></router-view>
          </div>
          <!-- <vFooter class="footer"></vFooter> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from "@/views/common/header";
import vAside from "@/views/common/aside";
import vTag from "@/views/common/tag";
// import vFooter from "@/views/common/footer";

export default {
  data() {
    return {};
  },
  components: { vHeader, vAside, vTag },
};
</script>
 <style lang="less" scoped>
.homeContainer {
  // border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  .headContainer {
    // border: 1px solid red;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    .tagContainer {
      //  border: 1px solid blue;
      display: flex;
      flex-flow: column nowrap;
      flex: 1;

      .mainContainer {
        // border: 1px solid blue;

        box-sizing: border-box;
        display: flex;
        flex-flow: column nowrap;
        flex: 1;

        overflow: auto;

        .main {
          // border:1px solid green;
          padding-top: 20px;
          padding-left: 20px;
          display: flex;
          flex: auto;
          // overflow: auto;
          background: #f3f3f3;
        }
      }
    }
  }
}
</style>
