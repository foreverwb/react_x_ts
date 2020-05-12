import React, {ChangeEventHandler, useRef, useState} from "react";
import useUpdate from "../hooks/useUpdate";
import {scopedClassMaker} from "../untils/classes";
import './tree.scss';

const sc = scopedClassMaker('ui-tree');

interface IProps {
  item: SourceDataItem
  level: number
  treeProps: TreeProps
  onItemChange: (values: string[]) => void
}

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

const TreeItem: React.FC<IProps> = (props) => {
  const {item, level, treeProps} = props;
  const [expanded, setExpanded] = useState(true);
  
  const classes = {
    ['level-' + level]: true,
    'item': true
  };
  const checked = treeProps.multiple ?
    treeProps.selected.indexOf(item.value) >= 0 :
    treeProps.selected === item.value;
  
  const divRef = useRef<HTMLDivElement>(null)
  
  useUpdate(expanded, () => {
    if(!divRef.current) return;
    if(expanded) {
      divRef.current.style.height = 'auto';
      const { height } = divRef.current.getBoundingClientRect()
      divRef.current.style.height = '0px';
      divRef.current.getBoundingClientRect();
      divRef.current.style.height = height + 'px';
      const afterExpand = () => {
        if(!divRef.current) return;
        divRef.current.style.height = '';
        divRef.current.classList.add('ui-tree-children-present');
        divRef.current.removeEventListener('transitioned', afterExpand)
      }
      divRef.current.addEventListener('transitioned', afterExpand)
    } else {
      const { height } = divRef.current.getBoundingClientRect()
      divRef.current.style.height = height + 'px';
      divRef.current.getBoundingClientRect();
      divRef.current.style.height = '0px';
      const afterCollapse = () => {
        if(!divRef.current) return;
        divRef.current.style.height = '';
        divRef.current.classList.add('ui-tree-children-gone');
        divRef.current.removeEventListener('transitioned', afterCollapse)
      }
      divRef.current.addEventListener('transitioned', afterCollapse)
    }
  });
  
  function collectChildValues(item: SourceDataItem): string[] {
    return flatten(item.children?.map(i => [i.value, collectChildValues(i)]));
  }
  
  function flatten(array?: RecursiveArray<string>): string[] {
    if (!array) {return []}
    return array.reduce<string[]>((result, current) => {
      return result.concat(typeof current === 'string' ? current : flatten(current))
    }, [])
    
    // const result = []
    // for(let i = 0; i < array.length; i++) {
    //   if (array[i] instanceof Array) {
    //     result.push(...flatten(array[i] as RecursiveArray<string>))
    //   } else {
    //     result.push(array[i] as string)
    //   }
    // }
    // return result;
  }
  
  const onChange:ChangeEventHandler<{checked: boolean}> = (e) => {
    const childValues = collectChildValues(item);
    // const checked = (e.target as HTMLInputElement).checked;
    if (treeProps.multiple) {
      if (e.target.checked) {
        props.onItemChange([...treeProps.selected, item.value, ...childValues])
      } else {
        props.onItemChange(treeProps.selected.filter(val => val !== item.value && childValues.indexOf(val) === -1))
      }
    } else {
      if (e.target.checked) {
        treeProps.onChange(item.value)
      } else {
        treeProps.onChange('')
      }
    }
  };
  const collapse = () => {
    setExpanded(false)
  }
  const expand = () => {
    setExpanded(true)
  }
  
  function intersect<T>(arr1: T[], arr2: T[]): T[] {
    const result: T[] = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.indexOf((arr1[i])) >= 0) {
        result.push(arr1[i])
      }
    }
    return result;
  }
  
  const onItemChange = (values: string[]) => {
    // children have choice
    const childValues = collectChildValues(item);
    const common = intersect(values, childValues);
    if (common.length !== 0) {
      props.onItemChange(Array.from(new Set(values.concat(item.value))))
      // all choice
      if (common.length === childValues.length) {
        inputRef.current!.indeterminate = false;
      } else {
        inputRef.current!.indeterminate = true;
      }
    } else {
      props.onItemChange(values.filter(v => v !== item.value));
      inputRef.current!.indeterminate = true;
    }
  }
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div key={item.value} className={sc(classes)}>
      <div className={sc('text')}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          ref={inputRef}
        />
        {item.text}
        {item.children &&
        <span onSelect={e => e.preventDefault()}>
              {expanded ? <span onClick={collapse}> - </span> : <span onClick={expand}> + </span>}
            </span>
        }
      </div>
      <div className={sc({children: true, collapsed: !expanded})} ref={divRef}>
        {item.children?.map(sub =>
          <TreeItem
            key={sub.value}
            item={sub}
            level={level + 1}
            treeProps={treeProps}
            onItemChange={onItemChange}
          />)}
      </div>
    </div>
  )
}

export default TreeItem;