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
