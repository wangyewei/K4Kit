/*
 * @Author: YeWei Wang
 * @Date: 2022-01-13 22:07:47
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 
 * @LastEditTime: 2022-01-13 22:16:42
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\hooks\useBlockMouse.ts
 * @Autor: YeWei Wang
 */

import {
  IDragState,
  IFoucsData
} from '../types'
import {
  ComputedRef
} from 'vue'
export function useBlockMouse(foucsData: ComputedRef < IFoucsData > ) {

  let dragState: IDragState = {
    startX: 0,
    startY: 0,
    startPos: []
  }

  const mousedown = (e: MouseEvent) => {
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: foucsData.value.foucs.map(({
        top,
        left
      }) => ({
        top,
        left
      }))
    }
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }

  /** Editor blocks drag */
  const mouseup = (e: MouseEvent) => {

    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }

  const mousemove = (e: MouseEvent) => {

    let {
      clientX: moveX,
      clientY: moveY
    } = e
    let durrenX: number = moveX - dragState.startX
    let durrenY: number = moveY - dragState.startY

    foucsData.value.foucs.forEach((block: any, idx: number) => {
      block.top = dragState.startPos[idx].top + durrenY
      block.left = dragState.startPos[idx].left + durrenX
    })
  }

  return {
    mousedown
  }
}