/*
 * @Author: YeWei Wang
 * @Date: 2022-01-29 15:50:53
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 右侧属性栏
 * @LastEditTime: 2022-01-29 15:51:58
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorRight.tsx
 * @Autor: YeWei Wang
 */

import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <div class="editor-right">
        <h1>属性栏 </h1>
        <p>请先点击一个组件</p>
      </div>
    );
  },
});
