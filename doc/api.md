### Props

| 属性 | 类型 | 默认值 | 说明 |
|----|----|-----|----|
| data | `FileItem[]` | `[]` | 目录结构数据 |
| menuItems | `MenuItem[]` | - | 操作菜单项配置，不传则不显示操作按钮 |
| defaultExpandAll | `boolean` | `false` | 是否默认展开所有目录 |
| expandedKeys | `string[]` | - | （受控）展开的节点 key 数组 |
| selectedPath | `string` | - | 选中的文件/目录路径，用于高亮显示 |
| onExpand | `(keys: string[], info: { node, expanded, nativeEvent }) => void` | - | 展开/收起节点时的回调 |
| onFileClick | `(data: FileItem, key: string) => void` | - | 点击文件时的回调 |

### FileItem

| 属性 | 类型 | 说明 |
|----|----|----|
| name | `string` | 文件或文件夹名称 |
| type | `'file' \| 'directory'` | 类型，文件夹需要有 children 或 type 为 'directory' |
| children | `FileItem[]` | 子项列表（仅文件夹） |

### MenuItem

| 属性 | 类型 | 说明 |
|----|----|----|
| label | `string` | 菜单项文本 |
| icon | `ReactNode` | 菜单项图标 |
| onClick | `(data: FileItem, key: string) => void` | 点击回调 |
| danger | `boolean` | 是否为危险操作（红色文本） |
| disabled | `(data: FileItem, key: string) => boolean` | 是否禁用的判断函数 |

### 支持的文件类型图标

组件内置以下文件类型的图标识别：

- **代码文件**: js, jsx, ts, tsx, json, css, scss, less, html, vue, py, java, go, rs
- **文档文件**: md, txt, pdf, doc, docx, xls, xlsx
- **图片文件**: png, jpg, jpeg, gif, svg, webp
- **视频文件**: mp4, avi, mov, wmv, mkv, webm, flv
- **音频文件**: mp3, wav, flac, aac, ogg, wma
- **压缩文件**: zip, rar, 7z, tar, gz
- **其他**: 默认文件图标
