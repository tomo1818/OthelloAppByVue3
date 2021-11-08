<template>
  <div class="othello">
    <div class="">
      <h1>オセロページです</h1>
      <div>
        <p>{{ count }}</p>
        <button @click="increment">add count</button>
      </div>
      <div>
        <p>{{ table }}</p>
        <button @click="showTable">show table at console</button>
      </div>
      <div class="othelloContainer">
        <div class="stoneBox user1">
          <div class="box">
            <div class="stone" v-for="(stone, index) in stone1" v-bind:key="index"></div>
          </div>
        </div>
        <table class="othelloTable">
          <tbody>
            <tr v-for="(value, rowNum, index) in table" v-bind:key="index">
              <td v-for="(value2, columnNum, index2) in value" v-bind:key="index2">{{ value2 }}</td>
            </tr>
          </tbody>
        </table>
        <div class="stoneBox user2">
          <div class="box">
            <div class="stone" v-for="(stone, index) in stone2" v-bind:key="index"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed} from "vue"
import { useStore } from 'vuex'
import { key } from '../store'

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup () {
    const store = useStore(key)

    return {
      // state を呼び出す場合
      count: computed(()=>store.state.count),
      table: computed(()=>store.state.table), // オセロ盤の状態
      stone1: computed(()=>store.state.stone1), // user1の残りの石
      stone2: computed(()=>store.state.stone2), // user2の残りの石
      // mutation を呼び出す場合
      increment:() =>store.commit("increment"),
      // storeからの受け渡し確認用
      showTable:(() => {
        console.log(store.state.table);
      })
    }
  }
}
</script>

<style scoped>
table.othelloTable {
    background:      #090;
    border:          solid 2px #000;
    border-collapse: collapse;
    border-spacing:  0px;
    table-layout:    fixed;
    max-width: 960px;
    margin: 0 auto;
}
table.othelloTable tr td {
    width:           54px;
    height:          54px;
    border:solid 1px #fff;
    text-align:      center;
    vertical-align:  middle;
    font-size:       200%;
}
table.othelloTable tr:first-child td{
  border-top: none;
}
.stoneBox {
  margin: 0 auto;
  max-width: 459px;
  height: 52px;
  background-color: #000;
}
.stoneBox.user1 {
  padding-top: 2px;
}
.stoneBox.user2 {
  padding-bottom: 2px;
}
.stoneBox .box {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.stoneBox.user1 .box{
  justify-content: flex-end;
}
.stoneBox.user2 .box {
  justify-content: flex-start;
}
.stoneBox .box .stone {
  width: 11.47px;
  height: 100%;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%);
}
</style>
