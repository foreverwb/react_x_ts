import React, {ChangeEventHandler, useRef, useState} from "react";
import useUpdate from "../hooks/useUpdate";
import {scopedClassMaker} from "../untils/classes";
import './tree.scss';

const sc = scopedClassMaker('ui-tree');

interface IProps {
  item: SourceDataItem
  level: number
  treeProps: TreeProps
}

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
  
  const onChange:ChangeEventHandler<{checked: boolean}> = (e) => {
    // const checked = (e.target as HTMLInputElement).checked;
    if (treeProps.multiple) {
      if (e.target.checked) {
        treeProps.onChange([...treeProps.selected, item.value])
      } else {
        treeProps.onChange(treeProps.selected.filter(val => val !== item.value))
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
  
  return (
    <div key={item.value} className={sc(classes)}>
      <div className={sc('text')}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
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
          <TreeItem key={sub.value} item={sub} level={level + 1} treeProps={treeProps}/>)}
      </div>
    </div>
  )
}

export default TreeItem;