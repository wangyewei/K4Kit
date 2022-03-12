/*
 * @Author: YeWei Wang
 * @Date: 2022-01-29 15:50:53
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 右侧属性栏
 * @LastEditTime: 2022-03-12 16:48:50
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorRight.tsx
 */
import { KTabs, KTabPane, KTooltip } from '../plugins/platform-component'
import { defineComponent } from "vue";
import svg from './images/undraw_group_hangout_re_4t8r.svg'
export default defineComponent({
  props: ['foucsData'],
  setup(props) {


    return () => (
      <div class="editor-right">
        {
          props.foucsData.foucs.length === 0
            ?
            <div class="editor__right-no-block">
              <img src={svg} class="svg" alt="" />
              <div class="no-block-desc">请先选择一个组件</div>
            </div>
            :
            <KTabs type="border-card" class="editor__right-tab">
              <KTabPane label="基本属性" class="tab-pannel">
                {props.foucsData.foucs.map((item: any) => (
                  <div class="block-attirbute__base">
                    <div class="block-id">
                      <span>{item.id}</span>

                      <span>
                        <KTooltip content="每个物料专属的独一ID，普通用户无需关注" placement='top'>
                          <span>K4kit ID: {item.id}</span>
                        </KTooltip>
                      </span>
                    </div>
                    <div>{item.key}</div>

                    <div>{item.label}</div>

                    <div>{item.left}</div>
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
