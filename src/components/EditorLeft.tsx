/*
 * @Author: YeWei Wang
 * @Date: 2022-01-20 21:37:07
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: 编辑器左侧
 * @LastEditTime: 2022-03-12 16:50:41
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\components\EditorLeft.tsx
 */

import { defineComponent, ref } from "vue";
import {
  KMenu,
  KSubMenu,
  KIcon,
  Shop,
  KMenuItemGroup,
  KMenuItem,
  Grid,
  DocumentCopy,
} from "../plugins/platform-component";

export default defineComponent({
  props: ["config", "dragStart", "dragEnd"],
  setup(props) {
    const { config, dragStart, dragEnd } = props;
    const isCollapase = ref<any>(false);
    return () => (
      <KMenu collapse={isCollapase.value} class="editor-left">
        <KSubMenu index="1">
          {{
            title: () => (
              <div>
                <KIcon>
                  <Shop />
                </KIcon>
                <span>基础组件</span>
              </div>
            ),
            default: () => (
              <div>
                <KMenuItemGroup title="基础组件">
                  <div class="componentslists">
                    {config.componentLists.map((component: any) => (
                      <div
                        draggable
                        onDragstart={(e: MouseEvent) => dragStart(e, component)}
                        onDragend={dragEnd}
                        class="editor-left__item"
                      >
                        <span>{component.label}</span>
                        {/* <div>{component.preview()}</div> */}
                      </div>
                    ))}
                  </div>
                </KMenuItemGroup>
                <KMenuItemGroup title="表单组件"></KMenuItemGroup>
              </div>
            ),
          }}
        </KSubMenu>

        <KSubMenu index="2">
          {{
            title: () => (
              <div>
                <KIcon>
                  <Grid />
                </KIcon>
                <span>容器组件</span>
              </div>
            ),
          }}
        </KSubMenu>

        <KSubMenu index="3">
          {{
            title: () => (
              <div>
                <KIcon>
                  <DocumentCopy />
                </KIcon>
                <span>页面管理</span>
              </div>
            ),
          }}
        </KSubMenu>

        <div
          class="menu-arrow"
          onClick={() => {
            isCollapase.value = !isCollapase.value;
          }}
        >
          {isCollapase.value ? "展开" : "收起"}
        </div>
      </KMenu>
    );
  },
});
