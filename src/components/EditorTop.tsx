/*
 * @Author: YeWei Wang
 * @Date: 2022-03-04 15:45:15
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description:Editor-top
 * @LastEditTime: 2022-03-04 23:01:53
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorTop.tsx
 */

import { defineComponent, PropType } from "vue"
import { toolBarRegisterConfig } from "../utils/Tool-Bar"
import { useCommand } from "../hooks/useCommand"
import EditorSizeDialog from "./components/EditorSizeDialog"

export type ToolBar = {
  key: string
  hooksKey: string
}

declare const FNNAME: unique symbol
export type FnMap = {
  [FNNAME: string]: () => void
}

export type ContainerValue = {
  value: {
    container: {
      width: number
      height: number
    }
  }
}

export default defineComponent({
  props: {
    data: Object as PropType<ContainerValue>,
  },
  setup(props) {
    const { ContainerImpl } = useCommand()
    const containerImpl = new ContainerImpl(props.data!.value.container)
    const { dialogVisable, containerWidth, containerHeight, containerValueInput } = containerImpl.create()

    const fnMap: FnMap = {
      changeContainer: () => {
        dialogVisable.value = true
      },
    }

    return () => (
      <div class="editor-top">
        <div class="editor__logo">K4 Kit 智慧低代码平台</div>

        <ul class="editor__toolbar">
          {toolBarRegisterConfig.toolBarLists.map((tool: ToolBar) => (
            <li onClick={fnMap[tool.hooksKey]}>{tool.key}</li>
          ))}
        </ul>

        <EditorSizeDialog
          dialogVisable={dialogVisable}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          containerValueInput={containerValueInput}
          containerImpl={containerImpl}
        />

      </div>
    )
  },
})
