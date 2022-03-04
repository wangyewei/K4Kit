/*
 * @Author: YeWei Wang
 * @Date: 2022-01-29 15:56:23
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 快捷键
 * @LastEditTime: 2022-03-04 15:43:53
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\hooks\useCommand.ts
 * @Autor: YeWei Wang
 */

export function useCommand<T extends object>(
  container: T
) {
  const changeContainer = () => {
    console.log(container)
  }

  return {
    changeContainer
  }
}