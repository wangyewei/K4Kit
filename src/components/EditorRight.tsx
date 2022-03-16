/*
 * @Author: YeWei Wang
 * @Date: 2022-01-29 15:50:53
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 右侧属性栏
 * @LastEditTime: 2022-03-16 16:50:41
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorRight.tsx
 */
import { KTabs, KTabPane, KTooltip, KInput, KIcon, QuestionFilled, KColorPicker } from '../plugins/platform-component'
import { computed, defineComponent, PropType, RendererElement, ref, Ref } from "vue";
import svg from './images/undraw_group_hangout_re_4t8r.svg'

export type ChildrenBolck = string | number

export type BlockFoucs = {
  id: string,
  width: number,
  height: number,
  label: string,
  key: string,
  left: number,
  top: number,
  zIndex: number,
  children: ChildrenBolck,
  color: string
}

export type Block = {
  foucs: BlockFoucs[],
  // unfoucs: any
}

export default defineComponent({
  props: {
    foucsData: Object as PropType<Block>
  },
  setup(props) {
    return () => (
      <div class="editor-right">
        {
          props.foucsData!.foucs.length === 0
            ?
            <div class="editor__right-no-block">
              <img src={svg} class="svg" alt="" />
              <div class="no-block-desc">请先选择一个组件</div>
            </div>
            :
            <KTabs type="border-card" class="editor__right-tab">
              <KTabPane label="属性" class="tab-pannel">
                {props.foucsData!.foucs.map((item: BlockFoucs) => (
                  <div class="block-attirbute__base">
                    <div class="block-id">
                      <span>{item.id}</span>
                      <span>
                        <KTooltip
                          content="每个物料专属的独一ID，普通用户无需关注"
                          placement='bottom'>
                          <KIcon>
                            <QuestionFilled />
                          </KIcon>
                        </KTooltip>
                      </span>
                    </div>

                    <ul class="base__attr">

                      <div class="base__arrt-title">基本属性</div>

                      <li>组件：{item.label}</li>

                      <li>
                        <span class="base__attr-list-title">宽度：</span>
                        <KInput modelValue={item.width}
                          onInput={e => item.width = Number(e.replace(/[^\d]/g, ''))} />
                        <span class="base__attr-list-unit">px</span>

                      </li>

                      <li>
                        <span class="base__attr-list-title">高度：</span>
                        <KInput modelValue={item.height}
                          onInput={e => item.height = Number(e.replace(/[^\d]/g, ''))} />
                        <span class="base__attr-list-unit">px</span>
                      </li>

                      <li>
                        <span class="base__attr-list-title">横坐标：</span>
                        <KInput modelValue={item.left}
                          onInput={e => item.left = Number(e.replace(/[^\d]/g, ''))} />
                        <span class="base__attr-list-unit">px</span>
                      </li>

                      <li>
                        <span class="base__attr-list-title">纵坐标</span>
                        <KInput modelValue={item.top}
                          onInput={e => item.top = Number(e.replace(/[^\d]/g, ''))} />
                        <span class="base__attr-list-unit">px</span>
                      </li>

                      <li>
                        <span class="base__attr-list-title">层级</span>
                        <KInput modelValue={item.zIndex}
                          onInput={e => item.zIndex = Number(e.replace(/[^\d]/g, ''))} />
                        <span class="base__attr-list-unit">  </span>
                      </li>

                      <li>
                        <span class="base__attr-list-title">文字颜色</span>
                        <KColorPicker
                          class="color-picker"
                          showAlpha
                          modelValue={item.color}
                          onChange={e => item.color = e} />
                        <span class="base__attr-list-unit">  </span>
                      </li>

                      <li class="base__children-list">
                        <div class="base__children-list-title">文本内容</div>
                        <KInput
                          class="textarea"
                          modelValue={item.children}
                          // type="textarea"
                          onInput={e => item.children = e} />
                        <span class="desc">（需失去聚焦后触发更新）</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </KTabPane>
              <KTabPane label="事件">事件</KTabPane>
              <KTabPane label="动画">动画</KTabPane>
              <KTabPane label="Json配置">Json配置</KTabPane>
            </KTabs>
        }
      </div>
    );
  },
});
