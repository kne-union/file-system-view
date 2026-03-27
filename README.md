# file-system-view

### 描述

A React component for displaying file directory structure with tree view, file type icons and context menu

### 安装

```shell
npm i --save @kne/file-system-view
```

### 概述

一个用于浏览文件目录结构的 React 组件，支持树形展示、文件夹展开收起、文件类型图标、hover 操作菜单等功能。

### 特性

- 📁 **树形结构** - 支持多级目录展示，文件夹可展开/收起，带有层级连接线
- 🎨 **文件图标** - 自动识别 20+ 种文件类型，显示对应图标
- ⚡ **操作菜单** - hover 显示操作按钮，支持自定义菜单项
- 🎯 **文件状态** - 支持显示文件状态（新增/修改/删除），用不同颜色标识
- 🌐 **国际化** - 内置中英文支持
- 📱 **美观易用** - 精心设计的交互和视觉样式


### 示例

#### 示例代码

- 基础用法
- 展示完整的文件系统浏览功能，包含文件夹展开收起、文件类型图标、hover操作菜单等特性
- _FileSystemView(@kne/current-lib_file-system-view)[import * as _FileSystemView from "@kne/file-system-view"],(@kne/current-lib_file-system-view/dist/index.css)[import "@kne/file-system-view/dist/index.css"],antd(antd)[import * as antd from "antd"]

```jsx
const { default: FileSystemView } = _FileSystemView;
const { message } = antd;

const fileData = [
  {
    name: 'src',
    type: 'directory',
    children: [
      {
        name: 'components',
        type: 'directory',
        children: [
          { name: 'Button.tsx', type: 'file', status: 'modified' },
          { name: 'Input.tsx', type: 'file' },
          { name: 'Modal.tsx', type: 'file' },
        ],
      },
      {
        name: 'utils',
        type: 'directory',
        children: [
          { name: 'format.js', type: 'file' },
          { name: 'request.js', type: 'file', status: 'modified' },
        ],
      },
      { name: 'index.ts', type: 'file' },
      { name: 'App.tsx', type: 'file', status: 'modified' },
      { name: 'styles.scss', type: 'file' },
    ],
  },
  {
    name: 'public',
    type: 'directory',
    children: [
      { name: 'index.html', type: 'file' },
      { name: 'favicon.svg', type: 'file' },
      { name: 'logo.png', type: 'file', status: 'added' },
    ],
  },
  {
    name: 'docs',
    type: 'directory',
    children: [
      { name: 'README.md', type: 'file', status: 'added' },
      { name: 'API.md', type: 'file' },
      { name: 'guide.pdf', type: 'file' },
      { name: 'very-long-file-name-that-demonstrates-text-overflow-handling-in-the-component-v2.0.0-final.pdf', type: 'file' },
    ],
  },
  {
    name: 'media',
    type: 'directory',
    children: [
      {
        name: 'videos',
        type: 'directory',
        children: [
          { name: 'intro.mp4', type: 'file' },
          { name: 'demo.mov', type: 'file' },
          { name: 'tutorial.webm', type: 'file' },
        ],
      },
      {
        name: 'audio',
        type: 'directory',
        children: [
          { name: 'bgm.mp3', type: 'file' },
          { name: 'sound.wav', type: 'file' },
          { name: 'voice.flac', type: 'file' },
        ],
      },
    ],
  },
  { name: 'package.json', type: 'file', status: 'modified' },
  { name: 'tsconfig.json', type: 'file' },
  { name: '.gitignore', type: 'file' },
];

const menuItems = [
  {
    label: '打开',
    onClick: (data, key) => message.info(&#96;打开: ${key}&#96;),
  },
  {
    label: '复制路径',
    onClick: (data, key) => {
      navigator.clipboard.writeText(key);
      message.success('路径已复制');
    },
  },
  { type: 'divider' },
  {
    label: '重命名',
    onClick: (data, key) => message.info(&#96;重命名: ${data.name}&#96;),
  },
  {
    label: '删除',
    danger: true,
    onClick: (data, key) => message.warning(&#96;删除: ${key}&#96;),
  },
];

const BaseExample = () => {
  return (
    <div style={{ padding: 24, background: '#fafafa', borderRadius: 8 }}>
      <FileSystemView
        data={fileData}
        menuItems={menuItems}
        defaultExpandAll
        onFileClick={(data, key) => message.info(&#96;点击文件: ${key}&#96;)}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 简单列表
- 不包含操作菜单的简单文件列表示例
- _FileSystemView(@kne/current-lib_file-system-view)[import * as _FileSystemView from "@kne/file-system-view"],(@kne/current-lib_file-system-view/dist/index.css)[import "@kne/file-system-view/dist/index.css"]

```jsx
const { default: FileSystemView } = _FileSystemView;

const fileData = [
  { name: 'index.js', type: 'file' },
  { name: 'utils.js', type: 'file' },
  { name: 'styles.css', type: 'file' },
];

const SimpleExample = () => {
  return (
    <div style={{ padding: 24, background: '#fafafa', borderRadius: 8 }}>
      <FileSystemView 
        data={fileData} 
        onFileClick={(data, key) => console.log('点击文件:', key)}
      />
    </div>
  );
};

render(<SimpleExample />);

```

- 受控模式
- 通过 expandedKeys 和 selectedKey 控制展开和选中状态，可配合外部按钮实现展开全部/收起全部功能
- _FileSystemView(@kne/current-lib_file-system-view)[import * as _FileSystemView from "@kne/file-system-view"],(@kne/current-lib_file-system-view/dist/index.css)[import "@kne/file-system-view/dist/index.css"],antd(antd)[import * as antd from "antd"]

```jsx
const { default: FileSystemView } = _FileSystemView;
const { useState } = React;
const { Button, Space, message } = antd;

const fileData = [
  {
    name: 'project',
    type: 'directory',
    children: [
      {
        name: 'src',
        type: 'directory',
        children: [
          { name: 'main.js', type: 'file' },
          { name: 'app.js', type: 'file' },
        ],
      },
      {
        name: 'lib',
        type: 'directory',
        children: [{ name: 'utils.js', type: 'file' }],
      },
      { name: 'config.json', type: 'file' },
    ],
  },
];

const ControlledExample = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);

  const expandAll = () => {
    const allKeys = ['project', 'project/src', 'project/lib'];
    setExpandedKeys(allKeys);
    message.success('已展开所有目录');
  };

  const collapseAll = () => {
    setExpandedKeys([]);
    message.success('已收起所有目录');
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={expandAll}>展开全部</Button>
        <Button onClick={collapseAll}>收起全部</Button>
      </Space>
      <div style={{ padding: 24, background: '#fafafa', borderRadius: 8 }}>
        <FileSystemView
          data={fileData}
          expandedKeys={expandedKeys}
          onExpand={(keys) => setExpandedKeys(keys)}
        />
      </div>
    </div>
  );
};

render(<ControlledExample />);

```

- 文件状态
- 展示文件状态功能，支持显示新增、修改、删除等状态，用不同颜色标识
- _FileSystemView(@kne/current-lib_file-system-view)[import * as _FileSystemView from "@kne/file-system-view"],(@kne/current-lib_file-system-view/dist/index.css)[import "@kne/file-system-view/dist/index.css"],antd(antd)[import * as antd from "antd"]

```jsx
const { default: FileSystemView } = _FileSystemView;
const { message, Space, Button } = antd;
const { useState } = React;

const StatusExample = () => {
  const [fileData, setFileData] = useState([
    {
      name: 'src',
      type: 'directory',
      children: [
        {
          name: 'components',
          type: 'directory',
          children: [
            { name: 'Button.tsx', type: 'file', status: 'modified' },
            { name: 'Input.tsx', type: 'file' },
            { name: 'NewComponent.tsx', type: 'file', status: 'added' },
          ],
        },
        {
          name: 'utils',
          type: 'directory',
          children: [
            { name: 'format.js', type: 'file' },
            { name: 'request.js', type: 'file', status: 'modified' },
            { name: 'deprecated.js', type: 'file', status: 'deleted' },
          ],
        },
        { name: 'index.ts', type: 'file' },
        { name: 'App.tsx', type: 'file', status: 'modified' },
      ],
    },
    {
      name: 'public',
      type: 'directory',
      children: [
        { name: 'index.html', type: 'file' },
        { name: 'new-logo.svg', type: 'file', status: 'added' },
      ],
    },
    { name: 'package.json', type: 'file', status: 'modified' },
    { name: 'README.md', type: 'file', status: 'added' },
    { name: 'old-config.js', type: 'file', status: 'deleted' },
  ]);

  const menuItems = [
    {
      label: '打开',
      onClick: (data, key) => message.info(&#96;打开: ${key}&#96;),
    },
    {
      label: '查看更改',
      onClick: (data, key) => {
        if (data.status) {
          message.info(&#96;文件状态: ${data.status}&#96;);
        } else {
          message.info('文件未修改');
        }
      },
    },
  ];

  const resetStatus = () => {
    const clearStatus = (items) => {
      return items.map(item => {
        const newItem = { ...item };
        delete newItem.status;
        if (newItem.children) {
          newItem.children = clearStatus(newItem.children);
        }
        return newItem;
      });
    };
    setFileData(clearStatus(fileData));
    message.success('已清除所有状态');
  };

  const addRandomStatus = () => {
    const statuses = ['added', 'modified', 'deleted'];
    const addStatus = (items) => {
      return items.map(item => {
        const newItem = { ...item };
        if (newItem.type === 'file' && Math.random() > 0.5) {
          newItem.status = statuses[Math.floor(Math.random() * statuses.length)];
        }
        if (newItem.children) {
          newItem.children = addStatus(newItem.children);
        }
        return newItem;
      });
    };
    setFileData(addStatus(fileData));
    message.success('已随机添加状态');
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={addRandomStatus}>随机添加状态</Button>
        <Button onClick={resetStatus}>清除所有状态</Button>
      </Space>
      <div style={{ padding: 24, background: '#fafafa', borderRadius: 8 }}>
        <FileSystemView
          data={fileData}
          menuItems={menuItems}
          defaultExpandAll
          onFileClick={(data, key) => {
            const statusText = data.status ? &#96; (${data.status})&#96; : '';
            message.info(&#96;点击文件: ${key}${statusText}&#96;);
          }}
        />
      </div>
      <div style={{ marginTop: 16, padding: 16, background: '#f0f0f0', borderRadius: 8 }}>
        <h4>状态说明：</h4>
        <ul>
          <li><span style={{ color: '#52c41a' }}>绿色 (A)</span> - 新增文件</li>
          <li><span style={{ color: '#faad14' }}>黄色 (M)</span> - 修改文件</li>
          <li><span style={{ color: '#ff4d4f', textDecoration: 'line-through' }}>红色删除线 (D)</span> - 删除文件</li>
        </ul>
      </div>
    </div>
  );
};

render(<StatusExample />);

```

### API

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
| status | `'added' \| 'modified' \| 'deleted'` | 文件状态，用于显示不同颜色标识 |

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

### 文件状态

通过在 FileItem 中设置 `status` 属性，可以为文件添加状态标识：

- **added** (新增): 绿色文本 + 绿色 "A" 标记
- **modified** (修改): 黄色文本 + 黄色 "M" 标记  
- **deleted** (删除): 红色删除线文本 + 红色 "D" 标记

```javascript
{
  name: 'Button.tsx',
  type: 'file',
  status: 'modified'  // 显示为修改状态
}
```
