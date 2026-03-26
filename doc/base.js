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
    onClick: (data, key) => message.info(`打开: ${key}`),
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
    onClick: (data, key) => message.info(`重命名: ${data.name}`),
  },
  {
    label: '删除',
    danger: true,
    onClick: (data, key) => message.warning(`删除: ${key}`),
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
