import {useState} from "react";

const useToggle = (initialValue: boolean) => {
  const [expanded, setExpanded] = useState(initialValue);
  
  const collapse = () => {
    setExpanded(false)
  }
  const expand = () => {
    setExpanded(true)
  }
  
  return {
    expand,
    collapse,
    expanded,
  }
}

export default useToggle;