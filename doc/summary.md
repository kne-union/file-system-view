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
