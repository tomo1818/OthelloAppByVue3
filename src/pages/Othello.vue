<template>
  <div class="othello">
    <div class="othelloContainer">
      <div class="pageTitle">
        <p class="h1 mb-5 homeBtn" @click="goHome()">オセロゲーム</p>
      </div>
      <div class="othelloTableContainer">
        <LeftInfoBox></LeftInfoBox>
        <OthelloBoard></OthelloBoard>
        <RightInfoBox></RightInfoBox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OthelloBoard from '@/components/OthelloBoard.vue';
import LeftInfoBox from '@/components/LeftInfoBox.vue';
import RightInfoBox from '@/components/RightInfoBox.vue';

export default {
  name: 'OthelloPage',
  components: {
    OthelloBoard,
    LeftInfoBox,
    RightInfoBox,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    // method

    // const bgColor = (row: number, column: number): string => {
    //   if (row % 2 == 0) return column % 2 == 0 ? "#008833" : "#009900";
    //   else return column % 2 == 0 ? "#009900" : "#008833";
    // }

    const goHome = (): void => {
      location.assign('/');
    };

    // const stone1Num = computed((): number => state.stone1.length)
    // const stone2Num = computed((): number => state.stone2.length)

    // const divs = ref([])
    // onMounted(() => {
    // console.log(divs.value) // [li, li ,li]
    // })

    // const flip = () => {el.classList.toggle("flipped")}

    return {
      goHome,
      // bgColor,
      /*石をひっくり返すモーションをつける関数
        flip: function() => {
        console.log(this.$refs.card);
        console.log(this.$refs.card.classList);
        this.$refs.card.classList.toggle("flipped");
        要素.classList.toggole("flipped");
      } */
    };
  },
};
</script>

<style>
.othello {
  background-image: url('../assets/othelloPage/bg.jpeg');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  -webkit-box-pack: center;
  align-items: center;
}

.homeBtn {
  cursor: pointer;
  transition: all 0.3s;
}

.homeBtn:hover {
  transition: all 0.3s;
  opacity: 0.7;
}

.pageTitle {
  margin-bottom: 50px;
}
.othelloContainer {
  max-width: 1000px;
  margin: 0 auto;
}

.othelloTableContainer {
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
}

.othelloBoard {
  max-width: 459px;
  margin: 0 auto;
}

table.othelloTable {
  border: solid 2px #000;
  border-collapse: collapse;
  border-spacing: 0px;
  table-layout: fixed;
  width: 100%;
  max-height: 459px;
  height: 100%;
}

table.othelloTable tr td {
  width: 12.472648%;
  height: 54px;
  border: solid 1px #fff;
  text-align: center;
  vertical-align: middle;
  font-size: 200%;
  box-sizing: content-box;
}
table.othelloTable tr:first-child td {
  border-top: none;
}
.stoneBox {
  margin: 0 auto;
  max-width: 459px;
  height: 52px;
  background-color: #000;
  box-sizing: content-box;
}
.stoneBox.user1 {
  padding-top: 2px;
  background: linear-gradient(#333333 0%, #555555 100%);
}
.stoneBox.user2 {
  padding-bottom: 2px;
  background: linear-gradient(#333333 0%, #555555 100%);
}
.stoneBox .box {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  border-radius: 3px;
  background: #333;
  background: linear-gradient(#333, #777);
}
.stoneBox.user1 .box {
  justify-content: flex-end;
  -webkit-box-pack: end;
  padding-right: 2px;
  box-shadow: 2px 3px 4px 1px #ccc inset;
}
.stoneBox.user2 .box {
  justify-content: flex-start;
  -webkit-box-pack: start;
  padding-left: 2px;
  box-shadow: -2px -2px 8px -1px #ccc inset;
}
.stoneBox .box .stone {
  /* width: 3.12374%; */
  width: 2.5%;
  margin-right: 0.62374%;
  height: 100%;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%);
  border-radius: 5px;
}

.black {
  color: #000;
}

.white {
  color: white;
}

.full {
  width: 100%;
  height: 100%;
}

.massBtn {
  background-color: transparent;
  border-color: transparent;
}

/* ここから石をひっくり返すcss */
.front,
.back {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-box-pack: center;
  align-items: center;
  backface-visibility: hidden;
  /* width: 100%;
  height: 100%; */

  width: 80%;
  height: 80%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.infoBox {
  width: calc((100% - 539px) / 2);
  margin: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.whiteSide {
  background: -moz-linear-gradient(left, #333, #333 30%, #ffffff 100%);
  background: -webkit-linear-gradient(left, #333 0%, #333 30%, #ffffff 100%);
  background: -o-linear-gradient(left, #333 0%, #333 30%, #ffffff 100%);
  background: -ms-linear-gradient(left, #333 0%, #333 30%, #ffffff 100%);
  background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
}

.blackSide {
  background: -moz-linear-gradient(left, #333, #e33039 70%, #e33039 100%);
  background: -webkit-linear-gradient(left, #333 0%, #e33039 70%, #e33039 100%);
  background: -o-linear-gradient(left, #333 0%, #e33039 70%, #e33039 100%);
  background: -ms-linear-gradient(left, #333 0%, #e33039 70%, #e33039 100%);
  background: linear-gradient(to right, #333 0%, #e33039 70%, #e33039 100%);
}

.playerInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  padding-left: 10px;
  padding-right: 20px;
  border-radius: 10px;
  box-sizing: content-box;
  height: 70px;
}
.stoneImage {
  height: 60px;
  width: 60px;
}

.whiteShadow {
  box-shadow: 1px 1px 4px black;
}

.blackShadow {
  box-shadow: 1px 1px 0px #cccccc;
}

.someInfo {
  color: white;
  font-weight: bold;
  line-height: 1;
}

.stoneInfo {
  font-size: 30px;
}

.playerName {
  font-size: 16px;
}

.stoneCon {
  transition: transform 2s;
  transform-style: preserve-3d;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.stoneCon .back {
  transform: rotateY(180deg);
}
/* クラスflippedを石の要素にtoggleしたらひっくり返せます */
.stoneCon.flipped {
  transform: rotateY(180deg);
}

.commandContainer {
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
}

.commandItem {
  width: calc((100% - 10px) / 2);
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.button :hover {
  opacity: 0.7;
  transition: all 0.3s;
}

.display {
  background-color: white;
  border: 3px solid black;
}

/* .mr10 {
  margin-right: 10px;
} */

.commandItem img {
  width: 60%;
  margin: 0 auto;
  margin-top: 10px;
}

.commandItem:nth-child(2n + 1) {
  margin-right: 10px;
}

.commandItem:nth-child(n + 3) {
  margin-top: 10px;
}
@media screen and (min-width: 1281px) {
  .othelloContainer {
    max-width: 1200px;
  }

  table.othelloTable tr td {
    width: 70px;
    height: 70px;
  }

  .stoneBox {
    max-width: 587px;
    height: 62px;
  }

  .othelloBoard {
    max-width: 587px;
  }

  .infoBox {
    width: calc((100% - 667px) / 2);
  }
}

@media screen and (max-width: 880px) {
  .commandItem:nth-child(n + 3) {
    margin-top: 0px;
  }

  .commandItem:nth-child(2n + 1) {
    margin-right: 0px;
  }

  .commandItem:nth-child(-n + 2) {
    margin-right: 5px;
  }
  .othello {
    height: 100%;
    min-height: 100vh;
  }

  .pageTitle {
    margin-bottom: 0px;
  }
  .infoBox {
    flex-direction: initial;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 459px;
    margin: 20px auto 5px;
  }

  .playerInfo {
    height: 60px;
    padding: 0 10px;
  }

  .stoneImage[data-v-114e02ce] {
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }

  .commandContainer {
    justify-content: end;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
  }

  .justify-start {
    justify-content: start;
    -webkit-box-pack: start;
  }

  .commandItem {
    width: calc((100% - 10px) / 4);
  }

  .commandItem img {
    margin-top: 5px;
  }

  .button {
    background-color: white;
    border: 3px solid black;
  }
}

@media screen and (max-width: 500px) {
  .stoneBox {
    display: none;
  }

  table.othelloTable tr td {
    width: 43px;
    height: 43px;
  }

  .full {
    max-height: 43px;
  }

  .othelloContainer {
    max-width: 375px;
  }

  .button {
    width: calc((100% - 10px) / 3.1);
  }
}
</style>
