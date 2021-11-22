<template>
  <div class="home back pt-10">

  <div class="othelloTitle">
    <h1 class="othello">オセロ</h1>
  </div>

  <div class="startBtn">
    <router-link
      v-if="opponent == 'vsCpu'"
      class="btn btn-primary"
      :to="{
        name: 'Othello',
        params: { mode: opponent, strength: difficulty },
      }"
      >スタート</router-link
    >
    <router-link
      disabled
      v-else
      class="btn btn-primary"
      :to="{
        name: 'Othello',
        params: { mode: opponent, name1: playerName1, name2: playerName2 },
      }"
      >スタート</router-link
    >
     </div>

     <div class="settingBtn">
    <router-link class="btn btn-primary" to="/setting"
      >ゲーム設定画面へ</router-link
    >
  </div>

  </div>
</template>

<script>
export default {
    name
}
</script>

<style scoped>
    .back {
      background-image:url("../assets/othello.png");
      width:100%;
      height:825px;
      padding-top:200px;
    }

    .othelloTitle {
        font-size:70px;
        margin-top:-100px;
    }

    .othello {
      color:rgb(31, 185, 196)
    }

    .settingBtn {
      margin-left: 300px;
      margin-top:-50px;
    }

    .startBtn {
      margin-right: 300px;
      margin-top: 100px;
    }
</style>
