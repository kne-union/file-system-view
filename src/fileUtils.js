import fileTypeIcons from './fileIcons';
import { Folder, FolderOpen, File } from './icons';

// 获取文件图标和颜色
export const getFileIcon = (name, isDirectory, expanded) => {
  if (isDirectory) {
    return { icon: expanded ? FolderOpen : Folder, color: '#e8a838' };
  }
  const ext = name.split('.').pop()?.toLowerCase() || '';
  return fileTypeIcons[ext] || { icon: File, color: '#6b7280' };
};

// 分离文件名和扩展名
export const splitFileName = (name, isDirectory) => {
  if (isDirectory) {
    return { name, ext: '' };
  }
  const lastDotIndex = name.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return { name, ext: '' };
  }
  return {
    name: name.substring(0, lastDotIndex),
    ext: name.substring(lastDotIndex)
  };
};

// 将扁平数据转换为树形结构
export const convertToTreeData = (data, parentPath = '') => {
  if (!Array.isArray(data)) return [];

  return data.map((item, index) => {
    const key = parentPath ? `${parentPath}/${item.name}` : item.name;
    const isDirectory = item.type === 'directory' || item.children?.length > 0;

    const node = {
      key,
      title: item.name,
      isDirectory,
      isLeaf: !isDirectory,
      data: item
    };

    if (isDirectory && item.children?.length > 0) {
      node.children = convertToTreeData(item.children, key);
    }

    return node;
  });
};
