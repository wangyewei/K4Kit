/*
 * @Author: YeWei Wang
 * @Date: 2022-03-04 22:28:02
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 修改工作区高宽的弹框
 * @LastEditTime: 2022-03-04 22:49:28
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\components\EditorSizeDialog.tsx
 */

import { defineComponent, PropType, Fragment, Ref } from "vue";
import { ElDialog, ElInput, ElButton } from '../../plugins/platform-component'

export default defineComponent({
  props: {
    dialogVisable: Boolean as unknown as PropType<Ref<boolean>>,
    containerWidth: String as unknown as PropType<Ref<string>>,
    containerValueInput: {
      type: Function as PropType<Function>,
      required: true
    },
    containerHeight: String as unknown as PropType<Ref<string>>,
    containerImpl: {
      type: Function as PropType<any>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <ElDialog
        modelValue={props.dialogVisable!.value}
        title="设置页面的宽高"
        width="30%">

        {{
          default: () => (
            <>
              <span>设置页面的宽高</span>
              <ElInput
                class="editor__top-dialog-input"
                modelValue={props.containerWidth!.value}
                placeholder="请设置宽度"
                onInput={e => props.containerValueInput(e, props.containerWidth)}
                clearable
              />
              <ElInput
                modelValue={props.containerHeight!.value}
                placeholder="请设置高度"
                onInput={e => props.containerValueInput(e, props.containerHeight)}
                clearable />
            </>
          ),
          footer: () => (
            <>
              <ElButton onClick={() => {
                props.containerImpl.confirm(
                  props.containerWidth,
                  props.containerHeight
                )
              }}>确认</ElButton>
              <ElButton onClick={() => props.dialogVisable!.value = false}>取消</ElButton>
            </>
          ),
        }}
      </ElDialog>
    )
  }
})