/*
 * @Author: YeWei Wang
 * @Date: 2022-01-13 02:27:29
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: foucs hook
 * @LastEditTime: 2022-03-11 17:00:47
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\hooks\useBlockFoucs.ts
 */
import {
  computed,
  ref
} from 'vue'
import {
  IFoucsData
} from '../types'

export function useBlockFoucs(data: any, callback: (e: MouseEvent) => any) {

  // callback(e)
  const selectIndex = ref<number>(-1)

  const lastSelectedBlock = computed<any>(() => {
    return data.value.blocks[selectIndex.value]
  })

  const clearBlockFoucs = (): void => {
    data.value!.blocks.forEach((block: any) => {
      block.foucs = false
    })
    selectIndex.value = -1
  }

  const foucsData = computed<IFoucsData>(() => {
    const foucs: Array<any> = []
    const unFoucs: Array<any> = []
    data.value.blocks.forEach((block: any) => {
      // console.log(block);
      (block.foucs ? foucs : unFoucs).push(block)
    })
    return {
      foucs,
      unFoucs
    }
  })

  const blockMousedown = (e: MouseEvent, block: any, index: number): void => {
    e.preventDefault()
    e.stopPropagation()
    if (e.ctrlKey) {
      (foucsData.value.foucs.length <= 1) ? (block.foucs = true) : (block.foucs = !block.foucs)
    } else {
      if (!block.foucs) {
        clearBlockFoucs()
        block.foucs = true
      }
    }
    selectIndex.value = index
    callback(e)
  }

  return {
    blockMousedown,
    foucsData,
    clearBlockFoucs,
    lastSelectedBlock
  }
}