## useRequest

### 描述

- typescript 版本的 useRequest, 可以声明【请求参数类型】与【返回数据类型】，在开发早期定义，以便后续更改或填充实际值
- 避免直接使用axios等库的callback地狱
- 与社区的实现相比，简单易用，没有集成多余功能

Demo:

```tsx
import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import {
  useToggle,
  CustomAxiosRequestConfig,
  useRequest,
  requestEnum,
} from 'hooks';
import 'antd/dist/antd.css';

interface ReportParam {
  keyword: string;
}

interface ReportResponse {
  id: number;
  name: string;
}

const requestConfig: CustomAxiosRequestConfig<ReportParam> = {
  url: 'https://randomuser.me/api',
  method: 'get',
  responseType: 'json',
};

const requestErrorConfig: CustomAxiosRequestConfig<ReportParam> = {
  url: 'https://randomuser.me/ap',
  method: 'get',
  responseType: 'json',
};

export default () => {
  const [reportRes, reportReq] = useRequest<ReportParam, ReportResponse>(
    requestConfig,
  );

  const [reportErrorRes, reportErrorReq] = useRequest<
    ReportParam,
    ReportResponse
  >(requestErrorConfig);

  const handleClick = () => {
    reportReq({ keyword: 'success' });
  };

  const handleErrorClick = () => {
    reportErrorReq({ keyword: 'error' });
  };

  useEffect(() => {
    const { data, status } = reportRes;
    if (status === requestEnum.SUCCESS) {
      message.success('success');
    }
  }, [reportRes]);

  useEffect(() => {
    const { data, status } = reportErrorRes;
    if (status === requestEnum.ERROR) {
      message.error('error');
    }
  }, [reportErrorRes]);

  return (
    <>
      <Button onClick={handleClick} type="primary" loading={reportRes.loading}>
        测试成功
      </Button>
      <Button style={{marginLeft: 20}} onClick={handleErrorClick} loading={reportErrorRes.loading}>
        测试失败
      </Button>
    </>
  );
};
```
