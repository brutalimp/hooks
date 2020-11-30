import { useState } from "react";

// 合并，重置状态
export function useMergeState<T>(initialState: T) {
  const [value, setState] = useState(initialState);
  // 合并操作
  const mergeState = (deltaState: T) => {
    setState({ ...value, ...deltaState });
  };
  // 重置操作
  const resetState = (resetValue?: T) => {
    setState(resetValue ? resetValue : initialState);
  };
  return [value, mergeState, resetState];
}

export default useMergeState;
