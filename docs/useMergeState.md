## useMergeState

### 描述

- 简单的 useMergeState 钩子，相较于useState的直接替换，本钩子做merge操作
- 可重置为原始state
- 目前最主要的使用场景为 可以设置很多筛选条件的列表。把所有的的筛选值合并到同一对象，每次更改某一个条件，拿到变化后的筛选条件，再从后端取数据

Demo:

```tsx
import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { useMergeState } from 'hooks';
import 'antd/dist/antd.css';

export default () => {
  const [value, mergeState, resetState] = useMergeState({ a: 'aaa' });

  const handleClick = () => {
    mergeState({ b: 'bbb' });
  };

  const handleResetClick = () => {
    resetState();
  };

  return (
    <>
      <div>a: {value.a}</div>
      <div>b: {value.b}</div>
      <Button onClick={handleClick} type="primary">
        合并
      </Button>
      <Button style={{ marginLeft: 20 }} onClick={handleResetClick}>
        重置
      </Button>
    </>
  );
};
```
