/*
 * @Author: YeWei Wang
 * @Date: 2022-01-04 18:39:14
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 
 * @LastEditTime: 2022-01-13 02:02:54
 * @Version: 1.0
 * @FilePath: \k4kit\src\utils\Editor-config.tsx
 */

import {ElButton, ElInput, ElImage, ElSwitch, ElTimePicker} from 'element-plus'
import { ButtonProps } from 'element-plus'
import {RendererElement} from 'vue'

export interface IK4NodeConfig {
  k4kitClassName: string,
  k4Id: string,
}

export interface IEditorConfig {
  label: string,
  preview: () => RendererElement,
  render: () => RendererElement,
  key: string,                                                                                                   
  data?: IK4NodeConfig
}
function createEditorConfig() {
  const componentLists: Array<IEditorConfig> = []

  const componentMap:any = {}

  return {
    componentLists,
    componentMap,
    resister: (component: IEditorConfig):void => {
      componentLists.push(component)
      componentMap[component.key] = component
    }
  }
}

export let registerConfig = createEditorConfig()

registerConfig.resister({
  label: '文本',
  preview: (): RendererElement => <p>预览文本</p>,
  render: (): RendererElement => <p>渲染文本</p>,
  key: 'text'
})


registerConfig.resister({
  label: '按钮',
  preview: (): RendererElement => <ElButton>预览按钮</ElButton>,
  render: ():RendererElement => <ElButton>预览按钮</ElButton>,
  key: 'button'
})

registerConfig.resister({
  label: '输入框',
  preview: (): RendererElement => <ElInput placeholder='预览输入框'/>,
  render: (): RendererElement => <ElInput placeholder='渲染输入框'/>,
  key: 'input'
})

registerConfig.resister({
  label: '图片',
  preview: (): RendererElement => <ElImage src='https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' style="height: 67px;"/>,
  render: (): RendererElement => <ElImage src='https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' style="height: 67px;"/>,
  key: 'image'
})

registerConfig.resister({
  label: 'Switch开关',
  preview: (): RendererElement => <ElSwitch />,
  render: (): RendererElement => <ElSwitch />,
  key: 'switch'
})

registerConfig.resister({
  data: {
    k4kitClassName: 'k4-date',
    k4Id: 'k4-date',
  
  },
  label: '日期选择器',
  preview: (): RendererElement => <ElTimePicker />,
  render: (): RendererElement => <ElTimePicker />,
  key: 'date'
})


