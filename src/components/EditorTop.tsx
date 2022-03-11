/*
 * @Author: YeWei Wang
 * @Date: 2022-03-04 15:45:15
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description:Editor-top
 * @LastEditTime: 2022-03-11 14:00:38
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorTop.tsx
 */

import { defineComponent, PropType } from "vue"
import { toolBarRegisterConfig } from "../utils/Tool-Bar"
import { useCommand } from "../hooks/useCommand"
import { IFoucsData } from "../types"
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
    },
    blocks: BlockFoucesData[]
  }
}

export type BlockFoucesData = {
  aligenCenter: boolean,
  fouces: boolean,
  height: number,
  id: string,
  key: string,
  left: number,
  top: number,
  width: number,
  zIndex: number,
}

export default defineComponent({
  props: {
    data: Object as PropType<ContainerValue>,
    selectedBlock: Object as PropType<IFoucsData>
  },
  setup(props) {
    /** 编辑页面相关功能模块 */
    const { ContainerImpl } = useCommand()
    const containerImpl = new ContainerImpl(props.data!.value.container)
    const { dialogVisable, containerWidth, containerHeight, containerValueInput } = containerImpl.create()
    /** 删除选中物料 */

    const fnMap: FnMap = {
      changeContainer: () => {
        dialogVisable.value = true
      },
      deleteBlock: () => {
        // 1. 取到当前选中的id
        props.selectedBlock?.foucs.forEach((item: BlockFoucesData) => {
          // 2. 根据id拿到渲染物料数组中的对应项
          const toDeleteBlockIdx: number = props.data!.value.blocks.findIndex(block => {
            return block.id === item.id
          })
          console.log(props.data?.value.blocks)

          props.data!.value.blocks.splice(toDeleteBlockIdx, 1)

          console.log(props.data?.value.blocks)
        })

      }
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
