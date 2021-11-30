<template>
  <div class="backImg pt-10 vh-100">
    <div class="othelloTitleDiv mt-10">
      <h1 class="othelloTitle my-5">Othello</h1>
    </div>
    <div class="settingBtn">
      <router-link
        class="
          p-3
          hover:bg-gray-100 hover:bg-opacity-25
          btn
          border-gray-100
          hover:border-gray-100
          text-white
          rounded-full
          shadow-3xl
        "
        to="/setting"
        >スタート</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';

export default {
  name,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const route = useRoute();
    const settingData = route.params;

    return {
      settingData,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&family=M+PLUS+2:wght@700&display=swap');
.backImg {
  background-image: url('../assets/othello.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}

.backImg {
  background-image: url('../assets/othello.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}

.othelloTitleDiv {
  font-size: 80px;
}

.othelloTitle {
  color: rgb(0, 0, 0);
  font-family: 'Libre Baskerville', serif;
}

.settingBtn {
  position: absolute;
  top: 50%;
  left: calc(50% - 10px);
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.startBtn {
  margin-top: 160px;
  margin-right: 20px;
}
</style>
