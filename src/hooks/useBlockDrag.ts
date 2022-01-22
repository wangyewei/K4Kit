/*
 * @Author: YeWei Wang
 * @Date: 2022-01-12 19:13:28
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 
 * @LastEditTime: 2022-01-22 16:25:42
 * @Version: 1.0
 * @FilePath: \k4kit\src\hooks\useBlockDrag.ts
 */

import { Ref } from "vue"


export function useBlockDrag(data: any, containerRef: Ref) {


  let currentComponent:any = null

  const dragEnter = (e: DragEvent):void => {
    e.dataTransfer!.effectAllowed = 'copyMove'
    e.dataTransfer!.dropEffect = 'move'
  }

  const dragOver = (e: DragEvent):void => {
    e.preventDefault()
  }

  const dragLeave = (e: DragEvent):void => {
    e.dataTransfer!.dropEffect = 'none'
  }

  const dragDown = (e: DragEvent):void => {

    let blocks:any = data.value.blocks
    data.value = {...data.value, blocks: [
      ...blocks,
      {
        top: e.offsetY,
        left: e.offsetX,
        zIndex: 1,
        key: currentComponent.key,
        alignCenter: true
      }
    ]}

    currentComponent = null
  }
  

  const dragStart = (e: DragEvent, component: any):any => {
    containerRef.value.addEventListener('dragenter', dragEnter)
    containerRef.value.addEventListener('dragover', dragOver)
    containerRef.value.addEventListener('dragleave', dragLeave)
    containerRef.value.addEventListener('drop', dragDown)
    currentComponent = component
  }

  const dragEnd = () => {
    containerRef.value.removeEventListener('dragenter', dragEnter)
    containerRef.value.removeEventListener('dragover', dragOver)
    containerRef.value.removeEventListener('dragleave', dragLeave)
    containerRef.value.removeEventListener('drop', dragDown)
  }

  return {
    dragStart,
    dragEnd
  }
}