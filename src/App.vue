<!--
 * @Author: YeWei Wang
 * @Date: 2022-01-04 16:00:28
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 入口
 * @LastEditTime: 2022-01-12 18:46:34
 * @Version: 1.0
 * @FilePath: \k4kit\src\App.vue
-->
<script setup lang="ts">
  import Editor from './packages/Editor'
  import config from './config.json'
  import {
    provide,
    ref
  } from 'vue';
  import {
    IConfig
  } from './types';

  import {
    registerConfig
  } from './utils/Editor-config'

  provide('config', registerConfig)
  const state = ref < IConfig > (config)
</script>

<template>
  <div class="app">
    <Editor v-model="state" />
  </div>
</template>

<style>

</style>