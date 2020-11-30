import { useReducer, useMemo } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 请求状态枚举
export enum requestEnum {
  WAITING,
  PENDING,
  SUCCESS,
  ERROR,
}

type CustomUrl<T> = string | ((params: T) => string);

export type CustomAxiosRequestConfig<T> = Omit<AxiosRequestConfig, "url"> & {
  url: CustomUrl<T>;
};

export interface ResponseState<P> {
  // 请求状态
  status: requestEnum;
  // 是否在请求中
  loading: boolean;
  // 请求返回值
  data: P | null;
  // 错误信息
  error: any;
}

// 默认的请求返回体
export const defaultResponseState = {
  status: requestEnum.WAITING,
  loading: false,
  data: null,
  error: null,
};

export interface ReducerPayload {
  type: requestEnum;
  data: any;
  error: any;
}

function reducer<P>(
  state: ResponseState<P>,
  payload: ReducerPayload
): ResponseState<P> {
  switch (payload.type) {
    case requestEnum.PENDING: {
      return {
        status: requestEnum.PENDING,
        loading: true,
        data: null,
        error: null,
      };
    }
    case requestEnum.SUCCESS: {
      return {
        status: requestEnum.SUCCESS,
        loading: false,
        data: payload.data,
        error: null,
      };
    }
    case requestEnum.ERROR: {
      return {
        status: requestEnum.ERROR,
        loading: false,
        data: null,
        error: payload.error,
      };
    }
    default: {
      return {
        status: requestEnum.WAITING,
        loading: false,
        data: null,
        error: null,
      };
    }
  }
}

type RequestDispatch<T, P> = (params: T) => Promise<P>;

export function useRequest<T, P>(
  config: CustomAxiosRequestConfig<T>
): [ResponseState<P>, RequestDispatch<T, P>] {
  const [responseStore, dispatch] = useReducer(reducer, defaultResponseState);
  const requestDispatch: RequestDispatch<T, P> = useMemo(() => {
    return (params: T) => {
      let axiosRequestConfig = config;
      // 如果是get方法
      if (!config.method || config.method.toUpperCase() === "GET") {
        axiosRequestConfig = { ...config, params };
      } else {
        axiosRequestConfig = { ...config, data: params };
      }
      // 如果url为函数
      if (typeof axiosRequestConfig.url === "function") {
        axiosRequestConfig.url = axiosRequestConfig.url(params);
      }
      dispatch({
        type: requestEnum.PENDING,
        data: null,
        error: null,
      });
      return axios.request(axiosRequestConfig as AxiosRequestConfig).then(
        (res: AxiosResponse<P>) => {
          dispatch({
            type: requestEnum.SUCCESS,
            data: res.data,
            error: null,
          });
          return Promise.resolve(res.data);
        },
        (err) => {
          dispatch({
            type: requestEnum.ERROR,
            data: err,
            error: null,
          });
          return Promise.reject(err);
        }
      );
    };
  }, [config]);
  return [responseStore as ResponseState<P>, requestDispatch];
}

export default useRequest;
