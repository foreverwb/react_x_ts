import {useEffect, useState} from "react";

const useUpdate = (dep: boolean, func: () => void) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(value => value + 1)
  }, [dep]);
  
  useEffect(() => {
    if (count > 1) {
      func()
    }
  }, [count])
};

export default useUpdate;