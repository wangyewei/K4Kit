/*
 * @Author: YeWei Wang
 * @Date: 2022-03-04 14:35:02
 * @WeChat: Studio06k4
 * @Motto: 求知若渴，虚心若愚
 * @Description: uuid
 * @LastEditTime: 2022-03-12 15:51:30
 * @Version: K4Kit | 智慧低代码平台
 * @FilePath: \k4kit\src\tools\uuid.ts
 */
export function createuuid(
  prename?: string,
  cname?: string,
  end?: number,
): string {
  const temp_url: string = URL.createObjectURL(new Blob())
  const _uuid: string = temp_url.toString()
  URL.revokeObjectURL(temp_url)
  prename ? prename = `${prename}_` : prename = 'k4kit_'
  cname ? cname = `${cname}_` : cname = '_'
  end ? end = end : end = 7
  return prename
    + cname
    + _uuid.substring(_uuid.lastIndexOf("/") + 1)
      .slice(0, end)
}
