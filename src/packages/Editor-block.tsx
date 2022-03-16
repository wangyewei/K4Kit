/*
 * @Author: YeWei Wang
 * @Date: 2022-01-04 17:59:18
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 物料
 * @LastEditTime: 2022-03-16 18:04:00
 * @Version: 1.0
 * @FilePath: \k4kit\src\packages\Editor-block.tsx
 */

import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
  RendererNode,
  PropType,
  effect,
} from "vue"
import type { BlocksBased } from "../types"

export type StyleBased = {
  color: string,
  width: string,
  height: string
}

export default defineComponent({
  props: {
    block: { type: Object },
    mouseDown: Function as PropType<(e: MouseEvent) => any>,
  },
  setup(props) {
    const config: any = inject("config")
    const blockRef = ref<HTMLDivElement>()
    onMounted(() => {
      const { offsetWidth, offsetHeight } = blockRef.value as HTMLDivElement;

      if (props.block!.alignCenter) {
        (props.block!.left = props.block!.left - offsetWidth / 2),
          (props.block!.top = props.block!.top - offsetHeight / 2),
          (props.block!.alignCenter = true)
      }

      props.block!.width = offsetWidth === 0 ? 69 : offsetWidth
      props.block!.height = offsetHeight
    });

    const blockStyle = computed<BlocksBased>(() => ({
      top: `${props.block!.top}px`,
      left: `${props.block!.left}px`,
      zIndex: props.block!.zIndex,
      width: `${props.block!.width}px`,
      height: `${props.block!.height}px`,
      key: props.block!.key
    }))

    const bolckInnerStyele = computed<StyleBased>(() => ({
      color: `${props.block!.color ? props.block!.color : '#000'}`,
      width: `${props.block!.width}px`,
      height: `${props.block!.height}px`
    }))

    const component = config.componentMap[props.block!.key];

    let RenderComponent: RendererNode

    effect(() => {
      RenderComponent = component.render(props.block!.children, bolckInnerStyele.value);
    })

    return () => (
      <div
        class="editor-block"
        style={blockStyle.value}
        ref={blockRef}
        onMousedown={props.mouseDown}
      >
        {RenderComponent}
      </div>
    );
  },
});
