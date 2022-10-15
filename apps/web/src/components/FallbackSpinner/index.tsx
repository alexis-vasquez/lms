import { Spin } from 'antd';

export const FallbackSpinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Spin size="large" />
    </div>
  );
};
