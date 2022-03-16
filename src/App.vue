<!--
 * @Author: YeWei Wang
 * @Date: 2022-01-04 16:00:28
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 入口
 * @LastEditTime: 2022-03-16 18:05:02
 * @Version: 1.0
 * @FilePath: \k4kit\src\App.vue
-->
<script setup lang="ts">
import Editor from './packages/Editor'
import type { Config } from './types'
import {
  provide,
  ref
} from 'vue';

import {
  registerConfig
} from './utils/Editor-config'

const config: Config = window.localStorage.getItem('config') ? (JSON.parse(window.localStorage.getItem('config')!!)) as Config : {
  blocks: [],
  container: {
    width: 550,
    height: 650
  }
}

provide('config', registerConfig)
const state = ref<Config>(config)

</script>

<template>
  <div class="app">
    <Editor v-model="state" />
  </div>
</template>

<style>
</style>