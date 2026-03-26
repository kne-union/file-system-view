# file-system-view

### 描述

用来显示一个文件结构

### 安装

```shell
npm i --save @kne/file-system-view
```

### 概述

# FileSystemView 文件系统视图组件

一个用于浏览文件目录结构的 React 组件，支持树形展示、文件夹展开收起、文件类型图标、hover 操作菜单等功能。

## 特性

- 📁 **树形结构** - 支持多级目录展示，文件夹可展开/收起，带有层级连接线
- 🎨 **文件图标** - 自动识别 20+ 种文件类型，显示对应图标
- ⚡ **操作菜单** - hover 显示操作按钮，支持自定义菜单项
- 🌐 **国际化** - 内置中英文支持
- 📱 **美观易用** - 精心设计的交互和视觉样式

## 安装

```bash
npm install @kne/file-system-view
# 或
yarn add @kne/file-system-view
```

## 依赖

- react >= 16.8
- antd >= 5

## 快速开始

```jsx
import FileSystemView from '@kne/file-system-view';
import '@kne/file-system-view/dist/index.css';

const data = [
  {
    name: 'src',
    type: 'directory',
    children: [
      { name: 'index.js', type: 'file' },
      { name: 'utils.js', type: 'file' },
    ],
  },
  { name: 'package.json', type: 'file' },
];

const menuItems = [
  { label: '打开', onClick: (data, key) => console.log('打开', key) },
  { label: '删除', danger: true },
];

function App() {
  return (
    <FileSystemView
      data={data}
      menuItems={menuItems}
      defaultExpandAll
    />
  );
}
```


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
          { name: 'Button.tsx', type: 'file' },
          { name: 'Input.tsx', type: 'file' },
          { name: 'Modal.tsx', type: 'file' },
        ],
      },
      {
        name: 'utils',
        type: 'directory',
        children: [
          { name: 'format.js', type: 'file' },
          { name: 'request.js', type: 'file' },
        ],
      },
      { name: 'index.ts', type: 'file' },
      { name: 'App.tsx', type: 'file' },
      { name: 'styles.scss', type: 'file' },
    ],
  },
  {
    name: 'public',
    type: 'directory',
    children: [
      { name: 'index.html', type: 'file' },
      { name: 'favicon.svg', type: 'file' },
      { name: 'logo.png', type: 'file' },
    ],
  },
  {
    name: 'docs',
    type: 'directory',
    children: [
      { name: 'README.md', type: 'file' },
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
  { name: 'package.json', type: 'file' },
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
      <FileSystemView data={fileData} />
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

### API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|----|----|-----|----|
| data | `FileItem[]` | `[]` | 目录结构数据 |
| menuItems | `MenuItem[]` | - | 操作菜单项配置，不传则不显示操作按钮 |
| defaultExpandAll | `boolean` | `false` | 是否默认展开所有目录 |
| expandedKeys | `string[]` | - | （受控）展开的节点 key 数组 |
| onExpand | `(keys: string[], info: { node, expanded, nativeEvent }) => void` | - | 展开/收起节点时的回调 |

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
- **压缩文件**: zip, rar, 7z, tar, gz
- **其他**: 默认文件图标
