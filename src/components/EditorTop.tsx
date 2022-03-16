/*
 * @Author: YeWei Wang
 * @Date: 2022-03-04 15:45:15
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description:Editor-top
 * @LastEditTime: 2022-03-16 18:16:11
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorTop.tsx
 */

import { defineComponent, PropType } from "vue"
import { toolBarRegisterConfig } from "@/utils/Tool-Bar"
import { useCommand } from "@/hooks/useCommand"
import type { FoucsData } from "@/types"
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


export type DeleteFoucs = {
  foucs: BlockFoucesData[],
  // unfoucs: []
}

export default defineComponent({
  props: {
    data: Object as PropType<ContainerValue>,
    selectedBlock: Object as PropType<FoucsData>
  },
  setup(props) {
    // useCommand hooks
    const { ContainerImpl, deleteBlock, blocksRemake, saveInLocal } = useCommand()
    /** 编辑页面相关功能模块 */
    const containerImpl = new ContainerImpl(props.data!.value.container)
    const { dialogVisable, containerWidth, containerHeight, containerValueInput } = containerImpl.create()

    /** 函数表 */
    const fnMap: FnMap = {
      changeContainer: () => {
        dialogVisable.value = true
      },
      deleteBlock: () => {
        deleteBlock(props.selectedBlock!!, props.data!.value)
      },
      blocksRemake: () => {
        // 可以加以个确认框，下次再做吧。
        // 需要重构弹窗组件，减少代码量。
        blocksRemake(props.data!.value)
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

        {/* 不够优雅、待更新 */}
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
