import { useState, useMemo, useCallback, useRef } from 'react';
import { Tree } from 'antd';
import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';
import style from './style.module.scss';
import TreeNode from './TreeNode';
import { convertToTreeData } from './fileUtils';

const FileSystemView = withLocale(({ data, menuItems, defaultExpandAll, expandedKeys: controlledExpandedKeys, onExpand, onFileClick }) => {
  const rootRef = useRef(null);
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

  const renderTreeNode = useCallback(
    node => <TreeNode rootRef={rootRef} node={node} menuItems={menuItems} expandedKeys={expandedKeys} onToggle={handleToggle} onFileClick={onFileClick} />,
    [menuItems, expandedKeys, handleToggle, onFileClick]
  );

  if (!data || data.length === 0) {
    return <div className={style['empty']}>{formatMessage({ id: 'empty' })}</div>;
  }

  return (
    <div className={style['file-system-view']} ref={rootRef}>
      <Tree treeData={treeData} expandedKeys={expandedKeys} onExpand={handleExpand} selectable={false} blockNode titleRender={renderTreeNode} />
    </div>
  );
});

export default FileSystemView;
