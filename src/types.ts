/*
 * @Author: YeWei Wang
 * @Date: 2022-01-04 16:06:24
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 
 * @LastEditTime: 2022-03-15 18:49:44
 * @Version: 1.0
 * @FilePath: \k4kit\src\types.ts
 */

interface IContainer {
  width: number,
  height: number
}
export interface IBlocks {
  top: number | string,
  left: number | string,
  zIndex: number,
  key: string,
  // width: string | number,
  // children: unknown
}
export interface IConfig {
  container: IContainer,
  blocks: Array<IBlocks>
}

export interface IStyleComputed {
  width: string,
  height: string
}


export interface IToolBar {
  key: string,
  hooksKey: string
  // fn: () => void;
}

export interface IFoucsData {
  foucs: Array<any>,
  unFoucs: Array<any>
}

export interface IDragState {
  startX: number,
  startY: number,
  startLeft: number,
  startTop: number
  startPos: { top: number, left: number }[],
  lines?: any
}

export interface ILines {
  x: Array<{ showLeft: number, left: number }>,
  y: Array<{ showTop: number, top: number }>
}