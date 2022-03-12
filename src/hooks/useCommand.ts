/*
 * @Author: YeWei Wang
 * @Date: 2022-01-29 15:56:23
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 快捷键
 * @LastEditTime: 2022-03-11 23:49:35
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\hooks\useCommand.ts
 */
import { Ref, ref } from "vue"
import { ContainerValue, DeleteFoucs, BlockFoucesData } from "../components/EditorTop"
// import { IBlocks, IFoucsData } from "../types"

export function useCommand(
) {
  class ContainerImpl {
    private _width: Ref<string> = ref('')
    private _height: Ref<string> = ref('')
    private _dialogVisable: Ref<boolean> = ref(false)
    constructor(public container: ContainerValue['value']['container']) { }

    create() {
      const dialogVisable = this._dialogVisable
      const containerWidth = this._width
      const containerHeight = this._height

      const containerValueInput = (e: string, val: Ref<string>): void => {
        let value: string = e.replace(/[^\d]/g, '')
        val.value = value
      }

      return {
        dialogVisable,
        containerWidth,
        containerHeight,
        containerValueInput
      }
    }

    confirm(
      width: Ref<string>,
      height: Ref<string>
    ) {
      this.container.width = Number(width.value)
      this.container.height = Number(height.value)
      this._dialogVisable.value = false
    }
  }

  const deleteBlock = (
    selectedBlock: DeleteFoucs,
    data: ContainerValue['value']
  ) => {
    selectedBlock?.foucs.forEach((item: BlockFoucesData) => {
      const toDeleteBlockIdx: number = data.blocks.findIndex((block: BlockFoucesData) => {
        return block.id === item.id
      })
      data.blocks.splice(toDeleteBlockIdx, 1)
    })
  }

  const blocksRemake = (
    data: ContainerValue['value']
  ) => {
    data.blocks = []
  }

  return {
    ContainerImpl,
    deleteBlock,
    blocksRemake
  }
}
