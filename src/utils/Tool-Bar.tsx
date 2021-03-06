/*
 * @Author: YeWei Wang
 * @Date: 2022-01-05 16:49:27
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: toobar
 * @LastEditTime: 2022-03-16 16:29:41
 * @Version: 1.0
 * @FilePath: \k4kit\src\utils\Tool-Bar.tsx
 */

import { IToolBar } from "../types"

function toolBarCreate() {
  const toolBarLists: Array<IToolBar> = []

  return {
    toolBarLists,
    registerToolBar: (tool: IToolBar): void => {
      toolBarLists.push(tool)
    },
  }
}

export const toolBarRegisterConfig = toolBarCreate()

toolBarRegisterConfig.registerToolBar({
  key: "编辑页面",
  hooksKey: "changeContainer",
})

toolBarRegisterConfig.registerToolBar({
  key: "删除",
  hooksKey: "deleteBlock"
})

toolBarRegisterConfig.registerToolBar({
  key: "重做",
  hooksKey: 'blocksRemake'
})

toolBarRegisterConfig.registerToolBar({
  key: "保存到本地",
  hooksKey: 'saveInLocal'
})

// toolBarRegisterConfig.registerToolBar({
//   key: "置顶",
//   fn: () => console.log("置顶"),
// })



// toolBarRegisterConfig.registerToolBar({
//   key: "置底",
//   fn: () => console.log("置底"),
// })

// toolBarRegisterConfig.registerToolBar({
//   key: "数据源",
//   fn: () => console.log("导入"),
// })

// toolBarRegisterConfig.registerToolBar({
//   key: "新建页面",
//   fn: () => console.log("新建页面"),
// })

// toolBarRegisterConfig.registerToolBar({
//   key: "JSON配置",
//   fn: () => console.log("JSON配置"),
// })

// toolBarRegisterConfig.registerToolBar({
//   key: "DOM树结构",
//   fn: () => console.log("JSON配置"),
// })

// toolBarRegisterConfig.registerToolBar({
//   key: "预览",
//   fn: () => console.log("预览"),
// })

// toolBarRegisterConfig.registerToolBar({
//   key: "导出",
//   fn: () => console.log("JSON配置"),
// })

// toolBarRegisterConfig.registerToolBar({
//   key: "保存并退出",
//   fn: () => console.log("JSON配置"),
// })
