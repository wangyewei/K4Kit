/*
 * @Author: YeWei Wang
 * @Date: 2022-01-13 02:27:29
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: foucs hook
 * @LastEditTime: 2022-01-13 22:23:02
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\hooks\useBlockFoucs.ts
 * @Autor: YeWei Wang
 */
import { computed } from 'vue'
import { IFoucsData } from '../types'

export function useBlockFoucs(data: any, callback: (e: MouseEvent) => any) {

  
  const clearBlockFoucs = ():void => {
    data.value!.blocks.forEach((block: any) => {
      block.foucs = false
    })
  }

  const foucsData = computed<IFoucsData>(() => {
    const foucs: Array<any> = []
    const unFoucs: Array<any> = []
    data.value.blocks.forEach((block: any) => {
      (block.foucs ? foucs : unFoucs).push(block)
    })
    return {
      foucs,
      unFoucs
    }
  })

  const blockMousedown = (e: MouseEvent, block: any):void => {
    e.preventDefault()
    e.stopPropagation()
    if(e.ctrlKey) {
      block.foucs = !block.foucs
    } else {
      if(!block.foucs) {
        clearBlockFoucs()
        block.foucs = true
      }else {
        block.foucs = false
      }
    }

    callback(e)
  }

  return {
    blockMousedown,
    foucsData,
    clearBlockFoucs
  }
}
