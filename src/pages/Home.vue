<template>
  <div class="backImg pt-10 vh-100">
    <div class="othelloTitleDiv">
      <h1 class="othelloTitle">Othello</h1>
    </div>
    <div class="startBtn">
      <router-link
        class="p-3 btn hover:bg-gray-100 hover:bg-opacity-25 text-white rounded-full border-gray-100 hover:border-gray-100 shadow-3xl"
        :to="{name:'Othello',
        params: { mode: opponent, strength: difficulty, colorTheme: colorTheme  },
        params: { mode: opponent, name1: playerName1, name2: playerName2, colorTheme: colorTheme  }
        }"
        >スタート</router-link>
    </div>
    <div class="settingBtn mt-5">
      <router-link class="p-3 hover:bg-gray-100 hover:bg-opacity-25 btn border-gray-100 hover:border-gray-100 text-white rounded-full shadow-3xl" to="/setting"
      >ゲーム設定</router-link
    >
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&family=M+PLUS+2:wght@700&display=swap');
  .backImg {
    background-image:url("../assets/othello.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width:100%;
    height:100%;
    padding-top:200px;
  }

  .backImg {
    background-image:url("../assets/othello.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width:100%;
    height:100%;
    padding-top:200px;
  }

  .othelloTitleDiv {
    font-size:80px;
    margin-top:-100px;
  }

  .othelloTitle {
    color:rgb(0, 0, 0);
    font-family: 'Libre Baskerville', serif;
  }

  .settingBtn {
    margin-right:10px;
  }

  .startBtn {
    margin-top: 160px;
    margin-right:20px;
  }
</style>