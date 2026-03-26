import { useState, useMemo, useCallback } from 'react';
import { Tree, Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';
import style from './style.module.scss';
import {
  Folder,
  FolderOpen,
  File,
  FileText,
  FilePdf,
  FileDoc,
  FileXls,
  FilePng,
  FileJpg,
  FileGif,
  FileSvg,
  FileCode,
  FileZip,
  FileMarkdown,
  FileJs,
  FileJsx,
  FileTs,
  FileTsx,
  FileCss,
  FileHtml,
  FileVue,
  FilePy,
  FileRs,
  FileArchive,
  FileVideo,
  FileAudio
} from './icons';

// 文件类型图标映射（图标 + 颜色）
const fileTypeIcons = {
  // 文档类型
  md: { icon: FileMarkdown, color: '#083fa6' },
  txt: { icon: FileText, color: '#6b7280' },
  pdf: { icon: FilePdf, color: '#d32f2f' },
  doc: { icon: FileDoc, color: '#2b579a' },
  docx: { icon: FileDoc, color: '#2b579a' },
  xls: { icon: FileXls, color: '#217346' },
  xlsx: { icon: FileXls, color: '#217346' },
  // 图片类型
  png: { icon: FilePng, color: '#a855f7' },
  jpg: { icon: FileJpg, color: '#f97316' },
  jpeg: { icon: FileJpg, color: '#f97316' },
  gif: { icon: FileGif, color: '#ec4899' },
  svg: { icon: FileSvg, color: '#fbbf24' },
  webp: { icon: FilePng, color: '#22c55e' },
  // 视频类型
  mp4: { icon: FileVideo, color: '#ef4444' },
  avi: { icon: FileVideo, color: '#ef4444' },
  mov: { icon: FileVideo, color: '#ef4444' },
  wmv: { icon: FileVideo, color: '#ef4444' },
  mkv: { icon: FileVideo, color: '#ef4444' },
  webm: { icon: FileVideo, color: '#ef4444' },
  flv: { icon: FileVideo, color: '#ef4444' },
  // 音频类型
  mp3: { icon: FileAudio, color: '#8b5cf6' },
  wav: { icon: FileAudio, color: '#8b5cf6' },
  flac: { icon: FileAudio, color: '#8b5cf6' },
  aac: { icon: FileAudio, color: '#8b5cf6' },
  ogg: { icon: FileAudio, color: '#8b5cf6' },
  wma: { icon: FileAudio, color: '#8b5cf6' },
  // 代码类型
  js: { icon: FileJs, color: '#f7df1e' },
  jsx: { icon: FileJsx, color: '#61dafb' },
  ts: { icon: FileTs, color: '#3178c6' },
  tsx: { icon: FileTsx, color: '#3178c6' },
  json: { icon: FileCode, color: '#cbcb41' },
  css: { icon: FileCss, color: '#264de4' },
  scss: { icon: FileCss, color: '#cc6699' },
  less: { icon: FileCss, color: '#1d365d' },
  html: { icon: FileHtml, color: '#e34f26' },
  vue: { icon: FileVue, color: '#42b883' },
  py: { icon: FilePy, color: '#3776ab' },
  java: { icon: FileCode, color: '#ed8b00' },
  go: { icon: FileCode, color: '#00add8' },
  rs: { icon: FileRs, color: '#dea584' },
  // 压缩文件
  zip: { icon: FileZip, color: '#78909c' },
  rar: { icon: FileArchive, color: '#5c6bc0' },
  '7z': { icon: FileArchive, color: '#5c6bc0' },
  tar: { icon: FileArchive, color: '#8d6e63' },
  gz: { icon: FileArchive, color: '#8d6e63' }
};

// 获取文件图标和颜色
const getFileIcon = (name, isDirectory, expanded) => {
  if (isDirectory) {
    return { icon: expanded ? FolderOpen : Folder, color: '#e8a838' };
  }
  const ext = name.split('.').pop()?.toLowerCase() || '';
  return fileTypeIcons[ext] || { icon: File, color: '#6b7280' };
};

// 分离文件名和扩展名
const splitFileName = (name, isDirectory) => {
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
const convertToTreeData = (data, parentPath = '') => {
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

// 自定义树节点
const TreeNode = ({ node, menuItems, expandedKeys, onToggle }) => {
  const { key, title, isDirectory, isLeaf, data } = node;
  const isExpanded = expandedKeys.includes(key);
  const { icon: IconComponent, color } = getFileIcon(title, isDirectory, isExpanded);
  const { name: fileName, ext } = splitFileName(title, isDirectory);

  const menu = useMemo(() => {
    if (!menuItems || menuItems.length === 0) return null;
    return {
      items: menuItems.map((item, index) => ({
        key: index,
        label: item.label,
        icon: item.icon,
        onClick: () => item.onClick?.(data, key),
        danger: item.danger,
        disabled: item.disabled?.(data, key)
      }))
    };
  }, [menuItems, data, key]);

  const handleMenuClick = useCallback(e => {
    e.stopPropagation();
  }, []);

  const handleNodeClick = useCallback(() => {
    if (isDirectory) {
      onToggle?.(key, isExpanded);
    }
  }, [isDirectory, onToggle, key, isExpanded]);

  return (
    <div className={style['tree-node']} onClick={handleNodeClick}>
      <span className={style['node-icon']} style={{ color }}>
        <IconComponent />
      </span>
      <span className={style['node-title']} title={title}>
        <span className={style['node-name']}>{fileName}</span>
        {ext && <span className={style['node-ext']}>{ext}</span>}
      </span>
      {menu && (
        <Dropdown menu={menu} trigger={['click']} placement="bottomRight" getPopupContainer={triggerNode => triggerNode.parentNode}>
          <Button type="text" size="small" className={style['action-btn']} icon={<MoreOutlined />} onClick={handleMenuClick} />
        </Dropdown>
      )}
    </div>
  );
};

const FileSystemView = withLocale(({ data, menuItems, defaultExpandAll, expandedKeys: controlledExpandedKeys, onExpand }) => {
  const { formatMessage } = useIntl();
  const [internalExpandedKeys, setInternalExpandedKeys] = useState([]);

  const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys;
  const treeData = useMemo(() => convertToTreeData(data), [data]);

  const handleExpand = useCallback(
    (keys, info) => {
      if (!controlledExpandedKeys) {
        setInternalExpandedKeys(keys);
      }
      onExpand?.(keys, info);
    },
    [controlledExpandedKeys, onExpand]
  );

  const handleToggle = useCallback(
    (key, isExpanded) => {
      const newKeys = isExpanded ? expandedKeys.filter(k => k !== key) : [...expandedKeys, key];
      handleExpand(newKeys, { node: { key }, expanded: !isExpanded });
    },
    [expandedKeys, handleExpand]
  );

  // 默认展开所有目录
  const initialExpandedKeys = useMemo(() => {
    if (defaultExpandAll) {
      const keys = [];
      const traverse = nodes => {
        nodes.forEach(node => {
          if (node.isDirectory) {
            keys.push(node.key);
            if (node.children) {
              traverse(node.children);
            }
          }
        });
      };
      traverse(treeData);
      return keys;
    }
    return [];
  }, [treeData, defaultExpandAll]);

  // 初始化展开状态
  useMemo(() => {
    if (defaultExpandAll && initialExpandedKeys.length > 0 && !controlledExpandedKeys) {
      setInternalExpandedKeys(initialExpandedKeys);
    }
  }, [defaultExpandAll, initialExpandedKeys, controlledExpandedKeys]);

  const renderTreeNode = useCallback(node => <TreeNode node={node} menuItems={menuItems} expandedKeys={expandedKeys} onToggle={handleToggle} />, [menuItems, expandedKeys, handleToggle]);

  if (!data || data.length === 0) {
    return <div className={style['empty']}>{formatMessage({ id: 'empty' })}</div>;
  }

  return (
    <div className={style['file-system-view']}>
      <Tree treeData={treeData} expandedKeys={expandedKeys} onExpand={handleExpand} selectable={false} blockNode titleRender={renderTreeNode} />
    </div>
  );
});

export default FileSystemView;
