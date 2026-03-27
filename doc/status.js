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
      onClick: (data, key) => message.info(`打开: ${key}`),
    },
    {
      label: '查看更改',
      onClick: (data, key) => {
        if (data.status) {
          message.info(`文件状态: ${data.status}`);
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
            const statusText = data.status ? ` (${data.status})` : '';
            message.info(`点击文件: ${key}${statusText}`);
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
