## useToggle

### 描述

- 简单的toggle钩子，可重置状态

Demo:

```tsx
import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { useToggle } from 'hooks';
import 'antd/dist/antd.css';

export default () => {
  const [value, toggleValue, resetValue] = useToggle(true);

  const handleClick = () => {
    toggleValue();
  };

  const handleResetClick = () => {
    resetValue();
  };

  return (
    <>
      <div>{value ? 'true' : 'false'}</div>
      <Button onClick={handleClick} type="primary" >
        切换
      </Button>
      <Button
        style={{ marginLeft: 20 }}
        onClick={handleResetClick}
      >
        重置
      </Button>
    </>
  );
};
```
