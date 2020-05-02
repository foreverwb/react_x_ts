import {useEffect, useRef} from "react";

const useUpdate = (dep: boolean, func: () => void) => {
  const isFirst = useRef(true)
  
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return
    }
    func()
  }, [dep]);
};

export default useUpdate;