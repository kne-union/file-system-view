const { default: FileSystemView } = _FileSystemView;
const { Alert, Flex, Typography, message } = antd;
const { Text, Paragraph } = Typography;

const fileData = [
  {
    name: 'src',
    type: 'directory',
    children: [
      { name: 'App.tsx', type: 'file' },
      { name: 'index.ts', type: 'file' },
      {
        name: 'components',
        type: 'directory',
        children: [
          { name: 'Button.tsx', type: 'file' },
          { name: 'Tree.tsx', type: 'file' }
        ]
      }
    ]
  },
  { name: 'README.md', type: 'file' },
  { name: 'package.json', type: 'file' }
];

const menuItems = [
  {
    label: '打开',
    onClick: (data, key) => message.info(`打开: ${key}`)
  },
  {
    label: '复制路径',
    onClick: (data, key) => {
      navigator.clipboard?.writeText?.(key);
      message.success(`已复制路径: ${key}`);
    }
  },
  {
    label: '重命名',
    onClick: (data, key) => message.info(`重命名: ${data.name} (${key})`)
  },
  {
    label: '删除',
    danger: true,
    disabled: data => data.type === 'directory' && data.children?.length > 0,
    onClick: (data, key) => message.warning(`删除: ${key}`)
  }
];

const HoverMenuExample = () => {
  return (
    <Flex vertical gap={16} style={{ padding: 24, background: '#fafafa', borderRadius: 8 }}>
      <Alert
        type="info"
        showIcon
        message="Hover 右侧菜单"
        description={
          <Paragraph style={{ marginBottom: 0 }}>
            将鼠标移到任意文件或文件夹行上，右侧会出现「⋯」按钮；点击后打开操作菜单。离开行后按钮自动隐藏；菜单打开期间按钮保持可见。
          </Paragraph>
        }
      />
      <Text type="secondary">请在下方树节点上悬停验证右侧操作按钮</Text>
      <div style={{ background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #f0f0f0' }}>
        <FileSystemView
          data={fileData}
          menuItems={menuItems}
          defaultExpandAll
          onFileClick={(data, key) => message.info(`点击文件: ${key}`)}
        />
      </div>
    </Flex>
  );
};

render(<HoverMenuExample />);
