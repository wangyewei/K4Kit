/*
 * @Author: YeWei Wang
 * @Date: 2022-01-13 02:12:50
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 编辑器主文件
 * @LastEditTime: 2022-01-13 22:22:28
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\packages\Editor.tsx
 * @Autor: YeWei Wang
 */
import { computed, defineComponent, inject, ref, PropType } from "vue"
import EditorBlock from "./Editor-block"
import { IStyleComputed, IConfig, IToolBar, IDragState } from '../types'
import { toolBarRegisterConfig } from "../utils/Tool-Bar"
import { useBlockDrag } from '../hooks/useBlockDrag'
import { useBlockFoucs } from "../hooks/useBlockFoucs"
import { useBlockMouse } from "../hooks/useBlockMouse"


export default defineComponent({
  props: {
    modelValue: {type: Object as PropType<IConfig>}
  },
  emits: ['update:modelValue'],
  setup(props,ctx) {
    const data = computed<any>({
      get() {
        return props.modelValue
      },
      set(newValue) {
        ctx.emit('update:modelValue', JSON.parse(JSON.stringify(newValue)))
      }
    })
   
    const styleComputed = computed<IStyleComputed>(() => ({
      width: data.value!.container.width + 'px',
      height: data.value!.container.height + 'px',
    }))


    const config:any = inject('config')

    const containerRef = ref<any>(null)
    /**block list items drag */
    const { dragStart, dragEnd } = useBlockDrag(data, containerRef)
    
    /** Editor items drag */
    const { blockMousedown, foucsData, clearBlockFoucs } = useBlockFoucs(data, (e: MouseEvent) => {
      mousedown(e)
    })

    const { mousedown } = useBlockMouse(foucsData)
   
    return () => (
      <div class="editor">
        <div class="editor-top">
          <div class="editor__logo">K4 Kit 智慧低代码平台</div>
          <ul class="editor__toolbar">
            {
              toolBarRegisterConfig.toolBarLists.map((tool :IToolBar) => (
                <li onClick={tool.fn}>{tool.key}</li>
              ))
            }
          </ul>
        </div>

        <div class="editor-section">
          <div class="editor-left">
            {config.componentLists.map((component: any) => (
              <div draggable
                   onDragstart={e => dragStart(e, component)}
                   onDragend={dragEnd}
                   class="editor-left__item">
                <span>{component.label}</span>
                <div>{component.preview()}</div>
              </div>
            ))}
          </div>

          <div class="editor-container">
            <div class="editor__convans" 
                 style={styleComputed.value} 
                 ref={containerRef}
                 onMousedown={clearBlockFoucs}> 
              <div class="editor__convans-content" >
                {data.value!.blocks.map((block: any) => (
                  <EditorBlock class={block.foucs ? 'editor-block__foucs' : ''}
                               block={block} 
                               mouseDown={(e: MouseEvent) => blockMousedown(e, block)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div class="editor-right">属性栏</div>
        </div>
        
      </div> 
    
    )
  }
})
