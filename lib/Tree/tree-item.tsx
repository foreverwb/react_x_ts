import React, {ChangeEventHandler, useState} from "react";
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
      <div className={sc({children: true, collapsed: !expanded})}>
        {item.children?.map(sub =>
          <TreeItem key={sub.value} item={sub} level={level + 1} treeProps={treeProps}/>)}
      </div>
    </div>
  )
}

export default TreeItem;