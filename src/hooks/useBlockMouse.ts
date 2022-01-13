/*
 * @Author: YeWei Wang
 * @Date: 2022-01-13 22:07:47
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 
 * @LastEditTime: 2022-01-14 01:37:10
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\hooks\useBlockMouse.ts
 * @Autor: YeWei Wang
 */

import {
  IDragState,
  IFoucsData,
  ILines
} from '../types'
import {
  ComputedRef,
  reactive,
  WritableComputedRef
} from 'vue'


export function useBlockMouse(foucsData: ComputedRef < IFoucsData > , lastSelectedBlock: ComputedRef<any>, data: WritableComputedRef<any>) {
  let dragState: IDragState = {
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    startPos: []
  }

  let markLine = reactive<{x: number, y: number}>({
    x: -1,
    y: -1
  })

  const mousedown = (e: MouseEvent) => {
    const { height:nextHeight, width: nextWidth } = lastSelectedBlock.value
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: lastSelectedBlock.value?.left,
      startTop: lastSelectedBlock.value?.top,
      startPos: foucsData.value.foucs.map(({ top, left }) => ({ top, left })),
      lines: (() => {
        const { unFoucs } = foucsData.value
        console.log(data)
        let lines:ILines = { x: [], y: [] };
        [...unFoucs, {
          top: 0,
          left: 0,
          width: data.value.container.width,
          height: data.value.container.height
        }].forEach((block: any) => {
          const { top: preTop, left: preLeft, width: preWidth, height: preHeight } = block

          // 辅助线锚点
          lines.y.push({showTop: preTop, top: preTop})
          lines.y.push({showTop: preTop, top: preTop - nextHeight})
          lines.y.push({showTop: preTop + preHeight / 2, top: preTop + preHeight / 2 - nextHeight / 2})
          lines.y.push({showTop: preTop + preHeight, top: preTop + preHeight})
          lines.y.push({showTop: preTop + preHeight, top: preTop + preHeight - nextHeight})

          lines.x.push({showLeft: preLeft, left: preLeft})
          lines.x.push({showLeft: preLeft + preWidth, left: preLeft + preWidth})
          lines.x.push({showLeft: preLeft + preWidth / 2, left: preLeft + preWidth / 2 - nextWidth / 2})
          lines.x.push({showLeft: preLeft + preWidth, left: preLeft + preWidth})
          lines.x.push({showLeft: preLeft, left: preLeft - nextWidth})

        })
        return lines
      })()
    }
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }

  /** Editor blocks drag */
  const mouseup = (e: MouseEvent) => {
   
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)

    markLine.x = -1
    markLine.y = -1
  }

  const mousemove = (e: MouseEvent) => {

    let { clientX: moveX, clientY: moveY } = e

    // preMouseLeftTop - next

    let left: number = moveX - dragState.startX + dragState.startLeft
    let top: number = moveY - dragState.startY + dragState.startTop

    let y: number = -1
    let x: number = -1
  
    for(let i = 0; i < dragState.lines.y.length; i++) {
      const {top: t, showTop: s} = dragState.lines.y[i]
      if(Math.abs(t - top) < 5) {
        y = s
        moveY = dragState.startY - dragState.startTop + t
        break
      }
    }

    for(let i = 0; i < dragState.lines.y.length; i++) {
      const {left: l, showLeft: s} = dragState.lines.x[i]
      if(Math.abs(l - left) < 5) {
        x = s
        moveX = dragState.startX - dragState.startLeft + l
        break
      }
    }

    [markLine.x, markLine.y] = [x, y]

    console.log(markLine.x, markLine.y)
    //
 
    let durrenX: number = moveX - dragState.startX
    let durrenY: number = moveY - dragState.startY

    foucsData.value.foucs.forEach((block: any, idx: number) => {
      block.top = dragState.startPos[idx].top + durrenY
      block.left = dragState.startPos[idx].left + durrenX
    })
  }

  return {
    mousedown,
    markLine
  }
}