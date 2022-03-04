/*
 * @Author: YeWei Wang
 * @Date: 2022-03-04 15:45:15
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description:Editor-top
 * @LastEditTime: 2022-03-04 16:22:00
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorTop.tsx
 */

import { defineComponent } from "vue"
import { toolBarRegisterConfig } from "../utils/Tool-Bar"

export type ToolBar = {
  key: string
  hooksKey: string
}

declare const FNNAME: unique symbol
export type FnMap = {
  [FNNAME: string]: () => void
}

export default defineComponent({
  props: ["data"],
  setup() {
    const fnMap: FnMap = {
      chengeEditor: () => {},
    }
    return () => (
      <div class="editor-top">
        <div class="editor__logo">K4 Kit 智慧低代码平台</div>
        <ul class="editor__toolbar">
          {toolBarRegisterConfig.toolBarLists.map((tool: ToolBar) => (
            <li onClick={fnMap[tool.hooksKey]}>{tool.key}</li>
          ))}
        </ul>
      </div>
    )
  },
})
