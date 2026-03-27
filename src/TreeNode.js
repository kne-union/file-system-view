import { useMemo, useCallback } from 'react';
import { Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { getFileIcon, splitFileName } from './fileUtils';
import style from './style.module.scss';

// 自定义树节点
const TreeNode = ({ node, menuItems, expandedKeys, selectedPath, onToggle, onFileClick, rootRef }) => {
  const { key, title, isDirectory, isLeaf, data } = node;
  const isExpanded = expandedKeys.includes(key);
  const isSelected = selectedPath === key;
  const { icon: IconComponent, color } = getFileIcon(title, isDirectory, isExpanded);
  const { name: fileName, ext } = splitFileName(title, isDirectory);
  const status = data?.status; // 获取文件状态: 'added', 'modified', 'deleted'

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
    } else {
      onFileClick?.(data, key);
    }
  }, [isDirectory, onToggle, onFileClick, key, isExpanded, data]);

  return (
    <div className={`${style['tree-node']}${isSelected ? ` ${style['selected']}` : ''}${status ? ` ${style[`status-${status}`]}` : ''}`} onClick={handleNodeClick}>
      <span className={style['node-icon']} style={{ color }}>
        <IconComponent />
      </span>
      <span className={style['node-title']} title={title}>
        <span className={style['node-name']}>{fileName}</span>
        {ext && <span className={style['node-ext']}>{ext}</span>}
      </span>
      {status && <span className={style['status-badge']}>{status === 'added' ? 'A' : status === 'modified' ? 'M' : status === 'deleted' ? 'D' : ''}</span>}
      {menu && (
        <Dropdown menu={menu} popupRender={menu => <div onClick={handleMenuClick}>{menu}</div>} trigger={['click']} placement="bottomRight" getPopupContainer={() => rootRef.current}>
          <Button type="text" size="small" className={style['node-action-btn']} icon={<MoreOutlined />} onClick={handleMenuClick} />
        </Dropdown>
      )}
    </div>
  );
};

export default TreeNode;
