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
