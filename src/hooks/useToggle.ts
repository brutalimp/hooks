import { useState } from "react";

// 布尔类型切换
export function useToggle(initialValue: boolean) {
   const [value, setToggleValue] = useState(initialValue);
   // 切换布尔值
   const toggleValue = () => {
      setToggleValue(!value);
   }
   const resetValue = () => {
      setToggleValue(initialValue);
   }
   return [value, toggleValue, resetValue];
}

export default useToggle;