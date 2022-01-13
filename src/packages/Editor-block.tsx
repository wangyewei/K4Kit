
/*
 * @Author: YeWei Wang
 * @Date: 2022-01-04 17:59:18
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 物料
 * @LastEditTime: 2022-01-13 01:53:57
 * @Version: 1.0
 * @FilePath: \k4kit\src\packages\Editor-block.tsx
 */

import { computed, defineComponent, inject, onMounted, ref, RendererNode, PropType } from "vue"
import { IBlocks } from "../types"

export default defineComponent({
  props: {
    block: {type: Object},
    mouseDown: Function as PropType<(e: MouseEvent) => any>
  },
  setup(props) {

    const config:any = inject('config')

    const blockRef = ref<HTMLDivElement>()

    onMounted(() => {
      let {offsetWidth, offsetHeight} = blockRef.value as HTMLDivElement

      if(props.block!.alignCenter) {
        props.block!.left = props.block!.left - offsetWidth / 2,
        props.block!.top = props.block!.top - offsetHeight / 2,
        props.block!.alignCenter = false
      }
    })

    // console.log(config)
    
    const blockStyle = computed<IBlocks>(() => ({
      top: `${props.block!.top}px`,
      left: `${props.block!.left}px`,
      zIndex: props.block!.zIndex,
      key: props.block!.key
    }))

    
    const component = config.componentMap[props.block!.key]

    const RenderComponent: RendererNode = component.render()
    return () => (
      
      <div class="editor-block" 
           style={blockStyle.value} 
           ref={blockRef}
           onMousedown={props.mouseDown}
      >
        {RenderComponent}
      </div>
    )
  }
})