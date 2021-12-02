<template>
  <div class="infoBox">
    <div class="playerInfo whiteSide">
      <div class="stoneImage">
        <div class="stoneCon">
          <p
            class="front whiteShadow"
            style="background-color: rgb(255, 255, 255)"
          ></p>
        </div>
      </div>
      <div class="someInfo">
        <p class="stoneInfo">{{ infoBox.player.white.stoneNum }}</p>
        <p class="playerName">{{ infoBox.player.white.name }}</p>
      </div>
    </div>
    <div class="commandContainer">
      <div
        v-if="infoBox.mode == 'vsPlayer'"
        class="commandItem display mr10"
      >
        <img
          src="@/assets/othelloPage/vsPlayer.png"
          style="margin-bottom: 6.12%"
          alt="対人戦のアイコン"
        />
        <p>対人戦</p>
      </div>
      <div v-else class="commandItem display mr10">
        <img
          src="@/assets/othelloPage/vsCpu.png"
          alt="CPU対戦のアイコン"
        />
        <p>{{ infoBox.cpuStrength }}</p>
      </div>
      <div class="commandItem display">
        <div v-if="turn == 1">
          <img
            src="@/assets/othelloPage/blackStone.png"
            alt="黒石のアイコン"
          />
        </div>
        <div v-else>
          <img
            src="@/assets/othelloPage/whiteStone.png"
            alt="白石のアイコン"
          />
        </div>
        <p>手番</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  reactive,
  ComputedRef,
} from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';
import { InfoBox } from '@/types/type'; // 型定義を読み取る

export default {
  setup() {
    const store = useStore(key);

    const turn: ComputedRef<number> = computed(() => store.getters.getTurn);
    const infoBox = reactive<InfoBox>({
      player: store.state.player,
      mode: store.state.mode,
      cpuStrength: store.state.cpuStrength
    });

    return {
      infoBox,
      turn
    }
  }
}
</script>
