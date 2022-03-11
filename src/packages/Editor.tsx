/*
 * @Author: YeWei Wang
 * @Date: 2022-01-13 02:12:50
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 编辑器主文件
 * @LastEditTime: 2022-03-11 17:00:59
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\packages\Editor.tsx
 */
import { computed, defineComponent, inject, ref, PropType } from "vue"
import EditorBlock from "./Editor-block"
import { IStyleComputed, IConfig, IToolBar } from "../types"
import { useBlockDrag } from "../hooks/useBlockDrag"
import { useBlockFoucs } from "../hooks/useBlockFoucs"
import { useBlockMouse } from "../hooks/useBlockMouse"
import EditorTop from "../components/EditorTop"
import EditorLeft from "../components/EditorLeft"
import EditorRight from "../components/EditorRight"

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<IConfig> },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const data = computed<any>({
      get() {
        return props.modelValue
      },
      set(newValue) {
        ctx.emit("update:modelValue", JSON.parse(JSON.stringify(newValue)))
      },
    })

    const styleComputed = computed<IStyleComputed>(() => ({
      width: data.value!.container.width + "px",
      height: data.value!.container.height + "px",
    }))

    const config: any = inject("config")

    const containerRef = ref<any>(null)
    /**block list items drag */
    const { dragStart, dragEnd } = useBlockDrag(data, containerRef)

    const blockRef = ref<HTMLDivElement>()

    /** Editor items drag */
    const { blockMousedown, foucsData, clearBlockFoucs, lastSelectedBlock } =
      useBlockFoucs(data, (e: MouseEvent) => {
        mousedown(e)
      })

    const { mousedown, markLine } = useBlockMouse(
      foucsData,
      lastSelectedBlock,
      data,
      blockRef
    )

    return () => (
      <div class="editor">
        <EditorTop data={data} selectedBlock={foucsData.value} />
        <div class="editor-section">
          <EditorLeft config={config} dragStart={dragStart} dragEnd={dragEnd} />
          <div class="editor-container">
            <div
              class="editor__convans"
              style={styleComputed.value}
              ref={containerRef}
              onMousedown={clearBlockFoucs}
            >
              <div class="editor__convans-content">
                {data.value!.blocks.map((block: any, idx: number) => (
                  <EditorBlock
                    class={block.foucs ? "editor-block__foucs" : ""}
                    block={block}
                    mouseDown={(e: MouseEvent) => blockMousedown(e, block, idx)}
                    ref={blockRef}
                  />
                ))}
              </div>
              {markLine.x !== -1 && (
                <div class="line-x" style={{ left: markLine.x + "px" }}></div>
              )}
              {markLine.y !== -1 && (
                <div class="line-y" style={{ top: markLine.y + "px" }}></div>
              )}
            </div>
          </div>
          <EditorRight foucsData={foucsData.value} />
        </div>
      </div>
    )
  },
})
