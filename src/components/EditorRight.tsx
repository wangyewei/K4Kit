/*
 * @Author: YeWei Wang
 * @Date: 2022-01-29 15:50:53
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 右侧属性栏
 * @LastEditTime: 2022-03-11 17:00:13
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorRight.tsx
 */
import { ElTabs, ElTabPane } from '../plugins/platform-component'
import { defineComponent } from "vue";
import svg from './images/undraw_group_hangout_re_4t8r.svg'
export default defineComponent({
  props: ['foucsData'],
  setup(props) {


    return () => (
      <div class="editor-right">
        {/* <h1>{props.foucsData.foucs} </h1> */}
        {/* <p>{props.foucsData.foucs.length === 0 ? '请先选择一个组件' : '选择了'}</p> */}

        {
          props.foucsData.foucs.length === 0
            ?
            <div class="editor__right-no-block">
              <img src={svg} class="svg" alt="" />
              <div class="no-block-desc">请先选择一个组件</div>
            </div>
            :
            <ElTabs type="border-card" class="editor__right-tab">
              <ElTabPane label="基本属性" class="tab-pannel">基本属性</ElTabPane>
              <ElTabPane label="事件">事件</ElTabPane>
              <ElTabPane label="动画">动画</ElTabPane>
              <ElTabPane label="Json配置">Json配置</ElTabPane>
            </ElTabs>
        }
      </div>
    );
  },
});
