/*
 * @Author: YeWei Wang
 * @Date: 2022-01-04 18:39:14
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description:
 * @LastEditTime: 2022-03-15 20:48:40
 * @Version: 1.0
 * @FilePath: \k4kit\src\utils\Editor-config.tsx
 */

import {
  ElButton,
  ElInput,
  ElImage,
  ElSwitch,
  ElTimePicker,
} from "element-plus"
// import { ButtonProps } from 'element-plus'
import { RendererElement, Ref, ref } from "vue"
export interface IEditorConfig {
  label: string
  preview: () => RendererElement
  render: (element: Ref<unknown>) => RendererElement
  key: string,
  children?: Ref<unknown>
}

const PRE_NAME: string = "k4kit"
const MAX_IDLENGTH: number = 7
function createEditorConfig() {
  const componentLists: Array<IEditorConfig> = []

  const componentMap: any = {}

  return {
    componentLists,
    componentMap,
    resister: (component: IEditorConfig): void => {
      componentLists.push(component)
      componentMap[component.key] = component
    },
  }
}

export let registerConfig = createEditorConfig()

registerConfig.resister({
  children: ref<string>('渲染文本'),
  label: "文本",
  preview: (): RendererElement => <p>预览文本</p>,
  render: (element: Ref<unknown>, style?: any): RendererElement => <p style={style}>{element}</p>,
  key: "text",
})

registerConfig.resister({
  label: "按钮",
  children: ref<string | RendererElement>('渲染按钮'),
  preview: (): RendererElement => <ElButton>预览按钮</ElButton>,
  render: (element: Ref<unknown>, style?: any): RendererElement => <ElButton style={style}>{element}</ElButton>,
  key: "button",
})

registerConfig.resister({
  label: "输入框",
  preview: (): RendererElement => <ElInput placeholder="预览输入框" />,
  render: (element: Ref<unknown>, style?: any): RendererElement => {
    //  element = null
    return (
      <ElInput style={style} placeholder="渲染输入框" />
    )
  },
  key: "input",
})

registerConfig.resister({
  label: "图片",
  preview: (): RendererElement => (
    <ElImage
      src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
      style="height: 67px;"
    />
  ),
  render: (element?: RendererElement, style?: any): RendererElement => {

    if (!style.width || style.width === '0px') {
      style.width = '69px'
    }

    if (!style.height || style.height === '0px') {
      style.height = '69px'
    }
    // !style.hegiht && (style.height = '69px');

    element = undefined
    return (
      <ElImage
        src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        style={style}
      />
    )
  },
  key: "image",
})

registerConfig.resister({
  label: "Switch开关",
  preview: (): RendererElement => <ElSwitch />,
  render: (): RendererElement => <ElSwitch />,
  key: "switch",
})

registerConfig.resister({
  label: "日期选择器",
  preview: (): RendererElement => <ElTimePicker />,
  render: (): RendererElement => <ElTimePicker />,
  key: "date",
})
