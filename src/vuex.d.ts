import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // ストアのステートを宣言する
  interface State {
    count: number,
    table: {[key: number]: {[key: number]: number | null}},
    stone1: number[],
    stone2: number[],
  }

  // `this.$store` の型付けを提供する
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
