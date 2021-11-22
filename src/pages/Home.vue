<template>
  <div class="home back pt-10">

  <div class="othelloTitle">
    <h1 class="othello">Othello</h1>
  </div>

  <div class="startBtn">
    <router-link
      class="p-3 btn hover:bg-gray-900 text-white rounded-full border-gray-100 hover:border-gray-900 shadow-xl"
      to='Othello'
      >スタート</router-link>
     </div>

     <div class="settingBtn">
        <router-link class="p-3 hover:bg-gray-900 btn border-gray-100 hover:border-gray-900 text-white rounded-full shadow-xl" to="/setting"
      >ゲーム設定画面へ</router-link
    >
  </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&family=M+PLUS+2:wght@700&display=swap');
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
      color:rgb(0, 0, 0);
      font-family: 'Libre Baskerville', serif;
    }

    .settingBtn {
      margin-left: 370px;
      margin-top:-70px;
    }

    .startBtn {
      margin-right: 340px;
      margin-top: 100px;
    }
</style>


















